/* =========================================================
   NAGASAI — PREMIUM PORTFOLIO
   MAIN INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =======================================================
     NAVBAR
     ======================================================= */

  const header = document.querySelector(".site-header");

  const updateNavbar = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true,
  });

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
  };

  const openMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");
    mobileMenu.classList.add("open");
    body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
  );

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId) return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header
        ? header.getBoundingClientRect().height
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        20;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      history.replaceState(null, "", targetId);
    });
  });

  /* =======================================================
     SCROLL REVEALS
     Clean editorial reveal — no blur / zoom.
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .fade-up, .fade-in, .scale-reveal"
  );

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("active");
      element.classList.add("show");
    });
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("active");
          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
      element.classList.add("show");
    });
  }

  /* =======================================================
     STAGGERED GROUP REVEALS
     ======================================================= */

  const staggerGroups = document.querySelectorAll(
    ".projects-list, .skills-editorial, .experience-list, .services-list, .blog-list, .principles-grid"
  );

  staggerGroups.forEach((group) => {
    const children = Array.from(group.children);

    children.forEach((child, index) => {
      if (!child.hasAttribute("data-delay")) {
        child.style.transitionDelay = prefersReducedMotion
          ? "0s"
          : `${Math.min(index * 0.08, 0.4)}s`;
      }
    });
  });

  /* =======================================================
     CONTACT FORM
     ======================================================= */

  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameField = contactForm.querySelector("#name");
      const emailField = contactForm.querySelector("#email");
      const projectTypeField =
        contactForm.querySelector("#project-type");
      const messageField = contactForm.querySelector("#message");

      const name = nameField
        ? nameField.value.trim()
        : "";

      const email = emailField
        ? emailField.value.trim()
        : "";

      const projectType = projectTypeField
        ? projectTypeField.value.trim()
        : "";

      const message = messageField
        ? messageField.value.trim()
        : "";

      if (!name || !email || !message) {
        contactForm.reportValidity();
        return;
      }

      const mailSubject = encodeURIComponent(
        projectType
          ? `Portfolio Inquiry — ${projectType}`
          : "Portfolio Contact"
      );

      const mailBody = encodeURIComponent(
`Hello Naga Sai,

Name: ${name}
Email: ${email}
Project Type: ${projectType || "Not specified"}

Message:
${message}`
      );

      window.location.href =
        `mailto:nagasaikambala9@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    });
  }

  /* =======================================================
     CUSTOM CURSOR
     Desktop only.
     ======================================================= */

  const cursor = document.querySelector(".custom-cursor");

  if (
    cursor &&
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    const cursorLabel =
      cursor.querySelector(".cursor-label");

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let cursorVisible = false;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!cursorVisible) {
        cursorVisible = true;

        cursor.classList.add("is-visible");

        cursorX = mouseX;
        cursorY = mouseY;
      }
    };

    window.addEventListener("mousemove", moveCursor, {
      passive: true,
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      cursor.style.transform =
        `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-showcase, .service-item, .blog-item"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hovering");

        if (cursorLabel) {
          cursorLabel.textContent = "VIEW";
        }
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hovering");

        if (cursorLabel) {
          cursorLabel.textContent = "";
        }
      });
    });

    document.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-visible");
    });

    document.addEventListener("mouseenter", () => {
      cursor.classList.add("is-visible");
    });
  }

  /* =======================================================
     HERO 360° VISUAL
     
     The system activates only when actual frame
     information exists in the HTML.
     ======================================================= */

  initHero360();

  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const loader = document.querySelector(".page-loader");

  const loaderLine = document.querySelector(
    ".loader-line span"
  );

  const loaderPercentage = document.querySelector(
    ".loader-percentage"
  );

  if (loader) {
    let progress = 0;

    const updateLoader = (value) => {
      progress = Math.min(100, value);

      if (loaderLine) {
        loaderLine.style.width = `${progress}%`;
      }

      if (loaderPercentage) {
        loaderPercentage.textContent =
          `${Math.round(progress)}%`;
      }
    };

    updateLoader(20);

    window.addEventListener("load", () => {
      updateLoader(100);

      setTimeout(() => {
        loader.classList.add("loaded");
        body.classList.remove("is-loading");
      }, prefersReducedMotion ? 0 : 250);
    });

    body.classList.add("is-loading");
  }

  /* =======================================================
     ACTIVE SECTION TRACKING
     ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
  );

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${id}`
              );
            });
          });
        },
        {
          threshold: 0.2,
          rootMargin: "-20% 0px -65% 0px",
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});


/* =========================================================
   HERO 360° INITIALIZATION
   ========================================================= */

