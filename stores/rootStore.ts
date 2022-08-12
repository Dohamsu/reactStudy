import BasketStore from './BasketStore';
import ProductStore from './ProductStore';
import CounterStore from './CounterStore';

export default class RootStore{
    constructor(){
        this.basketStore = new BasketStore(this);
        this.productStore = new ProductStore(this);
        this.counterStore = new CounterStore(this);
    }

    basketStore: BasketStore;
    productStore: ProductStore;
    counterStore: CounterStore;
}