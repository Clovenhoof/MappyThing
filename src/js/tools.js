import axios from 'axios';

import Modal from 'src/modal.js';
import Icons from 'src/icons.js';

export default class Tools {
    constructor(parent, context) {
        this.self = this;
        this.context = context;
        this.parent = parent;
        this.filters = {};
        this.delay = Number();
        
        // favorite filter
        this.context.querySelector('.fn--favorites').addEventListener('click', (event) => {
            if(event.target.classList.contains('fn--active')) {
                delete this.filters['favorite'];
                event.target.classList.remove('fn--active');
                parent.refresh();
            }else{
                this.filters = _.assign(this.filters, {"favorite":true});
                event.target.classList.add('fn--active');
                parent.refresh();
            }
        });
        
        // open filter
        this.context.querySelector('.fn--open').addEventListener('click', (event) => {
            if(event.target.classList.contains('fn--active')) {
                delete this.filters['open'];
                event.target.classList.remove('fn--active');
                parent.refresh();
            }else{
                this.filters = _.assign(this.filters, {"open":true});
                event.target.classList.add('fn--active');
                parent.refresh();
            }
        });
        
        // search filter
        this.context.querySelector('.fn--search').addEventListener('keydown', async (event) => {
            window.clearTimeout(this.delay);
            let current = new Promise((resolve, reject) => {
                this.delay = _.delay(() => {
                    resolve(event.target.value);
                },500);
            });
            await current.then((resolve) => {
                if(resolve.length == 0)
                    delete this.filters['search'];
                else
                    this.filters.search = resolve;
                
                parent.refresh();
            });
        });
        
        // keyword filter
        this.initKeywords(false);
        this.context.querySelector('.fn--keywords').addEventListener('change', (event) => {
            if(event.target.value) {
                this.filters = _.assign(this.filters, {"keyword":event.target.value});
                event.target.classList.add('fn--active');
                parent.refresh();
            }else{
                delete this.filters['keyword'];
                event.target.classList.remove('fn--active');
                parent.refresh();
            }
        });
        
        // add new position
        this.context.querySelector('.fn--add').addEventListener('click', (event) => {
            if(this.currentMarker !== undefined)
                this.currentMarker.setMap(null);
            
            this.currentMarker = new google.maps.Marker({
                position:parent.getMap().getCenter(),
                map:parent.getMap(),
                draggable:true,
                title:'New position',
                icon: Icons.selected
            });
            this.currentMarker.addListener('dragend', (event) => {
                    parent.modal.open(
                        'form', {
                            success: (data) => {
                                parent.savePlace(_.assign({
                                    "id":new Date().getTime(),
                                    "lat":this.currentMarker.getPosition().lat(),
                                    "lng":this.currentMarker.getPosition().lng()
                                }, data));
                                this.currentMarker.setMap(null);
                            }
                        }
                    );
                })
            });
    }
    
    // keyword refresher
    initKeywords(refresh = true) {
        axios
            .get('/api/keyword/')
            .then((response) => {
                let select = this.context.querySelector('.fn--keywords');
                select.innerHTML = '';
                let label = document.createElement('option');
                label.value = '';
                label.innerHTML = 'Keywords';
                select.append(label);
                _.each(response.data.keywords, (o,k) => {
                    let label = document.createElement('option');
                    label.value = o.id;
                    label.innerHTML = o.title + ' (' + o.count + ')';
                    select.append(label);
                });
                select.classList.remove('fn--active');
                delete this.filters['keyword'];
                if(refresh)
                    this.parent.refresh();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    getFilters() {
        return this.filters;
    }
    
    cancelPlace() {
        this.currentMarker.setMap(null);
    }
}