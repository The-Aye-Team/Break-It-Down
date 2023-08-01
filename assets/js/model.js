// This is our schema on saving the task to the database
function subTaskData(name, subTasks) {
  let singleTask = {
    name: name,
    subTasks: subTasks,
  };

  return singleTask;
}
