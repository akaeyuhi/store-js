import { constants } from './constants.js'
import {ProductItem, CartItem} from "./Item.js";

const list = {
    ProductList: ProductItem,
    Cart: CartItem
}

export class List {
    constructor(apiUrl, container, classList = list) {
        this.container = container;
        this.url = apiUrl
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this.list = classList;
        this._init()
    }

    getItems(url) {
        return fetch(url ? url: `${constants.API + this.url}`)
            .then(data => data.json())
            .catch(err => console.log(err));
    }

    handleItems(data) {
        this.goods = [...data];
        this.render();
    }

    _initProducts() {
        for(const good of this.goods) {
            this.allProducts.push(
                new this.list[this.constructor.name](good)
            )
        }
    }

    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.title));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }

    get price() {
        return this.allProducts.reduce((a, b) => a + b.price, 0)
    }

    render() {
        console.log('render', this.allProducts);
        const block  = document.querySelector(this.container);
        this._initProducts()
        return block.insertAdjacentHTML('beforeend', this.allProducts.map(item => item.markup).join(''));
    }

     _init() {
        return false;
    }
}

export class ProductList extends List {
    constructor(cart, container = '.products', url = '/catalogData.json') {
        super(url, container);
        this.cart = cart;
        this.getItems()
            .then(data => this.handleItems(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', async event => {
            if(event.target.classList.contains('buy-btn')) {
                await this.cart.addItem(event.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', event => {
            event.preventDefault();
            this.filter(document.querySelector('.search-field').value.toLowerCase());
        });
    }

}


export class Cart extends List {
    constructor(container = '.cart-block', url = '/getBasket.json') {
        super(url, container);
        this.getItems()
            .then(data => this.handleItems(data.contents));
    }

    async addItem(item) {
        const data = await this.getItems(`${constants.API}/addToBasket.json`)
        if (data.result === 1) {
            const productId = +item.dataset['id'];
            const found = this.allProducts.find(product => product.id === productId);
            if (found) {
                found.quantity++
                this._updateCart(found);
            } else {
                const product = {
                    id_product: productId,
                    price: item.dataset['price'],
                    product_name: item.dataset['name'],
                    quantity: 1
                };
                this.goods = [product];
                this.render();
            }
        } else throw 'Fetch error';
    }

    async deleteItem(item) {
        const data = await this.getItems(`${constants.API}/deleteFromBasket.json`)
        if (data.result === 1) {
            const productId = +item.dataset['id'];
            const found = this.allProducts.find(product => product.product_id === productId);
            if (found > 1) {
                found.quantity--
                this._updateCart(found);
            } else {
                this.allProducts.splice(this.allProducts.indexOf(found), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
            }
        } else throw 'Delete error';
    }

    _updateCart(item) {
        const block = document.querySelector(`.cart-item[data-id="${item.id}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${item.quantity}`;
        block.querySelector('.product-price').textContent = `$${item.quantity*item.price}`
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        })
        document.querySelector(this.container).addEventListener('click', async event => {
            if (event.target.classList.contains('del-btn')) await this.deleteItem(event.target);
        })
    }
}
