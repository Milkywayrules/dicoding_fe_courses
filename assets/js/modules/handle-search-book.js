/**
 * 
 * somtehing
 * 
 */
const initSearchBook = () => {
  // get all form tag
  document.querySelectorAll(".search__form").forEach((form) => {
    const id = form.id;
  
    form.onsubmit = (e) => {
      e.preventDefault()
  
      console.log('form submitted');
    }
  })
  
  // get all search box for book
  document.querySelectorAll(".search__box").forEach((box) => {
    const id = box.id;
    const formEl = box.parentElement;
  
    box.onfocus = (e) => {
      formEl.classList.add("ring")
    }
  
    box.onblur = (e) => {
      formEl.classList.remove("ring")
    }
  })
}

export default initSearchBook;