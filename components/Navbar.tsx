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
      <Box sx={{ bottom:0      ,backgroundColor: "white",}}>
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
          <BottomNavigationAction onClick={()=>router.push('/main')} label="Main" icon={<Restore />} />
          <BottomNavigationAction onClick={()=>router.push('/reservation')}label="Reservation" icon={<Favorite />} />
          <BottomNavigationAction onClick={()=>router.push('/signUpPage')}label="SignUp" icon={<LocationOn />} />
        </BottomNavigation>
      </Box>
    );
  }