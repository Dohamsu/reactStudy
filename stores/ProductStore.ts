import {makeObservable, action, observable, computed, toJS} from 'mobx';

export interface Product{
    id: number;
    name: string; 
    price: number;
    choice: number;
}

export default class ProductStore{
    constructor(){
        makeObservable(this,{
            productList: observable,
            addProduct: action,
            removeProduct: action,
            getProducts: computed,
            getProductsNum: computed,
        })
    }
    productList: Product[] =[
        {id:0, name:'매운새우깡', price:1800, choice:1},
        {id:1, name:'콘쵸', price: 1200, choice: 1},
        {id:2, name:'허니버터칩', price:1500, choice:1}
    ]

    addProduct(newProduct: Product){
        this.productList = [...this.productList, newProduct]
    }

    removeProduct(id: number){
        this.productList.splice(id, 1)
    }

    get getProducts(){
        return toJS(this.productList);
    }

    get getProductsNum(){
        return toJS(this.productList.length)
    }
}