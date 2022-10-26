import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import RootStore from '../stores/rootStore'
import NavBar from '../components/Navbar'
import CssBaseline from "@mui/material/CssBaseline";
import Container from '@mui/material/Container';

interface State {
  Store: RootStore;
}

export default class MainContainer extends App < {}, State> {
  state: State = {
    Store: new RootStore()
  };

  render() {
    const { Component, pageProps } = this.props;
    
    return (
      <Container  sx={{height:"100vh" ,width:"100%", margin: "auto", p:1}}>
        <Provider {...this.state.Store}>
          <CssBaseline />
          <div style={{ height:"99vh"}}>
              <Component {...pageProps}/>
          </div>
          {/* <NavBar/> */}
        </Provider>
      </Container>

    );
  }
}