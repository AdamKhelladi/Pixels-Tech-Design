/* 
  -------------------------
  -- Pixels Tech Website --
  -------------------------
*/

// Start Landing Page

// Make Background URL Changing
let landingPage = document.querySelector(".landing-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

let intervalId = setInterval(() => changeBackgroundUrl(), 1000);

// Toggle Spin Class On Icon
let settingBox = document.querySelector(".settings-box");
let gearContainer = document.querySelector(".toggle-container");
let gearBtn = document.querySelector(".toggle-container .fa-gear");

gearContainer.addEventListener("click", openSettingBox);

// Switch Colors
let colorIcons = document.querySelectorAll(".colors-list li");
colorIcons.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    document.documentElement.style.setProperty(
      "--hover-color",
      e.target.dataset.color
    );

    // Set Color To Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    removeActiveClass(colorIcons);
    addActiveClass(e.target);
  });
});

// Get Color From Local Storage
getColorFromLocalStorage();

// Random Background Images
let randomImgsBtn = document.querySelectorAll(".random-backgrounds div span");
randomImgsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActiveClass(randomImgsBtn);
    addActiveClass(e.target);

    if (e.target.dataset.background === "no") {
      stopChangingBackground();
    } else {
      changingBackground();
    }
  });
});

// Functions
function changeBackgroundUrl() {
  let randomImgage =
    imagesArray[Math.floor(Math.random() * imagesArray.length)];
  landingPage.style.backgroundImage = `url(../media/${randomImgage})`;
}

function openSettingBox() {
  gearBtn.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
}

function getColorFromLocalStorage() {
  let mainColor = localStorage.getItem("color_option");
  if (mainColor !== null) {
    document.querySelector(".links li a").style.transition = 0;
    document.documentElement.style.setProperty("--main-color", mainColor);

    colorIcons.forEach((color) => {
      if (
        color.dataset.color ===
        document.documentElement.style.getPropertyValue("--main-color")
      ) {
        color.classList.add("active");
      }
    });
  }
}

function addActiveClass(targetElement) {
  targetElement.classList.add("active");
}

function removeActiveClass(elements) {
  elements.forEach((elements) => {
    elements.classList.remove("active");
  });
}

function changingBackground() {
  intervalId = setInterval(() => changeBackgroundUrl(), 1000);
}

function stopChangingBackground() {
  clearInterval(intervalId);
}

// End Landing Page
