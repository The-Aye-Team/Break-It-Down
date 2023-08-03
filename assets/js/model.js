const UUID = () => {
  return Math.floor(Math.random() * 10000);
};

// // Function to generate a random ID
// function generateRandomId() {
//   const randomId = Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string of length 9
//   return randomId;
// }

// // Function to assign the random ID to one element
// function assignRandomIdToElement() {
// const element1 = document.getElementById('element1'); // Replace 'element1' with the actual ID of the element
// const randomId = generateRandomId();
// element1.setAttribute('data-random-id', randomId);
// }

// // Function to attach the produced random ID to another element
// function attachRandomIdToAnotherElement() {
// const element1 = document.getElementById('element1'); // Replace 'element1' with the actual ID of the element
// const element2 = document.getElementById('element2'); // Replace 'element2' with the actual ID of the other element

// const randomId = element1.getAttribute('data-random-id');
// element2.setAttribute('data-random-id', randomId);
// }

// // Example usage:
// assignRandomIdToElement(); // Assign the random ID to element1
// attachRandomIdToAnotherElement(); // Attach the same random ID to element2

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
