const container = document.querySelector("#tasks-container");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    container.classList.add("fadeInTaskView");
  }, 4000);
});

const addTask = () => {
  const taskContainer = document.querySelector("#tasks-container .tasks-list");
  console.log("Before Task is added");
  const randId = Math.floor(Math.random() * 10000);
  let task = `
        <div class="task-wrapper mb-3 w-100">
        <a
        class="btn btn-primary w-100 mb-2 text-start"
        data-bs-toggle="collapse"
        href="#collapseExample${randId}"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
        style="text-align: left"
        >
        Link with href
        </a>

        <div class="collapse" id="collapseExample${randId}">
        <div class="card card-body">
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the
            relevant trigger.
        </div>
        </div>
    </div>
    `;

  taskContainer.innerHTML += task;

  console.log("After Task is added");
};
