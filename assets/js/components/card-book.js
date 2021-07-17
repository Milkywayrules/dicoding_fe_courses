/**
 * 
 * Create HTML string template to be rendered with filled props.
 * 
 * @param {Object} param0 Filled with props.
 * @returns HTML string template to be rendered.
 */
const cardBookHtmlTemplate = ({ id, title, author, yearPublished }) => (`
  <article id="${id}" tabindex="0" class="card">
    <div class="card__content__wrapper">
      <h3 class="card__title">${title}</h3>
      <span>
        <p class="card__author">${author}</p>
        &nbsp;-&nbsp;
        <p class="card__year">${yearPublished}</p>
      </span>
    </div>
    <button id="${id}-option" class="card__option__btn">
      <svg style="width: 20px; height: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </button>
    <div id="${id}-modal">
      asd
    </div>
  </article>

`);

export default cardBookHtmlTemplate;