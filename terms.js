/* =========================================================
   TERMS & CONDITIONS — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     LUCIDE ICONS
  ======================================================= */

  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealItems = document.querySelectorAll(".terms-reveal");

  if ("IntersectionObserver" in window) {
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
        rootMargin: "0px 0px -25px 0px",
      },
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }
});
