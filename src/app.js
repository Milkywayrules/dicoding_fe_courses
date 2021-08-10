// @ts-check
// import regeneratorRuntime from 'regenerator-runtime';
import './assets/css/main.css';
import regeneratorRuntime from 'regenerator-runtime';
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

searchForm.onsubmit = async (ev) => {
  ev.preventDefault();
  const searchField = ev.target[0];

  const val = searchField.value;

  if (val) {
    const { hasError, payload, from } = await handleSearchAnime(val);
    // we know that this kin dof request always give us SearchAnimePayload
    // so we cast it here using JSDocs, not TS.
    const payloadData = /** @type {SearchAnimePayload} */ (payload.data);

    payloadData.Page.media.forEach((x) => {
      console.log(`${x.title.english} \n ${x.title.native}`);
    });
  }
};
