// @ts-check
import { UTILS } from "../../const.js";
// custom components
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";

// tag prefix
const af = UTILS.APP_PREFIX_SHORT;

// create all custom elements
[Header, Footer, Main].forEach((element) => {
  customElements.define(`${af}-${element.name.toLowerCase()}`, element);
});
