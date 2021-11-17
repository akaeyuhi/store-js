import {ProductItem} from "./components/Item.js";
import {constants} from "./components/constants.js";
import {List} from "./components/List.js";

'use strict';

new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredProducts: [],
        allProducts: [],
        cartProducts: [],
        searchLine: '',
        isCartVisible: false,
    },

    methods: {
        getItems: List.prototype.getItems,
        filter() {
            const regexp = new RegExp(this.searchLine.toLowerCase(), 'i');
            this.filteredProducts = this.allProducts.filter(product => regexp.test(product.title));
        },
        _initProducts() {
            for(const good of this.goods) {
                this.allProducts.push(
                    new ProductItem(good)
                )
            }
        },
        showCart() {
            this.isCartVisible = !this.isCartVisible;
        }
    },
    mounted() {
        this.getItems(constants.API + '/catalogData.json').then(data => {
            this.goods = [...data];
            this._initProducts()
        })
    }
})

