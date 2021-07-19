/**
 * 
 * Using Memento pattern for undo the deleted data.
 * see ref: https://stackoverflow.com/questions/54416318/how-to-make-a-undo-redo-function#answer-54416376
 * 
 * @param {*} dataToUndo 
 * @returns 
 */
 export function undoClearAllTodosCallback(dataToUndo) {
  try {
    // undoDeleteMyTodoLists
    localStorage.setItem("myTodoList", JSON.stringify(dataToUndo))

    infoToast({
      title: "Your data is back! Please refresh the page.",
      toastType: "fullBtn",
      opts: { confirmButtonText: "Refresh now" }
    })

    setTimeout(() => {
      location.reload()
    }, 5000);

    return 'true' // return exactly string on purpose
  } catch (e) {
    console.error(e);
    return 'false' // return exactly string on purpose
  }
}