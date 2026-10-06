function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
  document.getElementById('date').textContent = now.toLocaleDateString([], {weekday: 'short', month: 'numeric', day: 'numeric'});
}
updateClock();
setInterval(updateClock, 1000);
