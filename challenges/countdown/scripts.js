let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds);// display initial time immediately
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if(secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
  
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  if(remainderSeconds < 10){
    remainderSeconds = '0' + remainderSeconds;
  }
  const display = `${minutes}:${remainderSeconds}`;
  timerDisplay.textContent = display;

  document.title = display;
}

function displayEndTime(timestamp) {
  const then = new Date(timestamp);
  const hours = then.getHours();
  const minutes = then.getMinutes();
  endTime.textContent = `Be back at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const seconds = this.minutes.value * 60;
  this.reset();
  timer(seconds);
})