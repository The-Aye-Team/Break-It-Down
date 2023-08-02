// This function saves the tasks to localStorage
function saveTaskToLocalStorage(task) {
  let taskList = [];
  // checks if localStorage exists
  let allTasks = localStorage.getItem("allTasks");
  if (allTasks) {
    taskList = JSON.parse(localStorage.getItem("allTasks"));
    taskList.push(task);
    localStorage.setItem("allTasks", JSON.stringify(taskList));
  } else {
    taskList.push(task);
    localStorage.setItem("allTasks", JSON.stringify(taskList));
  }
}

// This function will create a brand new task item and assist in generating a new task
function createTask() {
  const taskContainer = document.querySelector("#tasks-container .tasks-list");
  const randId = Math.floor(Math.random() * 10000);
  // This is the main task container. Random ID is generated to created unique id attribute values.
  taskView(randId);
  //   The output of the taskView with be appended to the task container
  taskContainer.insertAdjacentHTML("beforeend", taskView(randId));

  const input = document.querySelectorAll(`#input${randId}`);

  // Loop through all the task inputs.
  [...input].forEach((item) => {
    item.focus();
    item.addEventListener("keypress", async (e) => {
      if (e.key === `Enter`) {
        const taskInput = item.value;
        item.readOnly = true;
        allSubTasks = await getAiData(taskInput);
        subTaskData(taskInput, allSubTasks);
        calendarName(taskInput, item, randId);
        allSubTasks.forEach((singleTask) => {
          createSubtask(item.closest(".task-wrapper"), singleTask);
        });
        saveTaskToLocalStorage(subTaskData(taskInput, allSubTasks));
        // getAiData(taskInput, item.closest(".task-wrapper"));
      }
    });
  });
}

function calendarName(taskInput, item, randomId) {
  //   item.closest(`.first`).setAttribute(`name`, taskInput);
  //   item.closest(`.second`).setAttribute(`name`, taskInput);
  //   item.parentNode.querySelector(`.first`).setAttribute(`name`, taskInput);
  //   item.parentNode.querySelector(`.second`).setAttribute(`name`, taskInput);
  console.log(item.parentNode.querySelector(`#first`));
  console.log(item.parentNode.querySelector(`.calendarBtn`));
  //   item.parentNode.querySelector(`#first`).setAttribute(`name`, taskInput);
  let calendarButton = item.parentNode.querySelectorAll(
    `.calendarBtn${randomId}`
  );

  calendarButton.forEach((button) => {
    button.setAttribute(`name`, taskInput);
  });
  //   item.parentNode
  //     .querySelector(`.calendarBtn${randomId}`)
  //     .setAttribute(`name`, taskInput);
}

function btnEvent(subTask) {
  function deleteSubTask(e) {
    e.currentTarget.parentNode.remove();
  }

  // CLICK EVENT ON EDIT BUTTON
  function finishEdit() {
    if (!subTaskText.contenteditable) {
      subTaskText.setAttribute(`contenteditable`, true);
      editBtn
        .querySelector(`.editIcon`)
        .setAttribute(`class`, `fa-solid fa-arrow-right-to-bracket editIcon`);
      subTaskText.focus();

      return;
    }
    subTaskText.setAttribute(`contenteditable`, false);
    editBtn
      .querySelector(`.editIcon`)
      .setAttribute(`class`, `fa-solid fa-pen editIcon`);
  }

  let editBtn = subTask.querySelector(`.editBtn`);
  let subTaskText = subTask.querySelector(`.subTaskText`);
  let deleteBtn = subTask.querySelector(`.deleteBtn`);
  let checkmarkBtn = subTask.querySelector(`.checkmarkBtn`);

  let genTask =
    subTask.parentNode.parentNode.parentNode.querySelector(`.genTask`);
  let dropDownBtn =
    subTask.parentNode.parentNode.parentNode.querySelector(`.dropDownBtn`);
  let arrowCheckClick = false;
  genTask.addEventListener(`click`, () => {
    if (!arrowCheckClick) {
      dropDownBtn.setAttribute(`class`, `fa-solid fa-angle-up dropDownBtn`);
      arrowCheckClick = true;
      return;
    }
    dropDownBtn.setAttribute(`class`, `fa-solid fa-chevron-down dropDownBtn`);
    arrowCheckClick = false;
  });

  let checkClick = false;

  // genTask.addEventListener(`click`, () => {

  // });

  checkmarkBtn.addEventListener(`click`, () => {
    if (!checkClick) {
      checkmarkBtn
        .querySelector(`.checkmarkIcon`)
        .setAttribute(`class`, `fa-regular fa-x checkmarkIcon`);
      checkmarkBtn.parentNode.classList.replace(`bg-white`, `bg-primary`);
      checkmarkBtn.setAttribute(`data-isClicked`, `true`);
      checkClick = true;
      isAllChecked();
      return;
    }
    checkmarkBtn
      .querySelector(`.checkmarkIcon`)
      .setAttribute(`class`, `fa-solid fa-check checkmarkIcon`);
    checkmarkBtn.parentNode.classList.replace(`bg-primary`, `bg-white`);
    checkmarkBtn.setAttribute(`data-isClicked`, `false`);
    isAllChecked();
    checkClick = false;
  });

  function isAllChecked() {
    let checkmarks = document.querySelectorAll(`.checkmarkBtn`);
    for (let item of checkmarks) {
      if (item.getAttribute(`data-isClicked`) == `false`) {
        checkmarkBtn.parentNode.parentNode.parentNode.parentNode
          .querySelector(`.genTask`)
          .classList.replace(`bg-primary`, `bg-white`);
        return;
      }
    }
    checkmarkBtn.parentNode.parentNode.parentNode.parentNode
      .querySelector(`.genTask`)
      .classList.replace(`bg-white`, `bg-primary`);
    checkmarkBtn.parentNode.parentNode.parentNode.parentNode
      .querySelector(`.genTask`)
      .click();
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
      editBtn
        .querySelector(`.editIcon`)
        .setAttribute(`class`, `fa-solid fa-pen editIcon`);
    }
  });
}
