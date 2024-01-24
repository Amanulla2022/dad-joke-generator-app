const myBtnElement = document.getElementById("btn");
const jokesElement = document.getElementById("joke");
const shareBtnElement = document.getElementById("shareBtn");
const toggleDarkModeBtn = document.getElementById("toggleBtn");

const apiKey = "vp58dNISilZBKk/9Wr5fdQ==EnDpVlnTtNG5tbhE";
const BASE_URL = "https://api.api-ninjas.com/v1/dadjokes";
let isDarkMode = false;

myBtnElement.addEventListener("click", function () {
  showLoadingState();

  fetch(BASE_URL, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => showJoke(data[0].joke))
    .catch(handleError);
});

function showLoadingState() {
  jokesElement.innerText = "Wait Thinking....";
  disableControls();
  updateButtonState("Updating...", "blueviolet");
}

function showJoke(joke) {
  jokesElement.innerText = joke;
  enableControls();
  updateButtonState("Another Joke", "green");
}

function handleError() {
  jokesElement.innerText = "Something went wrong";
  enableControls();
  updateButtonState("Oops!!!", "red");
}

function disableControls() {
  myBtnElement.disabled = true;
  shareBtnElement.disabled = true;
  toggleDarkModeBtn.disabled = true;
}

function enableControls() {
  myBtnElement.disabled = false;
  shareBtnElement.disabled = false;
  toggleDarkModeBtn.disabled = false;
}

function updateButtonState(text, color) {
  myBtnElement.innerText = text;
  myBtnElement.style.color = color;
}

shareBtnElement.addEventListener("click", function () {
  const jokeToShare = jokesElement.innerText;

  if (navigator.share) {
    navigator
      .share({
        title: "Dad Joke",
        text: jokeToShare,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    alert("Web Share API is not supported in this browser");
  }
});

toggleDarkModeBtn.addEventListener("click", function () {
  isDarkMode = !isDarkMode;
  const backgroundColor = isDarkMode ? "#333" : "#fff";
  const textColor = isDarkMode ? "#fff" : "#000";

  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = textColor;

  toggleDarkModeBtn.innerText = isDarkMode ? "L" : "D";
  toggleDarkModeBtn.style.backgroundColor = textColor;
  toggleDarkModeBtn.style.color = backgroundColor;
});
