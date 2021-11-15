export class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchGoods();
    }

    _fetchGoods() {
        // Parse JSON from server
        this.goods = [
            {id: 1, name: 'Notebook', price: 1000},
            {id: 2, name: 'Mouse', price: 100},
            {id: 3, name: 'Keyboard', price: 250},
            {id: 4, name: 'Gamepad', price: 150},
        ];
    }

    _initProducts() {
        for(const good of this.goods) {
            this.allProducts.push(new ProductItem(good.id, good.name, good.price))
        }
    }

    get price() {
        return this.allProducts.reduce((a, b) => a + b.price, 0)
    }

    render() {
        const block  = document.querySelector(this.container);
        this._initProducts()
        return block.insertAdjacentHTML('beforeend', this.allProducts.map(item => item.markup).join(''));
    }
}


export class ProductItem {
    constructor(id, title, price, img = 'https://placehold.it/200x150') {
        this.title = title;
        this.price = price;
        this._id = id;
        this._img = img;
    }

    get markup() {
        return `<div class="product-item">
             <img src=${this._img} alt="picture">
             <h3>${this.title}</h3>
             <p>${this.price}</p>
             <button class="buy-btn">Добавить</button>
         </div>`;
    }

}