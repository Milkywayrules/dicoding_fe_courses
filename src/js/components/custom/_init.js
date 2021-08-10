// @ts-check
import { UTILS } from '../../../const.js';

// custom components
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';

// list of component
const elements = [Header, Footer];

// tag suffix
const af = UTILS.APP_PREFIX_SHORT;

// create all custom elements
elements.forEach((element) => {
  customElements.define(`${element.name.toLowerCase()}-${af}`, element);
});
