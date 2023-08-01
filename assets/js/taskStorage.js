function saveTask(task) {
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
  // allTasks = allTasks ? allTasks.split(", ") : [];

  // Adding data to localStorage
  // allTasks.push(task);
  // localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

function populateTask(task, subTasks) {
  const taskContainer = document.querySelector("#tasks-container .tasks-list");
  const randId = Math.floor(Math.random() * 10000);
  let tasks = `
        <div class="task-wrapper mb-3 w-100">
        <a 
          class="genTask btn btn-primary w-100 mb-2 text-start d-flex justify-content-between align-items-center fw-bold bg-white"
          data-bs-toggle="collapse"
          href="#collapseExample${randId}"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          style="text-align: left; font-weight: bold;"
          id = "dropdownMenuButton"
        >

        <input class="focus d-flex" type="text" maxlength="75" id="input${randId}" value="">

        <div class="calendarWrap ml-auto mr-3">

        <add-to-calendar-button 
          class="d-lg-none d-xl-none calendarBtn"
          name="Sample Event"
          description="Play with me!"
          startDate="2024-01-28"
          startTime="10:15"
          endTime="17:45"
          timeZone="America/New_York"
          location="World Wide Web"
          options="'Apple','Google','Outlook.com','Yahoo'"
          listStyle="modal"
          hideTextLabelButton
          label="Add"
        ></add-to-calendar-button>
        
       
        <add-to-calendar-button
        class="deskTopView calendarBtn"
        name="empty"
        options="'Apple','Google', 'Outlook.com', 'Yahoo'"
        location="World Wide Web"
        startDate="2023-07-27"
        endDate="2023-07-27"
        startTime="10:15"
        endTime="23:30"
        timeZone="currentBrowser"
      ></add-to-calendar-button>

        </div>

        <div class="bigDelBtnWrap mr-3">
        <i class="fa-solid fa-trash deleteBigTaskBtn"></i>
        </div>          
          <i class="fa-solid fa-chevron-down dropDownBtn"></i>

        </a>
      <div class="collapse position-relative bigTask" id="collapseExample${randId}">
            <div class="card card-body border border-3 border-primary subtask-container">
              ${subTasks
                .map((singleSubTask) => {
                  return `
                  <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
                <div class="d-flex align-items-center">
                  <i class="fa-solid fa-circle"></i>
                  <div class="subTaskText" type="text" contenteditable>${singleSubTask}</div>
                </div>
                <div class="editBtn">
                  <i class="fa-solid fa-pen editIcon"></i>
                </div>
                <div class="deleteBtn">
                <i class="fa-solid fa-trash deleteIcon"></i>
                </div>
                <div class="ml-2 checkmarkBtn" data-isClicked="false">
                <i class="fa-solid fa-check checkmarkIcon"></i>
                </div>
              </div>
                `;
                })
                .join("")}
            </div>
          </div>
    `;
  taskContainer.insertAdjacentHTML("beforeend", tasks);
  const subtaskContainer = document.querySelector(".subtask-container");
  // subTasks.forEach((singleSubTask) => {
  //   const newSubtask = `
  //     <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
  //   <div class="d-flex align-items-center">
  //     <i class="fa-solid fa-circle"></i>
  //     <div class="subTaskText" type="text" contenteditable>${singleSubTask}</div>
  //   </div>
  //   <div class="editBtn">
  //     <i class="fa-solid fa-pen editIcon"></i>
  //   </div>
  //   <div class="deleteBtn">
  //   <i class="fa-solid fa-trash deleteIcon"></i>
  //   </div>
  //   <div class="ml-2 checkmarkBtn" data-isClicked="false">
  //   <i class="fa-solid fa-check checkmarkIcon"></i>
  //   </div>
  // </div>
  //   `;
  //   subtaskContainer.insertAdjacentHTML("beforeend", newSubtask);
  // });
  btnEvent(subtaskContainer.lastElementChild);
  const mainTask = document.querySelector(`#input${randId}`);
  mainTask.value = task;
  const mainTaskName = mainTask.value;
  // calendarName(mainTaskName, mainTask);
}

function getTask() {
  const items = localStorage.getItem("allTasks");
  let taskName;
  let subTasks;
  console.log(items);
  console.log(typeof items);
  const parsedItems = JSON.parse(items);

  console.log(parsedItems);
  for (let i = 0; i < parsedItems.length; i++) {
    taskName = parsedItems[i].name;
    subTasks = parsedItems[i].subTasks;
    populateTask(taskName, subTasks);
    console.log(taskName, subTasks);
  }
  // return taskName, subTasks;
}
