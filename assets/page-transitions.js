(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runWhenBodyExists = (callback) => {
    if (document.body) {
      callback();
      return;
    }

    document.addEventListener("DOMContentLoaded", callback, { once: true });
  };

  const animate = (element, keyframes, options) => {
    if (reduceMotion || !element || typeof element.animate !== "function") {
      const lastFrame = keyframes[keyframes.length - 1] || {};
      Object.entries(lastFrame).forEach(([property, value]) => {
        if (property !== "offset" && property !== "easing") {
          element.style[property] = value;
        }
      });
      return Promise.resolve();
    }

    const animation = element.animate(keyframes, {
      fill: "forwards",
      easing: "cubic-bezier(.16, 1, .3, 1)",
      ...options,
    });

    return animation.finished.catch(() => {});
  };

  const ensureOverlay = () => {
    let overlay = document.querySelector(".page-transition-overlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "page-transition-overlay active";
      document.body.prepend(overlay);
    }

    overlay.classList.add("active");
    overlay.innerHTML = `
      <div class="transition-circle transition-circle-1"></div>
      <div class="transition-circle transition-circle-2"></div>
      <div class="transition-circle transition-circle-3"></div>
    `;

    return {
      overlay,
      circles: [
        overlay.querySelector(".transition-circle-1"),
        overlay.querySelector(".transition-circle-2"),
        overlay.querySelector(".transition-circle-3"),
      ],
    };
  };

  const setCircleScale = (circles, scale) => {
    circles.forEach((circle) => {
      circle.style.transform = `scale(${scale})`;
      circle.style.opacity = "1";
    });
  };

  const playEnter = ({ overlay, circles }) => {
    if (reduceMotion) {
      overlay.classList.remove("active");
      return;
    }

    overlay.classList.add("active");
    setCircleScale(circles, 1);

    requestAnimationFrame(() => {
      const circleAnimations = [circles[2], circles[1], circles[0]].map((circle, index) => animate(circle, [
        { transform: "scale(1)", opacity: "1" },
        { transform: "scale(.18)", opacity: "1", offset: .64 },
        { transform: "scale(.04)", opacity: ".82", offset: .9 },
        { transform: "scale(0)", opacity: "0" },
      ], {
        duration: 1500,
        delay: index * 155,
      }));

      Promise.all(circleAnimations).then(() => {
        overlay.classList.remove("active");
      });
    });
  };

  const playExit = ({ overlay, circles }, href) => {
    if (reduceMotion) {
      window.location.href = href;
      return;
    }

    overlay.classList.add("active");
    setCircleScale(circles, 0);

    requestAnimationFrame(() => {
      const circleAnimations = [circles[0], circles[1], circles[2]].map((circle, index) => animate(circle, [
        { transform: "scale(0)", opacity: "1" },
        { transform: "scale(.2)", opacity: "1", offset: .32 },
        { transform: "scale(1.035)", opacity: "1", offset: .86 },
        { transform: "scale(1)", opacity: "1" },
      ], {
        duration: 1180,
        delay: index * 135,
      }));

      Promise.all(circleAnimations).then(() => {
        window.location.href = href;
      });
    });
  };

  const shouldTransitionLink = (link, event) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href === "#" ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.hasAttribute("download") ||
      link.hasAttribute("onclick") ||
      link.getAttribute("target") === "_blank" ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return false;
    }

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return false;
    }

    if (url.origin !== window.location.origin) return false;

    const currentWithoutHash = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    const targetWithoutHash = `${url.origin}${url.pathname}${url.search}`;
    if (currentWithoutHash === targetWithoutHash && url.hash) return false;
    if (url.href === window.location.href) return false;

    return url.href;
  };

  const bindPageLinks = (transition) => {
    document.addEventListener("click", (event) => {
      const link = event.target.closest ? event.target.closest("a[href]") : null;
      if (!link) return;

      const targetHref = shouldTransitionLink(link, event);
      if (!targetHref) return;

      event.preventDefault();
      playExit(transition, targetHref);
    });
  };

  const isFadeCandidate = (element) => {
    if (!(element instanceof HTMLElement)) return false;
    if (element.closest(".page-transition-overlay, .catering-overlay, #interactive-menu-overlay, .w-commerce-commercecartcontainerwrapper")) return false;
    if (element.matches("script, style, link, meta, noscript, br")) return false;
    if (element.classList.contains("pycha-fade-item")) return false;
    if (element.matches(".reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-opps, .has_fade_anim")) return false;

    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  const collectFadeItems = () => {
    const selectors = [
      ".header-section .nav-content-wrap",
      "body > section",
      "main > *",
      "section > .container > *",
      "section > .w-layout-blockcontainer > *",
      ".pycha-catering-card",
      ".top-menu-card",
      ".menu-card",
      ".contact-form-box",
      ".cta-form-card",
      ".pycha-callback-popup",
      ".pycha-article__body > *",
      ".pycha-site-footer__top",
      ".pycha-site-footer__column",
      ".pycha-footer__top",
      ".pycha-footer__column",
      ".products-grid > *",
      ".testimonial-main-box > *",
      ".about-feature-card",
      "article",
      "footer",
    ];

    return Array.from(new Set(document.querySelectorAll(selectors.join(",")))).filter(isFadeCandidate);
  };

  const setupEntranceFades = () => {
    if (reduceMotion) return;

    let observer;
    const reveal = (element) => {
      element.classList.add("is-visible");
      window.setTimeout(() => {
        element.classList.remove("is-waiting");
      }, 950);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      }, {
        rootMargin: "0px 0px -8% 0px",
        threshold: .12,
      });
    }

    const registerItems = () => {
      collectFadeItems().forEach((element, index) => {
        element.classList.add("pycha-fade-item", "is-waiting");
        element.style.setProperty("--pycha-fade-delay", `${Math.min(index % 6, 5) * 65}ms`);

        if (observer) {
          observer.observe(element);
        } else {
          reveal(element);
        }
      });
    };

    registerItems();
    window.addEventListener("load", registerItems, { once: true });

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(registerItems);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  };

  runWhenBodyExists(() => {
    const transition = ensureOverlay();
    playEnter(transition);
    bindPageLinks(transition);
    setupEntranceFades();

    window.addEventListener("pageshow", (event) => {
      if (!event.persisted) return;
      transition.overlay.classList.remove("active");
      setCircleScale(transition.circles, 0);
    });
  });
})();
