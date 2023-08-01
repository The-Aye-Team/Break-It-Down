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
    class="genTask btn btn-primary w-100 mb-2 text-start d-flex justify-content-between align-items-center fw-bold "
    data-bs-toggle="collapse"
    href="#collapseExample${randId}"
    role="button"
    aria-expanded="false"
    aria-controls="collapseExample"
    style="text-align: left; font-weight: bold;"
    id = "dropdownMenuButton"
  >
  <input class="focus" type="text" maxlength="75" id="input${randId}" value="${task}">
    <span class="text-secondary " id="time-complete">1:30 PM</span>
    <i class="fa-solid fa-chevron-down"></i>
  </a>
<div class="collapse position-relative bigTask" id="collapseExample${randId}">
      <div class="headerButtons d-flex flex-row justify-content-between ">
        <div>
          <span class="pl-2">Calendar <i class="calendarIcon fa-regular fa-calendar" style="color: #FFFCFC;"></i> </span>
        </div>
        <div class="deleteBigTaskBtn">
          <span class="pr-2"><i class="fa-solid fa-trash deleteIconTask" style="color: #f0f2f5;"></i> Delete</span>
        </div>
      </div>
      <div class="card card-body border border-3 border-primary subtask-container">
        
      </div>
      </div>
    </div>
`;
  taskContainer.insertAdjacentHTML("beforeend", tasks);
  subTasks.forEach((singleSubTask) => {
    createSubtask(singleSubTask);
  });
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
