const addTask = () => {
  createTask();
};

function customInputWidth() {
  inputField = document.querySelectorAll("input");

  [...inputField].forEach((input) => {
    input.addEventListener("input", (e) => {
      e.preventDefault();
      let value = input.value;
      let width = value.length * 8 + 8; // the first 8 is typically the character limit.
      input.style.width = width + "px";
    });
  });
}

async function getAiData(task) {
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
  const newArray = replacedTextResult.split(", ");
  return newArray;
}
