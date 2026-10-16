/* =========================================================
   PRIVACY POLICY — SCROLL REVEAL + LUCIDE ICONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Select all elements to reveal
  const revealElements = document.querySelectorAll(".privacy-reveal");

  // Respect reduced-motion preferences
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Show everything if animation is disabled or unsupported
  if (reduceMotion || !("IntersectionObserver" in window)) {
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
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});
