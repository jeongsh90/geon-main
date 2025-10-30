const smootherInstance = ScrollSmoother.get();
const scrollBox = document.querySelector("#scroll-bar");
const scrollBar = scrollBox.querySelector("span");

function updateBar() {
  if (!smootherInstance) return;

  const contentHeight = document.querySelector(".smooth-content").scrollHeight;
  const scrollTop = smootherInstance.scrollTop();
  const viewHeight = window.innerHeight;

  const viewRatio = viewHeight / contentHeight;
  const barHeight = Math.max(viewRatio * scrollBox.offsetHeight, 40);
  scrollBar.style.height = barHeight + "px";

  const maxMove = scrollBox.offsetHeight - barHeight;
  const progress = scrollTop / (contentHeight - viewHeight);

  scrollBar.style.transform = `translateY(${progress * maxMove}px)`;
  showBar();
}

ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate: updateBar
});

window.addEventListener("load", updateBar);
window.addEventListener("resize", updateBar);

let isDragging = false;
let startY = 0;
let startTop = 0;

scrollBar.addEventListener("mousedown", e => {
  isDragging = true;
  startY = e.clientY;
  startTop = parseFloat(scrollBar.style.transform.replace(/translateY\(|px\)/g, "")) || 0;
  document.body.style.userSelect = "none";
  showBar();
});

document.addEventListener("mousemove", e => {
  if (!isDragging) return;

  const contentHeight = document.querySelector(".smooth-content").scrollHeight;
  const viewHeight = window.innerHeight;
  const barHeight = scrollBar.offsetHeight;
  const maxMove = scrollBox.offsetHeight - barHeight;

  let newTop = startTop + (e.clientY - startY);
  newTop = Math.max(0, Math.min(maxMove, newTop));

  scrollBar.style.transform = `translateY(${newTop}px)`;

  const progress = newTop / maxMove;
  smootherInstance.scrollTo(progress * (contentHeight - viewHeight), true);
  showBar();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

// ========== 자동 숨김 기능 ==========
let hideTimer;
function showBar() {
  scrollBox.classList.add("show");
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (!scrollBox.matches(":hover") && !isDragging) {
      scrollBox.classList.remove("show");
    }
  }, 800); // ✅ 800ms 후 사라짐
}
