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
// console.log("Current time:", currentTime);

function taskView(randomId) {
  //   let date = new Date().toLocaleTimeString();
  //   let time = date.getHours() + ":" + date.getMinutes();
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
      ></add-to-calendar-button>

        </div>

        <div class="bigDelBtnWrap mr-3">
        <i class="fa-solid fa-trash deleteBigTaskBtn"></i>
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
  //   let date = new Date().toLocaleTimeString();
  //   let time = date.getHours() + ":" + date.getMinutes();
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
      ></add-to-calendar-button>

        </div>

        <div class="bigDelBtnWrap mr-3">
        <i class="fa-solid fa-trash deleteBigTaskBtn"></i>
        </div>          
          <i class="fa-solid fa-chevron-down dropDownBtn"></i>

        </a>
      <div class="collapse position-relative bigTask" id="collapseExample${randomId}">
            <div class="card card-body border border-3 border-primary subtask-container">
              ${Object.keys(subTasks)
                .map((key) =>
                  subTaskView(subTasks[key].subTask, subTasks[key].id)
                )
                .join("")}
            </div>
          </div>
    `;

  //   calendarName(task, document.querySelector(".focus"));
  return tasks;
}

function subTaskView(subTask, id) {
  let subtask = `
      <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
    <div class="d-flex align-items-center">
      <i class="fa-solid fa-circle"></i>
      <div class="subTaskText" type="text" contenteditable>${subTask}</div>
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

  return subtask;
}

function populateTask(task, subTasks) {
  const container = document.querySelector("#tasks-container");
  if(container !== null) {
  const taskContainer = document.querySelector("#tasks-container .tasks-list");
  const randId = Math.floor(Math.random() * 10000);
  taskContainer.insertAdjacentHTML(
    "beforeend",
    wholeTaskView(randId, task, subTasks)
  );
  customInputWidth();
  console.log(document.querySelector(".focus"));
  const mainTask = document.querySelector(`#input${randId}`);
  mainTask.value = task;
  const mainTaskName = mainTask.value;
  //   calendarName(mainTaskName, taskContainer);
  // calendarName(mainTaskName, mainTask);
}
}
function getTask() {
  // Gets all items from localStorage
  const items = localStorage.getItem("allTasks");
  let taskName;
  let subTasks;
  console.log(items);
  console.log(typeof items);

  //   Creates an array of all the tasks in localStorage
  const parsedItems = JSON.parse(items);

  console.log(parsedItems);

  //   Loops through the array to get each individual task. (output is an object)
  if (parsedItems === null) {
    return;
  }
  for (let i = 0; i < parsedItems.length; i++) {
    taskName = parsedItems[i].name;
    subTasks = parsedItems[i].subTasks;
    populateTask(taskName, subTasks);
    // console.log(parsedItems[i]);
    console.log(subTasks);
  }
}
getTask();
