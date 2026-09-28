/* =========================================================
   NAGASAI — PREMIUM PORTFOLIO
   PARTICLES MODULE
========================================================= */

/*
  The previous portfolio used tsParticles and particles.js
  for cyan/purple connected particle backgrounds.

  The new portfolio uses a minimal editorial visual system,
  so heavy particle backgrounds have been intentionally
  removed.

  This file is kept as a safe compatibility module in case
  index.html or another script still references it.
*/


/* =========================================================
   OPTIONAL SUBTLE AMBIENT EFFECT
========================================================= */

export function initAmbientBackground() {
  const particlesContainer =
    document.querySelector("#particles");

  const skillsParticles =
    document.querySelector("#particles-skills");

  /*
    Remove legacy particle containers from the visual
    layer if they still exist in older HTML.
  */

  if (particlesContainer) {
    particlesContainer.setAttribute(
      "aria-hidden",
      "true"
    );

    particlesContainer.style.pointerEvents =
      "none";
  }

  if (skillsParticles) {
    skillsParticles.setAttribute(
      "aria-hidden",
      "true"
    );

    skillsParticles.style.pointerEvents =
      "none";
  }
}


/* =========================================================
   AUTO INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initAmbientBackground();
});