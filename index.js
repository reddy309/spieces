document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     LUCIDE ICONS
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

  // Mobile menu: Samsung S8+ and iPad Mini
  // Desktop navigation starts at 769px
  const MOBILE_BREAKPOINT = 768;

  /* =========================================================
     ACTIVE NAVIGATION
     Home active on index.html and index1.html
  ========================================================= */

  const setActiveNavigation = () => {
    if (!mainNav) return;

    const currentPath = window.location.pathname;
    const currentPage =
      currentPath.split("/").filter(Boolean).pop()?.toLowerCase() ||
      "index.html";

    const isHomePage = ["index.html", "index1.html"].includes(currentPage);

    mainNav.querySelectorAll(".nav-link.active").forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    if (homeButton) {
      homeButton.classList.toggle("active", isHomePage);
      homeButton.removeAttribute("aria-current");
    }

    if (isHomePage) return;

    mainNav.querySelectorAll("a.nav-link[href]").forEach((link) => {
      // Do not activate Home 1 / Home 2 dropdown links
      if (link.closest(".dropdown-menu, .nav-dropdown")) return;

      if (link.classList.contains("mobile-login")) return;

      try {
        const linkUrl = new URL(
          link.getAttribute("href"),
          window.location.href,
        );

        const linkPage =
          linkUrl.pathname.split("/").filter(Boolean).pop()?.toLowerCase() ||
          "index.html";

        if (linkPage === currentPage) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
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

    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    menuToggle.setAttribute("title", isOpen ? "Close menu" : "Open menu");
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    refreshIcons();
  };

  /* =========================================================
     HOME DROPDOWN
  ========================================================= */

  const closeDropdown = () => {
    if (dropdown) {
      dropdown.classList.remove("active");
    }

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", "false");
    }
  };

  const toggleDropdown = () => {
    if (!dropdown) return;

    const isOpen = dropdown.classList.toggle("active");

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", String(isOpen));
    }

    refreshIcons();
  };

  /* =========================================================
     OPEN / CLOSE MOBILE MENU
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
     HAMBURGER BUTTON
  ========================================================= */

  if (menuToggle && mainNav) {
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
     CLOSE MENU AFTER NAVIGATION
  ========================================================= */

  if (mainNav) {
    mainNav.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          closeMenu();
        }
      });
    });
  }

  /* =========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (!dropdown || !homeButton) return;

    const clickedInsideDropdown = dropdown.contains(event.target);

    if (!clickedInsideDropdown) {
      closeDropdown();
    }
  });

  /* =========================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (!mainNav || !menuToggle) return;

    // Mobile menu logic only up to 768px
    if (window.innerWidth > MOBILE_BREAKPOINT) return;

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
     HEADER SCROLL EFFECT
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
    if (window.innerWidth > MOBILE_BREAKPOINT) {
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

document.addEventListener("DOMContentLoaded", function () {
  const signatureSection = document.querySelector(".signature-blends-section");

  if (!signatureSection) return;

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          signatureSection.classList.add("is-visible");

          observer.unobserve(signatureSection);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  observer.observe(signatureSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const essenceShowcase = document.querySelector(".essence-showcase");

  if (!essenceShowcase) return;

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          essenceShowcase.classList.add("is-visible");

          observer.unobserve(essenceShowcase);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  observer.observe(essenceShowcase);
});
document.addEventListener("DOMContentLoaded", function () {
  const essenceSection = document.querySelector(".essence-section");

  if (!essenceSection) return;

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          essenceSection.classList.add("is-visible");

          observer.unobserve(essenceSection);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  observer.observe(essenceSection);
});
document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     BESTSELLING SPICES — SCROLL REVEAL
  ========================================================= */

  const bestsellingSection = document.querySelector(".bestselling-spices");

  if (bestsellingSection) {
    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            bestsellingSection.classList.add("is-visible");

            observer.unobserve(bestsellingSection);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(bestsellingSection);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     FROM FARM TO KITCHEN
     HORIZONTAL TIMELINE JS
     LTR / RTL
     LIGHT / DARK
  ========================================================= */

  const farmKitchenSection = document.querySelector(".farm-kitchen-section");

  if (!farmKitchenSection) return;

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const farmKitchenObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          farmKitchenSection.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  farmKitchenObserver.observe(farmKitchenSection);
});

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     EXPLORE SPICE CATEGORIES
     6 PREMIUM CARDS
     LTR / RTL
     LIGHT / DARK
     SCROLL REVEAL
  ========================================================= */

  const spiceCategoriesSection = document.querySelector(
    ".spice-categories-section",
  );

  if (!spiceCategoriesSection) return;

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const spiceCategoriesObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          spiceCategoriesSection.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  spiceCategoriesObserver.observe(spiceCategoriesSection);
});
document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     RECIPE OF THE SEASON
     ONE SIDE IMAGE + ONE SIDE CONTENT
     LTR / RTL
     LIGHT / DARK
     SCROLL REVEAL
  ========================================================= */

  const recipeSection = document.querySelector(".season-recipe-section");

  if (!recipeSection) return;

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const recipeObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          recipeSection.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  recipeObserver.observe(recipeSection);
});

/* =========================================================
   OUR HERITAGE PROMISE — JS
   Scroll Reveal
  
   Hover / Touch Interaction
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const heritageSection = document.querySelector(".heritage-promise-section");

  if (!heritageSection) return;

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const heritageObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          heritageSection.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  heritageObserver.observe(heritageSection);
});

/* =====================================================
   CUSTOMER FAVORITES — SCROLL REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#customerFavorites");

  if (!section) return;

  const revealElements = section.querySelectorAll(".reveal");

  // Initialize Lucide icons.
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Accessibility: respect reduced-motion settings.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Show all content when animations are disabled
  // or IntersectionObserver is unsupported.
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  // Create scroll reveal observer.
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        // Animate each element only once.
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  // Observe all reveal elements.
  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});

/* =====================================================
   BRING TRADITION HOME — SCROLL REVEAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#traditionCta");

  if (!section) return;

  const content = section.querySelector(".tradition-cta-content");
  const image = section.querySelector(".tradition-cta-visual");

  if (!content || !image) return;

  /* Respect reduced-motion preferences */
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    content.classList.add("is-visible");
    image.classList.add("is-visible");
    return;
  }

  /* Prepare reveal animation */
  content.classList.add("reveal-left");
  image.classList.add("reveal-right");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          content.classList.add("is-visible");

          /* Slight delay for image entrance */
          window.setTimeout(() => {
            image.classList.add("is-visible");
          }, 150);

          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  observer.observe(section);
});

/* =========================================================
   AROMATICROOTS — CTA SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#spice-cta");
  const container = section?.querySelector(".cta-container");

  if (!section || !container) return;

  const items = container.querySelectorAll(".cta-reveal-item");

  /* Keep the section visible if animations are unavailable */
  const revealImmediately = () => {
    container.classList.remove("cta-reveal-ready");
    container.classList.add("cta-is-visible");
  };

  /* Respect accessibility preferences */
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    revealImmediately();
    return;
  }

  /* Set staggered reveal delays */
  items.forEach((item, index) => {
    item.style.setProperty("--cta-delay", `${index * 140}ms`);
  });

  container.classList.add("cta-reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          container.classList.add("cta-is-visible");
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

/* =========================================================
   LUCIDE ICONS
========================================================= */

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
