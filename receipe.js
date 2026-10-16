document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     LUCIDE ICON REFRESH
  ========================================================= */

  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  /* =========================================================
     HEADER ELEMENTS
  ========================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const homeButton = document.getElementById("homeDropdownButton");
  const dropdown = document.querySelector(".nav-dropdown");
  const header = document.getElementById("siteHeader");

  /* =========================================================
     ACTIVE NAVIGATION
     Home 1 / Home 2 both activate Home
     Other pages activate their matching link
  ========================================================= */

  const setActiveNavigation = () => {
    if (!mainNav) return;

    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    const homePages = ["", "index.html", "index1.html"];

    // Clear all previous active states
    mainNav.querySelectorAll(".nav-link.active").forEach((link) => {
      link.classList.remove("active");
    });

    // Home active for both home pages
    if (homePages.includes(currentPage)) {
      if (homeButton) {
        homeButton.classList.add("active");
      }
      return;
    }

    // Activate the matching page link
    mainNav.querySelectorAll("a.nav-link[href]").forEach((link) => {
      // Ignore Home 1 / Home 2 dropdown links
      if (link.closest(".nav-dropdown")) return;

      // Ignore mobile login/enquiry link
      if (link.classList.contains("mobile-login")) return;

      try {
        const linkPage = new URL(
          link.getAttribute("href"),
          window.location.href,
        ).pathname
          .split("/")
          .pop()
          .toLowerCase();

        if (linkPage && linkPage === currentPage) {
          link.classList.add("active");
        }
      } catch (error) {
        // Ignore invalid URLs
      }
    });
  };

  /* =========================================================
     MENU ICON
  ========================================================= */

  const setMenuIcon = (isOpen = false) => {
    if (!menuToggle) return;

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");

    menuToggle.setAttribute("title", isOpen ? "Close Menu" : "Menu");

    refreshIcons();
  };

  /* =========================================================
     CLOSE HOME DROPDOWN
  ========================================================= */

  const closeDropdown = () => {
    if (dropdown) {
      dropdown.classList.remove("active");
    }

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", "false");
    }
  };

  /* =========================================================
     TOGGLE HOME DROPDOWN
  ========================================================= */

  const toggleDropdown = () => {
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains("active");

    dropdown.classList.toggle("active", !isOpen);

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", String(!isOpen));
    }

    refreshIcons();
  };

  /* =========================================================
     MOBILE MENU CONTROLS
  ========================================================= */

  const closeMenu = () => {
    if (mainNav) {
      mainNav.classList.remove("active");
    }

    closeDropdown();
    setMenuIcon(false);
  };

  const openMenu = () => {
    if (!mainNav) return;

    mainNav.classList.add("active");
    setMenuIcon(true);
  };

  const toggleMenu = () => {
    if (!mainNav) return;

    if (mainNav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  /* =========================================================
     HAMBURGER CLICK
  ========================================================= */

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu();
    });
  }

  /* =========================================================
     HOME DROPDOWN BUTTON
  ========================================================= */

  if (homeButton && dropdown) {
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleDropdown();
    });
  }

  /* =========================================================
     NORMAL NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    const navigationLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login)",
    );

    navigationLinks.forEach((link) => {
      if (link.closest(".nav-dropdown")) return;

      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });

    /* HOME 1 / HOME 2 LINKS */

    const homeLinks = mainNav.querySelectorAll(
      ".nav-dropdown .dropdown-menu a",
    );

    homeLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });

    /* MOBILE ENQUIRY */

    const mobileLogin = mainNav.querySelector(".mobile-login");

    if (mobileLogin) {
      mobileLogin.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    }
  }

  /* =========================================================
     CLOSE DROPDOWN ON OUTSIDE CLICK
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (dropdown && !dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  /* =========================================================
     CLOSE MOBILE MENU ON OUTSIDE CLICK
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (!mainNav || !menuToggle) return;
    if (window.innerWidth > 820) return;
    if (!mainNav.classList.contains("active")) return;

    const clickedInsideMenu = mainNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* =========================================================
     HEADER SCROLL
  ========================================================= */

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  /* =========================================================
     RESPONSIVE RESET
  ========================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });

  /* =========================================================
     INITIALIZE
  ========================================================= */

  setActiveNavigation();
  closeMenu();
  updateHeader();
  refreshIcons();
});

