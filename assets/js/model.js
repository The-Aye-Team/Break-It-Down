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
  return singleTask;
}
