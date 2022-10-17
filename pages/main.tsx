import React, { useRef, Component } from "react";
import { observer, inject } from "mobx-react";
import counterStore from "../stores/CounterStore";
import {useRouter} from 'next/router'
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import SampleDoc from '../components/sampleDoc';
import CashDoc from './cashDoc';
import ReactToPrint from "react-to-print";



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
    const router     = useRouter();
    let componentRef = useRef(null);
    
return(
    <Box className="MarketTemplate">
        <div className="Market">
            샘플
        </div>
        <div         
        style={{ width: '100%', padding:'75px' }}>
            <ReactToPrint
            trigger={() => <Button  variant="contained">인쇄</Button>}
            content={() => componentRef.current}
            />
            {/* <SampleDoc printRef={componentRef} /> */}
            <CashDoc printRef={componentRef} />
        </div>
    </Box>
    )
}