// @ts-check

import prettierResponse from '../../handlers/prettierResponse';
import topPopularAnime from '../../schema/queries/topPopularAnime';
import topTrendingAnime from '../../schema/queries/topTrendingAnime';
import useFetchDataLoader from '../../utils/useFetchDataLoader';

/**
 *
 * describe_something_here
 *
 */
export default class XListAnime extends HTMLElement {
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
    console.log('connected X (horizontal) list anime');
    // render loading
    this.render(true);

    /** @type {number} */
    const perPage = 20;

    /** @type {string} */
    let processID;

    /** @type {object} */
    let variables = {};

    /** @type {QueryStructure} */
    let dataToFetch;

    switch (this.type) {
      case 'top-trending':
        console.log('connected topTrending');
        //
        processID = 'top-trending';
        // variable define
        variables = {
          sort: 'TRENDING_DESC',
          page: 1,
          perPage: perPage,
        };
        //
        dataToFetch = topTrendingAnime;
        break;

      case 'top-popular':
        console.log('connected topPopular');
        //
        processID = 'top-popular';
        // variable define
        variables = {
          sort: 'POPULARITY_DESC',
          page: 1,
          perPage: perPage,
        };
        //
        dataToFetch = topPopularAnime;
        break;

      default:
        break;
    }

    try {
      // fetch data and render the component
      (async () => {
        // then fetch data and render the actual data
        const rawRes = await useFetchDataLoader(dataToFetch, variables);

        if (rawRes.hasError) return;

        const res = prettierResponse(rawRes);

        // @ts-ignore
        this.render(false, res.data.Page.media, processID);
      })();
    } catch (err) {
      console.log(err);
    }

    // if (this.type === 'top-trending') {
    //   console.log('connected topTrending');
    //   // variable define
    //   const variables = {
    //     sort: 'TRENDING_DESC',
    //     page: 1,
    //     perPage: perPage,
    //   };
    //   // fetch data and render the component
    //   (async () => {
    //     // then fetch data and render the actual data
    //     const rawRes = await useFetchDataLoader(topTrendingAnime, variables);
    //     const res = prettierResponse(rawRes);

    //     // @ts-ignore
    //     this.render(false, res.data.Page.media, 'top-trending');
    //   })();
    // } else if (this.type === 'top-popular') {
    //   console.log('connected topPopular');
    //   // variable define
    //   const variables = {
    //     sort: 'POPULARITY_DESC',
    //     page: 1,
    //     perPage: perPage,
    //   };
    //   // fetch data and render the component
    //   (async () => {
    //     // then fetch data and render the actual data
    //     try {
    //       const rawRes = await useFetchDataLoader(topPopularAnime, variables);
    //       const res = prettierResponse(rawRes);

    //       console.log(rawRes);
    //       console.log(res);
    //     } finally {
    //       // @ts-ignore
    //       this.render(false, res.data.Page.media, 'top-popular');
    //     }
    //   })();
    // }
  }

  get type() {
    return this.getAttribute('type');
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
  render(isLoading = false, data = null, id = null) {
    if (isLoading) this.innerHTML = '<af-loading></af-loading>';
    else this.innerHTML = htmlTemplate(data, id);
  }

  // Called every time the element is removed from the DOM.
  // Useful for running clean up code.
  disconnectedCallback() {}
}

// ------------------------------------------ Custom vars & props -------

const props = {};

// ------------------------------------------------ HTML template -------

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
    <div id="${id}" class="cards-x">
      ${injectedHtml}
    </div>
  `;
};
