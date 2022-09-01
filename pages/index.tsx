import styles from '../styles/Home.module.css'
import  React ,{useState}from 'react';
import Main from './main';

import {Provider} from 'mobx-react'
import RootStore from '../stores/rootStore'

const rootStore = new RootStore();

export default function Home() {

  return (
      <Main/>
  );
}