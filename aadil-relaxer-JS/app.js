// getting the appropriate elmenets.
const biggerCircle = document.querySelector('.circle');
const circleText = document.querySelector('.circle-inner-text');
// make sure breathingTime is atleast double of total time.
const breathingTotalTime = 8000;
const holdTime = 2500;
const breathingOutTime = 2000;

setInterval(() => {
biggerCircle.style.transform = "scale(1.5,1.5)";
circleText.textContent = "breath in!";

  setTimeout(() => {
    biggerCircle.style.transform = "scale(1.5,1.5)";
    circleText.textContent = "hold!";
    setTimeout(() => {
      biggerCircle.style.transform = "scale(1,1)";
      circleText.textContent = "breath out!";
    }, 2000);
  }, 2500);
}, 8000);



