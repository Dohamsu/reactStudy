import React, { Component, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import { Button, Grid } from "@mui/material";
import Box, { BoxProps } from '@mui/material/Box';

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getJSDocOverrideTagNoCache } from "typescript";
import { numericFormatter } from "react-number-format";


let endCostIndex = 113;
let endTotalIndex = 125;
let lineLength = 8;
let lineNumArr: number[]=[]
let NewLineIndex = 0;
export default function CashFile(props: any) {
    const { printRef } = props;
    const [LineNum, setLineNum] = useState('')
    
    const onFocusHandler = (e:any) => {
        let value = e.target.value
        e.target.value = value.replace(/\,/g,"")
    }
    const onBlurHandler = (e:any) => {
        let value = e.target.value
        e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g,',')
    }
    const onKeyDownHandler = (e:any) => {
        if(e.key==="Enter" || e.key==="Escape")
        {
            e.target.blur()
        }
    }
    const CardNumFocusHandler = (e:any) => {
        let value = e.target.value
        e.target.value = value.replace(/\-/g,"")
    }
    const CardNumBlurHandler = (e:any) => {
        let value = e.target.value
        e.target.value = value.replace(/\B(?=(\d{4})+(?!\d))/g,'-')
    }
    const LineAddHandler = () => {
        endCostIndex+=13
        endTotalIndex+=13
        lineLength++
        setLineNum(String(lineLength))
        lineNumArr.push(NewLineIndex)
        NewLineIndex+=14
    }
    
    const NewLine = lineNumArr.map((val) => {
        return (
            <>
                <Item key={val} sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted"}}><LeftTextInput/></Item>
                <Item key={val+=2} sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=3} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=4} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=5} sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=6} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=7} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=8} sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=9} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=10} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=11} sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=12} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item key={val+=13} sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>
            </>
        )
    })

    const LineRemoveHandler = () => {
        if(lineLength>8)
        {
            endCostIndex-=13
            endTotalIndex-=13
            lineLength--
            setLineNum(String(lineLength))
            lineNumArr.pop()
            NewLineIndex-=14
        }
    }
    const onChangeHandler = () => {
        let costArr = AddCostText();
        let value = 0
        for(var i=0; i<costArr.length; i++)
        {
            if(isNaN(parseInt(costArr[i]))===false)
            {
                value += parseInt(costArr[i])
            }
            
        }


        let valueText = String(value)
        let valueArr: string[]=[]
        for(var valueNum=0; valueNum<valueText.length; valueNum++)
        {
            if(valueText==='0')
            {
                valueArr.push('')
            }
            else valueArr.push(valueText.substr(valueNum,1))
        }


        //console.log(valueArr.length)
        let totalIndex = valueArr.length-1
        arrInit()
        for(var arrNum=0; arrNum<valueArr.length; arrNum++)
        {

            document.querySelectorAll("input")[endTotalIndex-totalIndex].value=valueArr[arrNum]
            totalIndex--
        }
    }

    function arrInit()
    {
        for(var i=endTotalIndex; i>=endTotalIndex-11; i--)
        {
            document.querySelectorAll("input")[i].value=''
        }
    }

    function AddCostText()
    {
        let startNum = 11
        let endNum = 22
        let textSum: string[]=[]
        for(var arr=0; arr<lineLength; arr++)
        {
            textSum.push('')
        }
             
        for(var line=0; line<lineLength; line++)
        {
            for(var i=startNum; i<=endNum; i++)
            {
                let val = document.querySelectorAll("input")[i].value
                textSum[line] += val
            }
            startNum+=13
            endNum+=13
        }
        console.log(textSum)

        return textSum
    }

    function TextInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text"
            onKeyDown={onKeyDownHandler} onChange={onChangeHandler}
            style={{ width: '100%', border: '0px', padding: '0px', margin: '0px', textAlign: 'center', outline:"none"}} />
        );
    }

    function LeftTextInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text"
            onKeyDown={onKeyDownHandler}
            style={{ width: '100%', border: '0px', padding: '0px', margin: '0px', textAlign: 'left', letterSpacing: '5px', outline:"none" }} />
        );
    }

    function DateInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text"
            onKeyDown={onKeyDownHandler}
            style={{ width: '100%', border: '0px', padding: '0px', margin: '0px', textAlign: 'right', letterSpacing: '5px', fontWeight:"bold", outline:"none" }} />
        );
    }

    function CostInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text"
            onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}
            style={{ width: '100%', border: '0px', padding: '0px', margin: '0px', textAlign: 'right', letterSpacing: '5px', outline:"none" }} />
        );
    }

    function CardNumInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text"
            onKeyDown={onKeyDownHandler} onFocus={CardNumFocusHandler} onBlur={CardNumBlurHandler}
            style={{ width: '100%', border: '0px', padding: '0px', margin: '0px', textAlign: 'center', letterSpacing: '2px', fontSize:"14px", fontWeight:"bold", outline:"none"}} />
        );
    }

    function Item(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <Box
                sx={{
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : '#000000'),
                    border: '0px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.800' : '#000000',
                    p: 1,
                    borderRadius: 0,
                    textAlign: 'center',
                    fontSize: '0.775rem',
                    fontWeight: 'bold',
                    ...sx,
                }}
                {...other}
            />
        );
    }

    function CheckBox(props:BoxProps){
        return (
            <input type="checkBox" style={{display:"inline-flex", position:"relative", top:"4px"}}/>
        )
    }

    function AddLineButton(props:BoxProps){
        return (
            <button onClick={LineAddHandler}>라인 추가</button>
        )
    }
    function RemoveLineButton(props:BoxProps){
        return (
            <button onClick={LineRemoveHandler}>라인 삭제</button>
        )
    }

    function CustomCalendar(props: BoxProps): JSX.Element {

        const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
        const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());
        const [termDate, setTermDate] = React.useState(1);
        const datePickIcon = useRef();

        //휴가일 계산
        const calTermDate = (newValue: dayjs.Dayjs | null, isStart: boolean) => {
            if (!newValue || !endDate || !startDate) {
                return false;
            }

            if (isStart) {
                if (endDate.diff(newValue, "d") < 0) {
                    alert("날짜 범위를 확인해주세요.");
                    return false;
                }
                setTermDate(endDate.diff(newValue, "d") + 1);
                return true;
            } else {
                if (newValue.diff(startDate, "d") < 0) {
                    alert("날짜 범위를 확인해주세요.");
                    return false;
                }
                setTermDate(newValue.diff(startDate, "d") + 1);
                return true;
            }
        }
        return (
            <Box className="dateInline"
                ref={datePickIcon}
                sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0px solid black',
                    svg: { display: 'none' }
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        views={['day']}
                        value={startDate}
                        onChange={(newValue) => {
                            async function setValue() {
                                try {
                                    const res = await new Promise((resolve, reject) => {
                                        if (calTermDate(newValue, true)) {
                                            resolve(100);
                                        } else {
                                            reject(200);
                                        }
                                        resolve(newValue);
                                    });
                                    setStartDate(newValue);
                                } catch (result) {
                                    console.log("reject: ", result);
                                }
                            }
                            setValue();

                        }}
                        inputFormat="YYYY 년  MM 월 DD일"

                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box
                                sx={{
                                    width: '120px', display: 'flex', alignItems: 'center', marginRight: '10px',
                                    button: { width: "130px", height: '40px', left: "-160px", borderRadius: '10px' }
                                }}>
                                <input
                                    disabled
                                    style={{ border: '0px', fontSize: '0.875rem' }}
                                    ref={inputRef} {...inputProps} />
                                {InputProps?.endAdornment}

                            </Box>
                        )} />
                </LocalizationProvider>
                <span>~</span>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker

                        views={['day']}
                        value={endDate}
                        onChange={(newValue2) => {
                            async function setValue() {
                                try {
                                    const res = await new Promise((resolve, reject) => {
                                        if (calTermDate(newValue2, false)) {
                                            resolve(100);
                                        } else {
                                            reject(200);
                                        }
                                        resolve(newValue2);
                                    });
                                    setEndDate(newValue2);
                                } catch (result) {
                                    console.log("reject: ", result);
                                }
                            }
                            setValue();
                        }}
                        inputFormat="YYYY 년  MM 월 DD일"

                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box
                                sx={{
                                    width: '120px', display: 'flex', alignItems: 'center', marginLeft: '10px',
                                    button: { width: "130px", height: '40px', left: "-160px", borderRadius: '10px' }
                                }}>
                                <input
                                    disabled={true}
                                    style={{ border: '0px', fontSize: '0.875rem' }}
                                    ref={inputRef} {...inputProps} />
                                {InputProps?.endAdornment}
                            </Box>
                        )} />
                </LocalizationProvider>
                <span>({termDate} 일간)</span>
            </Box>
        );
    }



    return (
        <div
            ref={printRef}

            style={{ width: '100%', padding: '75px' }}>
            <Box
                sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    gridTemplateColumns: 'repeat(27, 1fr)',
                    gridTemplateRows: 'repeat(3, 30px)',
                    gap: 0
                }}

            >
                <Item sx={{ gridColumn: "span 27", gridRow: "1/4", fontSize: "24pt",
                letterSpacing: "25px", paddingTop: "15px", paddingBottom: "11px", paddingLeft:"27px" }}>지출결의서</Item>
                

                <Item sx={{ gridRow: "span 3", gridColumn: "span 17" }}></Item>

                <Item sx={{ gridRow: "span 3", borderLeft: "2px solid", borderBottom: "2px solid",
                borderTop: "2px solid", paddingTop: "20px", paddingBottom: "20px" }}>결재</Item>
                <Item sx={{
                    gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "0.8px solid",
                    borderTop: "2px solid", paddingTop: "5px", paddingBottom: "0px", letterSpacing: "8px", paddingLeft: "15px"
                }}>담당</Item>
                <Item sx={{
                    gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "0.8px solid", borderTop: "2px solid",
                    paddingTop: "5px", paddingBottom: "0px", letterSpacing: "8px", paddingLeft: "15px"
                }}>검토</Item>
                <Item sx={{
                    gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "0.8px solid", borderTop: "2px solid",
                    borderRight: "2px solid", paddingTop: "5px", paddingBottom: "0px", letterSpacing: "8px", paddingLeft: "15px"
                }}>승인</Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid" }}></Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid" }}></Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderRight: "2px solid" }}></Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "2px solid" }}></Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "2px solid" }}></Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "2px solid", borderRight: "2px solid" }}></Item>

                <Item sx={{ gridColumn: "span 27", borderBottom: "2px solid" }}></Item>

                <Item sx={{ gridColumn: "span 3", borderLeft: "2px solid", borderBottom: "0.8px solid", letterSpacing: "3px", paddingLeft: "7px" }}>부서명</Item>
                <Item sx={{ gridColumn: "span 9", borderLeft: "0.8px solid", borderBottom: "0.8px solid" }}><TextInput /></Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "0.8px solid" }}><TextInput /></Item>
                <Item sx={{ gridColumn: "span 12", borderLeft: "0.8px solid", borderBottom: "0.8px solid", borderRight: "2px solid" }}><TextInput /></Item>

                <Item sx={{ gridColumn: "span 3", borderLeft: "2px solid", borderBottom: "0.8px solid", letterSpacing: "10px", paddingLeft: "13px" }}>성명</Item>
                <Item sx={{ gridColumn: "span 9", borderLeft: "0.8px solid", borderBottom: "0.8px solid" }}><TextInput /></Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "0.8px solid" }}>작성일</Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom: "0.8px solid", alignItems: "right" }}><DateInput /></Item>
                <Item sx={{ borderBottom: "0.8px solid", textAlign: "left", paddingLeft: "0px" }}>년</Item>
                <Item sx={{ gridColumn: "span 2", borderBottom: "0.8px solid", alignItems: "right", paddingLeft: "0px" }}><DateInput /></Item>
                <Item sx={{ borderBottom: "0.8px solid", textAlign: "left", paddingLeft: "0px" }}>월</Item>
                <Item sx={{ gridColumn: "span 2", borderBottom: "0.8px solid", alignItems: "right", paddingLeft: "0px" }}><DateInput /></Item>
                <Item sx={{ borderBottom: "0.8px solid", textAlign: "left", paddingLeft: "0px" }}>일</Item>
                <Item sx={{ gridColumn: "span 2", borderBottom: "0.8px solid", borderRight: "2px solid" }}></Item>

                <Item sx={{
                    gridColumn: "span 27", borderLeft: "2px solid", borderBottom: "0.8px solid",
                    borderRight: "2px solid", paddingTop: "20px", paddingBottom: "20px", textAlign:"left", paddingLeft:"15px"
                }}>다음과 같이 지출코자 하오니 재가하여 주시기 바랍니다.</Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "2px solid", borderBottom: "0.8px solid", letterSpacing: "10px", paddingLeft: "13px" }}>금액</Item>
                <Item sx={{ gridColumn: "span 3", borderLeft: "0.8px solid", borderBottom:"0.8px solid"}}>일금</Item>
                <Item sx={{ gridColumn: "span 9", borderBottom:"0.8px solid"}}><CostInput/></Item>
                <Item sx={{ gridColumn: "span 2", borderBottom:"0.8px solid"}}></Item>
                <Item sx={{ gridColumn: "span 7", borderBottom:"0.8px solid"}}></Item>
                <Item sx={{ gridColumn: "span 3", borderBottom:"0.8px solid", borderRight:"2px solid"}}></Item>

                <Item sx={{ gridColumn: "span 3", borderLeft: "2px solid", borderBottom: "0.8px solid", letterSpacing: "10px", paddingLeft: "13px" }}>비목</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom:"0.8px solid"}}></Item>
                <Item sx={{ gridColumn:"span 23", borderBottom:"0.8px solid", borderRight:"2px solid"}}><LeftTextInput/></Item>

                <Item sx={{ gridColumn: "span 3", borderLeft: "2px solid", borderBottom: "0.8px solid"}}>거래처명</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom:"0.8px solid"}}></Item>
                <Item sx={{ gridColumn:"span 23", borderBottom:"0.8px solid", borderRight:"2px solid"}}><LeftTextInput/></Item>

                <Item sx={{ gridColumn:"span 15", backgroundColor:"#999999", borderLeft:"2px solid", borderBottom:"0.8px solid",
                letterSpacing:"100px", paddingLeft:"90px", paddingRight:"0px"}}>적요</Item>
                <Item sx={{ gridColumn:"span 12", backgroundColor:"#999999", borderLeft:"0.8px solid", borderRight:"2px solid",borderBottom:"0.8px solid",
                letterSpacing:"80px", paddingLeft:"90px", paddingRight:"0px"}}>금액</Item>
                
                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted",}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted",}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted",}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted",}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted",}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted",}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted",}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridColumn:"span 15", borderLeft:"2px solid", borderBottom:"0.8px dotted"}}><LeftTextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px dotted", borderRight:"2px solid"}}><TextInput/></Item>
                
                {NewLine}
    
                <Item className="Total" sx={{ gridColumn:"span 15", backgroundColor:"#999999", borderLeft:"2px solid", borderBottom:"0.8px solid",
                letterSpacing:"100px", paddingLeft:"90px", paddingRight:"0px", borderTop:"0.8px solid"}}>합계</Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px solid", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid"}}><TextInput/></Item>
                <Item sx={{borderLeft:"0.8px dotted", borderBottom:"0.8px solid", borderTop:"0.8px solid", borderRight:"2px solid"}}><TextInput/></Item>

                <Item sx={{ gridRow:"span 5", gridColumn:"span 3", borderLeft:"2px solid", paddingLeft:"20px", paddingRight:"20px",
                borderBottom:"2px solid", paddingTop:"57px", paddingBottom:"30px"}}> 결제사항</Item>
                <Item sx={{ gridColumn:"span 24", borderLeft:"0.8px solid", borderRight:"2px solid"}}></Item>

                <Item sx={{ gridColumn:"span 2", borderLeft:"0.8px solid", paddingRight:"0px", paddingTop:"2px"}}>기결제</Item>
                <Item sx={{paddingLeft:"0px", paddingTop:"0px"}}>-</Item>
                <Item sx={{ gridColumn:"span 4", paddingTop:"0px", paddingLeft:"0px", position:"relative", bottom:"3px"}}><CheckBox/> 개인현금</Item>
                <Item sx={{ gridColumn:"span 4", paddingTop:"0px", paddingLeft:"0px", position:"relative", bottom:"3px"}}><CheckBox/> 개인카드</Item>
                <Item sx={{ gridColumn:"span 4", paddingTop:"0px", paddingLeft:"0px", position:"relative", bottom:"3px"}}><CheckBox/> 법인카드</Item>
                <Item sx={{ paddingTop:"2px", paddingLeft:"0px"}}>(</Item>
                <Item sx={{ gridColumn:"span 7", paddingTop:"2px", paddingLeft:"0px", paddingRight:"0px"}}><CardNumInput/></Item>
                <Item sx={{ paddingTop:"2px", paddingRight:"0px", borderRight:"2px solid"}}>)</Item>

                <Item sx={{ gridColumn:"span 2", borderLeft:"0.8px solid", paddingRight:"0px", paddingTop:"2px"}}>미결제</Item>
                <Item sx={{paddingLeft:"0px", paddingTop:"0px"}}>-</Item>
                <Item sx={{ gridColumn:"span 4", paddingTop:"0px", paddingRight:"10px", paddingLeft:"0px", position:"relative", bottom:"3px"}}><CheckBox/> 법인카드</Item>
                <Item sx={{paddingLeft:"0px", paddingTop:"0px"}}>(</Item>
                <Item sx={{ gridColumn:"span 15", paddingTop:"0px", fontSize:"8px"}}><TextInput/></Item>
                <Item sx={{paddingRight:"0px", paddingTop:"0px", borderRight:"2px solid"}}>)</Item>

                <Item sx={{ gridColumn:"span 3", borderLeft:"0.8px solid", paddingRight:"0px", paddingTop:"0px"}}></Item>
                <Item sx={{ gridColumn:"span 4", paddingTop:"0px", paddingRight:"10px", paddingLeft:"0px", position:"relative", bottom:"3px"}}><CheckBox/> 계좌이체</Item>
                <Item sx={{paddingLeft:"0px", paddingTop:"0px"}}>(</Item>
                <Item sx={{ gridColumn:"span 15", paddingTop:"0px"}}><TextInput/></Item>
                <Item sx={{paddingRight:"0px", paddingTop:"0px", borderRight:"2px solid"}}>)</Item>

                <Item sx={{ gridColumn:"span 3", borderLeft:"0.8px solid", paddingRight:"0px", paddingTop:"0px", borderBottom:"2px solid"}}></Item>
                <Item sx={{ gridColumn:"span 4", paddingTop:"0px", paddingRight:"10px", paddingLeft:"0px", borderBottom:"2px solid"}}><CheckBox/> 지로납부</Item>
                <Item sx={{ gridColumn:"span 3", paddingTop:"0px", paddingRight:"10px", paddingLeft:"0px", borderBottom:"2px solid"}}></Item>
                <Item sx={{ gridColumn:"span 5", paddingTop:"0px", paddingRight:"15px", paddingLeft:"0px", borderBottom:"2px solid"}}><CheckBox/> 자동이체</Item>
                <Item sx={{ gridColumn:"span 9", paddingTop:"0px", paddingRight:"10px", paddingLeft:"0px", borderRight:"2px solid", borderBottom:"2px solid"}}></Item>
                
            </Box>

            <AddLineButton/>
            <RemoveLineButton/>
        </div>
    )
}