import {ProductList} from "./ProductList.js";
//import {Cart} from "./Cart.js";

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const products = new ProductList();
    products.render();
    console.log(products.price)
})

