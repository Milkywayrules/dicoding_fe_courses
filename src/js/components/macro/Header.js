// @ts-check

/**
 *
 * describe_something_here
 *
 */
export default class Header extends HTMLElement {
  // An instance of the element is created or upgraded.
  // Useful for initializing state, setting up event listeners,
  // or creating a shadow dom. See the spec for restrictions
  // on what you can do in the constructor.
  constructor() {
    super();
    this.render();
    // add event listener here
  }

  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {}

  // Array of attributes to be watched by attributeChangedCallback()
  static get observedAttributes() {
    return [];
  }

  // Called when an observed attribute has been
  // added, removed, updated, or replaced.
  // Also called for initial values when
  // an element is created by the parser, or upgraded.
  // Note: only attributes listed in the observedAttributes property
  // will receive this callback.
  attributeChangedCallback(name, oldVal, newVal) {}

  // Rendering HTML template string defined per component.
  render() {
    this.innerHTML = htmlTemplate;
  }

  // Called every time the element is removed from the DOM.
  // Useful for running clean up code.
  disconnectedCallback() {}
}

// ------------------------------------------ Custom vars & props -------

const props = {};

// ------------------------------------------------ HTML template -------

const htmlTemplate = `
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
