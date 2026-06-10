document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") {
        console.warn("GSAP not loaded. Page transitions disabled.");
        const overlay = document.querySelector('.page-transition-overlay');
        if (overlay) overlay.style.display = 'none';
        return;
    }

    const overlay = document.querySelector('.page-transition-overlay');

    if (!overlay) return;

    // Check if circles already exist to prevent duplication
    let circle1 = document.querySelector('.transition-circle-1');
    let circle2 = document.querySelector('.transition-circle-2');
    let circle3 = document.querySelector('.transition-circle-3');

    if (!circle1 || !circle2 || !circle3) {
        // Clear anything inside just in case (e.g. old logo)
        overlay.innerHTML = '';

        circle1 = document.createElement('div');
        circle1.classList.add('transition-circle', 'transition-circle-1');

        circle2 = document.createElement('div');
        circle2.classList.add('transition-circle', 'transition-circle-2');

        circle3 = document.createElement('div');
        circle3.classList.add('transition-circle', 'transition-circle-3');

        overlay.appendChild(circle1);
        overlay.appendChild(circle2);
        overlay.appendChild(circle3);
    }

    // Set initial states. All circles cover the screen initially.
    let skipEnter = sessionStorage.getItem('skipTransitionEnter') === 'true';
    sessionStorage.removeItem('skipTransitionEnter');

    if (skipEnter) {
        gsap.set([circle1, circle2, circle3], { scale: 0 });
        overlay.classList.remove('active');
    } else {
        gsap.set([circle1, circle2, circle3], { scale: 1 });
        overlay.classList.add('active'); // Block clicks during enter transition

        // 1. Enter Animation (Reveal Page by shrinking the circles)
        // We shrink from top layer (3) to bottom layer (1)
        gsap.to([circle3, circle2, circle1], {
            scale: 0,
            duration: 1.2,
            ease: "expo.inOut",
            stagger: 0.15,
            onComplete: () => {
                overlay.classList.remove('active'); // Allow clicks once done
            }
        });
    }

    // 2. Leave Animation (Intercept links)
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        // Prevent attaching multiple event listeners if the script runs again
        if (link.dataset.transitionBound) return;
        link.dataset.transitionBound = true;

        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignore links that are external, anchors, or open in new tab
            if (
                link.getAttribute('target') === '_blank' ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                href === '' ||
                e.ctrlKey ||
                e.metaKey
            ) {
                return;
            }

            // Let webflow handle its own tabs/dropdowns if they use #
            if (href === '#') return;

            e.preventDefault();

            // Block clicks during leave transition
            overlay.classList.add('active');

            // Animate circles growing from bottom layer (1) to top layer (3)
            gsap.to([circle1, circle2, circle3], {
                scale: 1,
                duration: 1.2,
                ease: "expo.inOut",
                stagger: 0.15,
                onComplete: () => {
                    sessionStorage.setItem('skipTransitionEnter', 'true');
                    window.location.href = href;
                }
            });
        });
    });
});

// For Safari back button cache
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        // If loaded from bfcache, hide the overlay instantly
        const overlay = document.querySelector('.page-transition-overlay');
        const circles = document.querySelectorAll('.transition-circle');
        if (overlay && typeof gsap !== "undefined") {
            overlay.classList.remove('active');
            if (circles.length) {
                gsap.set(circles, { scale: 0 });
            }
        }
    }
});
