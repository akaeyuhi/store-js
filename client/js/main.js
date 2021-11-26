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
        putRequest(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postRequest(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        deleteRequest(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
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

