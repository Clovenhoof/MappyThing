import axios from 'axios';

import Modal from 'src/modal.js';
import Icons from 'src/icons.js';

export default class Tools {
    constructor(parent, context) {
        this.self = this;
        this.context = context;
        this.parent = parent;
        
        this.context.querySelector('.fn-add').addEventListener('click', (event) => {
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
                                "lat":this.currentMarker.getPosition().lat(),
                                "lng":this.currentMarker.getPosition().lng()
                            }, data));
                            this.currentMarker.setMap(null);
                        },
                        cancel: () => { this.self.cancelPlace() }
                    }
                );
            });
        });
    }
    
    cancelPlace() {
        this.currentMarker.setMap(null);
    }
}