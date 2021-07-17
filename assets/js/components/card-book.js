/**
 * 
 * Create HTML string template to be rendered with filled props.
 * 
 * @param {Object} param0 Filled with props.
 * @returns HTML string template to be rendered.
 */
const cardBookHtmlTemplate = ({ id, title, author, yearPublished }) => (`
<div id="${id}-cardWrapper" class="card__wrapper">
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
  </article>

  <div id="${id}-modal" class="card__modal hidden">
    <ul>
      <li tabindex="0" data-option-id="${id}" name="check-btn">
        <svg class="svg__check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Tandai sudah selesai
      </li>
      <li tabindex="0" data-option-id="${id}" name="edit-btn">
        <svg class="svg__edit" style="padding: 1px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Ubah
      </li>
      <li tabindex="0" data-option-id="${id}" name="delete-btn">
        <svg class="svg__delete" style="padding: 1px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Hapus
      </li>
    </ul>
  </div>
  
  <div class="right__arrow hidden"></div>
  
  <div id="${id}-modal" class="card__modal__mimic hidden" style="width:0; height:0;">
  </div>

</div>

`);

export default cardBookHtmlTemplate;