import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './loader.module.css';

import { Grid } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={style.spinner}>
      <Grid color="#00BFFF" height={200} width={200} />
    </div>
  );
};

export default Loader;
