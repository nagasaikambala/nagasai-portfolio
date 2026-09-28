/* =========================================================
   NAGASAI — PREMIUM PORTFOLIO
   COUNTERS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;


  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =======================================================
     FORMAT COUNTER VALUE
  ======================================================= */

  const formatValue = (value, target) => {

    /*
      Preserve decimal values if the target contains one.
    */

    if (String(target).includes(".")) {
      return value.toFixed(1);
    }

    return Math.round(value).toString();
  };


  /* =======================================================
     SET FINAL VALUE
  ======================================================= */

  const setFinalValue = (counter) => {

    const target =
      Number(counter.dataset.target);

    if (!Number.isFinite(target)) return;

    counter.textContent =
      formatValue(target, target);
  };


  /* =======================================================
     ANIMATE COUNTER
  ======================================================= */

  const animateCounter = (counter) => {

    const target =
      Number(counter.dataset.target);

    if (!Number.isFinite(target)) return;

    /*
      Respect reduced-motion preferences.
    */

    if (prefersReducedMotion) {
      setFinalValue(counter);
      return;
    }


    const duration = 1200;

    const startTime =
      performance.now();


    const update = (currentTime) => {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /*
        Ease-out curve:
        fast at the beginning,
        slower near the final number.
      */

      const eased =
        1 - Math.pow(1 - progress, 3);


      const currentValue =
        target * eased;


      counter.textContent =
        formatValue(
          currentValue,
          target
        );


      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setFinalValue(counter);
      }
    };


    requestAnimationFrame(update);
  };


  /* =======================================================
     INTERSECTION OBSERVER
  ======================================================= */

  if (!("IntersectionObserver" in window)) {

    counters.forEach((counter) => {
      setFinalValue(counter);
    });

    return;
  }


  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;


          const counter =
            entry.target;


          /*
            Prevent the same counter from
            animating multiple times.
          */

          if (
            counter.dataset.counted === "true"
          ) {
            return;
          }


          counter.dataset.counted = "true";

          animateCounter(counter);

          observer.unobserve(counter);
        });
      },
      {
        threshold: 0.5
      }
    );


  counters.forEach((counter) => {

    /*
      Initialize from zero when animation
      is enabled.
    */

    if (!prefersReducedMotion) {
      counter.textContent = "0";
    }

    counterObserver.observe(counter);
  });

});