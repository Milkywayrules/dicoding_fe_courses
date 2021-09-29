// @ts-check

/**
 *
 * describe_something_here
 *
 */
export default class MainTitle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = htmlTemplate;
  }

  disconnectedCallback() {}
}

// ------------------------------------------------ HTML template -------

const htmlTemplate = `
  <center>
    <h1>Anime Finder</h1>
    <p>
      Update your anime trend with
      AnimeFinder,&nbsp;easy&nbsp;&&nbsp;fast.
    </p>
  </center>  
`;