/* =====================================================
   GREEN CARDAMOM — SCROLL REVEAL
   Uses existing recipe.js
===================================================== */

const cardamomSection = document.querySelector(".green-cardamom-section");

if (cardamomSection) {
  const cardamomElements = cardamomSection.querySelectorAll(`
    .cardamom-content,
    .cardamom-eyebrow,
    .cardamom-title,
    .cardamom-description,
    .cardamom-process-heading,
    .cardamom-step,
    .cardamom-image
  `);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    cardamomSection.classList.add("is-visible");

    cardamomElements.forEach((element) => {
      element.classList.add("is-visible");
      element.style.removeProperty("--reveal-delay");
    });
  } else {
    /* Stagger processing cards */

    cardamomSection
      .querySelectorAll(".cardamom-step")
      .forEach((step, index) => {
        step.style.setProperty("--reveal-delay", `${index * 100}ms`);
      });

    /* Observe the whole section */

    const cardamomObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          cardamomSection.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    cardamomObserver.observe(cardamomSection);
  }
}

/* =====================================================
   GOLDEN TURMERIC — SCROLL REVEAL
   Existing recipe.js
   Image Left | Content Right | RTL | Responsive
===================================================== */

const turmericSection = document.querySelector(".golden-turmeric-section");

if (turmericSection) {
  const turmericImage = turmericSection.querySelector(".turmeric-image");

  const turmericContent = turmericSection.querySelector(".turmeric-content");

  const turmericElements = turmericSection.querySelectorAll(`
    .turmeric-eyebrow,
    .turmeric-title,
    .turmeric-subtitle,
    .turmeric-description,
    .turmeric-process-heading,
    .turmeric-step
  `);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ================================================
     SHOW EVERYTHING WHEN ANIMATION IS UNAVAILABLE
  ================================================ */

  const revealTurmericImmediately = () => {
    turmericSection.classList.add("is-visible");

    turmericElements.forEach((element) => {
      element.style.removeProperty("--reveal-delay");
      element.classList.add("is-visible");
    });
  };

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTurmericImmediately();
  } else {
    /* ================================================
       STAGGER ANIMATION
    ================================================ */

    turmericElements.forEach((element, index) => {
      let delay = 100;

      if (element.classList.contains("turmeric-title")) {
        delay = 180;
      } else if (element.classList.contains("turmeric-subtitle")) {
        delay = 240;
      } else if (element.classList.contains("turmeric-description")) {
        delay = 300;
      } else if (element.classList.contains("turmeric-process-heading")) {
        delay = 350;
      } else if (element.classList.contains("turmeric-step")) {
        const stepIndex = Array.from(
          turmericSection.querySelectorAll(".turmeric-step"),
        ).indexOf(element);

        delay = 400 + stepIndex * 100;
      }

      element.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    /* ================================================
       INTERSECTION OBSERVER
    ================================================ */

    const turmericObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          turmericSection.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    turmericObserver.observe(turmericSection);
  }

  /* ================================================
     IMAGE ERROR HANDLING
  ================================================ */

  const turmericImg = turmericSection.querySelector(".turmeric-image img");

  if (turmericImg) {
    const handleTurmericImageError = () => {
      turmericImg.classList.add("image-unavailable");
      turmericImg.alt = "Turmeric image unavailable";
    };

    turmericImg.addEventListener("error", handleTurmericImageError, {
      once: true,
    });

    if (turmericImg.complete && turmericImg.naturalWidth === 0) {
      handleTurmericImageError();
    }
  }

  /* ================================================
     KEYBOARD ACCESSIBILITY
  ================================================ */

  turmericSection.querySelectorAll("a, button").forEach((control) => {
    control.addEventListener("focus", () => {
      turmericSection.classList.add("is-visible");
    });
  });
}

/* =====================================================
   AROMATICROOTS — ROYAL CINNAMON SCROLL REVEAL
   Uses existing recipe.js
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const cinnamonSection = document.querySelector(".royal-cinnamon-section");

  if (!cinnamonSection) return;

  const cinnamonContent = cinnamonSection.querySelector(".cinnamon-content");

  const cinnamonImage = cinnamonSection.querySelector(".cinnamon-image");

  const cinnamonSteps = cinnamonSection.querySelectorAll(".cinnamon-step");

  const cinnamonRevealItems = [
    cinnamonSection.querySelector(".cinnamon-eyebrow"),
    cinnamonSection.querySelector(".cinnamon-title"),
    cinnamonSection.querySelector(".cinnamon-subtitle"),
    cinnamonSection.querySelector(".cinnamon-description"),
    cinnamonSection.querySelector(".cinnamon-process-heading"),
    ...cinnamonSteps,
  ].filter(Boolean);

  /* ================================================
     STAGGERED CARD ANIMATION
  ================================================ */

  cinnamonSteps.forEach((step, index) => {
    step.style.transitionDelay = `${0.12 + index * 0.1}s`;
  });

  /* ================================================
     ACCESSIBILITY — REDUCED MOTION
  ================================================ */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    cinnamonSection.classList.add("is-visible");

    cinnamonRevealItems.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
      item.style.transitionDelay = "0s";
    });

    return;
  }

  /* ================================================
     INTERSECTION OBSERVER
  ================================================ */

  if ("IntersectionObserver" in window) {
    const cinnamonObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          cinnamonSection.classList.add("is-visible");

          cinnamonRevealItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.12 + index * 0.08}s`;
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px",
      },
    );

    cinnamonObserver.observe(cinnamonSection);
  } else {
    /* Fallback for older browsers */
    cinnamonSection.classList.add("is-visible");
  }

  /* ================================================
     IMAGE FALLBACK
  ================================================ */

  const cinnamonImg = cinnamonImage?.querySelector("img");

  if (cinnamonImg) {
    cinnamonImg.addEventListener("error", () => {
      cinnamonImg.style.opacity = "0";
      cinnamonImage.style.background = "var(--primary-light)";
    });
  }

  /* ================================================
     RTL SUPPORT
     Existing .is-rtl class remains supported
  ================================================ */

  const updateCinnamonDirection = () => {
    const isRTL =
      document.documentElement.dir === "rtl" || document.body.dir === "rtl";

    cinnamonSection.classList.toggle("is-rtl", isRTL);
  };

  updateCinnamonDirection();

  const directionObserver = new MutationObserver(updateCinnamonDirection);

  directionObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir"],
  });

  directionObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["dir"],
  });
});

/* =====================================================
   AROMATICROOTS — RED CHILI SCROLL REVEAL
   Existing recipe.js
===================================================== */

const redChiliSection = document.querySelector(".red-chili-section");

if (redChiliSection) {
  const chiliImage = redChiliSection.querySelector(".chili-image");

  const chiliContent = redChiliSection.querySelector(".chili-content");

  const chiliSteps = redChiliSection.querySelectorAll(".chili-step");

  const chiliRevealItems = [
    redChiliSection.querySelector(".chili-eyebrow"),
    redChiliSection.querySelector(".chili-title"),
    redChiliSection.querySelector(".chili-subtitle"),
    redChiliSection.querySelector(".chili-description"),
    redChiliSection.querySelector(".chili-process-heading"),
    ...chiliSteps,
  ].filter(Boolean);

  /* ================================================
     RED CHILI PROCESS CARD STAGGER
  ================================================ */

  chiliSteps.forEach((step, index) => {
    step.style.transitionDelay = `${0.15 + index * 0.1}s`;
  });

  /* ================================================
     REDUCE MOTION ACCESSIBILITY
  ================================================ */

  const chiliReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (chiliReducedMotion) {
    redChiliSection.classList.add("is-visible");

    chiliRevealItems.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
      item.style.transitionDelay = "0s";
    });
  } else if ("IntersectionObserver" in window) {
    /* ================================================
       SCROLL REVEAL OBSERVER
    ================================================ */

    const chiliObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          redChiliSection.classList.add("is-visible");

          chiliRevealItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.12 + index * 0.08}s`;
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px",
      },
    );

    chiliObserver.observe(redChiliSection);
  } else {
    /* Fallback for older browsers */
    redChiliSection.classList.add("is-visible");
  }

  /* ================================================
     IMAGE ERROR FALLBACK
  ================================================ */

  const chiliImg = chiliImage?.querySelector("img");

  if (chiliImg) {
    chiliImg.addEventListener("error", () => {
      chiliImage.style.background = "var(--primary-light, #8faf57)";

      chiliImg.style.display = "none";
    });
  }

  /* ================================================
     RTL DIRECTION SUPPORT
  ================================================ */

  const updateChiliDirection = () => {
    const isRTL =
      document.documentElement.dir === "rtl" || document.body.dir === "rtl";

    redChiliSection.classList.toggle("is-rtl", isRTL);
  };

  updateChiliDirection();

  const chiliDirectionObserver = new MutationObserver(updateChiliDirection);

  chiliDirectionObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir"],
  });

  chiliDirectionObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["dir"],
  });
}

