// @ts-check

import prettierResponse from '../../handlers/prettierResponse';
import searchAnime from '../../schema/queries/searchAnime';
import useFetchDataLoader from '../../utils/useFetchDataLoader';

/**
 *
 * describe_something_here
 *
 */
export default class SearchAnime extends HTMLElement {
  // An instance of the element is created or upgraded.
  // Useful for initializing state, setting up event listeners,
  // or creating a shadow dom. See the spec for restrictions
  // on what you can do in the constructor.
  constructor() {
    super();
  }

  eventHandler1(ev) {}

  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {
    /** @type {import("@vaadin/router")._RouterLocation} */
    this.location;
    const nativeLoc = location;

    /**
     * regex to match:
     * web.id/search?sk=naruTo&k=MATch
     * web.id/search?k=MAT%20ch&asd=striing&k=strSing
     * web.id/search?k=MAT%20ch&asd=striing&k=one%20piece
     * web.id/search?k=one%20piece_MATCH#season?k=edua%20keren
     */
    const kParam = nativeLoc.search.match(/([?&]k\=.[^&\s]+)/i);

    // redirect if the param k= is not provided
    if (!kParam) nativeLoc.assign('/mock');

    /**
     * regex to match keyword param key (?&k=):
     * ?sk=naruTo&k=MATch
     * ?k=MAT%20ch&asd=striing&k=strSing
     * ?k=MAT%20ch&asd=striing&k=one%20piece
     * ?k=one%20piece_MATCH#season?k=edua%20keren
     *
     * and grab the third index which the value from key k
     */
    const keyword = kParam[0].split(/([?&]k\=)/i)[2];

    if (
      (!this.location.hash && !this.location.search) ||
      (!this.location.search && !nativeLoc.search)
    ) {
      console.log('out');
      nativeLoc.assign('/mock');
    }

    // render loading after all validation complete
    this.render(true);

    // then fetch data and render the actual data
    const rawRes = useFetchDataLoader(searchAnime, { search: keyword }).then(
      (rawRes) => {
        const res = prettierResponse(rawRes);

        console.log('redirected: ', res.data);
        this.render();
      },
    );
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
  render(isLoading = false) {
    if (isLoading) this.innerHTML = '<af-loading></af-loading>';
    else this.innerHTML = htmlTemplate();
  }

  // Called every time the element is removed from the DOM.
  // Useful for running clean up code.
  disconnectedCallback() {}
}

// ------------------------------------------ Custom vars & props -------

const props = {};

// ------------------------------------------------ HTML template -------

const htmlTemplate = (props) => `
  <h2>Data loaded...</h2>
`;
