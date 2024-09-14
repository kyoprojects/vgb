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
  let textElement = document.querySelectorAll('.primary-heading');

  textElement.forEach(element => {
    let fullText;
    function runSplit() {
      // Split the text into words within the current element
      fullText = new SplitType(element, { types: 'words' });
      console.log(fullText);

      // Append word masks to words within the current element
      element.querySelectorAll('.word').forEach(word => {
        let mask = document.createElement('div');
        mask.classList.add('word-mask');
        word.appendChild(mask);
      });
    }
    runSplit();
    window.addEventListener('resize', () => {
      fullText.revert();
      runSplit();
    });
    let masks = element.querySelectorAll('.word-mask');
    console.log(masks);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom 30%',
        scrub: true
      }
    });
    tl.fromTo(masks, { opacity: 0.6 }, { opacity: 0, duration: 0.5, ease: 'power2.inOut', stagger: 0.05 });
  });
});
