import {ProductList, Cart} from "./components/List.js";

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    const products = new ProductList(cart);
    console.log(products.price, products.toString())
})

