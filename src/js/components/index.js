// @ts-check
import { UTILS } from '../../const.js';

// custom components
import Header from './macro/Header.js';
import Footer from './macro/Footer.js';
import Main from './macro/Main.js';
import Notfound from './macro/Notfound.js';

// list of component
const elements = [Header, Footer, Main, Notfound];

// tag suffix
const af = UTILS.APP_PREFIX_SHORT;

// create all custom elements
elements.forEach((element) => {
  customElements.define(`${af}-${element.name.toLowerCase()}`, element);
});
