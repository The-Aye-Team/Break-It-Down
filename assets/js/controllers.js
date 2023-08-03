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
  console.log(UUID());
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
        let allData = subTaskData(taskInput, allSubTasks);

        calendarName(taskInput, item, randId);
        allData.subTasks.forEach((singleTask) => {
          createSubtask(
            item.closest(".task-wrapper"),
            singleTask.subTask,
            singleTask.id
          );
        });
        saveTaskToLocalStorage(allData);
        item.setAttribute('readOnly');
        // getAiData(taskInput, item.closest(".task-wrapper"));
      }
    });
  });
}

function createSubtask(item, taskName, id) {
  const subtaskContainer = item.querySelector(".subtask-container");
  console.log(subtaskContainer);
  const newSubtask = `
      <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
      <div class="d-flex align-items-center">
        <i class="fa-solid fa-circle"></i>
        <div class="subTaskText" type="text" contenteditable>${taskName}</div>
      </div>
      <div class="editBtn">
         <i class="fa-solid fa-pen editIcon"></i>
      </div>
      <div class="deleteBtn">
      <i class="fa-solid fa-trash deleteIcon"></i>
      </div>
      <div class="ml-2 checkmarkBtn" data-isClicked="false">
      <i class="fa-solid fa-check checkmarkIcon" id="${id}"></i>
      </div>
    </div>
      `;

  subtaskContainer.insertAdjacentHTML("beforeend", newSubtask);
  btnEvent(subtaskContainer.lastElementChild);
  item.querySelector(`.genTask`).click();
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

  // genTask.addEventListener(`click`, () => {

  // });
  let classesArray = checkmarkBtn.classList;

  console.log(checkmarkBtn.classList.contains("event"));
  if (checkmarkBtn.classList.contains("event")) {
    return;
  }
  checkmarkBtn.classList.add("event");
  checkmarkBtn.addEventListener(`click`, (e) => {
    console.dir(e);

    const checkmarkId = Number(e.target.id);
    console.log(typeof checkmarkId);
    const items = localStorage.getItem("allTasks");
    let subtaskId;
    const parsedItems = JSON.parse(items);
    for (let i = 0; i < parsedItems.length; i++) {
      let taskID = parsedItems[i];

      for (let j = 0; j < taskID.subTasks.length; j++) {
        // console.log(taskID.subTasks[j].id);
        if (checkmarkId === taskID.subTasks[j].id) {
          taskID.subTasks[j].isCompleted = !taskID.subTasks[j].isCompleted;

          toggleColorClass(
            taskID.subTasks[j].isCompleted,
            checkmarkBtn,
            e.target
          );
          //   console.log(taskID.subTasks[j].isCompleted);
        }
      }
    }

    localStorage.setItem("allTasks", JSON.stringify(parsedItems));

    // let checkClick = false;
    // if (!checkClick) {
    //   checkmarkBtn
    //     .querySelector(`.checkmarkIcon`)
    //     .setAttribute(`class`, `fa-regular fa-x checkmarkIcon`);
    //   checkmarkBtn.parentNode.classList.replace(`bg-white`, `bg-primary`);
    //   checkmarkBtn.setAttribute(`data-isClicked`, `true`);
    //   checkClick = true;
    //   isAllChecked();
    //   return;
    // }
    // checkmarkBtn
    //   .querySelector(`.checkmarkIcon`)
    //   .setAttribute(`class`, `fa-solid fa-check checkmarkIcon`);
    // checkmarkBtn.parentNode.classList.replace(`bg-primary`, `bg-white`);
    // checkmarkBtn.setAttribute(`data-isClicked`, `false`);
    // isAllChecked();
    // checkClick = false;
  });
  function toggleColorClass(isCompleted, checkmarkBtn, e) {
    if (isCompleted) {
      console.log(isCompleted);
      // change to green
      checkmarkBtn
        .querySelector(`.checkmarkIcon`)
        .setAttribute(`class`, `fa-regular fa-x checkmarkIcon`);
      checkmarkBtn.parentNode.classList.replace(`bg-white`, `bg-primary`);
      checkmarkBtn.setAttribute(`data-isClicked`, `true`);
      isAllChecked(e);
      return;
    }
    // remove green
    checkmarkBtn
      .querySelector(`.checkmarkIcon`)
      .setAttribute(`class`, `fa-solid fa-check checkmarkIcon`);
    checkmarkBtn.parentNode.classList.replace(`bg-primary`, `bg-white`);
    checkmarkBtn.setAttribute(`data-isClicked`, `false`);
    isAllChecked(e);
  }

  function isAllChecked(mark) {
    let checkmarks =
      mark.parentNode.parentNode.parentNode.parentNode.querySelectorAll(
        `.checkmarkBtn`
      );
    console.log(checkmarks);
    for (let item of checkmarks) {
      console.log(item.getAttribute(`data-isClicked`));
      if (item.getAttribute(`data-isClicked`) === `false`) {
        console.log(
          checkmarkBtn.parentNode.parentNode.parentNode.parentNode.querySelector(
            `.genTask`
          )
        );
        checkmarkBtn.parentNode.parentNode.parentNode.parentNode
          .querySelector(`.genTask`)
          .classList.replace(`bg-primary`, `bg-white`);
        console.log("hello");
        return;
      }
    }
    checkmarkBtn.parentNode.parentNode.parentNode.parentNode
      .querySelector(`.genTask`)
      .classList.replace(`bg-white`, `bg-primary`);
    checkmarkBtn.parentNode.parentNode.parentNode.parentNode
      .querySelector(`.genTask`)
      .click();
    console.log("hello");
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

function getUUID() {
  let item = localStorage.getItem("allTasks");
  item = JSON.parse(item);

  let subTaskId;

  if (item === null) {
    return;
  }
  for (let i = 0; i < item.length; i++) {
    let taskID = item[i];

    for (let j = 0; j < taskID.subTasks.length; j++) {
      console.log(taskID.subTasks[j].id);
    }
  }
}

// getUUID();

function deleteTask(itemID) {
  let item = localStorage.getItem("allTasks");
  item = JSON.parse(item);

  for (let i = 0; i < item.length; i++) {
    let taskID = item[i].id;
    // console.log(taskID);
    if (taskID === itemID) {
      if (item) {
        taskList = JSON.parse(localStorage.getItem("allTasks"));
        taskList.pop(taskID);
        localStorage.setItem("allTasks", JSON.stringify(taskList));
      } else {
        localStorage.setItem("allTasks", JSON.stringify(taskList));
      }

      itemID.remove();
    }
  }
}

// function checkColorClass() {

//   const checkmarkId = Number(e.target.id);
//   const items = localStorage.getItem("allTasks");
//   const parsedItems = JSON.parse(items);

//   for (let i = 0; i < parsedItems.length; i++) {
//     let taskID = parsedItems[i];

//     for (let j = 0; j < taskID.subTasks.length; j++) {
//       // console.log(taskID.subTasks[j].id);
//       if (checkmarkId === taskID.subTasks[j].id) {
//         taskID.subTasks[j].isCompleted

//           : (taskID.subTasks[j].isCompleted = true);

//         toggleColorClass(taskID.subTasks[j].isCompleted);
//         console.log(taskID.subTasks[j].isCompleted);
//       }
//     }
//   }
// }

// window.addEventListener("DOMContentLoaded", checkColorClass);
