import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import counterStore from "../stores/CounterStore";
import {useRouter} from 'next/router'
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

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
            <Button  variant="contained" onClick={()=>counterStore!.increase(2) } >+2</Button >
            <Button  variant="contained" onClick={()=>counterStore!.reset(0) } >reset</Button >
        </div>
    );
}
}


export default function SuperMarket(){
    const router = useRouter();

return(
    <Box className="MarketTemplate">
        <div className="Market">
            메인페이지입니다ㅏ
        </div>
        <div className="AddProduct">
            <button onClick={()=>router.push('/reservation')}>reservation Apge </button>
            <hr/>

            <Resetbtn/>
        </div>
    </Box>
    )
}