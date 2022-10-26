import React,{Component, useRef} from "react";
import { useRouter } from "next/router";
import CashFile from "../components/cashFile";
import Button from "@mui/material/Button";
import ReactToPrint from "react-to-print";


export default function CashFilePage()
{
    let componentRef = useRef(null)
    const router=useRouter()
    return (
        <div>
            <ReactToPrint
            trigger={() => <Button>인쇄</Button>}
            content={() => componentRef.current}
            />
            <CashFile printRef={componentRef} />
        </div>
    )
}