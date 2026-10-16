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
     Home 1 / Home 2 = Home active
     Other pages = matching link active
  ========================================================= */

  const setActiveNavigation = () => {
    if (!mainNav) return;

    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    const homePages = ["", "index.html", "index1.html"];

    // Remove all previous active states
    mainNav.querySelectorAll(".nav-link.active").forEach((link) => {
      link.classList.remove("active");
    });

    // Activate Home on both home pages
    if (homePages.includes(currentPage)) {
      if (homeButton) {
        homeButton.classList.add("active");
      }
      return;
    }

    // Activate matching navigation link on other pages
    const pageLinks = mainNav.querySelectorAll("a.nav-link[href]");

    pageLinks.forEach((link) => {
      // Do not activate Home 1 / Home 2 dropdown links
      if (link.closest(".nav-dropdown")) return;

      // Ignore mobile login/enquiry links
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
     NORMAL NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    const navigationLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login)",
    );

    navigationLinks.forEach((link) => {
      // Home 1 / Home 2 are handled separately
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
       MOBILE LOGIN / ENQUIRY
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
    if (!dropdown) return;

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
/* =========================================================
   AROMATICROOTS — SPICE PHILOSOPHY SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const philosophyItems = document.querySelectorAll(".philosophy-reveal");

  if (!philosophyItems.length) return;

  /* Fallback for browsers without IntersectionObserver */
  if (!("IntersectionObserver" in window)) {
    philosophyItems.forEach((item) => {
      item.classList.add("is-visible");
    });
    return;
  }

  const philosophyObserver = new IntersectionObserver(
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
      rootMargin: "0px 0px -45px 0px",
    },
  );

  philosophyItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
    philosophyObserver.observe(item);
  });
});

/* =====================================================
   MASTER BLENDERS — SCROLL REVEAL
===================================================== */

(() => {
  const blenderSection = document.querySelector("#master-blenders");

  if (!blenderSection) return;

  const revealElements = blenderSection.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const blenderObserver = new IntersectionObserver(
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
    blenderObserver.observe(element);
  });
})();

/* ================================================
   SPICE SELECTION — INTERSECTION OBSERVER
================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#spice-selection");

  if (!section) return;

  const revealElements = section.querySelectorAll(".reveal");

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
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});

/* =====================================================
   AROMATICROOTS — OUR NATURAL PROMISE
   SCROLL REVEAL + LUCIDE ICONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#natural-promise");

  if (!section) return;

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements = section.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
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

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /* =====================================================
     LUCIDE ICON INITIALIZATION
     Requires Lucide to be loaded on the page
  ===================================================== */

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
});
/* =====================================================
   AROMATICROOTS — FROM FARM TO TABLE
   SCROLL REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#farm-to-table");

  if (!section) return;

  const revealElements = section.querySelectorAll(".reveal");

  // Respect reduced-motion preferences and show content
  // immediately when animations are disabled.
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
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
        rootMargin: "0px 0px -35px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // Initialize Lucide icons if the library is loaded.
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
});

// =====================================================
// AROMATICROOTS — FAQ SCROLL REVEAL + LUCIDE ICONS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.querySelector("#faq");

  if (!faqSection) return;

  // Scroll reveal
  const revealElements = faqSection.querySelectorAll(".reveal");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const faqObserver = new IntersectionObserver(
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
        rootMargin: "0px 0px -35px 0px",
      },
    );

    revealElements.forEach((element) => {
      faqObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Optional: allow only one FAQ answer to remain open
  const faqItems = faqSection.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });

  // Refresh Lucide icons if the library is loaded
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* =====================================================
   AROMATICROOTS — CTA SCROLL REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const ctaSection = document.querySelector("#roots-cta");

  if (!ctaSection) return;

  const revealElements = ctaSection.querySelectorAll(".reveal");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const ctaObserver = new IntersectionObserver(
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

    revealElements.forEach((element) => {
      ctaObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
