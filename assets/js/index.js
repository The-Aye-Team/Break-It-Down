const container = document.querySelector("#tasks-container");
if(container !== null) {
console.log(`item ` + sessionStorage.getItem(`hasVisited`))
  if (sessionStorage.getItem(`hasVisited`) === null) {
    window.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        container.classList.add("fadeInTaskView");
      }, 4000);
      return;
    });
  } else {
    window.addEventListener("DOMContentLoaded", () => {
      container.classList.add("fadeInTaskView");
    });
  };
};
// Trigger fading animation on load.
if (sessionStorage.getItem(`hasVisited`) === null) {
  if (document.querySelector("#message-fade") != null) {
    const message = document.querySelector("#message-fade");
    const welcome = document.querySelector("#welcome");

    let myName = localStorage.getItem("userName") || "Friend";
    welcome.innerHTML = `Welcome ${myName},`;

    window.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        message.classList.add("fadeIn");
      }, 1000);

      setTimeout(() => {
        message.classList.add("fadeAway");
      }, 3000);
    });
    sessionStorage.setItem(`hasVisited`, `true`);
  }
}


// Saves name of user to local storage
if (document.querySelector(".nameIn") != null) {
  btnClick = () => {
    const nameInput = document.querySelector(".nameIn").value;
    localStorage.setItem("userName", nameInput);
  };
  // Checking for enter keypress
  document.querySelector(".nameIn").addEventListener("keypress", (e) => {
    if (e.key === `Enter`) {
      document.querySelector(`.beginBtn`).click();
      btnClick();
    }
  });
}
