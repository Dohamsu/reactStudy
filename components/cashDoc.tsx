import React, { Component, useRef, useState, memo ,forwardRef, useImperativeHandle } from "react";
import Box, { BoxProps } from '@mui/material/Box';
import {NumericFormat} from 'react-number-format';

export default function forwardedRef(props: any){
  const { compoRef,printRef } = props;
  const lineCompoRef = useRef<any>([]);
  
    //css
    const borderLeftBotom = {borderLeft:'0.8px solid',borderBottom :'0.8px solid'};
    const subTitle = {gridColumn:'span 1', borderBottom :'0.8px solid'};
        
    function TextInput(props: any) {
        const { innerText,cashType,style, ...other } = props;
        return (
            <input type="text" name={cashType} value={innerText} style={{width:'100%', border:'0px', padding:'0px',margin:'0px',textAlign:'center',letterSpacing:'1px',...style}}/>
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
    
    function NumberInput(props: any){
      let { innerText, id, readOnly,cashType ,onBlur, onChange, style, ...other } = props;
      if(readOnly!="true"){
        readOnly = false;
      }else{
        readOnly=true;
      }
      return (
           <NumericFormat 
           id={id}
           name={cashType+"_"+id}
           className={cashType}
           onBlur={onBlur}
           readOnly={readOnly}
           onChange={onChange}
           style={{fontSize:'0.575rem',border:'0px', width:'100%',height:'15px',textAlign:'center',...style}}
           value={innerText}
           thousandSeparator="," /> 
      );
    }
          
    //?????? ?????????????????? ?????? ????????? ?????????
     useImperativeHandle(compoRef, () => ({
       addInfoLine, delInfoLine
     }));

    function addInfoLine(){
      if(lineCompoRef.current !=undefined){
        lineCompoRef.current.addInfoLine();
      }
    }

    function delInfoLine(){
      if(lineCompoRef.current !=undefined){
        lineCompoRef.current.delInfoLine();
      }
    }
    
    const LineComponent = forwardRef((props, ref)=>{
      const [totalArray, setTotalArray] = useState({cashTraffic: 0,cashOil:0, cashPark:0, cashFood:0, cashSleep:0,cashTaxi:0 ,cashTotal:0});
      const [lineInfo, setLines] = useState([
        { id: 0, cashTraffic: 0,cashOil:0, cashPark:0, cashFood:0, cashSleep:0,cashTaxi:0 },
        { id: 1, cashTraffic: 0,cashOil:0, cashPark:0, cashFood:0, cashSleep:0,cashTaxi:0 },
      ]);
      const [indexId, setIndexId] = useState(2);
      
        //?????? ?????????????????? ?????? ????????? ?????????
        useImperativeHandle(ref, () => ({
          addInfoLine, delInfoLine
        }));

          function addInfoLine(){
            const nextLines = lineInfo.concat({
              id: indexId,
              cashTraffic: 0,
              cashOil:0, 
              cashPark:0, 
              cashFood:0, 
              cashSleep:0,
              cashTaxi:0 
            });
            setIndexId(indexId + 1);
            setLines(nextLines);
            calTotal(nextLines,true);
          }
          function delInfoLine(){
            const nextLines = lineInfo.slice(0,indexId-1);
            setIndexId(indexId - 1);
            setLines(nextLines);
            calTotal(nextLines,true);
          }

      function calTotal(data: any[], isData:boolean) {  
        let tempTotal = {cashTraffic: 0,cashOil:0, cashPark:0, cashFood:0, cashSleep:0,cashTaxi:0,cashTotal:0 };
        let totalCash =  0;
        if(isData){
          data.forEach((element: { cashTraffic: any; cashOil: any; cashPark: any; cashFood: any; cashSleep: any; cashTaxi: any; }) => {
            tempTotal.cashTraffic += Number(String(element.cashTraffic).replaceAll(',',''));
            tempTotal.cashOil += Number(String(element.cashOil).replaceAll(',',''));
            tempTotal.cashPark += Number(String(element.cashPark).replaceAll(',',''));
            tempTotal.cashFood += Number(String(element.cashFood).replaceAll(',',''));
            tempTotal.cashSleep += Number(String(element.cashSleep).replaceAll(',',''));
            tempTotal.cashTaxi += Number(String(element.cashTaxi).replaceAll(',',''));
          });
        }else{
          lineInfo.forEach(element => {
            tempTotal.cashTraffic += Number(String(element.cashTraffic).replaceAll(',',''));
            tempTotal.cashOil += Number(String(element.cashOil).replaceAll(',',''));
            tempTotal.cashPark += Number(String(element.cashPark).replaceAll(',',''));
            tempTotal.cashFood += Number(String(element.cashFood).replaceAll(',',''));
            tempTotal.cashSleep += Number(String(element.cashSleep).replaceAll(',',''));
            tempTotal.cashTaxi += Number(String(element.cashTaxi).replaceAll(',',''));
          });
        }

        for (const key in tempTotal) {
          totalCash += tempTotal[key as keyof typeof tempTotal];
        }
        tempTotal.cashTotal= totalCash;
        setTotalArray(tempTotal);        
      }

      function onchange(e:any) {
        let id:number = Number(e.target.id);
        let name :string = e.target.name;
        let value  = e.target.value.replace(/(^0+)/, "");

        switch(name.split("_")[0]){
          case "cashTraffic":  lineInfo[id].cashTraffic = value;
          break; 
          case "cashOil":  lineInfo[id].cashOil = value;
          break; 
          case "cashPark":  lineInfo[id].cashPark = value;
          break; 
          case "cashFood":  lineInfo[id].cashFood = value;
          break; 
          case "cashSleep":  lineInfo[id].cashSleep = value;
          break; 
          case "cashTaxi":  lineInfo[id].cashTaxi = value;
          break; 
        }  
      }

      function PaddingLine(props: any){
        const {index} = props;
        if(index == 8|| index== 29){
          return (
            <div
            style={{gridColumn:'span 10',paddingTop:'55px'}}
            >
            </div>
       );
        }else{
          return (
               <div>
                
               </div>
          );
        }
      }

      const lineList: JSX.Element[] = lineInfo.map((obj,index) => 
      <div
        key={"lineInfo"+index}
      >
        <Box 
            sx={{display: 'grid',gridAutoFlow: 'row',gridTemplateColumns: 'repeat(10, 1fr)',gridTemplateRows: 'repeat(, 30px)',
            gap: 0,
            border: '0.8px solid'
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
            <Item sx={{borderLeft:'0.8px solid'}}><TextInput /></Item>
            <Item sx={{borderLeft:'0.8px solid'}}><TextInput /></Item>
          </Box>
            <Item sx={{borderLeft:'0.8px solid'}}><NumberInput onChange={onchange} onBlur={calTotal} id={obj.id} cashType='cashTraffic' innerText={obj.cashTraffic}/></Item>
            <Item sx={{borderLeft:'0.8px solid'}}><NumberInput onChange={onchange} onBlur={calTotal} id={obj.id} cashType='cashOil' innerText={obj.cashOil}/></Item>
            <Item sx={{borderLeft:'0.8px solid'}}><NumberInput onChange={onchange} onBlur={calTotal} id={obj.id} cashType='cashPark' innerText={obj.cashPark}/></Item>
            <Item sx={{borderLeft:'0.8px solid'}}><NumberInput onChange={onchange} onBlur={calTotal} id={obj.id} cashType='cashFood' innerText={obj.cashFood}/></Item>
            <Item sx={{borderLeft:'0.8px solid'}}><NumberInput onChange={onchange} onBlur={calTotal} id={obj.id} cashType='cashSleep' innerText={obj.cashSleep}/></Item>
            <Item sx={{borderLeft:'0.8px solid'}}><NumberInput onChange={onchange} onBlur={calTotal} id={obj.id} cashType='cashTaxi' innerText={obj.cashTaxi}/></Item>
          </Box>
          <PaddingLine index={obj.id}/>
      </div>
      );

      const totalList =      
      <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: 'repeat(2, 30px)',
            gap: 0,              
            border: '0.8px solid',
            borderBottom:'0.8px solid'
          }}          
        >
        <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}>??????</Item>
        <Item sx={borderLeftBotom}><NumberInput readOnly='true' innerText={totalArray.cashTraffic}/></Item>
        <Item sx={borderLeftBotom}><NumberInput readOnly='true' innerText={totalArray.cashOil}/></Item>
        <Item sx={borderLeftBotom}><NumberInput readOnly='true' innerText={totalArray.cashPark}/></Item>
        <Item sx={borderLeftBotom}><NumberInput readOnly='true' innerText={totalArray.cashFood}/></Item>
        <Item sx={borderLeftBotom}><NumberInput readOnly='true' innerText={totalArray.cashSleep}/></Item>
        <Item sx={borderLeftBotom}><NumberInput readOnly='true' innerText={totalArray.cashTaxi}/></Item>
        <Item sx={{gridColumn:'span 4', fontWeight:'bold'}}>??????</Item>
        <Item sx={{ borderLeft:'0.8px solid',gridColumn:'span 6', textAlign:'center'}}>
        <NumericFormat 
           readOnly={true}
           prefix="??? "
           style={{fontSize:'1.2rem',border:'0px', width:'100%',height:'15px',textAlign:'center'}}
           value={totalArray.cashTotal}
           thousandSeparator="," /> 
        </Item>
         
      </Box>

      return (
          <div>
            {lineList}
            {totalList}
          </div>
      );
    });

    return (
        <div 
        ref={printRef}
        style={{ width: '100%' }}>
         {/* <Button onClick={addInfoLine}>?????? ??????</Button>
         <Button onClick={delInfoLine}>?????? ??????</Button> */}
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
          <Item sx={subTitle}>????????????</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}>-</Item>
          <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}>???.??????????? ??????</Item>
          <Item sx={{gridColumn:'span 1', borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>?????????</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>????????? ?????? </Item>
          <Item sx={subTitle}>????????????</Item>
          <Item sx={{ gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}> -</Item>
          <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}>?????.??????????????????????</Item>

          <Item sx={{gridColumn:'span 1', borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>????????????</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>?????? ??? </Item>
          <Item sx={subTitle}>-</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}><TextInput style={{fontSize:'0.8rem',letterSpacing:'5px'}}/></Item>
          <Item sx={{gridColumn:'span 4', borderBottom :'0.8px solid'}}>?????.???????? ????????????</Item>
          <Item sx={{gridColumn:'span 1', borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>??????</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid',backgroundColor:'rgb(191 191 191)'}}>?????? </Item>
          <Item sx={subTitle}>?????????</Item>
          <Item sx={{gridColumn:'span 3', borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}><TextInput style={{fontSize:'0.8rem',letterSpacing:'5px'}}/> </Item>

          <Item sx={{  display:'flex',alignItems:'center',justifyContent:'center', fontWeight:'bold',
                      fontSize:'1.55rem',gridColumnStart:'5', gridColumnEnd:'11',gridRow: '1/11',
                      paddingTop:'20px',borderLeft:'0.8px solid',borderBottom :'0.8px solid'}}>
            ??????(??????,?????????)???????????_??2022????? 
            <TextInput style={{width:'30px',fontSize:'1.5rem', fontWeight:'bold'}}/>
            ???
          </Item>
          <Box
            sx={{display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 33px)'}}          
          >
            <Item sx={{ borderBottom :'0.8px solid'}}>???</Item>
            <Item sx={{ borderBottom :'0.8px solid',borderLeft:'0.8px solid'}}>???</Item>
          </Box>
          <Box
            sx={{
            gridColumn:'span 3', display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 33px)' }}          
          >              
            <Item sx={borderLeftBotom}>????????????</Item>
            <Item sx={borderLeftBotom}>????????????,????????????</Item>
          </Box>
          <Item sx={borderLeftBotom}>?????????</Item>
          <Item sx={borderLeftBotom}>?????????</Item>
          <Item sx={borderLeftBotom}>??????,???????????</Item>
          <Item sx={borderLeftBotom}>??????</Item>
          <Item sx={borderLeftBotom}>?????????</Item>
          <Item sx={borderLeftBotom}>?????????</Item>
          </Box>

          <LineComponent ref={lineCompoRef}/>
        
      </div>
      )
  }