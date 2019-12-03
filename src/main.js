const config = require('config/environment.json');
const style = require('src/style.js');

import _ from 'lodash';
import axios from 'axios';

import Icons from 'src/icons.js';
import Tools from 'src/tools.js';
import Modal from 'src/modal.js';

import 'scss/_defaults.scss';

class Main {
    constructor(context) {
        this.self = this;
        this.element = context;
        this.places = [];
        
        // base map config
        this.map = new google.maps.Map(document.querySelector('body main .map'), {
            center: {
                lat: config.map.lat ? config.map.lat : 60.1699,
                lng: config.map.lng ? config.map.lng : 24.9384
            },
            zoom: config.map.initZoom ? config.map.initZoom : 8,
            streetViewControl:false,
            mapTypeControl:false,
            fullscreenControl:false,
            styles:style.default
        });
        // init modal handler
        this.modal = new Modal();
        // init tool events
        this.tools = new Tools(this, document.querySelector('body main .toolset'));
        // load stored data
        this.refresh();
    }
    
    // clear & redraw markers
    refresh() {
        if(this.places.length) {
            _.each(this.places, (o,k) => {
                o.marker.setMap(null);
            });
            this.places = [];
        }
        axios
            .get('/api/places/')
            .then((response) => {
                if(response.data.places) {
                    _.each(response.data.places, (o,k) => {
                        this.setPlace(_.assign({"id":k}, o));
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    // return map helper
    getMap() {
        return this.map;
    }
    
    // add new static marker
    setPlace(newPlace) {
        let marker = new google.maps.Marker({
            position:{
                lat: newPlace.lat,
                lng: newPlace.lng
            },
            map: this.getMap(),
            draggable: false,
            title: newPlace.title,
            icon: Icons.normal,
            id: newPlace.id
        });
        // handle dialog openings and function swapping
        marker.addListener('click', (event) => {
            // view functions/events
            if(this.selected) {
                this.selected.setDraggable(false);
                this.selected.setIcon(Icons.normal);
                google.maps.event.removeListener(this.listener);
                this.selected = undefined;
                this.listener = undefined;
                console.log('calling clearer');
            }
            let eventHandlers = {
                cancel: () => {},
                // function upgraded form for edit
                edit: () => {
                    this.modal
                        .destroy()
                        .then(() => {
                            this.modal.open('form/' + marker.id + '/', {
                                success: (data) => this.savePlace(_.assign({
                                    "lat":marker.getPosition().lat(),
                                    "lng":marker.getPosition().lng()
                                }, data)),
                                move: () => {
                                    this.modal
                                        .destroy()
                                        .then(() => {
                                            this.selected = this.places[marker.id].marker;
                                            this.selected.setDraggable(true);
                                            this.selected.setIcon(Icons.selected);
                                            this.listener = this.selected.addListener('dragend', (event) => {
                                                axios
                                                    .patch('/api/places/' + marker.id + '/', {
                                                        "lat":this.selected.getPosition().lat(),
                                                        "lng":this.selected.getPosition().lng()
                                                    })
                                                    .then(() => {
                                                        google.maps.event.removeListener(this.listener);
                                                        this.selected.setDraggable(false);
                                                        this.selected.setIcon(Icons.normal);
                                                    })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });
                                            });
                                        });
                                },
                                // confirm delete dialog
                                delete: () => {
                                    this.modal
                                        .destroy()
                                        .then(() => {
                                            this.modal.open('delete/' + marker.id + '/', {
                                                cancel: () => {},
                                                success: (data) => {
                                                    marker.setMap(null);
                                                    axios.delete('/api/places/' + marker.id + '/')
                                                        .then((response) => {
                                                            // call refresh to update ids
                                                            this.refresh();
                                                        })
                                                        .catch((error) => {
                                                            console.error(error);
                                                        })
                                                }
                                            })
                                        });
                                },
                                cancel: () => {}
                            });
                        });
                },
                favorite: (event) => {
                    if(event.target.textContent == 'favorite_border') {
                        axios
                            .patch('/api/places/' + marker.id + '/', {"favorite":true})
                            .then(() => {
                                event.target.textContent = 'favorite';
                                event.target.classList.add('favorited');
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }else{
                        axios
                            .patch('/api/places/' + marker.id + '/', {"favorite":false})
                            .then(() => {
                                event.target.textContent = 'favorite_border';
                                event.target.classList.remove('favorited');
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                }
            }
            
            // close open dialog if it is active
            if(this.modal.isOpen()) {
                this.modal
                    .destroy()
                    .then(() => {
                        this.modal.open('view/' + marker.id + '/', eventHandlers);
                    });
            // ...or just open it
            }else{
                this.modal.open('view/' + marker.id + '/', eventHandlers);
            }
        });
        newPlace.marker = marker;
        this.places.push(newPlace);
    }
    
    savePlace(data) {
        // edit
        if(data.id) {
            axios
                .patch('/api/places/' + data.id + '/', data)
                .then((response) => {
                })
                .catch((error) => {
                    console.error(error);
                });
        // create
        }else{
            axios
                .post('/api/places/', data)
                .then((response) => {
                    this.setPlace(response.data.place);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}

// fire up everything
document.addEventListener('DOMContentLoaded', (event) => {
    new Main(document.querySelector('body main .map'));
});