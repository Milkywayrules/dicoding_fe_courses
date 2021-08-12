// @ts-check

/**
 *
 * describe_something_here
 *
 */
export default class Notfound extends HTMLElement {
  // An instance of the element is created or upgraded.
  // Useful for initializing state, setting up event listeners,
  // or creating a shadow dom. See the spec for restrictions
  // on what you can do in the constructor.
  constructor() {
    super();
  }
  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {
    this.render();

    if (this.location.search) {
    }
  }

  // Rendering HTML template string defined per component.
  render() {
    this.innerHTML = htmlTemplate;
  }
}

// ------------------------------------------ Custom vars & props -------

const props = {};

// ------------------------------------------------ HTML template -------

const htmlTemplate = `
  <h1>Not Found.</h1>
`;
