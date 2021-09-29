// // @ts-check

// import prettierResponse from '../../../handlers/prettierResponse';
// import searchAnime from '../../../schema/queries/searchAnime';
// import useFetchDataLoader from '../../../utils/useFetchDataLoader';

// /**
//  *
//  * describe_something_here
//  *
//  */
// export default class SearchContainer extends HTMLElement {
//   // An instance of the element is created or upgraded.
//   // Useful for initializing state, setting up event listeners,
//   // or creating a shadow dom. See the spec for restrictions
//   // on what you can do in the constructor.
//   constructor() {
//     super();
//     this.testerFunc();
//   }

//   // Called every time the element is inserted into the DOM.
//   // Useful for running setup code, such as fetching resources or rendering.
//   // Generally, you should try to delay work until this time.
//   connectedCallback() {
//     this.testerFunc();
//   }

//   testerFunc() {
//     /** @type {import("@vaadin/router")._RouterLocation} */
//     this.location;
//     const nativeLoc = location;

//     /**
//      * regex to match:
//      * web.id/search?sk=naruTo&k=MATch
//      * web.id/search?k=MAT%20ch&asd=striing&k=strSing
//      * web.id/search?k=MAT%20ch&asd=striing&k=one%20piece
//      * web.id/search?k=one%20piece_MATCH#season?k=edua%20keren
//      */
//     const kParam = nativeLoc.search.match(/([?&]k\=.[^&\s]+)/i); // .search() is ?key=val

//     // redirect if the param k= is not provided
//     if (!kParam) nativeLoc.assign('/');

//     /**
//      * regex to match keyword param key (?&k=):
//      * ?sk=naruTo&k=MATch
//      * ?k=MAT%20ch&asd=striing&k=strSing
//      * ?k=MAT%20ch&asd=striing&k=one%20piece
//      * ?k=one%20piece_MATCH#season?k=edua%20keren
//      *
//      * grab the first k= param
//      * and grab the third index which the value from key k
//      */
//     const keyword = kParam[0].split(/([?&]k\=)/i)[2];

//     // check the hash, we always send a hash if searchform is submitted
//     // check the vaadinLocation.search, always sent too like hash
//     // check the nativeLoc.search, whether searching using searchform or
//     // just copy paste a url with k param in the url
//     // if the combinations fail, kick out u bro, sorry!
//     // (PS. we've done validation on the top, so it should never satisfy this condition)
//     if (this.location) {
//       if (
//         (!this.location.hash && !this.location.search) ||
//         (!this.location.search && !nativeLoc.search)
//       ) {
//         console.log('kicked you out, pardon us ☺');
//         nativeLoc.assign('/');
//       }
//     }

//     this.render(false, keyword, 'asdasdasdsdasdasd');

//     // // remove unnecessary element for this page (maybe this is not a good practice w/ web components)
//     // const appMainTitle = document.querySelector('#app-mainTitle');
//     // const appHomepage = document.querySelector('#app-homepage');
//     // if (appMainTitle) appMainTitle.remove();
//     // if (appHomepage) appHomepage.remove();

//     // render loading after all validation complete
//     // this.render(true);
//     // this.render(true);

//     // try {
//     //   // fetch data and render the component
//     //   (async () => {
//     //     // then fetch data and render the actual data
//     //     const rawRes = await useFetchDataLoader(searchAnime, {
//     //       search: keyword,
//     //     });

//     //     if (rawRes.hasError) return;

//     //     const res = prettierResponse(rawRes);

//     //     // @ts-ignore
//     //     this.render(false, res.data.Page.media, 'search-anime');
//     //   })();
//     // } catch (err) {
//     //   console.log(err);
//     // }
//   }

//   // Rendering HTML template string defined per component.
//   render(isLoading = false, data = null, id = null) {
//     console.log('render: searchContainer');
//     if (isLoading) this.innerHTML = '<af-loading></af-loading>';
//     else this.innerHTML = htmlTemplate(data, id);
//   }

//   // Called every time the element is removed from the DOM.
//   // Useful for running clean up code.
//   disconnectedCallback() {}
// }

// // ------------------------------------------ Custom vars & props -------

// const props = {};

// // ------------------------------------------------ HTML template -------

// const htmlTemplate = (data, id) => `
//   <af-searchform></af-searchform>
//   <af-searchanime datatobefetch=${data}></af-searchanime>
// `;
