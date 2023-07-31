function saveTask(task) {
  let allTasks = localStorage.getItem("allTasks");
  allTasks = allTasks ? allTasks.split(", ") : [];
  allTasks.push(task);
  localStorage.setItem("allTasks", allTasks.toString());
}

function getTask() {
  return localStorage.getItem("allTasks");
}
