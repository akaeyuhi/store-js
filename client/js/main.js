'use strict';

new Vue({
    el: '#app',
    methods: {
        getRequest(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        filter(queryString) {
            let regexp = new RegExp(queryString, 'i');
            if (queryString !== '')
                this.$refs.products.filtered = this.$refs.products.products.filter(el => regexp.test(el.title.toLowerCase()));
            else this.$refs.products.filtered = this.$refs.products.products
        },
    },
    mounted() {
        console.log(this);
    }
});

