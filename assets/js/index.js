// Fetching OpenAI data

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer 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"
);

var raw = JSON.stringify({
  model: "text-davinci-003",
  prompt: `Break down '${task}' into smaller tasks seperated by commas`,
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
