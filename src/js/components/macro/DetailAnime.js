// @ts-check

import prettierResponse from '../../handlers/prettierResponse';
import detailAnime from '../../schema/queries/detailAnime';
import useFetchDataLoader from '../../utils/useFetchDataLoader';

/**
 *
 * describe_something_here
 *
 */
export default class DetailAnime extends HTMLElement {
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

    // @ts-ignore
    const idParam = parseInt(this.location.params.id);

    // redirect if the param /:id is not provided
    if (!idParam) nativeLoc.assign('/mock');

    // render loading after all validation complete
    this.render(true);

    // then fetch data and render the actual data
    const rawRes = useFetchDataLoader(detailAnime, { mediaID: idParam }).then(
      (rawRes) => {
        const res = prettierResponse(rawRes);

        // render not found
        if (res.hasError) this.render(404);

        /** @type {DetailAnimePayload} */
        // @ts-ignore
        const data = res.data;

        const animeTitle = data.Media.title.english.replace(/ /gi, '-');

        const pathnameArr = this.location.pathname.split('/');

        // for replacing url to /anime/:id/:title
        if (!pathnameArr[pathnameArr.length - 1] || pathnameArr.length < 4) {
          history.replaceState(
            null,
            '',
            // and do .replace() for removing multiple slash '///'
            `${this.location.pathname}/${animeTitle}`.replace(/\/{2,}/g, '/'),
          );
        }

        // render not isLoading and pass the data
        // @ts-ignore
        this.render(false, res.data);
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
  /**
   * zzzz
   * @param {(boolean | 404)} isLoading zzz
   * @param {DetailAnimePayload} data zzz
   */
  render(isLoading = false, data = null) {
    if (isLoading) this.innerHTML = loadingHtmlTemplate();
    else this.innerHTML = htmlTemplate(data);
  }

  // Called every time the element is removed from the DOM.
  // Useful for running clean up code.
  disconnectedCallback() {}
}

// ------------------------------------------ Custom vars & props -------

const props = {};

// ------------------------------------------------ HTML template -------

const loadingHtmlTemplate = () => `
  <center><h4>Loading...</h4></center>
`;

/**
 * zz
 * @param {DetailAnimePayload} param0 zz
 * @returns zz
 */
const htmlTemplate = ({ Media }) => `
  <h2>Data loaded...</h2>
  ${console.log(Media.title.english)}
`;
