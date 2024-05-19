/* 
  -------------------------
  -- Pixels Tech Website --
  -------------------------
*/

// Make Background URL Changing
let landingPage = document.querySelector(".landing-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

let intervalId = setInterval(() => changeBackgroundUrl(), 5000);

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
    checkBgFromLocalStorage();
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
      localStorage.setItem("background_option", "no");
      stopChangingBackground();
    } else {
      localStorage.setItem("background_option", "yes");
      changingBackground();
    }
  });
});

// Check If There's Local Storage Random Background Item
checkBgFromLocalStorage();

// Skills Progress Transition
document.addEventListener("DOMContentLoaded", function () {
  let ourSkills = document.querySelector(".skills");

  if (!ourSkills) {
    console.error("No element with class 'skills' found.");
    return;
  }

  window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = window.innerHeight;
    let windowScrollTop = window.pageYOffset;

    if (
      windowScrollTop + 1 >
      skillsOffsetTop + skillsOuterHeight - windowHeight
    ) {
      let allSkills = document.querySelectorAll(
        ".skill-box .skill-progress span"
      );

      allSkills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    }
  };
});

// Create Popup Wit The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overley = document.createElement("div");
    overley.className = "popup-overley";
    document.body.appendChild(overley);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h2");
      imgHeading.innerHTML = img.alt;

      popupBox.appendChild(imgHeading);
    }

    let popupImg = document.createElement("img");
    popupImg.src = img.src;

    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    let closeBtn = document.createElement("div");
    closeBtn.className = "close-btn";

    let xmark = document.createElement("i");
    xmark.className = "fa-solid fa-xmark";

    closeBtn.appendChild(xmark);
    popupBox.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
      popupBox.remove();
      overley.remove();
    })
  });
});

// Functions
function changeBackgroundUrl() {
  let randomImgage =
    imagesArray[Math.floor(Math.random() * imagesArray.length)];
  landingPage.style.backgroundImage = `url(/media/${randomImgage})`;
}

function openSettingBox() {
  gearBtn.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
}

function getColorFromLocalStorage() {
  let mainColor = localStorage.getItem("color_option");
  if (mainColor !== null) {
    document.querySelector(".links li a").style.transition = 0;
    document.querySelector(".toggle-container").style.transition = 0;
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
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}

function changingBackground() {
  intervalId = setInterval(() => changeBackgroundUrl(), 5000);
}

function stopChangingBackground() {
  clearInterval(intervalId);
}

function addActiveClassFromLocalStorage() {
  randomImgsBtn.forEach((btn) => {
    if (btn.dataset.background === localStorage.getItem("background_option")) {
      btn.classList.add("active");
    }
  });
}

function checkBgFromLocalStorage() {
  let bgLocalItem = localStorage.getItem("background_option");

  if (bgLocalItem !== null) {
    if (bgLocalItem === "no") {
      stopChangingBackground();
      removeActiveClass(randomImgsBtn);
      addActiveClassFromLocalStorage();
    } else {
      changingBackground();
      removeActiveClass(randomImgsBtn);
      addActiveClassFromLocalStorage();
    }
  }
}
