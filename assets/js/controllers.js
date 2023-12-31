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
        item.blur();
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
        item.setAttribute("readOnly", true);
        // getAiData(taskInput, item.closest(".task-wrapper"));
      }
    });
  });
}

function createSubtask(item, taskName, id) {
  const subtaskContainer = item.querySelector(".subtask-container");
  const newSubtask = `
      <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
      <div class="d-flex align-items-center">
        <i class="fa-solid fa-circle"></i>
        <div class="subTaskText" type="text">${taskName}</div>
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
  let calendarButton = item.parentNode.querySelectorAll(
    `.calendarBtn${randomId}`
  );

  calendarButton.forEach((button) => {
    button.setAttribute(`name`, taskInput);
  });
}

function btnEvent(subTask) {
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

  if (checkmarkBtn.classList.contains("event")) {
    return;
  }
  checkmarkBtn.classList.add("event");
  checkmarkBtn.addEventListener(`click`, (e) => {
    const checkmarkId = Number(e.target.id);

    const items = localStorage.getItem("allTasks");

    const parsedItems = JSON.parse(items);
    for (let i = 0; i < parsedItems.length; i++) {
      let taskID = parsedItems[i];

      for (let j = 0; j < taskID.subTasks.length; j++) {
        if (checkmarkId === taskID.subTasks[j].id) {
          taskID.subTasks[j].isCompleted = !taskID.subTasks[j].isCompleted;

          toggleColorClass(
            taskID.subTasks[j].isCompleted,
            checkmarkBtn,
            e.target
          );
        }
      }
    }

    localStorage.setItem("allTasks", JSON.stringify(parsedItems));
  });
  function toggleColorClass(isCompleted, checkmarkBtn, e) {
    if (isCompleted) {
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
    for (let item of checkmarks) {
      if (item.getAttribute(`data-isClicked`) === `false`) {
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
}
