import _ from 'lodash';
import axios from 'axios';

var modal;

class Modal {
    constructor() {
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
        this.edit = handlers.edit;
        this.delete = handlers.delete;
        
        axios.get('/' + action)
            .then((response) => {
                this.dialog = document.createElement('div');
                this.dialog.classList.add('dialog');
                this.dialog.innerHTML = response.data;
                this.addHandlers(this.dialog);
                this.modalOpen = true;
                document.querySelector('body').append(this.dialog);
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
        let numbers = dialog.querySelector('input[type="number"]');
        if(numbers !== null) {
            numbers.addEventListener('keydown', (event) => {
                event.preventDefault();
                return false;
            });
        }
        // cancel/close modal
        if(this.cancel) {
            dialog.querySelector('a.cancel').addEventListener('click', (event) => {
                this.cancel();
                this.destroy();
            });
        }
        // fire edit event/swap modal
        if(this.edit) {
            dialog.querySelector('a.edit').addEventListener('click', (event) => {
                this.edit();
            })
        }
        // delete post handler
        if(this.delete) {
            dialog.querySelector('a.delete').addEventListener('click', (event) => {
                this.delete();
            });
        }
        // post form data
        if(this.success) {
            dialog.querySelector('a.save').addEventListener('click', (event) => {
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