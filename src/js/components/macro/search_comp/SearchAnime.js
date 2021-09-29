// @ts-check

import prettierResponse from '../../../handlers/prettierResponse';
import searchAnime from '../../../schema/queries/searchAnime';
import useFetchDataLoader from '../../../utils/useFetchDataLoader';

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
    window.onpopstate = () => {
      // do stuff here
      console.log('state changed');
      // this.renderSearchForm();
      this.testerFunc().then((x) => {
        // document.querySelector('af-searchanime').innerHTML = x.data[0].status;
        this.render(x);
      });
    };
  }

  testerFunc() {
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
    const kParam = nativeLoc.search.match(/([?&]k\=.[^&\s]+)/i); // .search() is ?key=val

    // redirect if the param k= is not provided
    if (!kParam) nativeLoc.assign('/');

    /**
     * regex to match keyword param key (?&k=):
     * ?sk=naruTo&k=MATch
     * ?k=MAT%20ch&asd=striing&k=strSing
     * ?k=MAT%20ch&asd=striing&k=one%20piece
     * ?k=one%20piece_MATCH#season?k=edua%20keren
     *
     * grab the first k= param
     * and grab the third index which the value from key k
     */
    const keyword = kParam[0].split(/([?&]k\=)/i)[2];

    // check the hash, we always send a hash if searchform is submitted
    // check the vaadinLocation.search, always sent too like hash
    // check the nativeLoc.search, whether searching using searchform or
    // just copy paste a url with k param in the url
    // if the combinations fail, kick out u bro, sorry!
    // (PS. we've done validation on the top, so it should never satisfy this condition)
    if (this.location) {
      if (
        (!this.location.hash && !this.location.search) ||
        (!this.location.search && !nativeLoc.search)
      ) {
        console.log('kicked you out, pardon us ☺');
        nativeLoc.assign('/');
      }
    }

    // render loading after all validation complete
    this.render({ isLoading: true });

    try {
      // fetch data and render the component
      const z = async () => {
        // then fetch data and render the actual data
        const rawRes = await useFetchDataLoader(searchAnime, {
          search: keyword,
        });

        if (rawRes.hasError) return;

        const res = prettierResponse(rawRes);

        const x = document.querySelector('#app-searchResult');

        if (x) x.remove();

        // document.querySelector('af-searchanime').innerHTML = 'adqwdq';

        const renderData = {
          isLoading: false,
          // @ts-ignore
          data: res.data.Page.media,
          id: 'search-anime',
        };

        this.render(renderData);

        return renderData;
      };
      return z();
    } catch (err) {
      console.log(err);
    }
  }

  handlePushState() {
    window.onpopstate = () => console.log('state');
  }

  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {
    this.testerFunc();
  }

  // Rendering HTML template string defined per component.
  render({ isLoading = false, data = null, id = null }) {
    if (isLoading) this.innerHTML = '<af-loading></af-loading>';
    else this.innerHTML = htmlTemplate(data, id);

    this.renderSearchForm();
  }

  // Rendering HTML template string defined per component.
  renderSearchForm() {
    this.insertAdjacentHTML('afterbegin', searchFormHtmlTemplate);
  }

  // Called every time the element is removed from the DOM.
  // Useful for running clean up code.
  disconnectedCallback() {}
}

// ------------------------------------------------ HTML template -------

const searchFormHtmlTemplate = `
  <section id="app-searchForm">
    <af-searchform></af-searchform>
  </section>
`;

/**
 * @returns {string}
 */
const htmlTemplate = (data, id) => {
  // temp grab the necessary data from graphql res
  const formattedData = data.map((x) => {
    return {
      contentID: x.id,
      imgSrc: x.coverImage.large,
      bgColor: x.coverImage.color,
      contentTitle: {
        romaji: x.title.romaji,
        english: x.title.english,
      },
    };
  });

  let injectedHtml = '';

  formattedData.forEach(
    (item) =>
      (injectedHtml = injectedHtml.concat(
        `<af-simplecard
          cardType="vertical"
          contentID="${item.contentID}"
          contentTitle="${
            item.contentTitle.english
              ? item.contentTitle.english
              : item.contentTitle.romaji
            // ? item.contentTitle.romaji
            // : item.contentTitle.english
          }"
          imgSrc="${item.imgSrc}"
          bgColor="${item.bgColor}"
        ></af-simplecard>`,
      )),
  );

  return `
    <section id="app-searchResult">
      <h2>Search result</h2>
      <div id="${id}" class="search-container">
          ${injectedHtml}
        </div>
    </section>
  `;
};
