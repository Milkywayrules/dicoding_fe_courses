// @ts-check
// import regeneratorRuntime from 'regenerator-runtime';
import regeneratorRuntime from 'regenerator-runtime';
import './assets/css/main.css';
import './js/components/custom/_init';
import { APP_META_DATA, UTILS } from './const';
import searchAnime from './js/schema/queries/searchAnime';
import handleSearchAnime from './js/utils/handleSearchAnime';

// init main app
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
};

initApp();

const searchForm = document.getElementById('search-form');
const searchField = document.getElementById('search-field');

const tableNameSearchField = `${UTILS.DB_NAME}:searchField`;

// @ts-ignore
searchField.value = sessionStorage.getItem(tableNameSearchField);

searchField.oninput = (ev) => {
  sessionStorage.setItem(tableNameSearchField, ev.target.value);
};

searchForm.onsubmit = async (ev) => {
  ev.preventDefault();
  const searchField = ev.target[0];

  /**
   * @type {String}
   */
  const val = searchField.value;

  if (val) {
    // ini udah bener serius, suka tiba2 muncul error Page masih pertanyaan...
    const { hasError, payload, from } = await handleSearchAnime(
      val.toLowerCase(),
    );

    // we know that this kin dof request always give us SearchAnimePayload
    // so we cast it here using JSDocs, not TS.
    const payloadData = /** @type {SearchAnimePayload} */ (payload.data.data);

    payloadData.Page.media.forEach((x) => {
      console.log(`${x.id} \n ${x.title.english} \n ${x.title.native}`);
    });
  }
};
