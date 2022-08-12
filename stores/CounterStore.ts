import {makeObservable, action, observable, computed, toJS} from 'mobx';
import RootStore from './rootStore';


export default class CounterStore {
    constructor(rootStore: RootStore){
        makeObservable(this,{
            number: observable,
            increase: action,
            reset: action,
            // getTotalPrice: computed,
        })
    }
    number: number = 0;


    increase(number: number){
        this.number++;
    }

    reset(number : number){
        this.number = 0;
    };

    // get getItems(){
    //     return toJS(this.itemList);
    // }

    // get getTotalPrice(){
    //     return toJS(this.totalPrice);
    // }
}