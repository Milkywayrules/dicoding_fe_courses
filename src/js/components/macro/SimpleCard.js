// @ts-check

/**
 *
 * describe_something_here
 *
 */
export default class SimpleCard extends HTMLElement {
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
  }

  get cardType() {
    return this.getAttribute('cardType');
  }

  get contentID() {
    return parseInt(this.getAttribute('contentID'));
  }

  get contentTitle() {
    return this.getAttribute('contentTitle');
  }

  get imgSrc() {
    return this.getAttribute('imgSrc');
  }

  get bgColor() {
    return this.getAttribute('bgColor');
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
    if (this.cardType === 'horizontal') {
      this.innerHTML = xCardHtmlTemplate({
        contentID: this.contentID,
        contentTitle: this.contentTitle,
        imgSrc: this.imgSrc,
        bgColor: this.bgColor,
      });
    } else if (this.cardType === 'vertical') {
      this.innerHTML = yCardHtmlTemplate({
        contentID: this.contentID,
        contentTitle: this.contentTitle,
        imgSrc: this.imgSrc,
        bgColor: this.bgColor,
      });
    }
  }

  // Called every time the element is removed from the DOM.
  // Useful for running clean up code.
  disconnectedCallback() {}
}

// ------------------------------------------ Custom vars & props -------

const props = {};

// ------------------------------------------------ HTML template -------

/**
 * @param {{contentID: number, contentTitle: string, imgSrc: string, bgColor: string}} data
 * @returns {string}
 */
const xCardHtmlTemplate = ({ contentID, contentTitle, imgSrc, bgColor }) => `
  <div class="card-wrapper">
    <a href="/anime/${contentID}">
      <div class="img-wrapper">
        <img
          style="background-color:${bgColor !== 'null' ? bgColor : 'black'};"
          src="${imgSrc}"
          alt="${contentTitle} poster"
          loading=lazy
        />
      </div>
      <div class="content-wrapper">
        <h5 class="title">${contentTitle}</h5>
      </div>
    </a>
  </div>
`;

/**
 * @param {{contentID: number, contentTitle: string, imgSrc: string, bgColor: string}} data
 * @returns {string}
 */
const yCardHtmlTemplate = ({ contentID, contentTitle, imgSrc, bgColor }) => `
  <div class="search-card-wrapper">
    <a href="/anime/${contentID}">
      <div class="img-wrapper">
        <img
          style="background-color:${bgColor !== 'null' ? bgColor : 'black'};"
          src="${imgSrc}"
          alt="${contentTitle} poster"
          loading=lazy
        />
      </div>
      <div class="content-wrapper">
        <h5 class="title">${contentTitle}</h5>
      </div>
    </a>
  </div>
`;
