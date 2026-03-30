/**
 * Premium smooth scroll — wheel moves slower and decelerates
 * naturally. Starts instantly, no delay.
 *
 * How it works:
 * - Each wheel tick adds a reduced delta to `targetY`
 * - Every RAF frame, `currentY` lerps toward `targetY` (factor 0.1)
 * - Result: instant start, gradual deceleration — like premium sites
 */

const WHEEL_SCALE = 0.4;
const LERP = 0.1;

let currentY = window.scrollY;
let targetY  = window.scrollY;
let running  = false;
let wheelActive = false; // true only while wheel is driving the scroll

function tick() {
  const diff = targetY - currentY;

  if (Math.abs(diff) < 0.5) {
    currentY = targetY;
    window.scrollTo(0, currentY);
    running     = false;
    wheelActive = false;
    return;
  }

  currentY += diff * LERP;
  window.scrollTo(0, currentY);
  requestAnimationFrame(tick);
}

function onWheel(e: WheelEvent) {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  e.preventDefault();

  // Always sync from real scroll position before accumulating
  // This ensures nav-link jumps are respected
  if (!wheelActive) {
    currentY = window.scrollY;
    targetY  = window.scrollY;
  }

  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  targetY = Math.max(0, Math.min(targetY + e.deltaY * WHEEL_SCALE, maxY));
  wheelActive = true;

  if (!running) {
    running = true;
    requestAnimationFrame(tick);
  }
}

export function initSmoothScroll() {
  if ('ontouchstart' in window) return;
  window.addEventListener('wheel', onWheel, { passive: false });
}
