/**
 * 
 * use TITLE here as much as possible, not text
 * 
 */
export const toastBasic = Swal.mixin({
  // use TITLE here as much as possible, not text
  showCloseButton: true,
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

/**
 * 
 * use TEXT here as much as possible, not title
 * 
 */
export const toastFullBtn = Swal.mixin({
  // use TEXT here as much as possible, not title
  showCloseButton: true,
  toast: true,
  position: "top-end", // 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
  showConfirmButton: true, // always true, bcs this is fullBtnToast ~_~
  confirmButtonText: "OK",
  buttonsStyling: false, // always false, always need custom style to override the default
  customClass: {
    confirmButton: "rakbuku-swal-fullBtn rakbuku-swal-successButton",
  },
  timer: 15000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});



// export { toastBasic, toastFullBtn }



/**
 * 
 * somtehing
 * 
 * @param {Object} param0 object
 * @returns SweetAlert Mixin
 * 
 */
export const modalEditBook = ({ rowData }) => {
  return Swal.mixin({
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",

    buttonsStyling: false,
    customClass: {
      title: "rakbuku-swal-modal-title",
      popup: "rakbuku-swal-modal-popup",
      actions: "rakbuku-swal-modal-actions",
      htmlContainer: "rakbuku-swal-modal-container",
      confirmButton: "rakbuku-swal-fullBtn rakbuku-swal-confirmBtn mb-2",
      cancelButton: "rakbuku-swal-fullBtn rakbuku-swal-cancelBtn",
    },

    title: 'Perbarui Data Buku',
    html: `
      <label for="input-edit-title" class="rakbuku-swal-label">Judul Buku</label>
      <input id="input-edit-title" class="rakbuku-swal-input" type="text" placeholder="Judul buku" value="${rowData.title}">
  
      <label for="input-edit-author" class="rakbuku-swal-label">Pengarang</label>
      <input id="input-edit-author" class="rakbuku-swal-input" type="text" placeholder="Nama pengarang buku" value="${rowData.author}">
  
      <label for="input-edit-year" class="rakbuku-swal-label">Tahun Terbit</label>
      <input id="input-edit-year" class="rakbuku-swal-input" type="text" placeholder="Tahun terbit" value="${rowData.yearPublished}">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const obj = {};
      obj.title = document.getElementById('input-edit-title').value;
      obj.author = document.getElementById('input-edit-author').value;
      obj.yearPublished = document.getElementById('input-edit-year').value;
  
      // loop through every key and delete key with empty string.
      Object.keys(obj).forEach(key => {
        if (obj[key].length < 1) delete obj[key];
        else obj[key] = obj[key];
      });
  
      return obj;
    },
  });
};


/**
 * 
 * somtehing
 * 
 * @param {Object} param0 object
 * @returns SweetAlert Mixin
 * 
 */
 export const modalAddBook = () => {
  return Swal.mixin({
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",

    buttonsStyling: false,
    customClass: {
      title: "rakbuku-swal-modal-title",
      popup: "rakbuku-swal-modal-popup",
      actions: "rakbuku-swal-modal-actions",
      htmlContainer: "rakbuku-swal-modal-container",
      confirmButton: "rakbuku-swal-fullBtn rakbuku-swal-confirmBtn mb-2",
      cancelButton: "rakbuku-swal-fullBtn rakbuku-swal-cancelBtn",
    },

    title: 'Tambah Buku Baru',
    html: `
      <label for="input-edit-title" class="rakbuku-swal-label">Judul Buku</label>
      <input id="input-edit-title" class="rakbuku-swal-input" type="text" placeholder="77 Cara Menjadi Lebih Produktif" minlength="1" maxlength="100">
  
      <label for="input-edit-author" class="rakbuku-swal-label">Pengarang</label>
      <input id="input-edit-author" class="rakbuku-swal-input" type="text" placeholder="Dio Ilham Djatiadi" minlength="1" maxlength="50">
  
      <label for="input-edit-year" class="rakbuku-swal-label">Tahun Terbit</label>
      <input id="input-edit-year" class="rakbuku-swal-input" type="tel" placeholder="2021" minlength="1" maxlength="4">
    `,
    focusConfirm: false,
    // inputValidator: (value) => {
    //   return new Promise((resolve) => {
    //     console.log(value.author);
    //     if (value213 === 'oranges') {
    //       resolve()
    //     } else {
    //       resolve('You need to select oranges :)')
    //     }
    //   })
    // },
    preConfirm: () => {
      let hasError = false;

      const newData = {
        id: +new Date() + Math.random().toLocaleString() * 10000,
        title: '',
        author: '',
        yearPublished: '',
        isComplete: false,
      };
      newData.title = document.getElementById('input-edit-title').value;
      newData.author = document.getElementById('input-edit-author').value;
      newData.yearPublished = parseInt(document.getElementById('input-edit-year').value);
      
      if (!isNaN(newData.yearPublished)) {
        // loop through every key and delete key with empty string.
        Object.keys(newData).forEach(key => {
          if (newData[key].length < 1) delete newData[key];
          else newData[key] = newData[key];
        });
      } else {
        hasError = true;
      }
      return {newData, hasError};
    },
  });
};


/**
 * 
 * something
 * 
 */
export const modalConfirmation = ({ title, confirmButtonText, cancelButtonText }) => {
  return Swal.mixin({
    title: "Apakah Anda yakin?",
    confirmButtonText: "Ya, yakin",
    cancelButtonText: "Batal",

    showCancelButton: true,
    focusConfirm: false,
    buttonsStyling: false,
    customClass: {
      title: "rakbuku-swal-modal-title",
      popup: "rakbuku-swal-modal-popup",
      actions: "rakbuku-swal-modal-actions",
      htmlContainer: "rakbuku-swal-modal-container",
      confirmButton: "rakbuku-swal-fullBtn rakbuku-swal-errorBtn mb-2",
      cancelButton: "rakbuku-swal-fullBtn rakbuku-swal-cancelBtn",
    },
  }
)};
