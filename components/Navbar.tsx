import React, { Component } from "react";
import Box from '@mui/material/Box';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Restore,Favorite,LocationOn,Face } from '@mui/icons-material';
import {useRouter} from 'next/router';


export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const router = useRouter();

    return (
      <Box sx={{ width:'100%',bottom:0,position:'fixed',backgroundColor: "white",}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{height:"7vh"
          ,backgroundColor: "white",
        }}
        >
          <BottomNavigationAction onClick={()=>router.push('/main')} label="연차신청서" icon={<Restore />} />
          <BottomNavigationAction onClick={()=>router.push('/cashDoc')}label="지출결의서" icon={<Favorite />} />
          <BottomNavigationAction onClick={()=>router.push('/signUpPage')}label="연차신청서" icon={<LocationOn />} />
        </BottomNavigation>
      </Box>
    );
  }