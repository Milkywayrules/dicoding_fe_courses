// @ts-check
import regeneratorRuntime from 'regenerator-runtime';
// import style
import './assets/css/main.css';
// import
import { APP_META_DATA } from './const.js';
import './js/components/custom/_init.js';
import axios from 'axios';
import { SEARCH_ANIME_QUERY } from './js/query';

// main app

const initApp = () => {
  // set today's year to footer
  const appInitYear = APP_META_DATA.APP_INIT_YEAR;
  const currYear = new Date().getFullYear();
  document.getElementById('copyright-year').innerText = (
    appInitYear == currYear ? currYear : `${appInitYear}-${currYear}`
  ).toString();
};

initApp();
