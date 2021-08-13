// @ts-check
import { UTILS } from '../../const.js';

// custom components
import Header from './macro/Header.js';
import Footer from './macro/Footer.js';
import Main from './macro/Main.js';
import NotfoundPage from './macro/NotfoundPage.js';
import Mock from './macro/Mock.js';
import SearchAnime from './macro/SearchAnime.js';
import DetailAnime from './macro/DetailAnime.js';

// list of component
const elements = [
  NotfoundPage,
  Header,
  Footer,
  Main,
  Mock,
  SearchAnime,
  DetailAnime,
];

// tag suffix
const af = UTILS.APP_PREFIX_SHORT;

// create all custom elements
elements.forEach((element) => {
  customElements.define(`${af}-${element.name.toLowerCase()}`, element);
});
