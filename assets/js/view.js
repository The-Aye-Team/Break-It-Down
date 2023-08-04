function getCurrentTime() {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const currentTimeString = `${hours}:${minutes}:${seconds}`;
  return currentTimeString;
}
function plusOneHour() {
  const currentDate = new Date();
  const hours = String(currentDate.getHours() + 1).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const currentTimeString = `${hours}:${minutes}:${seconds}`;
  return currentTimeString;
}
// Example usage:
const currentTime = getCurrentTime();
const addOneHour = plusOneHour();

function taskView(randomId) {
  let tasks = `
        <div class="task-wrapper mb-3 w-100">
        <a 
          class="genTask btn btn-primary w-100 mb-2 text-start d-flex justify-content-between align-items-center fw-bold bg-white"
          data-bs-toggle="collapse"
          href="#collapseExample${randomId}"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          style="text-align: left; font-weight: bold;"
          id = "dropdownMenuButton"
        >

        <input class="focus d-flex" type="text" maxlength="75" id="input${randomId}">

        <div class="calendarWrap ml-auto mr-3">

        <add-to-calendar-button 
          class="d-lg-none d-xl-none calendarBtn${randomId} first"
          id="first"
          name="Sample Event"
          startDate="today"
          startTime="${currentTime}"
          endTime="${addOneHour}"
          timeZone="currentBrowser"
          location="World Wide Web"
          options="'Google'"
          listStyle="modal"
          hideTextLabelButton
          label="Add"
          hideCheckmark
        ></add-to-calendar-button>
        
       
        <add-to-calendar-button
        class="deskTopView calendarBtn${randomId} second"
        id="second"
        name="empty"
        options="'Google'"
        location="World Wide Web"
        startDate="today"
        startTime="${currentTime}"
        endTime="${addOneHour}"
        timeZone="currentBrowser"
        hideCheckmark
      ></add-to-calendar-button>

        </div>

             
          <i class="fa-solid fa-chevron-down dropDownBtn"></i>

        </a>
      <div class="collapse position-relative bigTask" id="collapseExample${randomId}">
            <div class="card card-body border border-3 border-primary subtask-container">
              
            </div>
          </div>
    `;
  return tasks;
}

function wholeTaskView(randomId, task, subTasks, id) {
  let allCompleted = false;
  let completedArray = Object.keys(subTasks).map(
    (key) => subTasks[key].isCompleted
  );
  allCompleted = completedArray.every((isCompleted) => isCompleted === true);

  let tasks = `
        <div class="task-wrapper mb-3 w-100">
        <a 
          class="genTask btn btn-primary w-100 mb-2 text-start d-flex justify-content-between align-items-center fw-bold bg-${
            allCompleted ? "primary" : "white"
          }"
          data-bs-toggle="collapse"
          href="#collapseExample${randomId}"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          style="text-align: left; font-weight: bold;"
          id = "dropdownMenuButton"
        >

        <input class="focus d-flex" type="text" maxlength="75" id="input${randomId}" value="" readOnly>

        <div class="calendarWrap ml-auto mr-3">

        <add-to-calendar-button 
          class="d-lg-none d-xl-none calendarBtn${randomId}"
          name="${task}"
          startDate="today"
          startTime="${currentTime}"
          endTime="${addOneHour}"
          timeZone="currentBrowser"
          location="World Wide Web"
          options="'Google'"
          listStyle="modal"
          hideTextLabelButton
          label="Add"
          hideCheckmark
        ></add-to-calendar-button>
        
       
        <add-to-calendar-button
        class="deskTopView calendarBtn${randomId}"
        name="${task}"
        options="'Google'"
        location="World Wide Web"
        startDate="today"
        startTime="${currentTime}"
        endTime="${addOneHour}"
        timeZone="currentBrowser"
        hideCheckmark
      ></add-to-calendar-button>

        </div>        
          <i class="fa-solid fa-chevron-down dropDownBtn"></i>

        </a>
      <div class="collapse position-relative bigTask" id="collapseExample${randomId}">
            <div class="card card-body border border-3 border-primary subtask-container">
              ${Object.keys(subTasks)
                .map((key) => subTaskView(subTasks[key]))
                .join("")}
            </div>
          </div>
    `;

  return tasks;
}

function subTaskView({ subTask, id, isCompleted }) {
  let subtask = `
      <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-${
        isCompleted ? "primary" : "white"
      } px-3 py-1 rounded-xl border border-3 border-primary mb-3">
    <div class="d-flex align-items-center">
      <i class="fa-solid fa-circle"></i>
      <div class="subTaskText" type="text">${subTask}</div>
    </div>
    <div class="ml-2 checkmarkBtn" data-isClicked="${
      isCompleted ? "true" : "false"
    }">
    <i class="fa-solid fa-${
      isCompleted ? "x" : "check"
    } checkmarkIcon" id="${id}"></i>
    </div>
  </div>
    `;

  return subtask;
}

function populateTask(task, subTasks) {
  const container = document.querySelector("#tasks-container");
  if (container !== null) {
    const taskContainer = document.querySelector(
      "#tasks-container .tasks-list"
    );
    const randId = Math.floor(Math.random() * 10000);
    taskContainer.insertAdjacentHTML(
      "beforeend",
      wholeTaskView(randId, task, subTasks)
    );
    customInputWidth();

    const mainTask = document.querySelector(`#input${randId}`);
    mainTask.value = task;
  }
}
function getTask() {
  // Gets all items from localStorage
  const items = localStorage.getItem("allTasks");
  let taskName;
  let subTasks;

  //   Creates an array of all the tasks in localStorage
  const parsedItems = JSON.parse(items);

  //   Loops through the array to get each individual task. (output is an object)
  if (parsedItems === null) {
    return;
  }
  for (let i = 0; i < parsedItems.length; i++) {
    taskName = parsedItems[i].name;
    subTasks = parsedItems[i].subTasks;
    populateTask(taskName, subTasks);
    let subTaskWrapperArray = document.querySelectorAll(".subTaskWrapper");
    subTaskWrapperArray.forEach((subTaskWrapper) => {
      btnEvent(subTaskWrapper);
    });
  }
}
getTask();
