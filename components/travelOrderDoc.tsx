import React, { Component, useRef} from "react";
import { styled } from '@mui/material/styles';
import { Button, Grid } from "@mui/material";
import Box, { BoxProps } from '@mui/material/Box';

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { borderBottom, borderRight } from "@mui/system";
import { ThirtyFpsSelect, TransitEnterexit } from "@mui/icons-material";




export default function SampleDoc(props: any) {
    const { printRef } = props;
    //css
    const borderTopLeftBottom = { borderLeft: '3px  solid', borderBottom: '2px solid', padding: '4px', borderTop: "3px solid", fontWeight:"bold"};
    const borderLeftBotom = { borderLeft: '3px  solid', borderBottom: '0.8px  solid', padding: '4px' };
    const textBox = { borderBottom: "0.8px solid", borderLeft: "0.8px solid", paddingTop: "11px", paddingBottom: "11px" }
    
    function ColumncostValue(start: any, end: any, valueIndex: any)
    {
        let Cost = 0
        for(var i=start; i<=end; i++)
        {
            let val = removeComma(document.querySelectorAll("input")[i].value)

            if(i!=valueIndex)
            {
                if(isNaN(parseInt(val))===false)
                {
                    Cost+=parseInt(val)
                }
                else{
                    Cost+=0
                }

            }
        }
        return String(Cost)
    }
    function RowcostValue(Day:any)
    {
        let Total=0
        let RowIndex=[45,52,58,64,70,77,83,90]
        let DayIndex = Day-1
        for(var index of RowIndex)
        {
            let val = removeComma(document.querySelectorAll("input")[index+DayIndex].value)

            if(isNaN(parseInt(val))===false)
            {
                Total += parseInt(val)
            }
            else
            {
                Total+=0
            }
        }
        return String(Total)
    }
    function TotalcostValue()
    {
        let valueIndex = [51,76,89,96]
        let Total=0
        for(var i=0; i<4; i++)
        {
            let val = removeComma(document.querySelectorAll("input")[valueIndex[i]].value)

            if(isNaN(parseInt(val))===false)
            {
                Total += parseInt(val)
            }
            else
            {
                Total+=0
            }
        }
        return String(Total)
    }
    function removeComma(value:any)
    {
        return value.replace(/\,/g,'')
    }
    function setComma(value:any)
    {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g,',')
    }
    const onChangeHandler = (e:any) => {


        //교통비
        document.querySelectorAll("input")[51].value=setComma(ColumncostValue(45,69,51))
        //기타
        document.querySelectorAll("input")[76].value=setComma(ColumncostValue(70,82,76))
        //식비
        document.querySelectorAll("input")[89].value=setComma(ColumncostValue(83,88,89))
        document.querySelectorAll("input")[8].value=setComma(ColumncostValue(83,88,89))
        //숙박비
        document.querySelectorAll("input")[96].value=setComma(ColumncostValue(90,95,96))
        document.querySelectorAll("input")[11].value=setComma(ColumncostValue(90,95,96))
        //일별
        document.querySelectorAll("input")[97].value=setComma(RowcostValue(1))
        document.querySelectorAll("input")[98].value=setComma(RowcostValue(2))
        document.querySelectorAll("input")[99].value=setComma(RowcostValue(3))
        document.querySelectorAll("input")[100].value=setComma(RowcostValue(4))
        document.querySelectorAll("input")[101].value=setComma(RowcostValue(5))
        document.querySelectorAll("input")[102].value=setComma(RowcostValue(6))
        //총합
        document.querySelectorAll("input")[103].value=setComma(TotalcostValue())
        document.querySelectorAll("input")[15].value=setComma(TotalcostValue())+"원 정"
    }
    const onBlurHandler = (e:any) => {
        for(var i=45; i<document.querySelectorAll("input").length-1; i++)
        {
            document.querySelectorAll("input")[i].value = setComma(document.querySelectorAll("input")[i].value)
        }
        //e.target.value=setComma(e.target.value)
    }
    const onFocusHandler = (e:any) => {
        e.target.value=removeComma(e.target.value)
    }
    const onKeydownHandler = (e:any) => {
        if(e.key==="Enter" || e.key==="Escape")
        {
            e.target.blur()
        }
    }
    function TextInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text" onChange={onChangeHandler} onBlur={onBlurHandler} onFocus={onFocusHandler} onKeyDown={onKeydownHandler}
             style={{ width: '100%', border: '0px', padding: '0px',
            margin: '0px', textAlign: 'center', outline:"none"}}/>
            );
        }
    function ValueInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input tabIndex={-1} type="text" onChange={onChangeHandler} value="0" style={{ width: '100%', border: '0px', padding: '0px', margin: '0px',
            textAlign: 'center', fontWeight:"bold", outline:"none"}}/>
            );
        }
    function TotalInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input tabIndex={-1} type="text" onChange={onChangeHandler} value="0원 정" style={{ display:"flex", border: '0px', padding: '0px', marginTop: '2px',
             fontSize:"1.5rem", fontWeight:"bold", fontFamily:"BatangChe", textAlign:"center", outline:"none"}}/>
            );
        }
    function CostValue(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text" onChange={onChangeHandler} style={{border: '0px', padding: '0px', marginTop: '2px',
             fontSize:"1.1rem", fontWeight:"bold", fontFamily:"BatangChe", textAlign:"right", width:"140px", outline:"none"}}/>
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
                    fontSize: '0.875rem',
                    fontWeight: '350',
                    ...sx,
                }}
                {...other}
            />
        );
    }

    function CustomCalendar(props: BoxProps): JSX.Element {

        const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
        const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());
        const [termDate, setTermDate] = React.useState(1);
        const datePickIcon = useRef();

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
                        inputFormat="YYYY. MM. DD"

                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box
                                sx={{
                                    width: '95px', display: 'flex', alignItems: 'center', marginRight: '10px',
                                    button: { width: "100px", height: '40px', left: "-100px", borderRadius: '10px' }
                                }}>
                                <input
                                    disabled
                                    style={{ border: '0px', fontSize: '0.875rem', fontFamily:"BatangChe", textAlign:"center", width:"90px"}}
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
                        inputFormat="YYYY. MM. DD"

                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box
                                sx={{
                                    width: '90px', display: 'flex', alignItems: 'center', marginLeft: '15px', marginRight: "10px",
                                    button: { width: "100px", height: '40px', left: "-157px", borderRadius: '10px', marginLeft: '55px'}
                                }}>
                                <input
                                    disabled={true}
                                    style={{ border: '0px', fontSize: '0.875rem', fontFamily:"BatangChe", width:"90px"}}
                                    ref={inputRef} {...inputProps} />
                                {InputProps?.endAdornment}
                            </Box>
                        )} />
                </LocalizationProvider>
                <span >({termDate}日)</span>
            </Box>
        );
    }


    return (
        <div
            ref={printRef}

            style={{ width: '100%', paddingTop:"35px", paddingLeft:"57px"}}>
            <Box
                sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gridTemplateRows: 'repeat(2, 30px)',
                    width:"680px",
                    gap: 0,
                    border: "3px solid",
                    borderTop: "0px",
                    borderLeft: "0px",
                    fontFamily: "BatangChe"
                }}

            >
                <Item sx={{
                    fontSize: '1.7rem', gridColumn: 'span 4', gridRow: '1/4', paddingTop: '20px',
                    borderBottom: '0.8px solid', letterSpacing: "17px", fontWeight: "bold", paddingBottom:"20px"
                }}>출장명령서</Item>
                <Item sx={borderTopLeftBottom}>담당자</Item>
                <Item sx={borderTopLeftBottom}>팀장</Item>
                <Item sx={borderTopLeftBottom}>중역</Item>
                <Item sx={borderTopLeftBottom}>사장</Item>

                <Item sx={{ borderLeft: '3px  solid' }}></Item>
                <Item sx={{ borderLeft: '3px  solid' }}></Item>
                <Item sx={{ borderLeft: '3px  solid' }}></Item>
                <Item sx={{ borderLeft: '3px  solid' }}></Item>

                <Item sx={borderLeftBotom}></Item>
                <Item sx={borderLeftBotom}></Item>
                <Item sx={borderLeftBotom}></Item>
                <Item sx={borderLeftBotom}></Item>

                <Item sx={{
                    paddingTop: '11px', letterSpacing: "3px",paddingLeft:"10px",
                    fontWeight: "bold", borderLeft: "3px  solid", borderTop: "2.2px solid"
                }}>
                    출장자</Item>
                <Item sx={{ borderLeft: '0.8px solid', paddingTop: '11px', fontWeight: "bold", borderTop: "2.2px solid" }}>성 명</Item>
                <Item sx={{ borderLeft: '0.8px solid', paddingTop: '11px', borderTop: "2.2px solid" }}><TextInput/></Item>
                <Item sx={{ borderLeft: '0.8px solid', paddingTop: '11px', fontWeight: "bold", borderTop: "2.2px solid" }}>소 속</Item>
                <Item sx={{ borderLeft: '0.8px solid', paddingTop: '11px', gridColumn: 'span 2', borderTop: "2.2px solid" }}><TextInput /></Item>
                <Item sx={{ borderLeft: '0.8px solid', paddingTop: '11px', fontWeight: "bold", borderTop: "2.2px solid" }}>직 위</Item>
                <Item sx={{ borderLeft: '0.8px solid', paddingTop: '11px', borderTop: "2.2px solid" }}><TextInput /></Item>


                <Item sx={{
                    borderTop: '0.8px solid', paddingTop: '20px', paddingBottom: '20px', letterSpacing: "1px",
                    fontWeight: "bold", borderLeft: "3px  solid"
                }}>출장목적</Item>
                <Item sx={{ gridColumn: "span 7", borderTop: '0.8px solid', paddingTop: '20px', paddingBottom: '20px', borderLeft: "0.8px solid" }}><TextInput /></Item>

                <Item sx={{
                    borderTop: '0.8px solid', paddingTop: '11px', paddingBottom: '11px',
                    letterSpacing: "1px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>출장기간</Item>
                <Item sx={{ gridColumn: "span 7", borderLeft: "0.8px solid", borderTop: '0.8px solid', paddingTop: '11px', paddingBottom: '11px' }}><CustomCalendar /></Item>

                <Item sx={{
                    paddingLeft: "10px", borderTop: '0.8px solid', paddingTop: '11px', paddingBottom: '11px',
                    letterSpacing: "3px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>도착지</Item>
                <Item sx={{ gridColumn: "span 4", borderLeft: "0.8px solid", borderTop: '0.8px solid', paddingTop: '11px', paddingBottom: '11px' }}><TextInput /></Item>

                <Item sx={{
                    paddingLeft: "10px", borderLeft: "0.8px solid", borderTop: '0.8px solid', paddingTop: '11px',
                    paddingBottom: '11px', letterSpacing: "3px", fontWeight: "bold"
                }}>교통편</Item>
                <Item sx={{ gridColumn: "span 2", borderLeft: "0.8px solid", borderTop: '0.8px solid', paddingTop: '11px', paddingBottom: '11px' }}><TextInput /></Item>

                <Item sx={{
                    borderTop: '0.8px solid', gridRow: "span 8", letterSpacing: "3px", paddingLeft: "11px", paddingRight: "11px",
                    paddingTop: "60px", paddingBottom: "60px", fontWeight: "bold", borderLeft: "3px  solid", borderBottom:"0.8px solid"
                }}>
                    여비 계산서
                </Item>

                <Item sx={{
                    borderTop: "0.8px solid", borderBottom: "0.8px solid", letterSpacing: "3px", paddingTop: "11px",
                    paddingBottom: "11px", paddingLeft: "10px", gridRow: "span 2", fontWeight: "bold", borderLeft: "0.8px solid"
                }}>식비</Item>
                <Item sx={{
                    borderLeft: "0.8px solid", borderTop: "0.8px solid", borderBottom: "0.8px solid",
                    paddingTop: "11px", paddingBottom: "11px", gridColumn: "span 3", gridRow: "span 2"
                }}>
                    <ValueInput /></Item>

                <Item sx={{
                    borderTop: "0.8px solid", borderBottom: "0.8px solid", borderLeft: "0.8px solid",
                    gridRow: "span 4", paddingTop: "34px", paddingBottom: "30px", paddingLeft: "10px", letterSpacing: "3px", fontWeight: "bold"
                }}>
                    교통비</Item>

                <Item sx={{
                    borderLeft: "0.8px solid", borderBottom: "0.8px solid", letterSpacing: "1px",
                    borderTop: "0.8px solid", paddingTop: "0px", paddingBottom: "0px"
                }}>버스</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", borderTop: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", letterSpacing: "1px", paddingTop: "0px", paddingBottom: "0px" }}>주차</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", letterSpacing: "3px", paddingTop: "15px",
                    paddingBottom: "11px", gridRow: "span 2", fontWeight: "bold", paddingLeft: "10px", borderLeft: "0.8px solid"
                }}>숙박료</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "15px", paddingBottom: "11px", gridRow: "span 2" }}><ValueInput /></Item>
                <Item sx={{
                    borderLeft: "0.8px solid", borderBottom: "0.8px solid", letterSpacing: "3px",
                    paddingTop: "15px", paddingBottom: "11px", gridRow: "span 2", fontWeight: "bold", paddingLeft: "10px"
                }}>기타</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "15px", paddingBottom: "11px", gridRow: "span 2" }}><TextInput /></Item>

                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", letterSpacing: "1px", paddingTop: "0px", paddingBottom: "0px" }}>택시</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", letterSpacing: "1px", paddingTop: "0px", paddingBottom: "0px" }}>KTX</Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>

                <Item sx={{
                    gridRow: "span 4", borderBottom: "0.8px solid", paddingTop: "30px",
                    paddingBottom: "20px", fontSize: "1.3rem", fontWeight: "bold", borderLeft: "0.8px solid"
                }}>일금</Item>
                <Item sx={{ gridRow: "span 4", gridColumn: "span 3", borderBottom: "0.8px solid",
                paddingTop: "29px", paddingBottom: "17px", fontSize: "1.3rem", textAlign:"right", fontWeight:"bold" }}><TotalInput/></Item>

                <Item sx={{ gridRow: "span 2", fontSize: "1.1rem", paddingBottom: "0px", paddingTop: "13px", fontWeight: "bold" }}>(￦카드</Item>
                <Item sx={{ gridRow: "span 2", gridColumn: "span 2", paddingTop: "14px",
                fontWeight: "bold", fontSize: "1.1rem", textAlign:"right" }}><CostValue/>)</Item>

                <Item sx={{ gridRow: "span 2", fontSize: "1.1rem", paddingTop: "0px", paddingBottom:"15px", borderBottom: "0.8px solid", fontWeight: "bold" }}>(￦현금</Item>
                <Item sx={{ gridRow: "span 2", gridColumn: "span 2", paddingTop: "0px", paddingBottom:"13px",
                borderBottom: "0.8px solid", fontWeight: "bold", fontSize: "1.1rem", textAlign:"right"}}><CostValue/>)</Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px",
                    paddingBottom: "11px", letterSpacing: "3px", paddingLeft: "10px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>날짜</Item>

                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", borderLeft: "0.8px solid", paddingTop: "11px", paddingBottom: "11px",
                    letterSpacing: "3px", paddingLeft: "10px", fontWeight: "bold"
                }}>합계</Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px", letterSpacing: "3px",
                    paddingLeft: "10px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>출발지</Item>

                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px", letterSpacing: "3px",
                    paddingLeft: "10px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>경유지</Item>

                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px", letterSpacing: "3px",
                    paddingLeft: "10px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>도착지</Item>

                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "35px", paddingBottom: "35px", letterSpacing: "3px",
                    paddingLeft: "10px", gridRow: "span 4", fontWeight: "bold", borderLeft: "3px  solid"
                }}>교통비</Item>

                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput/></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{
                    borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "35px", paddingBottom: "35px",
                    letterSpacing: "3px", paddingLeft: "10px", gridRow: "span 4"
                }}><ValueInput/></Item>

                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>

                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>

                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px", letterSpacing: "3px",
                    paddingLeft: "10px", gridRow: "span 2", fontWeight: "bold", borderLeft: "3px  solid"
                }}>기타</Item>

                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>

                <Item sx={{
                    borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px",
                    letterSpacing: "3px", paddingLeft: "10px", gridRow: "span 2"
                }}><ValueInput /></Item>

                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>
                <Item sx={{ borderLeft: "0.8px solid", borderBottom: "0.8px solid", paddingTop: "0px", paddingBottom: "0px" }}><TextInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px", letterSpacing: "3px",
                    paddingLeft: "10px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>식비</Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px", letterSpacing: "3px",
                    paddingLeft: "10px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>숙박비</Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><TextInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>

                <Item sx={{
                    borderBottom: "0.8px solid", paddingTop: "11px", paddingBottom: "11px", letterSpacing: "3px",
                    paddingLeft: "10px", fontWeight: "bold", borderLeft: "3px  solid"
                }}>합계</Item>
                <Item sx={textBox}><ValueInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>
                <Item sx={textBox}><ValueInput /></Item>

                <Item sx={{ gridColumn: "span 8", paddingTop: "55px", paddingBottom: "55px", paddingLeft: "50px", paddingRight: "50px", borderLeft: "3px  solid" }}><TextInput /></Item>

            </Box>
        </div>
    )
}