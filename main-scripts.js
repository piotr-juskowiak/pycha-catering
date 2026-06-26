document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.value-tab');
        const mainImg = document.getElementById('values-main-img');
        const mainDesc = document.getElementById('values-main-desc');

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                if (tab.classList.contains('active')) return;

                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const newImg = tab.getAttribute('data-img');
                const newDesc = tab.getAttribute('data-desc');

                // GSAP smooth crossfade animation
                if (typeof gsap !== 'undefined') {
                    const tl = gsap.timeline();
                    tl.to([mainImg, mainDesc], { opacity: 0, scale: 0.98, duration: 0.25, ease: 'power2.inOut' })
                      .call(() => {
                          mainImg.style.backgroundImage = `url('${newImg}')`;
                          mainDesc.textContent = newDesc;
                      })
                      .to([mainImg, mainDesc], { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
                } else {
                    mainImg.style.backgroundImage = `url('${newImg}')`;
                    mainDesc.textContent = newDesc;
                }
            });
        });
    });

WebFont.load({ google: { families: ["Rubik:300,regular,500,600,700,800,900", "Baloo 2:800"] } });

!function (o, c) { var n = c.documentElement, t = " w-mod-"; n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch") }(window, document);

window.__WEBFLOW_CURRENCY_SETTINGS = {
      "currencyCode": "PLN", "symbol": "zł", "decimal": ",", "fractionDigits": 2, "group": " ", "template": "{{wf {\"path\":\"amount\",\"type\":\"CommercePrice\"} }} {{wf {\"path\":\"symbol\",\"type\":\"PlainText\"} }}", "hideDecimalForWholeNumbers": false
    };

gsap.registerPlugin(ScrollTrigger, SplitText);

//////////////////////////// MARQUEE //////////////////////////////////////////  

                             window.addEventListener("load", () => {
                               if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

                               gsap.registerPlugin(ModifiersPlugin);

                               const marquees = gsap.utils.toArray(".marquee");

                               marquees.forEach((marquee, index) => {
                                 let items = marquee.querySelectorAll(".marquee-item");
                                 if (!items.length) return;

                                 // 🔥 Duplicate content for looping
                                 marquee.innerHTML += marquee.innerHTML;

                                 // use scrollWidth (includes items + gap)
                                 const totalWidth = marquee.scrollWidth / 2;

                                 // Animate container
                                 gsap.to(marquee, {
                                   x: `-=${totalWidth}`,
                                   duration: 50,
                                   ease: "none",
                                   repeat: -1,
                                   modifiers: {
                                     x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                                   }
                                 });
                               });
                             });








                             //////////////////////////// Images //////////////////////////////////////////  


                             const cards = document.querySelectorAll(".img-hover-effect");

                             cards.forEach(card => {
                               const img = card.querySelector("img");
                               const ripple = card.querySelector(".ripple");

                               // subtle idle floating
                               gsap.to(card, {
                                 y: "+=8",
                                 rotateZ: "+=1",
                                 duration: 3,
                                 yoyo: true,
                                 repeat: -1,
                                 ease: "sine.inOut"
                               });

                               // Hover enter
                               card.addEventListener("mouseenter", () => {
                                 gsap.to(img, {
                                   scale: 1.15,
                                   rotation: 2,
                                   duration: 1.2,
                                   ease: "elastic.out(1, 0.5)"
                                 });
                                 gsap.to(card, {
                                   duration: 0.5
                                 });
                               });

                               // Hover leave
                               card.addEventListener("mouseleave", () => {
                                 gsap.to(img, {
                                   scale: 1,
                                   rotation: 0,
                                   duration: 1,
                                   ease: "power3.out"
                                 });
                                 gsap.to(card, {
                                   duration: 0.5
                                 });
                               });

                               // Ripple + click bounce
                               card.addEventListener("click", e => {
                                 const rect = card.getBoundingClientRect();
                                 const x = e.clientX - rect.left;
                                 const y = e.clientY - rect.top;

                                 gsap.set(ripple, {
                                   x: x,
                                   y: y,
                                   scale: 0,
                                   opacity: 1
                                 });

                                 gsap.to(ripple, {
                                   scale: 10,
                                   opacity: 0,
                                   duration: 0.8,
                                   ease: "power2.out"
                                 });

                                 // bounce image
                                 gsap.fromTo(img,
                                   { scale: 0.9, rotation: -3 },
                                   { scale: 1.15, rotation: 3, duration: 0.6, ease: "elastic.out(1, 0.4)" }
                                 );
                               });

                               // Mouse move tilt
                               card.addEventListener("mousemove", e => {
                                 const rect = card.getBoundingClientRect();
                                 const x = e.clientX - rect.left;
                                 const y = e.clientY - rect.top;
                                 const rotateX = -(y - rect.height / 2) / 15;
                                 const rotateY = (x - rect.width / 2) / 15;

                                 gsap.to(card, {
                                   rotationX: rotateX,
                                   rotationY: rotateY,
                                   duration: 0.4,
                                   ease: "power2.out"
                                 });
                               });

                               // Reset tilt
                               card.addEventListener("mouseleave", () => {
                                 gsap.to(card, {
                                   rotationX: 0,
                                   rotationY: 0,
                                   duration: 0.6,
                                   ease: "elastic.out(1, 0.5)"
                                 });
                               });
                             });



                             //////////////////////////// Text-Animation //////////////////////////////////////////  


                             var Webflow = Webflow || [];
                             Webflow.push(function () {
                               gsap.registerPlugin(ScrollTrigger);

                               // bottom → top
                               gsap.utils.toArray('.reveal-up').forEach(el => {
                                 gsap.fromTo(el,
                                   { opacity: 0, y: 40, filter: "blur(12px)" },
                                   {
                                     opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
                                     scrollTrigger: { trigger: el, start: "top 85%", once: true }
                                   });
                               });

                               // top → bottom
                               gsap.utils.toArray('.reveal-down').forEach(el => {
                                 gsap.fromTo(el,
                                   { opacity: 0, y: -40, filter: "blur(12px)" },
                                   {
                                     opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
                                     scrollTrigger: { trigger: el, start: "top 85%", once: true }
                                   });
                               });

                               // left → right
                               gsap.utils.toArray('.reveal-left').forEach(el => {
                                 gsap.fromTo(el,
                                   { opacity: 0, x: -40, filter: "blur(12px)" },
                                   {
                                     opacity: 1, x: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
                                     scrollTrigger: { trigger: el, start: "top 85%", once: true }
                                   });
                               });

                               // right → left
                               gsap.utils.toArray('.reveal-right').forEach(el => {
                                 gsap.fromTo(el,
                                   { opacity: 0, x: 40, filter: "blur(12px)" },
                                   {
                                     opacity: 1, x: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
                                     scrollTrigger: { trigger: el, start: "top 85%", once: true }
                                   });
                               });

                               // zoom in
                               gsap.utils.toArray('.reveal-zoom').forEach(el => {
                                 gsap.fromTo(el,
                                   { opacity: 0, scale: 0.85, filter: "blur(12px)" },
                                   {
                                     opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
                                     scrollTrigger: { trigger: el, start: "top 85%", once: true }
                                   });
                               });

                               // Oops! fun 404 animation
                               gsap.utils.toArray('.reveal-opps').forEach(el => {
                                 gsap.fromTo(el,
                                   { opacity: 0, scale: 0.7, rotation: -10, filter: "blur(12px)" },
                                   {
                                     opacity: 1, scale: 1, rotation: 0, filter: "blur(0px)",
                                     duration: 1.2, ease: "elastic.out(1, 0.5)",
                                     scrollTrigger: { trigger: el, start: "top 85%", once: true }
                                   });
                               });

                             });




                             //////////////////////////// Fade-Animation //////////////////////////////////////////  


                             const fadeArray = gsap.utils.toArray(".has_fade_anim");
                             fadeArray.forEach((t, a) => {
                               var e = "bottom",
                                 r = 1,
                                 o = 1,
                                 i = 50,
                                 s = 0.05,
                                 g = "power2.out";
                               t.getAttribute("data-fade-offset") &&
                                 (i = t.getAttribute("data-fade-offset")),
                                 t.getAttribute("data-duration") && (o = t.getAttribute("data-duration")),
                                 t.getAttribute("data-fade-from") && (e = t.getAttribute("data-fade-from")),
                                 t.getAttribute("data-on-scroll") && (r = t.getAttribute("data-on-scroll")),
                                 t.getAttribute("data-delay") && (s = t.getAttribute("data-delay")),
                                 t.getAttribute("data-ease") && (g = t.getAttribute("data-ease")),
                                 1 == r
                                   ? ("top" == e &&
                                     gsap.from(t, {
                                       y: -i,
                                       opacity: 0,
                                       ease: g,
                                       duration: o,
                                       delay: s,
                                       scrollTrigger: { trigger: t, start: "top 85%" },
                                     }),
                                     "left" == e &&
                                     gsap.from(t, {
                                       x: -i,
                                       opacity: 0,
                                       ease: g,
                                       duration: o,
                                       delay: s,
                                       scrollTrigger: { trigger: t, start: "top 85%" },
                                     }),
                                     "bottom" == e &&
                                     gsap.from(t, {
                                       y: i,
                                       opacity: 0,
                                       ease: g,
                                       duration: o,
                                       delay: s,
                                       scrollTrigger: { trigger: t, start: "top 85%" },
                                     }),
                                     "right" == e &&
                                     gsap.from(t, {
                                       x: i,
                                       opacity: 0,
                                       ease: g,
                                       duration: o,
                                       delay: s,
                                       scrollTrigger: { trigger: t, start: "top 85%" },
                                     }),
                                     "in" == e &&
                                     gsap.from(t, {
                                       opacity: 0,
                                       ease: g,
                                       duration: o,
                                       delay: s,
                                       scrollTrigger: { trigger: t, start: "top 85%" },
                                     }))
                                   : ("top" == e &&
                                     gsap.from(t, { y: -i, opacity: 0, ease: g, duration: o, delay: s }),
                                     "left" == e &&
                                     gsap.from(t, { x: -i, opacity: 0, ease: g, duration: o, delay: s }),
                                     "bottom" == e &&
                                     gsap.from(t, { y: i, opacity: 0, ease: g, duration: o, delay: s }),
                                     "right" == e &&
                                     gsap.from(t, { x: i, opacity: 0, ease: g, duration: o, delay: s }),
                                     "in" == e &&
                                     gsap.from(t, { opacity: 0, ease: g, duration: o, delay: s }));
                             });


                             //////////////////////////// video-Animation //////////////////////////////////////////  



                             document.querySelectorAll(".video-box").forEach(box => {
                               const btn = box.querySelector(".video-play-btn");

                               // Show button on hover
                               box.addEventListener("mouseenter", () => {
                                 gsap.to(btn, {
                                   opacity: 1,
                                   scale: 1,
                                   duration: 0.4,
                                   ease: "back.out(1.7)"
                                 });
                               });

                               // Move button with cursor
                               box.addEventListener("mousemove", (e) => {
                                 const rect = box.getBoundingClientRect();
                                 const x = e.clientX - rect.left - rect.width / 2;
                                 const y = e.clientY - rect.top - rect.height / 2;

                                 gsap.to(btn, {
                                   x: x * 0.25,
                                   y: y * 0.25,
                                   duration: 0.4,
                                   ease: "power3.out"
                                 });
                               });

                               // Hide button on hover out
                               box.addEventListener("mouseleave", () => {
                                 gsap.to(btn, {
                                   opacity: 0,
                                   scale: 0.5,
                                   x: 0,
                                   y: 0,
                                   duration: 0.5,
                                   ease: "back.in(1.5)"
                                 });
                               });
                             });







                             ////////////////////////////Image-Move ///////////////////////////////////// 
                             const parentBox = document.querySelector('.parent-box');
                             if(parentBox) {
                               const movers = Array.from(parentBox.querySelectorAll('.child-image'));

                               // Apply essential styles
                               Object.assign(parentBox.style, {
                                 position: 'relative',
                                 overflow: 'hidden',
                                 width: '100vw',
                                 height: '100vh'
                               });

                               movers.forEach(el => {
                                 Object.assign(el.style, {
                                   position: 'absolute',
                                   height: 'auto'
                                 });
                               });

                               // Random start position inside parent
                               function setRandomStart(el) {
                                 const elWidth = el.offsetWidth;
                                 const elHeight = el.offsetHeight;
                                 const parentWidth = parentBox.clientWidth;
                                 const parentHeight = parentBox.clientHeight;

                                 const startX = Math.random() * (parentWidth - elWidth);
                                 const startY = Math.random() * (parentHeight - elHeight);

                                 gsap.set(el, { x: startX, y: startY });
                               }

                               // Animate each image
                               function animateRandomly(el) {
                                 const elWidth = el.offsetWidth;
                                 const elHeight = el.offsetHeight;
                                 const parentWidth = parentBox.clientWidth;
                                 const parentHeight = parentBox.clientHeight;

                                 const minX = 0;
                                 const maxX = parentWidth - elWidth;
                                 const minY = 0;
                                 const maxY = parentHeight - elHeight;

                                 const newX = Math.random() * (maxX - minX) + minX;
                                 const newY = Math.random() * (maxY - minY) + minY;

                                 gsap.to(el, {
                                   duration: 8 + Math.random() * 6, // slow floating
                                   x: newX,
                                   y: newY,
                                   ease: 'power1.inOut',
                                   onComplete: () => animateRandomly(el)
                                 });
                               }

                               // Start animations with random positions
                               movers.forEach(el => {
                                 setRandomStart(el);
                                 animateRandomly(el);
                               });

                               // Re-run on resize
                               window.addEventListener('resize', () => {
                                 movers.forEach(el => {
                                   gsap.killTweensOf(el);
                                   setRandomStart(el);
                                   animateRandomly(el);
                                 });
                               });
                             }

(function () { var SEL = '#__framer-badge-container,#__framer-badge,a[href*="framer.com/?utm_source=framer-banner-"]'; function k(n) { if (!n || !n.matches) return; if (n.id === "__framer-badge-container" || n.id === "__framer-badge" || n.matches('a[href*="framer.com/?utm_source=framer-banner-"]')) { n.Usuń() } } new MutationObserver(function (m) { m.forEach(function (r) { r.addedNodes.forEach(function (n) { k(n); if (n.querySelectorAll) { n.querySelectorAll(SEL).forEach(function (e) { e.Usuń() }) } }) }) }).observe(document.documentElement, { childList: true, subtree: true }); function sweep() { document.querySelectorAll(SEL).forEach(function (e) { e.Usuń() }) } if (document.readyState === 'complete') { setTimeout(sweep, 0) } else { window.addEventListener('load', function () { setTimeout(sweep, 0) }, { once: true }) } })()

new MutationObserver(function (m) { m.forEach(function (r) { r.addedNodes.forEach(function (n) { if (n.classList && n.classList.contains("w-webflow-badge")) n.Usuń() }) }) }).observe(document.body, { childList: true, subtree: true })

let interactiveTimeline = null;
    function openInteractiveMenu(e) {
      if (e) e.preventDefault();
      const overlay = document.getElementById("interactive-menu-overlay");
      const card = overlay.querySelector(".interactive-menu-card");
      
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
      
      if (interactiveTimeline) interactiveTimeline.kill();
      interactiveTimeline = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.4 }
      });
      
      interactiveTimeline.fromTo(overlay, 
        { opacity: 0, backdropFilter: "blur(0px)" }, 
        { opacity: 1, backdropFilter: "blur(8px)", duration: 0.4, ease: "power2.out" }
      );
      
      interactiveTimeline.fromTo(card,
        { y: 80, scale: 0.85, rotationX: -15, opacity: 0 },
        { y: 0, scale: 1, rotationX: 0, opacity: 1, ease: "elastic.out(1, 0.6)", duration: 0.9, transformPerspective: 800 },
        "-=0.2"
      );
      
      // Stagger items inside
      interactiveTimeline.fromTo(card.querySelectorAll('.interactive-menu-title, .interactive-menu-item'),
        { x: -30, opacity: 0, filter: "blur(8px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", stagger: 0.05, duration: 0.6, ease: "power3.out" },
        "-=0.7"
      );
    }
    function closeInteractiveMenu() {
      const overlay = document.getElementById("interactive-menu-overlay");
      const card = overlay.querySelector(".interactive-menu-card");
      
      if (interactiveTimeline) interactiveTimeline.kill();
      
      const closeTl = gsap.timeline({
        onComplete: () => {
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
      
      closeTl.to(card, { y: -40, scale: 0.9, opacity: 0, rotationX: 10, duration: 0.3, ease: "power3.in" });
      closeTl.to(overlay, { opacity: 0, backdropFilter: "blur(0px)", duration: 0.3, ease: "power2.inOut" }, "-=0.2");
    }
    const interactiveOverlay = document.getElementById("interactive-menu-overlay");
    if (interactiveOverlay) {
      interactiveOverlay.addEventListener("click", function (e) {
        if (e.target === this) {
          closeInteractiveMenu();
        }
      });
    }

    function initProductsFilter() {
      const productsSection = document.querySelector(".products-redesign");
      if (!productsSection) return;

      const filters = productsSection.querySelectorAll(".products-filter");
      const cards = Array.from(productsSection.querySelectorAll(".products-grid > .menu-card"));

      filters.forEach(filter => {
        filter.addEventListener("click", () => {
          filters.forEach(f => f.classList.remove("active"));
          filter.classList.add("active");

          const target = filter.getAttribute("data-filter");
          cards.forEach(card => {
            const categories = (card.getAttribute("data-category") || "").split(/\s+/);
            const isVisible = target === "wszystkie" || !target || categories.includes(target);

            card.classList.toggle("is-filtered-out", !isVisible);
            card.style.opacity = isVisible ? "1" : "0";
            card.style.display = isVisible ? "flex" : "none";
          });
        });
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initProductsFilter);
    } else {
      initProductsFilter();
    }



document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("pychaCallbackPopup");
  const closeButton = document.getElementById("pychaCallbackClose");
  const form = document.getElementById("pychaCallbackForm");
  const submitButton = form ? form.querySelector(".pycha-callback-submit") : null;

  if (!popup || !closeButton || !form || !submitButton) return;

  const closedTimestamp = localStorage.getItem("pychaCallbackClosedTimestamp");
  if (closedTimestamp) {
      const now = new Date().getTime();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      if (now - parseInt(closedTimestamp, 10) < threeDaysInMs) {
          return; // Skip opening if 3 days haven't passed
      }
  }

  const openPopup = () => {
    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    popup.classList.remove("active");
    popup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    localStorage.setItem("pychaCallbackClosedTimestamp", new Date().getTime().toString());
  };

  window.setTimeout(openPopup, 4000);
  closeButton.addEventListener("click", closePopup);

  popup.addEventListener("click", (event) => {
    if (event.target === popup) closePopup();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("active")) {
      closePopup();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    form.classList.add("is-success");
    submitButton.textContent = "Dziękujemy, oddzwonimy!";
    window.setTimeout(closePopup, 1600);
  });
});
