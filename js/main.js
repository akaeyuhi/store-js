

'use strict';

new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        filter(queryString) {
            let regexp = new RegExp(queryString, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        },
    },
    mounted() {
        console.log(this);
    }
});

