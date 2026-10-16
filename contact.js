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
     ACTIVE NAVIGATION — ALL PAGES
  ========================================================= */

  const setActiveNavigation = () => {
    if (!mainNav) return;

    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    const homePages = ["", "index.html", "index1.html"];

    // Clear previous active links
    mainNav.querySelectorAll(".nav-link.active").forEach((link) => {
      link.classList.remove("active");
    });

    if (homeButton) {
      homeButton.classList.remove("active");
    }

    // Home pages
    if (homePages.includes(currentPage)) {
      if (homeButton) {
        homeButton.classList.add("active");
      }
      return;
    }

    // Match current page to its navigation link
    mainNav.querySelectorAll("a.nav-link[href]").forEach((link) => {
      // Ignore Home dropdown and mobile enquiry links
      if (
        link.closest(".nav-dropdown") ||
        link.classList.contains("mobile-login")
      ) {
        return;
      }

      try {
        const linkPage = new URL(
          link.getAttribute("href"),
          window.location.href,
        ).pathname
          .split("/")
          .pop()
          .toLowerCase();

        if (linkPage === currentPage) {
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

  const setMenuIcon = (open = false) => {
    if (!menuToggle) return;

    menuToggle.innerHTML = open
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    menuToggle.setAttribute("aria-label", open ? "Close Menu" : "Open Menu");

    menuToggle.setAttribute("title", open ? "Close Menu" : "Menu");

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
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    if (mainNav) {
      mainNav.classList.remove("active");
    }

    closeDropdown();
    setMenuIcon(false);
  };

  /* =========================================================
     OPEN MOBILE MENU
  ========================================================= */

  const openMenu = () => {
    if (!mainNav) return;

    mainNav.classList.add("active");
    setMenuIcon(true);
  };

  /* =========================================================
     TOGGLE MOBILE MENU
  ========================================================= */

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
     NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    const navigationLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login)",
    );

    navigationLinks.forEach((link) => {
      if (link.closest(".dropdown-menu") || link.closest(".nav-dropdown")) {
        return;
      }

      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });

    /* =======================================================
       HOME 1 / HOME 2 DROPDOWN LINKS
    ======================================================= */

    const homeLinks = mainNav.querySelectorAll(
      ".dropdown-menu a, .nav-dropdown a",
    );

    homeLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });

    /* =======================================================
       MOBILE ENQUIRY
    ======================================================= */

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
     OUTSIDE CLICK
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
     INITIAL STATE
  ========================================================= */

  setActiveNavigation();
  closeMenu();
  updateHeader();
  refreshIcons();
});

/* =====================================================
   AROMATICROOTS — GET IN TOUCH JAVASCRIPT
   SCROLL REVEAL + ICONS + FORM VALIDATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("get-in-touch");

  if (!section) return;

  /* =========================
     LUCIDE ICONS
  ========================= */

  function refreshTouchIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  refreshTouchIcons();

  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = section.querySelectorAll(".scroll-reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px",
      },
    );

    revealElements.forEach((element) => {
      const isContactDetail = element.classList.contains("touch-detail");

      if (element.classList.contains("get-in-touch-header")) {
        element.style.setProperty("--reveal-delay", "0ms");
      } else if (element.classList.contains("touch-info")) {
        element.style.setProperty("--reveal-delay", "100ms");
      } else if (element.classList.contains("touch-form-panel")) {
        element.style.setProperty("--reveal-delay", "200ms");
      } else if (isContactDetail) {
        const details = [...section.querySelectorAll(".touch-detail")];

        const detailIndex = details.indexOf(element);

        element.style.setProperty(
          "--reveal-delay",
          `${Math.max(detailIndex, 0) * 100}ms`,
        );
      }

      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* =========================
     ENQUIRY FORM VALIDATION
  ========================= */

  const form = document.getElementById("touchEnquiryForm");
  const status = document.getElementById("touchFormStatus");

  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();

    status.textContent =
      `Thank you${name ? ", " + name : ""}! Your form is validated. ` +
      "Connect a backend to deliver your enquiry to AromaticRoots.";

    form.reset();
  });
});
/* =====================================================
   CUSTOMER SUPPORT — SCROLL REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons if the library is available.
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const revealItems = document.querySelectorAll(
    "#customer-support .support-reveal",
  );

  // Respect the visitor's motion preference.
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
});
/* =========================================
   MAP SECTION — SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll("#store-map .map-reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});
/* =========================================
   FAQ — SCROLL REVEAL
   SINGLE-OPEN ACCORDION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.querySelector("#faq");

  if (!faqSection) return;

  /* Scroll reveal */
  const revealElements = faqSection.querySelectorAll(".faq-reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /* Keep only one answer open at a time */
  const faqItems = faqSection.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
    });
  });
});
/* =========================================
   STAY CONNECTED — SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector("#stay-connected .connect-reveal");

  if (!box) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    box.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  observer.observe(box);
});
