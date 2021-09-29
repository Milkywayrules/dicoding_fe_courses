// @ts-check

/**
 *
 * describe_something_here
 *
 */
export default class SearchAnimeResult extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    console.log('result');
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
<div>
  <h1>babi</h1>
  <h1>asdassd</h1>
</div>
`;
