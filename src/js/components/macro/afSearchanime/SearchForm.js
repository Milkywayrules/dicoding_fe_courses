// @ts-check

import { Router } from '@vaadin/router';
import router from '../../../../router';

/**
 *
 * describe_something_here
 *
 */
export default class SearchForm extends HTMLElement {
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

      Router.go({
        pathname: pushUri,
        search: `?k=${keyword}`,
      });
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

  connectedCallback() {
    this.render();
    // add event listener here
    this.addEventListener('submit', this.handleSubmit); // form submit
    this.addEventListener('input', this.handleInput); // search box input input
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
