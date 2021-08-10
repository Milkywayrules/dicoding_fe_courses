export default class CustomHTMLElement extends HTMLElement {
  /**
   * @param {String} stringHTML string contain HTML structure
   */
  constructor(stringHTML) {
    super();
    this._innerHTML = stringHTML;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this._innerHTML;
  }
}
