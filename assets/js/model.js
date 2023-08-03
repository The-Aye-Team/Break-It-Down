const UUID = () => {
  return Math.floor(Math.random() * 10000);
};

// This is our schema on saving the task to the database
function subTaskData(name, subTasks) {
  let singleTask = {
    id: UUID(),
    name: name,
    subTasks: subTasks.map((subTask) => ({
      id: UUID(),
      subTask: subTask,
      isCompleted: false,
    })),
  };
  console.log(singleTask.subTasks);
  return singleTask;
}

// This function will check the parent id of the given task and traverse to subtasks to evaluate the value of isCompleted
function checkIsCompleted(parentId) {}

// This function checks to see if all specific subtasks isCompleted values are set to true.
function displayCompletedTasks(parentId) {}
