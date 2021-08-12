// @ts-check
import { APP_META_DATA } from '../../../const';

/**
 *
 * describe_something_here
 *
 */
export default class Footer extends HTMLElement {
  // An instance of the element is created or upgraded.
  // Useful for initializing state, setting up event listeners,
  // or creating a shadow dom. See the spec for restrictions
  // on what you can do in the constructor.
  constructor() {
    super();
  }

  handleClick(ev) {
    console.log('footer clicked');
  }

  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {
    this.render();
    // add event listener here
    this.addEventListener('click', this.handleClick);
  }

  static get properties() {
    return {
      // ...
      location: Object,
    };
  }

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

const props = {
  appInitYear: APP_META_DATA.APP_INIT_YEAR,
  currYear: new Date().getFullYear(),
  rangeYear: APP_META_DATA.APP_INIT_YEAR.toString(),
};

// then define any other props when needed
props.rangeYear = (
  props.appInitYear == props.currYear
    ? props.currYear
    : `${props.appInitYear}-${props.currYear}`
).toString();

// ------------------------------------------------ HTML template -------

const htmlTemplate = `
  <footer>
    <div>
      <p>
        <span> © <span id="copyright-year">${props.rangeYear}</span> - </span>
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
