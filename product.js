/* =========================================================
   AROMATICROOTS — PRODUCTS PAGE JAVASCRIPT
   Header | Navigation | Overlay Toggle | Filters
   Scroll Reveal | Lucide Icons | Responsive
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     1. LUCIDE ICONS
  ===================================================== */

  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  /* =====================================================
     2. HEADER ELEMENTS
  ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const homeButton = document.getElementById("homeDropdownButton");
  const dropdown = document.querySelector(".nav-dropdown");
  const header = document.getElementById("siteHeader");

  /* =====================================================
     3. ACTIVE NAVIGATION
  ===================================================== */

  const setActiveNavigation = () => {
    if (!mainNav) return;

    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    const homePages = ["", "index.html", "index1.html"];

    mainNav.querySelectorAll(".nav-link.active").forEach((link) => {
      link.classList.remove("active");
    });

    if (homePages.includes(currentPage)) {
      if (homeButton) {
        homeButton.classList.add("active");
      }
      return;
    }

    if (homeButton) {
      homeButton.classList.remove("active");
    }

    mainNav.querySelectorAll("a.nav-link[href]").forEach((link) => {
      if (link.closest(".nav-dropdown")) return;
      if (link.classList.contains("mobile-login")) return;

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
        console.warn("Invalid navigation link:", error);
      }
    });
  };

  /* =====================================================
     4. MOBILE MENU ICON
  ===================================================== */

  const setMenuIcon = (isOpen = false) => {
    if (!menuToggle) return;

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x" aria-hidden="true"></i>'
      : '<i data-lucide="menu" aria-hidden="true"></i>';

    menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    refreshIcons();
  };

  /* =====================================================
     5. HOME DROPDOWN
  ===================================================== */

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

  /* =====================================================
     6. MOBILE MENU CONTROLS
  ===================================================== */

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

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu();
    });
  }

  if (homeButton && dropdown) {
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleDropdown();
    });
  }

  /* =====================================================
     7. NAVIGATION LINK EVENTS
  ===================================================== */

  if (mainNav) {
    mainNav
      .querySelectorAll("a.nav-link:not(.mobile-login)")
      .forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 820) {
            closeMenu();
          }
        });
      });

    mainNav
      .querySelectorAll(".nav-dropdown .dropdown-menu a")
      .forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 820) {
            closeMenu();
          }
        });
      });

    const mobileLogin = mainNav.querySelector(".mobile-login");

    if (mobileLogin) {
      mobileLogin.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    }
  }

  /* =====================================================
     8. CLOSE MENU / DROPDOWN ON OUTSIDE CLICK
  ===================================================== */

  document.addEventListener("click", (event) => {
    if (dropdown && !dropdown.contains(event.target)) {
      closeDropdown();
    }

    if (!mainNav || !menuToggle) return;
    if (window.innerWidth > 820) return;
    if (!mainNav.classList.contains("active")) return;

    const clickedInsideMenu = mainNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  /* =====================================================
     9. ESCAPE KEY
  ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* =====================================================
     10. HEADER SCROLL EFFECT
  ===================================================== */

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  /* =====================================================
     11. RESPONSIVE MENU RESET
  ===================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });

  /* =====================================================
     12. SPICE INTRO — LIGHT / DARK OVERLAY TOGGLE
  ===================================================== */

  const spiceIntro = document.getElementById("spice-intro-section");
  const overlayToggle = document.getElementById("overlayToggle");

  if (spiceIntro && overlayToggle) {
    const updateOverlayButton = () => {
      const isDark = spiceIntro.classList.contains("dark-overlay");

      overlayToggle.textContent = isDark ? "Light Overlay" : "Dark Overlay";

      overlayToggle.setAttribute("aria-pressed", String(isDark));
      overlayToggle.setAttribute(
        "aria-label",
        isDark
          ? "Switch to light image overlay"
          : "Switch to dark image overlay",
      );
    };

    overlayToggle.addEventListener("click", (event) => {
      event.preventDefault();

      spiceIntro.classList.toggle("dark-overlay");
      updateOverlayButton();
    });

    updateOverlayButton();
  } else {
    console.warn(
      "Spice Intro overlay toggle unavailable. Check #spice-intro-section and #overlayToggle in HTML.",
    );
  }

  /* =====================================================
     13. PRODUCT FILTERS
  ===================================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = Array.from(document.querySelectorAll(".product-card"));
  const visibleCount = document.getElementById("visibleCount");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const supportsObserver = "IntersectionObserver" in window;

  let productRevealObserver = null;

  if (supportsObserver && !reducedMotion) {
    productRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
      },
    );
  }

  const revealProductCard = (card) => {
    if (productRevealObserver) {
      card.classList.remove("visible");
      productRevealObserver.unobserve(card);
      productRevealObserver.observe(card);
    } else {
      card.classList.add("visible");
    }
  };

  const filterProducts = (category = "all") => {
    let shown = 0;

    productCards.forEach((card, index) => {
      const shouldShow =
        category === "all" ? index < 6 : card.dataset.category === category;

      if (!shouldShow) {
        card.hidden = true;

        if (productRevealObserver) {
          productRevealObserver.unobserve(card);
        }

        return;
      }

      card.hidden = false;
      shown++;

      revealProductCard(card);
    });

    if (visibleCount) {
      visibleCount.textContent = String(shown);
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      filterProducts(button.dataset.filter || "all");
    });
  });

  if (productCards.length) {
    filterProducts(
      document.querySelector(".filter-btn.active")?.dataset.filter || "all",
    );
  }

  /* =====================================================
     14. SHARED SCROLL REVEAL
     Supports .is-visible and .visible CSS classes
  ===================================================== */

  const revealElements = document.querySelectorAll(
    [
      ".reveal",
      ".products-heading.reveal",
      "#gift-boxes .reveal",
      "#spice-pairing .reveal",
      "#customer-favorites .reveal",
      ".cta-section",
    ].join(","),
  );

  const revealTargets = Array.from(new Set(revealElements));

  if (!supportsObserver || reducedMotion) {
    revealTargets.forEach((element) => {
      element.classList.add("is-visible", "visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible", "visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealTargets.forEach((element) => {
      revealObserver.observe(element);
    });

    /* Show elements already visible when page loads */
    requestAnimationFrame(() => {
      revealTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add("is-visible", "visible");
          revealObserver.unobserve(element);
        }
      });
    });
  }

  /* =====================================================
     15. SPICE INTRO REVEAL STATE
  ===================================================== */

  if (spiceIntro) {
    spiceIntro.classList.add("reveal-ready");
  }

  /* =====================================================
     16. INITIALIZE PAGE
  ===================================================== */

  setActiveNavigation();
  closeMenu();
  updateHeader();
  refreshIcons();
});
