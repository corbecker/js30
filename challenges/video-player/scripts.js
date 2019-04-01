// GET OUR ELEMENTS
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress  = player.querySelector('.progress');
const progressBar  = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleScrub(e) {
  const percent = (e.offsetX / progress.offsetWidth) * 100;
  video.currentTime = (video.duration / 100) * percent;
}

//  Hook event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

let mouseDown = false;
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', (e) => mouseDown && handleScrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
