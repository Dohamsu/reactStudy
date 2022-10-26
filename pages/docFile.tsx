import React,{Component, useRef} from "react";
import { useRouter } from "next/router";
import DocFile from "../components/docFile";
import Button from "@mui/material/Button";
import ReactToPrint from "react-to-print";


export default function docFilePage()
{
    let componentRef = useRef(null)
    const router=useRouter()
    return (
        <div>
            <ReactToPrint
            trigger={() => <Button>인쇄</Button>}
            content={() => componentRef.current}
            />
            <DocFile printRef={componentRef} />
        </div>
    )
}