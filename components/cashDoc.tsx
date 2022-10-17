import React, { Component, useRef } from "react";
import { styled } from '@mui/material/styles';
import { Button,Grid } from "@mui/material";
import Box, { BoxProps } from '@mui/material/Box';

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SampleDoc(props: any){
    const { printRef } = props;

    //css
    const borderLeftBotom = {borderLeft:'0.8px solid',borderBottom :'0.8px solid', padding:'4px'};
    const middleTitle = {gridColumn: 'span 1', borderTop:'0.8px solid', paddingTop:'20px',paddingBottom:'20px'};
    const middleContent = {gridColumn: 'span 7', borderLeft:'0.8px solid',paddingTop:'20px',paddingBottom:'20px', borderTop:'0.8px solid'};
        
    function TextInput(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <input type="text" style={{width:'100%', border:'0px', padding:'0px',margin:'0px',textAlign:'center',letterSpacing:'5px'}}/>
        );
      }
    function Item(props: BoxProps) {
        const { sx, ...other } = props;
        return (
          <Box
            sx={{
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
              border: '0px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
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

    function CustomCalendar(props:BoxProps): JSX.Element{

      const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
      const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());
      const [termDate, setTermDate] = React.useState(1);
      const datePickIcon = useRef();
  
      //휴가일 계산
      const calTermDate = (newValue: dayjs.Dayjs | null,isStart :boolean)=>
      {
        if(!newValue|| !endDate|| !startDate){
          return false;
        }
  
        if(isStart){
          if(endDate.diff(newValue, "d") < 0){
            alert("날짜 범위를 확인해주세요.");
            return false;
          }
          setTermDate(endDate.diff(newValue, "d")+1);
          return true;
        }else{
          if(newValue.diff(startDate, "d") < 0){
            alert("날짜 범위를 확인해주세요.");
            return false;
          }
          setTermDate(newValue.diff(startDate, "d")+1);
          return true;
        }
      }
      return (
      <Box className="dateInline" 
      ref={datePickIcon}
      sx={{ display: 'flex', alignItems: 'center',justifyContent:'center', border:'0px solid black',
       svg:{display:'none'}            }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
            views={['day']}
            value={startDate}
            onChange={(newValue) => {
              async function setValue(){
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
              sx={{ width:'120px',display: 'flex', alignItems: 'center',marginRight:'10px',
              button: {width: "130px", height:'40px',left: "-160px",borderRadius:'10px' }
            }}>
                <input
                disabled                       
                style={{border:'0px', fontSize:'0.875rem'}}
                ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
                
              </Box>
            )}/>
      </LocalizationProvider>
      <span>~</span>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
         
            views={['day']}
            value={endDate}
            onChange={(newValue2) => {
              async function setValue(){
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
              sx={{ width:'120px',display: 'flex',alignItems: 'center',marginLeft:'10px',
              button: {width: "130px", height:'40px',left: "-160px",borderRadius:'10px' }
            }}>
                <input    
                disabled={true}                    
                style={{ border:'0px',fontSize:'0.875rem'}}
                ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </Box>
            )}/>
      </LocalizationProvider>
      <span>({termDate} 일간)</span>
      </Box>
      );
    }


    
    return (
        <div 
        ref={printRef}

        style={{ width: '100%', padding:'75px' }}>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(3, 30px)',
            gap: 0,              
            border: '0.8px solid',
          }}
          
        >
          <Item sx={{  fontSize:'2rem',gridColumn: 'span 4', gridRow: '1/4', paddingTop:'25px',borderBottom :'0.8px solid'}}>연 차 신 청 서</Item>
          <Item sx={ borderLeftBotom }>담당</Item>
          <Item sx={ borderLeftBotom }>팀장</Item>
          <Item sx={ borderLeftBotom }>관리</Item>
          <Item sx={ borderLeftBotom }>사장</Item>

          <Item sx={{ borderLeft:'0.8px solid'}}></Item>
          <Item sx={{ borderLeft:'0.8px solid'}}></Item>
          <Item sx={{ borderLeft:'0.8px solid'}}></Item>
          <Item sx={{ borderLeft:'0.8px solid'}}></Item>

          <Item sx={ borderLeftBotom }></Item>
          <Item sx={ borderLeftBotom }></Item>
          <Item sx={ borderLeftBotom }></Item>
          <Item sx={ borderLeftBotom }></Item>

          <Item sx={{ paddingTop:'11px'}}>성 명</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px', gridColumn: 'span 2'}}><TextInput/></Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px'}}>소 속</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px',gridColumn: 'span 2'}}>연구소</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px'}}>직위</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px'}}><TextInput/></Item>


          <Item sx={{ gridColumn: 'span 8', borderTop:'0.8px solid', paddingTop:'40px',paddingBottom:'40px'}}>위의 본인은 아래와 같이 연차를 신청 하오니 허락해 주시기 바랍니다.</Item>
         
          <Item sx={ middleTitle}>연차내역</Item>
          <Item sx={ middleContent }><TextInput/></Item>

          <Item sx={ middleTitle}>연차사유</Item>
          <Item sx={ middleContent }><TextInput/></Item>

          <Item sx={ middleTitle}>연차기간</Item>
          <Item sx={ middleContent }> 
            <CustomCalendar/>
          </Item>
          <Item sx={{ gridColumn: 'span 8', paddingTop:'370px',paddingBottom:'20px',  whiteSpace:'pre-wrap',borderTop:'0.8px solid'}}>{dayjs(new Date()).format('YYYY 년   MM 월  DD 일')}</Item> 
          <Item sx={{ gridColumn: 'span 8', paddingBottom:'80px', whiteSpace:'pre-wrap',textAlign:'right'}}> 
            신청인
            <input placeholder='홍 길 동'style={{border:'0px', marginLeft:'80px',width:'17%',letterSpacing:'10px'}}></input> 
            (인)
          </Item>

        </Box>
      </div>
      )
  }