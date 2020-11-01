import React from 'react';
import styles from './Preloader.module.css';

let Preloader = (props) => {
  return <div className={styles.lds_dual_ring}></div>;
};

export default Preloader;
