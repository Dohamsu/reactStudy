import React, { Component, useRef } from "react";
import Box, { BoxProps } from '@mui/material/Box';
import {NumericFormat} from 'react-number-format';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';

import ReactToPrint from "react-to-print";

export default function SampleDoc(props: any){
    const { printRef } = props;

    const { trafficCash} = props;
    const lineCount = useRef(0); //입력 라인 수 

    //css
    const borderLeftBotom = {borderLeft:'0.8px solid',borderBottom :'0.8px solid'};
    const subTitle = {gridColumn:'span 1', borderBottom :'0.8px solid'};
    const middleContent = {gridColumn: 'span 7', borderLeft:'0.8px solid',paddingTop:'20px',paddingBottom:'20px', borderTop:'0.8px solid'};
        
    function TextInput(props: any) {
        const { style, ...other } = props;
        return (
            <input type="text" style={{width:'100%', border:'0px', padding:'0px',margin:'0px',textAlign:'center',letterSpacing:'1px',...style}}/>
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
              fontSize: '0.675rem',
              fontWeight: '350',
              ...sx,
            }}
            {...other}
          />
        );
    }
    
    function NumberInput(){
      return (
           <NumericFormat 
           style={{fontSize:'0.575rem',border:'0px', width:'100%',height:'15px',textAlign:'center'}}
           thousandSeparator="," /> 
      );
    }

    function addInfoLine(){
      lineCount.current++;    
      console.log(lineCount.current); 

    }

    function LineComponent(){
      return (
        
        <Box
          sx={{display: 'grid',gridAutoFlow: 'row',gridTemplateColumns: 'repeat(10, 1fr)',gridTemplateRows: 'repeat(, 30px)',
            gap: 0,border: '0.8px solid',borderTop:'0px'
          }}          
        >
          <Box
            sx={{display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 33px)'}}          
          >
            <Item sx={{}}><TextInput/></Item>
            <Item sx={{ borderLeft:'0.8px solid'}}><TextInput/></Item>
          </Box>
          <Box
            sx={{gridColumn:'span 3', display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 33px)' }}>              
             <Item sx={{borderLeft:'0.8px solid'}}><TextInput/></Item>
             <Item sx={{borderLeft:'0.8px solid'}}><TextInput/></Item>
          </Box>
          <Item sx={{borderLeft:'0.8px solid'}}><NumberInput/></Item>
          <Item sx={{borderLeft:'0.8px solid'}}><NumberInput/></Item>
          <Item sx={{borderLeft:'0.8px solid'}}><NumberInput/></Item>
          <Item sx={{borderLeft:'0.8px solid'}}><NumberInput/></Item>
          <Item sx={{borderLeft:'0.8px solid'}}><NumberInput/></Item>
          <Item sx={{borderLeft:'0.8px solid'}}><NumberInput/></Item>
          </Box>
      );
    }


    return (
        <div 
        ref={printRef}
        style={{ width: '100%', padding:'75px' }}>

        <Button onClick={addInfoLine}>
          버튼
        </Button>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: 'repeat(10, 30px)',
            gap: 0,              
            border: '0.8px solid',
            borderBottom:'0px'
          }}          
        >
          <Item sx={subTitle}>귀속년도</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}>-</Item>
          <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}>Ⅰ. 사업장 사항</Item>
          <Item sx={{gridColumn:'span 1', borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>회사명</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>사업자 번호 </Item>
          <Item sx={subTitle}>글로비즈</Item>
          <Item sx={{ gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}> -</Item>
          <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}> Ⅱ. 직원 인적사항</Item>

          <Item sx={{gridColumn:'span 1', borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>사원코드</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>사원 명 </Item>
          <Item sx={subTitle}>-</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}><TextInput style={{fontSize:'1rem',letterSpacing:'5px'}}/></Item>
          <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}> Ⅲ. 직원 인적사항</Item>
          <Item sx={{gridColumn:'span 1', borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>부서</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>직위 </Item>
          <Item sx={subTitle}>연구부</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}>연구원 </Item>


          <Item sx={{  display:'flex',alignItems:'center',justifyContent:'center',
                      fontWeight:'bold',
                      fontSize:'1.55rem',gridColumnStart:'5', gridColumnEnd:'11',gridRow: '1/11',
                      paddingTop:'20px',borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}>
            경비(여비,교통비)청구서 _ 2022년 8월
          </Item>
          <Box
            sx={{display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 33px)'}}          
          >
            <Item sx={{ borderBottom :'0.8px solid'}}>월</Item>
            <Item sx={{ borderBottom :'0.8px solid',borderLeft:'0.8px solid'}}>일</Item>
          </Box>
          <Box
            sx={{
            gridColumn:'span 3', display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 33px)' }}          
          >              
            <Item sx={borderLeftBotom}>거래처명</Item>
            <Item sx={borderLeftBotom}>처리업무,지출내용</Item>
          </Box>
          <Item sx={borderLeftBotom}>교통비</Item>
          <Item sx={borderLeftBotom}>주유비</Item>
          <Item sx={borderLeftBotom}>통행, 주차료</Item>
          <Item sx={borderLeftBotom}>식대</Item>
          <Item sx={borderLeftBotom}>숙박비</Item>
          <Item sx={borderLeftBotom}>택시비</Item>
          </Box>
          <LineComponent/>
          <LineComponent/>

          <Box>
         {/* start */}
          {/* <Box
            sx={{
              display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 33px)',
            }}
          >
            <Item sx={{ borderBottom :'0.8px solid'}}><TextInput/></Item>
            <Item sx={{ borderBottom :'0.8px solid',borderLeft:'0.8px solid'}}><TextInput/></Item>
          </Box>

          <Box
            sx={{
              gridColumn:'span 3',display: 'grid',gridAutoFlow: 'row',gridTemplateColumns: 'repeat(2, 1fr)',gridTemplateRows: 'repeat(1, 33px)',
            }}          
          >              
            <Item sx={borderLeftBotom}><TextInput/></Item>
            <Item sx={borderLeftBotom}><TextInput/></Item>
          </Box>

          <Item sx={borderLeftBotom}><NumberInput/></Item>
          <Item sx={borderLeftBotom}><NumberInput/></Item>
          <Item sx={borderLeftBotom}><NumberInput /></Item>
          <Item sx={borderLeftBotom}><NumberInput/></Item>
          <Item sx={borderLeftBotom}><NumberInput/></Item>
          <Item sx={borderLeftBotom}><NumberInput/></Item> */}
        {/* END */}

          <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}>합계</Item>
          <Item sx={borderLeftBotom}></Item>
          <Item sx={borderLeftBotom}></Item>
          <Item sx={borderLeftBotom}></Item>
          <Item sx={borderLeftBotom}></Item>
          <Item sx={borderLeftBotom}></Item>
          <Item sx={borderLeftBotom}></Item>


          <Item sx={{gridColumn:'span 4'}}>총액</Item>
          <Item sx={{ borderLeft:'0.8px solid',gridColumn:'span 6'}}></Item>
        </Box>
      </div>
      )
  }