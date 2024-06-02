/* 
  -------------------------
  -- Pixels Tech Website --
  -------------------------
*/

// Make Background URL Changing
let landingPage = document.querySelector(".landing-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

let intervalId;
function changeBackgroundUrl() {
  let randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
  landingPage.style.backgroundImage = `url(/media/${randomImage})`;
}

function startChangingBackground() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(changeBackgroundUrl, 5000);
}
startChangingBackground();

// Toggle Spin Class On Icon
let settingBox = document.querySelector(".settings-box");
let gearContainer = document.querySelector(".toggle-container");
let gearBtn = document.querySelector(".toggle-container .fa-gear");

gearContainer.addEventListener("click", openSettingBox);

function openSettingBox() {
  gearBtn.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
}

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
    checkBgLocalStorage();
  });
});

// Get Color From Local Storage
getColorFromLocalStorage();

function getColorFromLocalStorage() {
  let mainColor = localStorage.getItem("color_option");
  if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);

    colorIcons.forEach((color) => {
      if (color.dataset.color === mainColor) {
        color.classList.add("active");
      }
    });
  }
}

// Random Background Images
let randomImgsBtn = document.querySelectorAll(".random-backgrounds div span");
randomImgsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActiveClass(randomImgsBtn);
    addActiveClass(e.target);

    if (e.target.dataset.background === "no") {
      localStorage.setItem("background_option", "no");
      clearInterval(intervalId);
    } else {
      localStorage.setItem("background_option", "yes");
      startChangingBackground();
    }
  });
});

// Check If There's Background Option Item In Local Storage
checkBgLocalStorage();

function checkBgLocalStorage() {
  let bgLocalItem = localStorage.getItem("background_option");
  if (bgLocalItem !== null) {
    if (bgLocalItem === "no") {
      clearInterval(intervalId);
    } else {
      startChangingBackground();
    }
    removeActiveClass(randomImgsBtn);
    addActiveClassFromLocalStorage();
  }
}

function addActiveClassFromLocalStorage() {
  randomImgsBtn.forEach((btn) => {
    if (btn.dataset.background === localStorage.getItem("background_option")) {
      btn.classList.add("active");
    }
  });
}

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

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

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
      overlay.remove();
    });
  });
});

// Manage Bullets and Links
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

scrollToSection(allBullets);
scrollToSection(allLinks);

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      removeActiveClass(elements);
      addActiveClass(e.target);

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Show Bullets
let bulletsSpan = document.querySelectorAll(".show-bullets div span");
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    removeActiveClass(bulletsSpan);
    addActiveClass(e.target);

    if (span.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      localStorage.setItem("bullets_option", "none");
      bulletsContainer.style.display = "none";
    }
  });
});

// Check If There's Bullets Option Item In Local Storage
checkBulletsLocalStorage();

function checkBulletsLocalStorage() {
  let bulletsLocalItem = localStorage.getItem("bullets_option");

  if (bulletsLocalItem !== null) {
    if (bulletsLocalItem === "block") {
      removeActiveClass(bulletsSpan);
      bulletsContainer.style.display = "block";

      document.querySelector(".show-bullets .yes").classList.add("active");
    } else {
      removeActiveClass(bulletsSpan);
      bulletsContainer.style.display = "none";

      document.querySelector(".show-bullets .no").classList.add("active");
    }
  }
}

// Utility Functions
function addActiveClass(targetElement) {
  targetElement.classList.add("active");
}

function removeActiveClass(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}
