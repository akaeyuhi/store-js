import {ProductItem} from "./ProductList";

export class Cart {
    constructor() {

    }

    addItem() {

    }

    deleteItem() {

    }
}

class CartItem extends ProductItem {
    constructor(id, title, price, img = 'https://placehold.it/200x125') {
        super(id, title, price, img);
    }

    get markup() {
        return super.markup
    }
}