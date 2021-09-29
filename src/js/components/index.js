// @ts-check
import { UTILS } from '../../const.js';

// custom components
import Header from './macro/Header.js';
import Footer from './macro/Footer.js';
import Main from './macro/Main.js';
import NotfoundPage from './macro/NotfoundPage.js';
import Mock from './macro/Mock.js';
import DetailAnime from './macro/DetailAnime.js';
import Loading from './macro/Loading.js';
import SimpleCard from './macro/SimpleCard.js';
import XListAnime from './macro/XListAnime.js';
import XCardsHeader from './macro/XCardsHeader.js';
import MainTitle from './macro/MainTitle.js';
import Homepage from './macro/Homepage.js';

import SearchForm from './macro/afSearchanime/SearchForm.js';
import Asd from './macro/afSearchanime/Asd.js';
import SearchAnimeResult from './macro/afSearchanime/SearchAnimeResult.js';

// import SearchAnime from './macro/search_comp/SearchAnime.js';
// import SearchForm from './macro/search_comp/SearchForm.js';

// list of component
const elements = [
  NotfoundPage,
  Header,
  Footer,
  Main,
  Mock,
  DetailAnime,
  Loading,
  SimpleCard,
  XListAnime,
  XCardsHeader,
  MainTitle,
  Homepage,
  SearchForm,
  Asd,
  SearchAnimeResult,
];

// tag suffix
const af = UTILS.APP_PREFIX_SHORT;

// create all custom elements
elements.forEach((element) => {
  customElements.define(`${af}-${element.name.toLowerCase()}`, element);
});
