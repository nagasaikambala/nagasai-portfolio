/* =========================================================
   NAGASAI — PREMIUM PORTFOLIO
   ANIMATIONS MODULE
========================================================= */

/*
  Scroll reveal animations are handled centrally by
  src/scripts/main.js.

  This file intentionally contains only optional,
  reusable animation helpers so that animations are
  not initialized twice.
*/


/* =========================================================
   STAGGER HELPER
========================================================= */

export function applyStagger(
  container,
  selector = ":scope > *",
  delay = 0.08
) {
  if (!container) return;

  const elements =
    container.querySelectorAll(selector);

  elements.forEach((element, index) => {
    element.style.transitionDelay =
      `${Math.min(index * delay, 0.5)}s`;
  });
}


/* =========================================================
   SIMPLE ELEMENT REVEAL
========================================================= */

export function revealElement(element) {
  if (!element) return;

  element.classList.add("active");
  element.classList.add("show");
}


/* =========================================================
   REVEAL MULTIPLE ELEMENTS
========================================================= */

export function revealElements(elements) {
  if (!elements) return;

  elements.forEach((element) => {
    revealElement(element);
  });
}