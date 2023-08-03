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
  // The user clicked "Cancel" (No), perform any other actions or do nothing
  // const deleteAllTasks = () => {
  // let deleteTaskBtns = document.querySelectorAll(".deleteBigTaskBtn");
  // for (let button of deleteTaskBtns) {
  //   button.addEventListener("click", (e) => {
  //     function bigTaskDel(e) {
  //       e.currentTarget.closest(`.task-wrapper`).remove();

  //       }
  //       bigTaskDel(e);
  //     });
  //   }
  // };
  // let observer = new MutationObserver(deleteAllTasks);
  // observer.observe(upperMost, {
  //   childList: true,
  // });
}
