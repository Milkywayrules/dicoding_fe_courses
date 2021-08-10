// @ts-check
// import style
import './assets/css/main.css';
// import
import { APP_META_DATA } from './const';
import './js/components/custom/_init';
import searchAnime from './js/schema/queries/searchAnime';
import handleSearchAnime from './js/utils/handleSearchAnime';

// main app

const initApp = async () => {
  // set today's year to footer
  const appInitYear = APP_META_DATA.APP_INIT_YEAR;
  const currYear = new Date().getFullYear();
  document.getElementById('copyright-year').innerText = (
    appInitYear == currYear ? currYear : `${appInitYear}-${currYear}`
  ).toString();

  const variables = {
    search: 'one piece',
    page: 1,
    perPage: 5,
  };

  const query = searchAnime;

  // const zxc = await handleSearchAnime('one piece');

  // const s = await useFetchAPI(searchAnime.schema, variables);
  // console.log(s);

  // console.log(zxc.);
};

initApp();

const searchForm = document.getElementById('search-form');
const searchField = document.getElementById('search-field');

searchForm.onsubmit = (ev) => {
  ev.preventDefault();
  const searchField = ev.target[0];

  const val = searchField.value;

  if (val) {
    handleSearchAnime(val).then(({ hasError, payload, from }) => {
      /**
       * @type {SearchAnimePayload}
       */
      const asd = payload;
      asd.Page.media.forEach((x) => {
        console.log(`${x.title.english} \n ${x.title.native}`);
      });
    });
  }
};