function initHero360() {
  const visual = document.querySelector(".hero-visual");
  const canvas = document.querySelector(".hero-canvas");

  if (!visual || !canvas) return;

  /*
    The 360° system requires real frame assets.

    Example:

    <div
      class="hero-visual"
      data-frames="/assets/360/frame-{index3}.webp"
      data-frame-count="120"
    >

    Until those assets are supplied, the normal profile
    image remains visible.
  */

  const frameSource =
    visual.dataset.frames ||
    canvas.dataset.frames;

  const frameCount = Number(
    visual.dataset.frameCount ||
    canvas.dataset.frameCount ||
    0
  );

  if (!frameSource || !frameCount) {
    return;
  }

  const context = canvas.getContext("2d", {
    alpha: true,
  });

  if (!context) return;

  const images = new Array(frameCount);

  let currentFrame = -1;

  const getFrameUrl = (index) => {
    return frameSource
      .replace(
        "{index}",
        String(index + 1)
      )
      .replace(
        "{index2}",
        String(index + 1).padStart(2, "0")
      )
      .replace(
        "{index3}",
        String(index + 1).padStart(3, "0")
      );
  };

  const resizeCanvas = () => {
    const rect =
      canvas.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width =
      Math.round(rect.width * dpr);

    canvas.height =
      Math.round(rect.height * dpr);

    canvas.style.width =
      `${rect.width}px`;

    canvas.style.height =
      `${rect.height}px`;

    context.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    if (currentFrame >= 0) {
      drawFrame(currentFrame);
    }
  };

  const drawFrame = (index) => {
    const image = images[index];

    if (
      !image ||
      !image.complete ||
      !image.naturalWidth ||
      !image.naturalHeight
    ) {
      return;
    }

    const rect =
      canvas.getBoundingClientRect();

    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    if (!canvasWidth || !canvasHeight) return;

    const imageRatio =
      image.naturalWidth /
      image.naturalHeight;

    const canvasRatio =
      canvasWidth /
      canvasHeight;

    let width;
    let height;

    /*
      Contain the frame inside the visual area.
      This prevents the subject from being cropped.
    */

    if (imageRatio > canvasRatio) {
      width = canvasWidth;
      height = width / imageRatio;
    } else {
      height = canvasHeight;
      width = height * imageRatio;
    }

    const x =
      (canvasWidth - width) / 2;

    const y =
      (canvasHeight - height) / 2;

    context.clearRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    context.drawImage(
      image,
      x,
      y,
      width,
      height
    );

    currentFrame = index;
  };

  const loadFrame = (index) => {
    if (
      index < 0 ||
      index >= frameCount
    ) {
      return;
    }

    if (images[index]) {
      return;
    }

    const image = new Image();

    image.decoding = "async";

    image.src = getFrameUrl(index);

    image.onload = () => {
      images[index] = image;

      if (index === 0) {
        resizeCanvas();
        drawFrame(0);

        visual.classList.add(
          "is-360-active"
        );
      }

      /*
        If this frame was requested while scrolling
        and is now available, draw it immediately.
      */

      if (index === currentFrame) {
        drawFrame(index);
      }
    };

    image.onerror = () => {
      console.warn(
        `360° frame failed to load: ${image.src}`
      );
    };
  };

  /* =======================================================
     FIRST FRAME
     ======================================================= */

  loadFrame(0);

  /* =======================================================
     PROGRESSIVE PRELOADING
     ======================================================= */

  let preloadIndex = 1;

  const preloadNext = () => {
    if (preloadIndex >= frameCount) {
      return;
    }

    loadFrame(preloadIndex);

    preloadIndex++;

    window.requestAnimationFrame(
      preloadNext
    );
  };

  window.requestAnimationFrame(
    preloadNext
  );

  /* =======================================================
     SCROLL → FRAME MAPPING
     
     0%   = front
     12%  = 3/4
     25%  = side
     37%  = 3/4 back
     50%  = back
     62%  = opposite 3/4 back
     75%  = opposite side
     87%  = 3/4 front
     100% = original front
     ======================================================= */

  let ticking = false;

  const updateFrameFromScroll = () => {
    ticking = false;

    const rect =
      visual.getBoundingClientRect();

    const viewportHeight =
      window.innerHeight;

    /*
      The frame sequence progresses while the hero
      travels through the viewport.
    */

    const totalDistance =
      Math.max(
        1,
        rect.height - viewportHeight
      );

    const progress = Math.min(
      1,
      Math.max(
        0,
        -rect.top / totalDistance
      )
    );

    const frameIndex =
      Math.round(
        progress * (frameCount - 1)
      );

    /*
      Load the requested frame immediately if it
      has not already been loaded.
    */

    loadFrame(frameIndex);

    if (images[frameIndex]) {
      drawFrame(frameIndex);
    }
  };

  const onScroll = () => {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(
      updateFrameFromScroll
    );
  };

  window.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true,
    }
  );

  window.addEventListener(
    "resize",
    resizeCanvas,
    {
      passive: true,
    }
  );

  resizeCanvas();

  /*
    Draw the correct frame if the hero is already
    partially scrolled when initialization occurs.
  */

  updateFrameFromScroll();
}


/* =========================================================
   GLOBAL ERROR PROTECTION
   ========================================================= */

window.addEventListener(
  "error",
  (event) => {
    /*
      Prevent an optional missing image/script asset
      from making the portfolio feel broken.
    */

    if (
      event.target &&
      (
        event.target.tagName === "IMG" ||
        event.target.tagName === "SCRIPT"
      )
    ) {
      console.warn(
        "Portfolio asset could not be loaded:",
        event.target.src || event.target
      );
    }
  },
  true
);