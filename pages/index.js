import styles from '../styles/Home.module.css'
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

export default function Home() {
  return (
    <div className={styles.container}>
      <App></App>
    </div>
  )
}
