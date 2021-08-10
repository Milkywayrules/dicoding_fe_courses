// @ts-check
import CustomHTMLElement from './CustomHTMLElement';

export default class Footer extends CustomHTMLElement {
  constructor() {
    super(stringHTML);
  }
}

const stringHTML = `
  <footer>
    <div>
      <p>
        <span> © <span id="copyright-year"></span> - </span>
        <a
          href="https://dioilham.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          @Bushidodev
        </a>
      </p>
    </div>
  </footer>
`;
