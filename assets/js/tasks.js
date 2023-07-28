const container = document.querySelector("#tasks-container");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    container.classList.add("fadeInTaskView");
  }, 4000);
});

const addTask = () => {
  const taskContainer = document.querySelector("#tasks-container .tasks-list");

  const randId = Math.floor(Math.random() * 10000);

  let tasks = `
        <div class="task-wrapper mb-3 w-100">
        <a 
          class="genTask btn btn-primary w-100 mb-2 text-start d-flex justify-content-between align-items-center fw-bold "
          data-bs-toggle="collapse"
          href="#collapseExample${randId}"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          style="text-align: left; font-weight: bold;"
          id = "dropdownMenuButton"
        >
        <input class="focus" type="text" maxlength="75" id="input${randId}">
          <span class="text-secondary " id="time-complete">1:30 PM</span>
          <i class="fa-solid fa-chevron-down"></i>
        </a>
      <div class="collapse position-relative bigTask" id="collapseExample${randId}">
            <div class="headerButtons d-flex flex-row justify-content-between ">
              <div>
                <span class="pl-2">Calendar <i class="calendarIcon fa-regular fa-calendar" style="color: #FFFCFC;"></i> </span>
              </div>
              <div class="deleteBigTaskBtn">
                <span class="pr-2"><i class="fa-solid fa-trash deleteIconTask" style="color: #f0f2f5;"></i> Delete</span>
              </div>
            </div>
            <div class="card card-body border border-3 border-primary subtask-container">
              
            </div>
          </div>
    `;

  taskContainer.insertAdjacentHTML("beforeend", tasks);

  const focus = document.querySelectorAll(`#input${randId}`);

  [...focus].forEach((item) => {
    item.focus();
    item.addEventListener("keypress", (e) => {
      if (e.key === `Enter`) {
        const taskInput = item.value;
        console.log(taskInput);
        item.readOnly = true;
        getAiData(taskInput);
      }
    });
    console.log(item);
  });
};

function customInputWidth() {
  inputField = document.querySelectorAll("input");

  [...inputField].forEach((input) => {
    input.addEventListener("input", () => {
      let value = input.value;
      let width = value.length * 8 + 8; // 8 is typically the character limit.
      input.style.width = width + "px";
    });
  });
}

function getAiData(task) {
  // Fetch data from OpenAI
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  myHeaders.append("Authorization", `Bearer ${process.env.API_KEY}`);



  var raw = JSON.stringify({
    model: "text-davinci-003",
    prompt: `Break down '${task}' into smaller tasks seperated by commas and do not number the list. Please capitalize the first letter of each word.`,
    max_tokens: 250,
    temperature: 0.2,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.openai.com/v1/completions", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const newresult = JSON.parse(result);
      const textResult = newresult.choices[0].text;
      const replacedTextResult = textResult.replace(/[\n.]*/g, "");
      console.log(replacedTextResult);
      const newArray = replacedTextResult.split(", ");

      newArray.forEach((item) => {
        createSubtask(item);
        customInputWidth();
      });
    })
    .catch((error) => console.log("error", error));

  // This completes the script
}

function createSubtask(taskName) {
  const subtaskContainer = document.querySelector(".subtask-container");
  const newSubtask = `
  <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3 mt-2">
  <div class="d-flex align-items-center">
    <i class="fa-solid fa-circle"></i>
    <div class="subTaskText" type="text" contenteditable>${taskName}</div>
  </div>
  <div class="editBtn">
    <img class="editIcon" src="assets/img/editIcon.png" style="width: 13px;">
  </div>
  <div class="deleteBtn">
    <img class="deleteIcon" src="assets/img/garbageIcon.png" style="width: 15px;">
  </div>
  <div>
    <span class="text-secondary" id="time-completed">1:30 PM</span>
  </div>
</div>
  `;
  subtaskContainer.insertAdjacentHTML("beforeend", newSubtask);
  console.log(subtaskContainer.lastElementChild);
  btnEvent(subtaskContainer.lastElementChild);
  document.querySelector(`.genTask`).click();
}
