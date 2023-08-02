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
  let genTask = subTask.parentNode.parentNode.parentNode.querySelector(`.genTask`);
  let dropDownBtn = subTask.parentNode.parentNode.parentNode.querySelector(`.dropDownBtn`);


  let arrowCheckClick = false
  genTask.addEventListener(`click`, () => {
    if(!arrowCheckClick) {
    dropDownBtn.setAttribute(`class`, `fa-solid fa-angle-up dropDownBtn`);
    arrowCheckClick = true
    return;
    };
    dropDownBtn.setAttribute(`class`, `fa-solid fa-chevron-down dropDownBtn`);
    arrowCheckClick = false;
  });


  

  let checkClick = false

  checkmarkBtn.addEventListener(`click`, () => {
    if (!checkClick) {
      checkmarkBtn.querySelector(`.checkmarkIcon`).setAttribute(`class`, `fa-regular fa-x checkmarkIcon`);
      checkmarkBtn.parentNode.classList.replace(`bg-white`, `bg-primary`);
      checkmarkBtn.setAttribute(`data-isClicked`, `true`);
      checkClick = true;
      isAllChecked();
      return;
    } 
    checkmarkBtn.querySelector(`.checkmarkIcon`).setAttribute(`class`, `fa-solid fa-check checkmarkIcon`);
    checkmarkBtn.parentNode.classList.replace(`bg-primary`, `bg-white`);
    checkmarkBtn.setAttribute(`data-isClicked`, `false`);
    isAllChecked();
    checkClick = false;
  });


  function isAllChecked() {
    let checkmarks = document.querySelectorAll(`.checkmarkBtn`);
    for (let item of checkmarks) {
      if (item.getAttribute(`data-isClicked`) == `false`) {
        checkmarkBtn.parentNode.parentNode.parentNode.parentNode.querySelector(`.genTask`).classList.replace(`bg-primary`, `bg-white`);
        return;
      }
    }
    checkmarkBtn.parentNode.parentNode.parentNode.parentNode.querySelector(`.genTask`).classList.replace(`bg-white`, `bg-primary`);
    checkmarkBtn.parentNode.parentNode.parentNode.parentNode.querySelector(`.genTask`).click();
  }
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
}


let upperMost = document.querySelector('.upperMost')
const callback = () => {
  let deleteTaskBtns = document.querySelectorAll('.deleteBigTaskBtn');
  for (let button of deleteTaskBtns) {
  button.addEventListener("click", (e) => {
  function bigTaskDel(e) {
    e.currentTarget.closest(`.task-wrapper`).remove();
  }
  bigTaskDel(e);
  observer.disconnect();
})}};
let observer = new MutationObserver(callback);
observer.observe(upperMost, {
  childList:true
});

getTask();
