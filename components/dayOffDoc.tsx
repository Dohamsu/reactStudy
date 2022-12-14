import React, { Component, useRef } from "react";
import { styled } from '@mui/material/styles';
import { Button,Grid } from "@mui/material";
import Box, { BoxProps } from '@mui/material/Box';

import dayjs, { Dayjs } from 'dayjs';
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
  
      //????????? ??????
      const calTermDate = (newValue: dayjs.Dayjs | null,isStart :boolean)=>
      {
        if(!newValue|| !endDate|| !startDate){
          return false;
        }
  
        if(isStart){
          if(endDate.diff(newValue, "d") < 0){
            alert("?????? ????????? ??????????????????.");
            return false;
          }
          setTermDate(endDate.diff(newValue, "d")+1);
          return true;
        }else{
          if(newValue.diff(startDate, "d") < 0){
            alert("?????? ????????? ??????????????????.");
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
            inputFormat="YYYY ???  MM ??? DD???"

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
            inputFormat="YYYY ???  MM ??? DD???"

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
      <span>({termDate} ??????)</span>
      </Box>
      );
    }


    
    return (
        <div 
        ref={printRef}

        style={{ width: '100%' }}>
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
          <Item sx={{  fontSize:'2rem',gridColumn: 'span 4', gridRow: '1/4', paddingTop:'25px',borderBottom :'0.8px solid'}}>??? ??? ??? ??? ???</Item>
          <Item sx={ borderLeftBotom }>??????</Item>
          <Item sx={ borderLeftBotom }>??????</Item>
          <Item sx={ borderLeftBotom }>??????</Item>
          <Item sx={ borderLeftBotom }>??????</Item>

          <Item sx={{ borderLeft:'0.8px solid'}}></Item>
          <Item sx={{ borderLeft:'0.8px solid'}}></Item>
          <Item sx={{ borderLeft:'0.8px solid'}}></Item>
          <Item sx={{ borderLeft:'0.8px solid'}}></Item>

          <Item sx={ borderLeftBotom }></Item>
          <Item sx={ borderLeftBotom }></Item>
          <Item sx={ borderLeftBotom }></Item>
          <Item sx={ borderLeftBotom }></Item>

          <Item sx={{ paddingTop:'11px'}}>??? ???</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px', gridColumn: 'span 2'}}><TextInput/></Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px'}}>??? ???</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px',gridColumn: 'span 2'}}>?????????</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px'}}>??????</Item>
          <Item sx={{ borderLeft:'0.8px solid', paddingTop:'11px'}}><TextInput/></Item>


          <Item sx={{ gridColumn: 'span 8', borderTop:'0.8px solid', paddingTop:'40px',paddingBottom:'40px'}}>?????? ????????? ????????? ?????? ????????? ?????? ????????? ????????? ????????? ????????????.</Item>
         
          <Item sx={ middleTitle}>????????????</Item>
          <Item sx={ middleContent }><TextInput/></Item>

          <Item sx={ middleTitle}>????????????</Item>
          <Item sx={ middleContent }><TextInput/></Item>

          <Item sx={ middleTitle}>????????????</Item>
          <Item sx={ middleContent }> 
            <CustomCalendar/>
          </Item>
          <Item sx={{ gridColumn: 'span 8', paddingTop:'370px',paddingBottom:'20px',  whiteSpace:'pre-wrap',borderTop:'0.8px solid'}}>{dayjs(new Date()).format('YYYY ???   MM ???  DD ???')}</Item> 
          <Item sx={{ gridColumn: 'span 8', paddingBottom:'80px', whiteSpace:'pre-wrap',textAlign:'right'}}> 
            ?????????
            <input placeholder='??? ??? ???'style={{border:'0px', marginLeft:'80px',width:'17%',letterSpacing:'10px'}}></input> 
            (???)
          </Item>

        </Box>
      </div>
      )
  }