// @ts-check

/**
 *
 * describe_something_here
 *
 */
export default class Asd extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    console.log('layout');
    console.log(this);
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldVal, newVal) {}

  render() {
    this.innerHTML = htmlTemplate;
  }

  disconnectedCallback() {}
}

// ------------------------------------------------ HTML template -------

const htmlTemplate = `
<af-searchanime></af-searchanime>
`;
