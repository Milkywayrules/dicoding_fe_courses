/**
 * 
 * something
 * 
 */
const toastBasic = Swal.mixin({
  showCloseButton: true,
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const toastFullBtn = Swal.mixin({
  showCloseButton: true,
  toast: true,
  position: "top-end", // 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
  showConfirmButton: true, // always true, bcs this is fullBtnToast ~_~
  confirmButtonText: "OK",
  buttonsStyling: false, // always false, always need custom style to override the default
  customClass: {
    confirmButton: "swal-confBtn"
  },
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export { toastBasic, toastFullBtn }
