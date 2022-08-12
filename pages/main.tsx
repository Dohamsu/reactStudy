import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import counterStore from "../stores/CounterStore";
import {useRouter} from 'next/router'

interface Props {
  counterStore?: counterStore;
}


@inject("counterStore")
@observer
class Resetbtn extends Component<Props, {}> {
render() {
    const { counterStore } = this.props;
    return (
        <div>
            {counterStore!.number}
            <button onClick={()=>counterStore!.increase(2) } >+2</button>
            <button onClick={()=>counterStore!.reset(0) } >reset</button>
        </div>
    );
}
}


export default function SuperMarket(){
    const router = useRouter();

return(
    <div className="MarketTemplate">
        <div className="Market">
            메인페이지입니다ㅏ
        </div>
        <div className="AddProduct">
            <button onClick={()=>router.push('/loginPage')}>LoginPage </button>
            <hr/>

        </div>
            <Resetbtn/>
    </div>
    )
}