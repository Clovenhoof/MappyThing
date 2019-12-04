import _ from 'lodash';
import axios from 'axios';

import Keywords from 'src/keywords.js';

class Modal {
    constructor(parent) {
        this.parent = parent;
        return this;
    }
    
    isOpen() {
        return this.modalOpen;
    }
    
    getDialog() {
        return this.dialog;
    }
    
    open(action, handlers = {}) {
        this.success = handlers.success;
        this.cancel = handlers.cancel;
        this.move = handlers.move;
        this.edit = handlers.edit;
        this.delete = handlers.delete;
        this.favorite = handlers.favorite;
        
        axios.get('/' + action)
            .then((response) => {
                this.dialog = document.createElement('div');
                this.dialog.classList.add('dialog');
                this.dialog.innerHTML = response.data;
                this.addHandlers(this.dialog);
                this.modalOpen = true;
                document.querySelector('body').append(this.dialog);
                // add keyword handler
                if(action.split('/')[0] == 'form') {
                    this.keywords = new Keywords(this.parent, this.dialog);
                }
                _.delay(() => {
                    this.dialog.classList.add('open');
                },20);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    addHandlers(dialog) {
        // prevent number input overflow (html5 "bug")
        let numbers = dialog.querySelectorAll('input[type="number"]');
        if(numbers !== null) {
            numbers.forEach((item, index) => {
                item.addEventListener('keydown', (event) => {
                    if(event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'Tab') {
                        event.preventDefault();
                        return false;
                    }
                });
            });
        }
        // cancel/close modal
        if(this.cancel) {
            dialog.querySelector('a.fn-cancel').addEventListener('click', (event) => {
                this.cancel();
                this.destroy();
            });
        }
        // move marker
        if(this.move) {
            dialog.querySelector('a.fn-move').addEventListener('click', (event) => {
                this.move();
            });
        }
        // edit event/swap modal
        if(this.edit) {
            dialog.querySelector('a.fn-edit').addEventListener('click', (event) => {
                this.edit();
            });
        }
        // delete post handler
        if(this.delete) {
            dialog.querySelector('a.fn-delete').addEventListener('click', (event) => {
                this.delete();
            });
        }
        // fire favorite patch
        if(this.favorite) {
            dialog.querySelector('a.fn-favorite').addEventListener('click', (event) => {
                this.favorite(event);
            });
        }
        // post form data
        if(this.success) {
            dialog.querySelector('a.fn-save').addEventListener('click', (event) => {
                // forms to json
                let elements = dialog.querySelectorAll('input, select, textarea');
                let data = {};

                for(let i = 0; i < elements.length; ++i) {
                    if(elements[i].name) {
                        data[elements[i].name] = elements[i].value;
                    }
                }
                this.success(data);
                this.destroy();
            });
        }
    }
    
    async destroy() {
        return new Promise((resolve, reject) => {
            this.dialog.addEventListener('transitionend', (event) => {
                this.modalOpen = false;
                this.dialog.remove();
                return resolve();
            });
            this.dialog.classList.remove('open');
        });
    }
}

export default Modal;