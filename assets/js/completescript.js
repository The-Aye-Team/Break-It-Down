// SETTING READ ONLY TRUE AND FALSE
function finishEdit() {
    if (document.querySelector(".subTaskText").readOnly == true) {
        document.querySelector('.subTaskText').readOnly = false;
        document.querySelector(`.subTaskText`).focus();
    } else {
        document.querySelector('.subTaskText').readOnly = true
    }
};
// CLICK EVENT ON EDIT BUTTON 
document.querySelector(`.editBtn`).addEventListener('click', finishEdit);
// LISTENING FOR ENTER KEY 
document.querySelector(".subTaskText").addEventListener("keypress", (e) => {
    if (e.key === `Enter`) {
      finishEdit();
    }
  });

  