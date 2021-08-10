// @ts-check
import CustomHTMLElement from './CustomHTMLElement';

export default class Header extends CustomHTMLElement {
  constructor() {
    super(stringHTML);
  }
}

const stringHTML = `
  <header>
    <div id="header-wrapper">
      <a href="./" id="navbar-logo">D<span>io</span></a>
      <nav>
        <div>
          <a href="https://github.com/Milkywayrules">Github</a>
        </div>
        <div>
          <a href="https://id.linkedin.com/in/dioilham">LinkedIn</a>
        </div>
        <div>
          <a href="https://instagram.com/dioilham">Instagram</a>
        </div>
      </nav>
    </div>
  </header>
`;
