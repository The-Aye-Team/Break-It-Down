let upperMost = document.querySelector(".upperMost");

function deleteAllTasks() {
  const confirmationMessage =
    "This will delete all your task lists. Are you sure?";
  const userConfirmed = confirm(confirmationMessage);
  if (userConfirmed) {
    // The user clicked "OK" (Yes), perform the task list deletion or other actions here
    localStorage.removeItem("allTasks");
    location.reload();
  }
}
