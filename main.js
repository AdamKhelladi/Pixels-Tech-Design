// Pixels Tech Website

// Make Background URL Changing 

let landingPage = document.querySelector(".landing-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

setInterval(() => changeBackgroundUrl(), 5000);

function changeBackgroundUrl() {
  let randomImgage =
    imagesArray[Math.floor(Math.random() * imagesArray.length)];
  landingPage.style.backgroundImage = `url(../media/${randomImgage})`;
}

