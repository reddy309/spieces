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
     index.html and index1.html both activate Home
  ========================================================= */

  const setActiveNavigation = () => {
    if (!mainNav) return;

    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    const homePages = ["", "index.html", "index1.html"];

    // Remove previously assigned active classes
    mainNav.querySelectorAll(".nav-link.active").forEach((link) => {
      link.classList.remove("active");
    });

    // Home remains active on both home pages
    if (homePages.includes(currentPage)) {
      if (homeButton) {
        homeButton.classList.add("active");
      }
      return;
    }

    // Activate the matching regular navigation link
    const pageLinks = mainNav.querySelectorAll(
      "a.nav-link[href]:not(.mobile-login)",
    );

    pageLinks.forEach((link) => {
      // Exclude Home 1 and Home 2 dropdown links
      if (link.closest(".nav-dropdown")) return;

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
     HAMBURGER BUTTON
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
     REGULAR NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    const navigationLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login)",
    );

    navigationLinks.forEach((link) => {
      // Dropdown links have their own handler
      if (link.closest(".nav-dropdown")) return;

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
      ".nav-dropdown .dropdown-menu a",
    );

    homeLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });

    /* =======================================================
       MOBILE ENQUIRY / LOGIN
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
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (!dropdown || !homeButton) return;

    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  /* =========================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
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
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".signature-section .reveal",
  );

  if (!revealElements.length) {
    return;
  }

  // Enable scroll reveal
  revealElements.forEach((element) => {
    element.classList.add("reveal-ready");
  });

  // Fallback for browsers without IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  // Reveal elements when they enter the viewport
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
      threshold: 0.1,
      rootMargin: "0px 0px -25px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});

/* =====================================================
   HANDPICKED INGREDIENTS — SCROLL REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#handpicked-ingredients");

  if (!section) return;

  const revealItems = section.querySelectorAll(
    ".handpicked-heading, .handpicked-feature, .ingredient-thumb",
  );

  // Enable reveal styles
  revealItems.forEach((item) => {
    item.classList.add("reveal-ready");
  });

  // Fallback for unsupported browsers
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px",
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".traditional-section");

  if (!section) return;

  if (!("IntersectionObserver" in window)) {
    section.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  observer.observe(section);
});
/* =========================================================
   A WORLD OF AROMAS — SCROLL REVEAL + LUCIDE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* Initialize Lucide icons */
  const refreshAromaIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  refreshAromaIcons();

  /* Select the aromas section */
  const section = document.querySelector("#world-of-aromas");

  if (!section) return;

  const revealElements = section.querySelectorAll(
    ".aromas-heading, .aroma-card, .aromas-bottom-note",
  );

  /* Fallback when IntersectionObserver is unavailable */
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  /* Observe elements as they enter the viewport */
  const aromasObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  revealElements.forEach((element) => {
    aromasObserver.observe(element);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const sections = document.querySelectorAll(".spice-atlas");

  // Fallback for browsers without IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => {
      section.classList.add("is-visible");
    });
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
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
/* =====================================================
   MASTER BLENDERS — ICONS + SCROLL REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#master-blenders");

  if (!section) return;

  /* Initialize Lucide icons */
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* Scroll reveal */
  const revealElements = section.querySelectorAll(".reveal");

  /* Show immediately when reduced motion is preferred */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  /* Fallback for browsers without IntersectionObserver */
  if (!("IntersectionObserver" in window)) {
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

          /* Reveal once, then stop observing */
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".quality-section .reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });
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
      threshold: 0.12,
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
});
/* =====================================================
   THE HERITAGE TABLE — LOW-TO-HIGH SCROLL REVEAL
===================================================== */

(function () {
  function initHeritageReveal() {
    const elements = document.querySelectorAll(".heritage-section .reveal-up");

    if (!elements.length) {
      return;
    }

    /* Show immediately when reduced motion is preferred */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });

      return;
    }

    /* Fallback for browsers without IntersectionObserver */
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      },
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeritageReveal);
  } else {
    initHeritageReveal();
  }
})();

/* =========================================================
   AROMATICROOTS — TRADITION CTA SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#tradition-cta");

  if (!section) return;

  const container = section.querySelector(".tradition-cta-container");

  if (!container) return;

  const items = container.querySelectorAll(
    ".tradition-cta-label, " +
      ".tradition-cta-title, " +
      ".tradition-cta-description, " +
      ".tradition-cta-actions",
  );

  const showCTA = () => {
    container.classList.add("revealed");
  };

  /* Accessibility and fallback */
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    showCTA();
    return;
  }

  /* Stagger the individual elements */
  items.forEach((item, index) => {
    item.classList.add("reveal-item");

    item.style.setProperty("--reveal-delay", `${index * 130}ms`);
  });

  /* Enable animation only after JS is ready */
  container.classList.add("reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showCTA();
          observer.unobserve(container);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  observer.observe(container);
});

/* Initialize Lucide icons if the library is loaded */
window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
