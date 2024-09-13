// dom contentloaded eventstnr

window.addEventListener('DOMContentLoaded', function () {
  //lenis
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // header
  // let targetElement = document.querySelector(".framer-1jbc6qn");
  let targetElement = document.querySelector('[data-framer-name="header-wrap"]');
  gsap.to(targetElement, { duration: 0.3, y: 0, autoAlpha: 0 });
  let lastScrollTop = 0;
  let threshold = 100;
  let hysteresis = 100;

  window.addEventListener(
    'scroll',
    () => {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        // Downscroll
        if (currentScroll > threshold + hysteresis) {
          // Adding hysteresis
          gsap.to(targetElement, { duration: 0.3, y: -80, autoAlpha: 0 });
        }
      } else {
        // Upscroll
        if (currentScroll > threshold + hysteresis) {
          gsap.to(targetElement, { duration: 0.3, y: 0, autoAlpha: 1 });
        } else if (currentScroll <= threshold - hysteresis) {
          // Using hysteresis
          gsap.to(targetElement, { duration: 0.3, y: 0, autoAlpha: 0 });
        }
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    },
    false
  );
});
