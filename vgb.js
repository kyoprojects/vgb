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
  let targetElement = document.querySelector('.header-wrap');
  let lastScrollTop = 0;
  let threshold = 100;
  let hysteresis = 100;
  window.addEventListener(
    'scroll',
    () => {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        // downscroll
        if (currentScroll > threshold + hysteresis) {
          // hysteresis
          gsap.to(targetElement, { duration: 0.3, y: -80, autoAlpha: 0 });
        }
      } else {
        // upscroll
        if (currentScroll > threshold + hysteresis) {
          gsap.to(targetElement, { duration: 0.3, y: 0, autoAlpha: 1 });
        }
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    },
    false
  );

  // split text
  let fullText;
  function runSplit() {
    let textElement = document.querySelector('.primary-heading');
    fullText = new SplitType(textElement, { types: 'words' });
    console.log(fullText);

    $('.line').append('<div class="line-mask"></div>');
  }
  runSplit();
  window.addEventListener('resize', () => {
    fullText.revert();
    runSplit();
  });
  $('.line').each(function () {
    let triggerElement = $(this);
    let targetElement = triggerElement.find('.line-mask');
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top bottom',
        end: 'bottom 20%',
        scrub: true,
        delay: 10
      }
    });
    tl.to(targetElement, {
      opacity: '0.2',
      // duration: 1,
      ease: 'power2.inOut'
    });
  });
});
