// @ts-check

import { Router } from '@vaadin/router';
import router from '../../../../router';

/**
 *
 * describe_something_here
 *
 */
export default class SearchForm extends HTMLElement {
  // An instance of the element is created or upgraded.
  // Useful for initializing state, setting up event listeners,
  // or creating a shadow dom. See the spec for restrictions
  // on what you can do in the constructor.
  constructor() {
    super();
  }

  /**
   *
   * @param {Event} ev
   */
  async handleSubmit(ev) {
    ev.preventDefault();

    const keyword = ev.target['search-box'].value;

    // @ts-ignore
    if (keyword.length > 1) {
      const pushUri = `/search`;

      const appSearchResult = document.querySelector('#app-searchResult');

      // if (appSearchResult) appSearchResult.remove();

      Router.go({
        pathname: pushUri,
        search: `?k=${keyword}`,
        // hash: `from:animefinder:${this.localName}`, // identifier for redirectfrom or direct access the next component
      });

      // history.pushState(null, '', `${pushUri}?k=${keyword}`);
      // await router.render({
      //   pathname: pushUri,
      //   search: keyword,
      //   hash: `from:animefinder:${this.localName}`, // identifier for redirectfrom or direct access the next component
      // });
    } else if (keyword.length <= 1) {
      if (!this.querySelector('#search-error')) {
        this.insertAdjacentHTML(
          'beforeend',
          '<small id="search-error" style="color:var(--red-300);">Input char should be greater than 1</small>',
        );
      }
    } else {
      console.log('something wrong');
    }
  }

  handleInput(ev) {
    if (ev.target.value.length > 1) {
      // remove error msg when user start typing
      if (this.querySelector('#search-error'))
        this.querySelector('#search-error').remove();
    }
  }

  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {
    this.render();
    // add event listener here
    this.addEventListener('submit', this.handleSubmit); // form submit
    this.addEventListener('input', this.handleInput); // search box input input
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

const props = {};

// ------------------------------------------------ HTML template -------

const htmlTemplate = `
  <h2>Browse your fav Anime</h2>
  <form class="search-form" style="margin-bottom:4px;">
    <input
      type="search"
      name="search-box"
      class="search-box"
      placeholder="Search by anime title"
      autocomplete="off"
      autofocus
    />
    <button type="submit" class="search-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          style="stroke-width: 3px"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </form>
`;
