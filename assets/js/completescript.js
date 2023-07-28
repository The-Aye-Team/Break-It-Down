function btnEvent(subTask) {
  function deleteSubTask(e) {
    e.currentTarget.parentNode.remove();
  }
  // CLICK EVENT ON EDIT BUTTON
  function finishEdit() {
    if (subTaskText.readOnly == true) {
      subTaskText.readOnly = false;
      subTaskText.focus();
    } else {
      subTaskText.readOnly = true;
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
      finishEdit();
    }
  });
  let deleteTaskBtn = subTask.parentNode.querySelector(`.deleteBigTaskBtn`);
  console.log(subTask.parentNode.parentNode);
  deleteTaskBtn.addEventListener("click", (e) => {
    bigTaskDel(subTask.parentNode.parentNode);
  });
}

function bigTaskDel(e) {
    console.log(e.currentTarget.closest(`.`));
  e.currentTarget.closest(`.genTask`).remove();
}
