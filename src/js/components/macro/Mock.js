// @ts-check

import router from '../../../router';
import handleFetchAnime from '../../handlers/handleMock';
import prettierResponse from '../../handlers/prettierResponse';
import detailAnime from '../../schema/queries/detailAnime';
import searchAnime from '../../schema/queries/searchAnime';
import useFetchDataLoader from '../../utils/useFetchDataLoader';

/**
 *
 * describe_something_here
 *
 */
export default class Mock extends HTMLElement {
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

    // @ts-ignore
    if (ev.target.children['search'].value.length > 0) {
      // @ts-ignore
      const keyword = ev.target.children['search'].value;

      const pushUri = `/search`;

      history.pushState(null, '', `${pushUri}?k=${keyword}`);
      await router.render({
        pathname: pushUri,
        search: keyword,
        hash: `from:animefinder:${this.localName}`, // identifier for redirectfrom or direct access the next component
      });

      // @ts-ignore
    } else if (ev.target.children['search-id'].value.length > 0) {
      // @ts-ignore
      const searchIDVal = parseInt(ev.target.children['search-id'].value);

      const pushUri = `/anime/${searchIDVal}`;

      history.pushState(null, '', `${pushUri}`);
      await router.render({
        pathname: pushUri,
        search: searchIDVal.toString(),
        hash: `from:animefinder:${this.localName}|state:(mediaID=${searchIDVal})`, // identifier for redirectfrom or direct access the next component
      });
    } else {
      console.log('gabener inputnya');
    }
  }

  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {
    this.render();
    // add event listener here
    this.addEventListener('submit', this.handleSubmit);
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
  <form>
    <label for="asd">Search keyword</label>
    <br>
    <input id="asd" type="text" name="search" autofocus />
    <button style="color: white;" type="submit">Sumbit</button>
    <br>
    <br>
    <label for="zxc">Search by ID</label>
    <br>
    <input id="zxc" type="text" name="search-id" />
    <button style="color: white;" type="submit">Sumbit</button>
  </form>
`;
