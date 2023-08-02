const container = document.querySelector("#tasks-container");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    container.classList.add("fadeInTaskView");
  }, 4000);
});

const addTask = () => {
  createTask();
};

function createSubtask(item, taskName) {
  const subtaskContainer = item.querySelector(".subtask-container");
  console.log(subtaskContainer);
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

async function getAiData(task) {
  // function getAiData(task, item) {

  // Fetch data from OpenAI
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  myHeaders.append("Authorization", `Bearer ${API_KEY}`);

  var raw = JSON.stringify({
    model: "text-davinci-003",
    prompt: `Break down '${task}' into smaller tasks seperated by commas and do not number the list. Please capitalize the first letter of each word
    and make sure every step has two words or more.`,
    max_tokens: 250,
    temperature: 0.2,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(
    "https://api.openai.com/v1/completions",
    requestOptions
  );
  let result = await response.text();
  const newresult = JSON.parse(result);
  const textResult = newresult.choices[0].text;
  const replacedTextResult = textResult.replace(/[\n.]*/g, "");
  console.log(replacedTextResult);
  const newArray = replacedTextResult.split(", ");
  console.log(populateTask);
  return newArray;
  // newArray.forEach((item) => {
  //   createSubtask(item, singleItem);
  //   customInputWidth();
  // });

  // This completes the script
}
