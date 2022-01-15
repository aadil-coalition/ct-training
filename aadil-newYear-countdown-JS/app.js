const DHMS = document.querySelectorAll('.number');
const loader = document.querySelector('.loader');
const upcomingYear = document.querySelector('.upcoming-year');
const container = document.querySelector('.container');
function getNewYearTime() {
  const curruntDT = new Date();
  const nextYear = curruntDT.getFullYear() + 1;
  const newYear = new Date(`January 01 ${nextYear} 00:00:00`);
  
  // time units
  const day = 1000*60*60*24;
  const hour = 1000*60*60;
  const minute = 1000*60;
  const second = 1000;

  const days = Math.floor((newYear.getTime()  / day) - (curruntDT.getTime() /  day));
  const hours =  Math.floor(((newYear.getTime()  / hour) - (curruntDT.getTime() /  hour)) % 24);
  const minutes = Math.floor(((newYear.getTime()  / minute) - (curruntDT.getTime() /  minute)) % 60);
  const seconds = Math.floor(((newYear.getTime()  / second) - (curruntDT.getTime() /  second)) % 60);

  DHMS[0].textContent = days.toString();
  DHMS[1].textContent = hours.toString();
  DHMS[2].textContent = minutes.toString();
  DHMS[3].textContent = seconds.toString();
  upcomingYear.textContent = nextYear.toString();
}


document.addEventListener('DOMContentLoaded', () => {
  container.style.display = 'none';
  loader.style.display = 'block';
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    },1000)
  });

  result
  .then(() => {
    container.style.display = 'block';
    loader.style.display = 'none';
    setInterval(() => {
      getNewYearTime();
    }, 1000);  
  });

  // this is without promise but if we need to perform more async funciton that we might have ended up with callback hell.
  // setTimeout(() => {
  //   setInterval(() => {
  //     getNewYearTime();
  //   }, 1000);  
  // }, 500);
});
