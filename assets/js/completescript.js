function btnEvent(subTask) {
  function deleteSubTask(e) {
    e.currentTarget.parentNode.remove();
  }
  // CLICK EVENT ON EDIT BUTTON
  function finishEdit() {
    if (!subTaskText.contenteditable) {
      subTaskText.setAttribute(`contenteditable`, true);
      subTaskText.focus();
    } else {
        subTaskText.removeAttribute(`contenteditable`);
    }
  }

  let editBtn = subTask.querySelector(`.editBtn`);
  let subTaskText = subTask.querySelector(`.subTaskText`);
  let deleteBtn = subTask.querySelector(`.deleteBtn`);

  deleteBtn.addEventListener(`click`, (e) => {
    deleteSubTask(e);
  });

  editBtn.addEventListener(`click`, () => {
    finishEdit();
  });

  // LISTENING FOR ENTER KEY
  subTaskText.addEventListener("keypress", (e) => {
    if (e.key === `Enter`) {
        e.preventDefault();
        subTaskText.removeAttribute(`contenteditable`);
    }
  });
  // let deleteTaskBtn = subTask.parentNode.parentNode.querySelector(`.deleteBigTaskBtn`);
  // deleteTaskBtn.addEventListener("click", (e) => {
  //   bigTaskDel(e);
  // });
}

// function bigTaskDel(e) {
//     e.currentTarget.closest(`.task-wrapper`).remove();
// }

let upperMost = document.querySelector('.upperMost')
const callback = (mutations) => {
  console.log(mutations);
  let deleteTaskBtn = document.querySelector('.deleteBigTaskBtn');
  deleteTaskBtn.addEventListener("click", (e) => {
  bigTaskDel(e);
  function bigTaskDel(e) {
    e.currentTarget.closest(`.task-wrapper`).remove();
}
})}
let observer = new MutationObserver(callback);
observer.observe(upperMost, {
  childList:true
});
