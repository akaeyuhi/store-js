import {CartItem} from "./Item.js";

'use strict';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        async addProduct(product) {
            const find = this.cartItems.find(el => el.id === product.id);
            if (find) {
                await this.$parent.putRequest(`/api/cart/${find.id}`, {quantity: find.quantity});
                find.quantity++;
            } else {
                const prod = Object.assign({quantity: 1}, product);
                const response = await this.$parent.postRequest(`/api/cart`, prod);
                if (response.result === 1) this.cartItems.push(this._processData(prod));
            }
        },
        async remove(item) {
            const data = await this.$parent.getRequest(`/deleteFromBasket.json`)
            if (data.result === 1) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    this.cartItems.splice(this.cartItems.indexOf(item), 1)
                }
            }
        },

        _processData(product) {
            return new CartItem(product)
        }
    },
    mounted() {
        this.$parent.getJson(this.cartUrl)
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(this._processData(product));
                }
            });
    },
    template: `
      <div>
      <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
      <div class="cart-block" v-show="showCart">
        <p v-if="!cartItems.length">Cart is empty</p>
        <cart-item class="cart-item"
                   v-for="item of cartItems"
                   :key="item.id"
                   :cart-item="item"
                   :img="item._img"
                   @remove="remove">
        </cart-item>
      </div>
      </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
      <div class="cart-item">
      <div class="product-bio">
        <img :src="cartItem._img" alt="Some image">
        <div class="product-desc">
          <p class="product-title">{{ cartItem.title }}</p>
          <p class="product-quantity">Quantity: {{ cartItem.quantity }}</p>
          <p class="product-single-price">$ {{ cartItem.price }} each</p>
        </div>
      </div>
      <div class="right-block">
        <p class="product-price">{{ cartItem.quantity * cartItem.price }}</p>
        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
      </div>
      </div>
    `
});
