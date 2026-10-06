const channel = new URLSearchParams(location.search).get('channel');
const names = {'disc-channel':'Disc Channel','mii-channel':'Mii Channel','photo-channel':'Photo Channel','eshop-channel':'Wii Shop Channel','forecast-channel':'Forecast Channel','news-channel':'News Channel','internet-channel':'Internet Channel','virtual-console':'Virtual Console','check-mii-out':'Check Mii Out','everybody-votes':'Everybody Votes','message-board':'Message Board','settings':'Wii Options'};
if (Object.hasOwn(names, channel)) {
  document.getElementById('title').textContent = names[channel] + ' · Pointer Challenge';
  document.getElementById('back').href = 'channels/' + channel + '.html';
}
const target = document.getElementById('target');
const field = document.getElementById('field');
const status = document.getElementById('status');
const play = document.getElementById('play');
let hits = 0;
let started = 0;
function moveTarget() {
  target.style.left = Math.random() * Math.max(0, field.clientWidth - 65) + 'px';
  target.style.top = Math.random() * Math.max(0, field.clientHeight - 65) + 'px';
}
play.addEventListener('click', () => {
  hits = 0;
  started = performance.now();
  target.hidden = false;
  play.hidden = true;
  status.textContent = 'Targets: 0 / 10';
  moveTarget();
  target.focus({preventScroll: true});
});
target.addEventListener('click', () => {
  hits++;
  if (hits === 10) {
    target.hidden = true;
    play.hidden = false;
    play.textContent = 'Play again';
    status.textContent = 'Great job! 10 targets in ' + ((performance.now() - started) / 1000).toFixed(1) + ' seconds.';
    play.focus({preventScroll: true});
  } else {
    status.textContent = 'Targets: ' + hits + ' / 10';
    moveTarget();
  }
});
window.addEventListener('resize', () => { if (!target.hidden) moveTarget(); });
