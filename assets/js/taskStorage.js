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
}
