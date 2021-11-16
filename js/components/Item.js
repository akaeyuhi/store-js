export class Item {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this._img = img;
    }

    get markup() {
        return `<div class="product-item" data-id="${this.id}">
             <img src=${this._img} alt="picture">
             <div class="desc">
                 <h3>${this.title}</h3>
                 <p>$${this.price}</p>
                 <button 
                 class="buy-btn"
                 data-id="${this.id}"
                 data-name="${this.title}"
                 data-price="${this.price}">
                  Купить
                 </button>
             </div> 
         </div>`;
    }
}

export class ProductItem extends Item {}

export class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100'){
        super(el, img);
        this.quantity = el.quantity;
    }
    get markup() {
        return `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
              <img src="${this._img}" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">${this.title}</p>
                    <p class="product-quantity">Quantity: ${this.quantity}</p>
                    <p class="product-single-price">$${this.price} each</p>
                </div>
            </div>
          <div class="right-block">
            <p class="product-price">$${this.quantity*this.price}</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
          </div>
        </div>`
    }
}