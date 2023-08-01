// Trigger fading animation on load.
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
