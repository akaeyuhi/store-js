export class Item {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name ? product.product_name : product.title;
        this.price = product.price;
        this.id = product.id_product ? product.id_product : product.id;
        this._img = img;
    }
}

export class ProductItem extends Item {
}

export class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }
}