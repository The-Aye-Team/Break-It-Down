// Trigger fading animation on load.
const message = document.querySelector("#message-fade");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    message.classList.add("fadeIn");
  }, 1000);
  console.log("Window loaded");
});

// Saves name of user to local storage
document.querySelector(".beginBtn").addEventListener('click', () => {
    const nameInput = document.querySelector('.nameIn').value;
    localStorage.setItem('userName' , nameInput);
});

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer API KEY GOES HERE");

var raw = JSON.stringify({
  model: "text-davinci-003",
  prompt: `Break down '' into smaller tasks seperated by commas`,
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
    console.log(newArray);
  })
  .catch((error) => console.log("error", error));

// This completes the script
