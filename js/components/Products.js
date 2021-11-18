import {constants} from "./constants.js";
import {ProductItem} from "./Item.js";

'use strict';

Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        _processData(product) {
            return new ProductItem(product)
        }
    },
    mounted() {
        this.$parent.getJson(`${constants.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(this._processData(product));
                    this.filtered.push(this._processData(product));
                }
            });
    },

    template: `
      <div class="products">
      <product ref="refref" v-for="item of filtered" :key="item.id" :img="item._img" :product="item"></product>
      </div>
    `
});

Vue.component('product', {
    props: ['product'],
    data() {
        return {
            cart: this.$root.$refs.cart,
        };
    },

    template: `
      <div class="product-item">
      <img :src="product._img" alt="Some img">
      <div class="desc">
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }} $</p>
        <button class="buy-btn" @click="cart.addProduct(product)">Купить</button>
      </div>
      </div>
    `
});