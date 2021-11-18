import {constants} from "./constants.js";
import {ProductItem} from "./Item.js";

Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        },

        _process_data(product) {
            return new ProductItem(product)
        }
    },
    mounted() {
        this.$parent.getJson(`${constants.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(this._process_data(product));
                    this.filtered.push(this._process_data(product));
                }
            });
    },

    template: `
      <div class="products">
      <product ref="refref" v-for="item of filtered" :key="item.id" :img="imgCatalog" :product="item"></product>
      </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cart: this.$root.$refs.cart,
        };
    },

    template: `
      <div class="product-item">
      <img :src="img" alt="Some img">
      <div class="desc">
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }} $</p>
        <button class="buy-btn" @click="cart.addProduct(product)">Купить</button>
      </div>
      </div>
    `
});