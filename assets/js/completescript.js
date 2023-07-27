// SETTING READ ONLY TRUE AND FALSE
function finishEdit() {
    for (i=0; i < subTaskTextArr; i++) {
        if (document.querySelector(".subTaskText").readOnly == true) {
            document.querySelector('.subTaskText').readOnly = false;
            document.querySelector(`.subTaskText`).focus();
        } else {
            document.querySelector('.subTaskText').readOnly = true
        }
    }
};
function deleteSubTask(e) {
    e.currentTarget.parentNode.remove();
}
// CLICK EVENT ON EDIT BUTTON 
let subTaskArr = document.querySelectorAll(`.subTaskWrapper`);



for (i = 0; i < subTaskArr.length; i++) {
    function finishEdit() {
        if (subTaskText.readOnly == true) {
            subTaskText.readOnly = false;
            subTaskText.focus();
        } else {
            subTaskText.readOnly = true
        }
    };

    let editBtn = subTaskArr[i].querySelector(`.editBtn`);
    let subTaskText = subTaskArr[i].querySelector(`.subTaskText`);
    let deleteBtn = subTaskArr[i].querySelector(`.deleteBtn`);

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
};