/* =====================================================
   AROMATICROOTS — BLACK PEPPER SCROLL REVEAL
   Existing recipe.js
===================================================== */

const blackPepperSection = document.querySelector(".black-pepper-section");

if (blackPepperSection) {
  const pepperImage = blackPepperSection.querySelector(".pepper-image");

  const pepperContent = blackPepperSection.querySelector(".pepper-content");

  const pepperSteps = blackPepperSection.querySelectorAll(".pepper-step");

  const pepperRevealItems = [
    blackPepperSection.querySelector(".pepper-eyebrow"),
    blackPepperSection.querySelector(".pepper-title"),
    blackPepperSection.querySelector(".pepper-subtitle"),
    blackPepperSection.querySelector(".pepper-description"),
    blackPepperSection.querySelector(".pepper-process-heading"),
    ...pepperSteps,
  ].filter(Boolean);

  /* ================================================
     STAGGERED PROCESS CARDS
  ================================================ */

  pepperSteps.forEach((step, index) => {
    step.style.transitionDelay = `${0.15 + index * 0.1}s`;
  });

  /* ================================================
     REDUCED MOTION ACCESSIBILITY
  ================================================ */

  const pepperReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (pepperReducedMotion) {
    blackPepperSection.classList.add("is-visible");

    pepperRevealItems.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
      item.style.transitionDelay = "0s";
    });
  } else if ("IntersectionObserver" in window) {
    /* ================================================
       SCROLL REVEAL OBSERVER
    ================================================ */

    const pepperObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          blackPepperSection.classList.add("is-visible");

          pepperRevealItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.12 + index * 0.08}s`;
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px",
      },
    );

    pepperObserver.observe(blackPepperSection);
  } else {
    /* Fallback for older browsers */
    blackPepperSection.classList.add("is-visible");
  }

  /* ================================================
     IMAGE ERROR FALLBACK
  ================================================ */

  const pepperImg = pepperImage?.querySelector("img");

  if (pepperImg) {
    pepperImg.addEventListener("error", () => {
      pepperImage.style.background = "var(--primary-light, #8faf57)";

      pepperImg.style.display = "none";
    });
  }

  /* ================================================
     RTL DIRECTION SUPPORT
  ================================================ */

  const updatePepperDirection = () => {
    const isRTL =
      document.documentElement.dir === "rtl" || document.body.dir === "rtl";

    blackPepperSection.classList.toggle("is-rtl", isRTL);
  };

  updatePepperDirection();

  const pepperDirectionObserver = new MutationObserver(updatePepperDirection);

  pepperDirectionObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir"],
  });

  pepperDirectionObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["dir"],
  });
}

/* =====================================================
   AROMATICROOTS — WHOLE SPICES SCROLL REVEAL
   Add inside your existing DOMContentLoaded callback
===================================================== */

{
  const wholeSection = document.querySelector(".whole-process-section");

  if (wholeSection) {
    const wholeVisual = wholeSection.querySelector(".whole-process-visual");
    const wholeContent = wholeSection.querySelector(".whole-process-content");
    const wholeImage = wholeSection.querySelector(".whole-process-image");

    const wholeRevealItems = wholeSection.querySelectorAll(`
      .whole-section-eyebrow,
      .whole-process-title,
      .whole-process-subtitle,
      .whole-process-description,
      .whole-process-divider,
      .whole-process-heading
    `);

    const wholeProcessItems = wholeSection.querySelectorAll(".process-item");

    const wholeReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* -----------------------------------------------
       INITIAL REVEAL STATE
    ------------------------------------------------ */

    wholeProcessItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.09}s`;
    });

    wholeRevealItems.forEach((item, index) => {
      item.style.transitionDelay = `${0.12 + index * 0.1}s`;
    });

    /* -----------------------------------------------
       REVEAL ON SCROLL
    ------------------------------------------------ */

    const showWholeSection = () => {
      wholeVisual?.classList.add("is-visible");
      wholeContent?.classList.add("is-visible");

      wholeRevealItems.forEach((item) => {
        item.classList.add("is-visible");
      });

      wholeProcessItems.forEach((item) => {
        item.classList.add("is-visible");
      });
    };

    if (wholeReducedMotion) {
      showWholeSection();
    } else if ("IntersectionObserver" in window) {
      const wholeObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            showWholeSection();
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -45px 0px",
        },
      );

      wholeObserver.observe(wholeSection);
    } else {
      showWholeSection();
    }

    /* -----------------------------------------------
       IMAGE FALLBACK
    ------------------------------------------------ */

    if (wholeImage) {
      wholeImage.addEventListener("error", () => {
        wholeImage.style.display = "none";

        const imageFrame = wholeImage.closest(".whole-process-image-frame");

        if (imageFrame) {
          imageFrame.style.background = "var(--primary-light, #8faf57)";
        }
      });
    }

    /* -----------------------------------------------
       RTL DIRECTION SUPPORT
    ------------------------------------------------ */

    const updateWholeDirection = () => {
      const isRTL =
        document.documentElement.dir === "rtl" ||
        document.body.dir === "rtl" ||
        document.body.classList.contains("is-rtl");

      wholeSection.classList.toggle("is-rtl", isRTL);
    };

    updateWholeDirection();

    const wholeDirectionObserver = new MutationObserver(updateWholeDirection);

    wholeDirectionObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    wholeDirectionObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["dir", "class"],
    });
  }
}

/* =====================================================
   AROMATICROOTS — CTA SCROLL REVEAL
===================================================== */

{
  const arCtaSection = document.querySelector(".ar-cta-section");

  if (arCtaSection) {
    const arCtaReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const arShowCTA = () => {
      arCtaSection.classList.add("is-visible");
    };

    if (arCtaReducedMotion) {
      arShowCTA();
    } else if ("IntersectionObserver" in window) {
      const arCtaObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            arShowCTA();
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -60px 0px",
        },
      );

      arCtaObserver.observe(arCtaSection);
    } else {
      arShowCTA();
    }
  }
}
