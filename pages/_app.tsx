import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import RootStore from '../stores/rootStore'


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
      <Provider {...this.state.Store}>
          <Component {...pageProps} />
      </Provider>
    );
  }
}