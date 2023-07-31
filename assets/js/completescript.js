function btnEvent(subTask) {
  function deleteSubTask(e) {
    e.currentTarget.parentNode.remove();
  }

  // CLICK EVENT ON EDIT BUTTON
  function finishEdit() {
    if (!subTaskText.contenteditable) {
      subTaskText.setAttribute(`contenteditable`, true);
      editBtn.querySelector(`.editIcon`).setAttribute(`class`, `fa-solid fa-arrow-right-to-bracket editIcon`)
      subTaskText.focus();
      return;
    }
        subTaskText.setAttribute(`contenteditable`, false);
        editBtn.querySelector(`.editIcon`).setAttribute(`class`, `fa-solid fa-pen editIcon`);
  }

  let editBtn = subTask.querySelector(`.editBtn`);
  let subTaskText = subTask.querySelector(`.subTaskText`);
  let deleteBtn = subTask.querySelector(`.deleteBtn`);
  let checkmarkBtn = subTask.querySelector(`.checkmarkBtn`);

  let checkClick = false
  
  checkmarkBtn.addEventListener(`click`, () => {
    if (!checkClick) {
      checkmarkBtn.querySelector(`.checkmarkIcon`).setAttribute(`class`, `fa-regular fa-x checkmarkIcon`);
      checkmarkBtn.parentNode.setAttribute(`class`, `d-flex subTaskWrapper justify-content-between align-items-center bg-primary px-3 py-1 rounded-xl border border-3 border-primary mb-3 mt-2`);
      checkClick = true;
      return;
    } 
    checkmarkBtn.querySelector(`.checkmarkIcon`).setAttribute(`class`, `fa-solid fa-check checkmarkIcon`);
    checkmarkBtn.parentNode.setAttribute(`class`, `d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3 mt-2`);
    checkClick = false;
  });

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
        editBtn.querySelector(`.editIcon`).setAttribute(`class`, `fa-solid fa-pen editIcon`);
    } 
  });
  let deleteTaskBtn = subTask.parentNode.parentNode.parentNode.querySelector(`.bigDelBtnWrap`);
  deleteTaskBtn.addEventListener("click", (e) => {
    bigTaskDel(e);
  });
}

function bigTaskDel(e) {
    e.currentTarget.closest(`.task-wrapper`).remove();
}
