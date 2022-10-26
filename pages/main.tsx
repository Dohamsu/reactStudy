import React, { useRef, Component, useState, useEffect } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Router, useRouter} from 'next/router'
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import DayOffDoc from '../components/dayOffDoc';
import CashDoc from '../components/cashDoc';
import CashDoc2 from '../components/cashDoc2';
import TravelOrderDoc from '../components/travelOrderDoc';
import ReactToPrint from "react-to-print";
import { JsxElement } from "typescript";
import { boxSizing } from "@mui/system";

const drawerWidth = 240;
    
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const navMenu = [{name:"연차신청서",route:"dayOffDoc"},{name:"지출결의서1",route:"cashDoc"},{name:"지출결의서2",route:"cashDoc2"},{name:"출장명령서",route:"travelOrderDoc"}]

  function InnerContainer(data:any):any{
    let  componentRef = useRef<any>([]);
    let  printRef = useRef<any>([]);

    function addInfoLine(){
      if(componentRef.current !=undefined){
        componentRef.current.addInfoLine();
      }
    }

    function delInfoLine(){
      if(componentRef.current !=undefined){
        componentRef.current.delInfoLine();
      }
    }

    switch (data.doc) {
      case 'cashDoc':
        return (
          <div         
          style={{ width: '100%', padding:'0px' }}>
            <Box 
            sx={{paddingBottom:'50px'}}>
            <ReactToPrint
              pageStyle={`@page {\ size: landscape; margin:75px!important\ }\ `}
              trigger={() => <Button  variant="contained">인쇄</Button>}
              content={() => printRef.current}
              documentTitle={"경비청구서"}
            />
            <Button onClick={addInfoLine}>지출 라인 추가</Button>
            <Button onClick={delInfoLine} >지출 라인 삭제</Button>
            </Box>
              <CashDoc printRef={printRef} compoRef={componentRef} />
          </div>
    
          );
        case 'cashDoc2':
          return(
            <div         
              style={{ width: '100%', padding:'0px' }}>
                <ReactToPrint
                pageStyle={`@page { size:  A4; margin:0px!important} `}
                trigger={() => <Button style={{margin:'50px'}}  variant="contained">인쇄</Button>}
                content={() => printRef.current}
                documentTitle={"지출결의서"}
                />
                <CashDoc2  printRef={printRef} compoRef={componentRef} />
            </div>
            );
          break;
          case 'dayOffDoc':
            return(
              <div         
               style={{ width: '100%', padding:'75px' }}>
                  <ReactToPrint
                  pageStyle={`@page { size:  A4; margin:75px!important} `}
                  trigger={() => <Button style={{margin:'50px'}}  variant="contained">인쇄</Button>}
                  content={() => printRef.current}
                  documentTitle={"연차신청서"}
                  />
                  <DayOffDoc  printRef={printRef} compoRef={componentRef} />
              </div>
            );
            break;
            case 'travelOrderDoc':
              return(
              <div         
              style={{ width: '100%', padding:'0px' }}>
                 <ReactToPrint
                 pageStyle={`@page { size:  A4; margin:0px!important} `}
                 trigger={() => <Button style={{margin:'50px'}}  variant="contained">인쇄</Button>}
                 content={() => printRef.current}
                 documentTitle={"연차신청서"}
                 />
                 <TravelOrderDoc  printRef={printRef} compoRef={componentRef} />
              </div>
              );
              break;
                
      default:
        break;
    }
  }
  
  export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const [innerDoc, setInnerDoc] = useState("cashDoc");

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              글로비즈
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {navMenu.map((obj, index) => (
              <ListItem key={"nav"+index}
              onClick={()=>{setInnerDoc(obj.route)}}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index  === 0 ? <DescriptionIcon /> : <RequestQuoteIcon />}
                  </ListItemIcon>
                  <ListItemText primary={obj.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>

          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
              <Box className="MarketTemplate">
        <div className="Market">
        </div>

        <InnerContainer doc={innerDoc}/>
        
    </Box>
        </Main>
      </Box>
    );
  }