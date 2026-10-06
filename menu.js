function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
  document.getElementById('date').textContent = now.toLocaleDateString([], {weekday: 'short', month: 'numeric', day: 'numeric'});
}
updateClock();
setInterval(updateClock, 1000);

const track = document.querySelector('.channel-track');
const pages = [...document.querySelectorAll('.channel-track .channel-grid')];
const previousPage = document.querySelector('.previous-page');
const nextPage = document.querySelector('.next-page');
const dots = [...document.querySelectorAll('[data-page]')];
let currentPage = location.hash === '#page-2' ? 1 : 0;
function showPage(index) {
  currentPage = Math.max(0, Math.min(pages.length - 1, index));
  track.style.transform = `translateX(-${currentPage * 100}%)`;
  pages.forEach((page, i) => { page.inert = i !== currentPage; });
  previousPage.disabled = currentPage === 0;
  nextPage.disabled = currentPage === pages.length - 1;
  dots.forEach((dot, i) => {
    if (i === currentPage) dot.setAttribute('aria-current', 'page');
    else dot.removeAttribute('aria-current');
  });
  document.querySelector('.page-status').textContent = `Channel page ${currentPage + 1} of ${pages.length}`;
  history.replaceState(null, '', `#page-${currentPage + 1}`);
  if (document.activeElement.disabled) dots[currentPage].focus({preventScroll: true});
}
previousPage.addEventListener('click', () => showPage(currentPage - 1));
nextPage.addEventListener('click', () => showPage(currentPage + 1));
dots.forEach(dot => dot.addEventListener('click', () => showPage(Number(dot.dataset.page))));
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showPage(currentPage + (event.key === 'ArrowRight' ? 1 : -1));
    dots[currentPage].focus({preventScroll: true});
  }
});
window.addEventListener('hashchange', () => showPage(location.hash === '#page-2' ? 1 : 0));
showPage(currentPage);
