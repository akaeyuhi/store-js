import {ProductItem} from "./components/Item.js";
import {constants} from "./components/constants.js";
import {List} from "./components/List.js";

'use strict';

new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        allProducts: [],
        searchLine: ''
    },

    methods: {
        getItems: List.prototype.getItems,
        _initProducts() {
            for(const good of this.goods) {
                this.allProducts.push(
                    new ProductItem(good)
                )
            }
        }
    },
    mounted() {
        this.getItems(constants.API + '/catalogData.json').then(data => {
            this.goods = [...data];
            this._initProducts()
        })
    }
})

