import _ from 'lodash';
import axios from 'axios';

class Keywords {
    constructor(parent, context) {
        this.parent = parent;
        this.context = context;
        this.container = context.querySelector('.keywords');
        this.input = context.querySelector('.keywords input[type="hidden"]');
        this.text = context.querySelector('.keywords input[type="text"]');
        // all keywords buffer
        this.keywords = [];
        // selected keywords buffer
        this.selected = [];
        
        axios
            .get('/api/keyword/')
            .then((response) => {
                if(response.data.keywords.length)
                    this.keywords = response.data.keywords;
            })
            .catch((error) => {
                console.error(error);
            });
            
        let elements = context.querySelectorAll('.keywords .selected span');
        for(let i = 0; i < elements.length; ++i) {
            this.selected.push({
                "id":elements[i].dataset.id,
                "title":elements[i].innerHTML
            });
            this.refresh();
        }
        
        context.querySelector('.keywords .selected').addEventListener('click', (event) => {
            if(event.target.dataset.id) {
                axios
                    .delete('/api/keyword/' + event.target.dataset.id + '/')
                    .then(() => {
                        this.selected = _.remove(this.selected, {"id":Number(event.target.dataset.id)});
                        event.target.remove();
                        this.parent.tools.initKeywords();
                        this.refresh();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
        
        this.text.addEventListener('keydown', (event) => {
            // submit
            if(event.key == 'Enter') {
                this.addKeyword({
                    "id":new Date().getTime(),
                    "title":this.text.value
                });
                this.text.value = '';
            // prevent invalid keys
            }else if(event.key == ' '){
                event.preventDefault();
            }
        });
    }
    
    refresh() {
        this.input.value = _.map(this.selected, 'id').toString();
    }
    
    addElement(data) {
        let current = document.createElement('span');
        current.dataset.id = data.id;
        current.innerHTML = data.title;
        this.context.querySelector('.keywords .selected').append(current);
    }
    
    addKeyword(data) {
        let existing = _.find(this.keywords, (o,k) => {
            return data.title.toLowerCase() == o.title.toLowerCase();
        });
        let current = _.find(this.selected, (o,k) => {
            return data.title.toLowerCase() == o.title.toLowerCase();
        });
        if(current === undefined) {
            if(existing !== undefined) {
                existing.count = ++existing.count;
                axios
                    .patch('/api/keyword/',existing)
                    .then((response) => {
                        this.selected.push(response.data.keyword);
                        this.addElement(response.data.keyword);
                        this.refresh();
                        this.parent.tools.initKeywords();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }else{
                axios
                    .post('/api/keyword/', _.assign(data, {"count":1}))
                    .then((response) => {
                        this.selected.push(response.data.keyword);
                        this.addElement(response.data.keyword);
                        this.refresh();
                        this.parent.tools.initKeywords();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }
}

export default Keywords;