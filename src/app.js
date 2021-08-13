// @ts-check
// import regeneratorRuntime from 'regenerator-runtime';
import regeneratorRuntime from 'regenerator-runtime';
import './assets/css/main.css';
import './js/components';

// init main app
(async () => {
  console.log('app init');

  // setTimeout(() => {
  //   // history.pushState(null, '', '/anime/21/one-piece////12');
  //   // history.go('/anime/21/one-piece////12');
  //   // history.replaceState(null, '', '/anime/21/one-piece////12');
  //   location.assign('/anime/21/one-piece////12');
  // }, 3000);
  // console.log(location);

  // const query = detailAnime;
  // const variables = { mediaID: 2 };

  // const d = await handleMock({
  //   handlerType: 'DETAIL_ANIME',
  //   query,
  //   variables,
  // });

  // console.log(d);
})();

// // --------------------------------------------------------------------------------

// const searchForm = document.getElementById('search-form');
// const searchField = document.getElementById('search-field');

// const tableNameSearchField = `${UTILS.DB_NAME}:searchField`;

// // @ts-ignore
// searchField.value = sessionStorage.getItem(tableNameSearchField);

// searchField.oninput = (ev) => {
//   sessionStorage.setItem(tableNameSearchField, ev.target.value);
// };

// searchForm.onsubmit = async (ev) => {
//   ev.preventDefault();
//   const searchField = ev.target[0];

//   /**
//    * @type {String}
//    */
//   const val = searchField.value;

//   if (val) {
//     // ini udah bener serius, suka tiba2 muncul error Page masih pertanyaan...
//     const res = await handleSearchAnime(val.toLowerCase().trim());

//     // we know that this kin dof request always give us SearchAnimePayload
//     // so we cast it here using JSDocs, not TS.
//     // const payloadData = /** @type {SearchAnimePayload} */ (payload.data.data);

//     // payloadData.Page.media.forEach((x) => {
//     //   console.log(`${x.id} \n ${x.title.english} \n ${x.title.native}`);
//     // });
//     // console.log(`${payloadData.Page.media.length} results`);
//   }
// };

// // --------------------------------------------------------------------------------

// const searchIDForm = document.getElementById('search-id-form');
// const searchIDField = document.getElementById('search-id-field');

// const tableNameSearchIDField = `${UTILS.DB_NAME}:searchIDField`;

// // @ts-ignore
// searchIDField.value = sessionStorage.getItem(tableNameSearchIDField);

// searchIDField.oninput = (ev) => {
//   sessionStorage.setItem(tableNameSearchIDField, ev.target.value);
// };

// searchIDForm.onsubmit = async (ev) => {
//   ev.preventDefault();
//   const searchIDField = ev.target[0];

//   /**
//    * @type {String}
//    */
//   const ID = searchIDField.value;

//   if (ID) {
//     const res = await handleDetailAnime(parseInt(ID));
//   }
// };
