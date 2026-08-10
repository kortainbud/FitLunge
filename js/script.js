document.addEventListener("DOMContentLoaded", () => {
  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");

    if (item.classList.contains("open")) {
      a.style.maxHeight = a.scrollHeight + "px";
    }

    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  // Hero: full-screen on load, shrinks into the contained card on scroll
  const heroWrap = document.querySelector(".hero-pin-wrap");
  const heroCard = document.querySelector(".hero-card");
  const header = document.querySelector("#site-header");
  if (heroWrap && heroCard) {
    const CONTAINER_MAX = 1300;
    const PAD = 20;
    const RADIUS = 24;
    const SOLID_THRESHOLD = 0.92;

    const updateHero = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollable = heroWrap.offsetHeight - vh;
      const rectTop = heroWrap.getBoundingClientRect().top;
      let progress = scrollable > 0 ? -rectTop / scrollable : 0;
      progress = Math.min(Math.max(progress, 0), 1);

      const finalWidth = Math.min(CONTAINER_MAX, vw - PAD * 2);
      const finalHeight = Math.max(460, Math.min(vh * 0.8, finalWidth * 0.494));

      heroCard.style.width = vw - (vw - finalWidth) * progress + "px";
      heroCard.style.height = vh - (vh - finalHeight) * progress + "px";
      heroCard.style.borderRadius = RADIUS * progress + "px";

      if (header) {
        header.classList.toggle("solid", progress > SOLID_THRESHOLD);
      }
    };

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHero();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener("resize", updateHero);
    updateHero();
  }

  // Programme pricing tabs
  const tabs = document.querySelectorAll(".programme-tab");
  const panels = document.querySelectorAll(".tier-grid");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === target);
      });
    });
  });
});
