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
          class="genTask btn btn-primary w-100 mb-2 text-start d-flex justify-content-between align-items-center fw-bold bg-white"
          data-bs-toggle="collapse"
          href="#collapseExample${randId}"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          style="text-align: left; font-weight: bold;"
          id = "dropdownMenuButton"
        >
        <input class="focus d-flex" type="text" maxlength="75" id="input${randId}">
        <div class="calendarWrap ml-auto mr-3">

        <add-to-calendar-button 
          class="d-lg-none d-xl-none"
          name="Sample Event"
          description="Play with me!"
          startDate="2024-01-28"
          startTime="10:15"
          endTime="17:45"
          timeZone="America/New_York"
          location="World Wide Web"
          options="'Apple','Google','Outlook.com','Yahoo'"
          listStyle="modal"
          hideTextLabelButton
          label="Add"
        ></add-to-calendar-button>
        
       
        <add-to-calendar-button
        class="deskTopView calendarBtn"
        name="empty"
        options="'Apple','Google', 'Outlook.com', 'Yahoo'"
        location="World Wide Web"
        startDate="2023-07-27"
        endDate="2023-07-27"
        startTime="10:15"
        endTime="23:30"
        timeZone="currentBrowser"
      ></add-to-calendar-button>

        </div>

        <div class="bigDelBtnWrap mr-3">
        <i class="fa-solid fa-trash deleteBigTaskBtn"></i>
        </div>          
          <i class="fa-solid fa-chevron-down"></i>
        </a>
      <div class="collapse position-relative bigTask" id="collapseExample${randId}">
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

        item.readOnly = true;
        calendarName(taskInput, item);
        getAiData(taskInput, item.closest(".task-wrapper"));
      }
    });
    console.log(item);
  });
};

function calendarName(taskInput, item) {
  item.parentNode.querySelector(`.calendarBtn`).setAttribute(`name`, taskInput); 
}


function customInputWidth() {
  inputField = document.querySelectorAll("input");

  [...inputField].forEach((input) => {
    input.addEventListener("input", () => {
      let value = input.value;
      let width = value.length * 8 + 8; // the first 8 is typically the character limit.
      input.style.width = width + "px";
    });
  });
}


function getAiData(task, item) {
  // Fetch data from OpenAI
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  myHeaders.append("Authorization", `Bearer ${API_KEY}`);

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

      const newArray = replacedTextResult.split(", ");

      newArray.forEach((singleItem) => {
        createSubtask(item, singleItem);
        customInputWidth();
      });
    })
    .catch((error) => console.log("error", error));

  // This completes the script
}

function createSubtask(item, taskName) {
  const subtaskContainer = item.querySelector(".subtask-container");
  const newSubtask = `
  <div class="d-flex subTaskWrapper justify-content-between align-items-center bg-white px-3 py-1 rounded-xl border border-3 border-primary mb-3">
  <div class="d-flex align-items-center">
    <i class="fa-solid fa-circle"></i>
    <div class="subTaskText" type="text" contenteditable>${taskName}</div>
  </div>
  <div class="editBtn">
     <i class="fa-solid fa-pen editIcon"></i>
  </div>
  <div class="deleteBtn">
  <i class="fa-solid fa-trash deleteIcon"></i>
  </div>
  <div class="ml-2 checkmarkBtn" data-isClicked="false">
  <i class="fa-solid fa-check checkmarkIcon"></i>
  </div>
</div>
  `;
  subtaskContainer.insertAdjacentHTML("beforeend", newSubtask);
  btnEvent(subtaskContainer.lastElementChild);
  item.querySelector(`.genTask`).click();
}
