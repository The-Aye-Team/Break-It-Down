let upperMost = document.querySelector(".upperMost");
const callback = () => {
  let deleteTaskBtns = document.querySelectorAll(".deleteBigTaskBtn");
  for (let button of deleteTaskBtns) {
    button.addEventListener("click", (e) => {
      function bigTaskDel(e) {
        e.currentTarget.closest(`.task-wrapper`).remove();
      }
      bigTaskDel(e);
      observer.disconnect();
    });
  }
};
let observer = new MutationObserver(callback);
observer.observe(upperMost, {
  childList: true,
});
