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

  let tasks = `
        <div class="task-wrapper mb-3 w-100">
        <a 
          class="btn btn-primary w-100 mb-2 text-start d-flex justify-content-between align-items-center fw-bold "
          data-bs-toggle="collapse"
          href="#collapseExample${randId}"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          style="text-align: left; font-weight: bold;"
          id = "dropdownMenuButton"
        >
          Grocery Shopping 
          <span class="text-secondary " id="time-complete">1:30 PM</span>
          <i class="fa-solid fa-chevron-down"></i>
        </a>

        <div class="collapse" id="collapseExample${randId}">
          <div class="card card-body border border-3 border-primary">
            <!-- Individual subtask card -->
            <div class="d-flex justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
              <div class="d-flex align-items-center">
                <i class="fa-solid fa-circle"></i>
                Sub Task
              </div>
              <div>
                <span class="text-secondary" id="time-completed">1:30 PM</span>
              </div>
            </div>
            <!-- Closed Individual subtask card -->

            <!-- Individual subtask card -->
            <div class="d-flex justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
              <div class="d-flex align-items-center">
                <i class="fa-solid fa-circle"></i>
                Sub Task
              </div>
              <div>
                <span class="text-secondary" id="time-completed">1:30 PM</span>
              </div>
            </div>
            <!-- Closed Individual subtask card -->
          </div>
        </div>
      </div>
    `;

  taskContainer.innerHTML += tasks;

  console.log("After Task is added");
};

inputField = document.querySelectorAll("input");

[...inputField].forEach((input) => {
  console.log(input);
  input.addEventListener("input", () => {
    let value = input.value;
    let width = value.length * 8 + 20; // 8 is typically the character limit.
    input.style.width = width + "px";
  });
});
