(function () {
  var OPEN_LINK = '.w-commerce-commercecartopenlink';
  var CLOSE_LINK = '.w-commerce-commercecartcloselink';
  var CART_WRAP = '.w-commerce-commercecartwrapper';
  var CART_MODAL = '[data-node-type="commerce-cart-container-wrapper"]';
  var modalByWrapper = new WeakMap();

  function injectStyles() {
    if (document.getElementById('pycha-cart-popup-fix-styles')) return;

    var style = document.createElement('style');
    style.id = 'pycha-cart-popup-fix-styles';
    style.textContent = [
      '.w-commerce-commercecartcontainerwrapper.cart-wrapper{z-index:100200!important;}',
      '.w-commerce-commercecartcontainerwrapper.cart-wrapper[data-pycha-cart-open="true"]{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;min-height:100vh!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:24px!important;overflow:auto!important;}',
      '.w-commerce-commercecartcontainerwrapper.cart-wrapper[data-pycha-cart-open="true"] .cart-container{width:min(480px,calc(100vw - 32px))!important;max-height:calc(100vh - 48px)!important;}',
      '.w-commerce-commercecartopenlink.cart-button{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;}',
      'html.pycha-cart-open,body.pycha-cart-open{overflow:hidden!important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function isShown(element) {
    if (!element) return false;
    var styles = window.getComputedStyle(element);
    return styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0';
  }

  function setBodyLock(locked) {
    document.documentElement.classList.toggle('pycha-cart-open', locked);
    document.body.classList.toggle('pycha-cart-open', locked);
  }

  function getCartModal(trigger) {
    var wrapper = trigger && trigger.closest(CART_WRAP);
    if (!wrapper) return null;

    var cachedModal = modalByWrapper.get(wrapper);
    if (cachedModal && document.body.contains(cachedModal)) return cachedModal;

    var modal = wrapper.querySelector(CART_MODAL);
    if (!modal) return null;

    modalByWrapper.set(wrapper, modal);
    return modal;
  }

  function promoteModal(modal) {
    if (!modal || modal.parentElement === document.body) return;
    document.body.appendChild(modal);
  }

  function closeCart(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    modal.removeAttribute('data-pycha-cart-open');
    modal.setAttribute('aria-hidden', 'true');

    var anyOpen = document.querySelector(CART_MODAL + '[data-pycha-cart-open="true"]');
    if (!anyOpen) setBodyLock(false);
  }

  function openCart(trigger) {
    var modal = getCartModal(trigger);
    if (!modal) return;

    document.querySelectorAll(CART_MODAL).forEach(function (otherModal) {
      if (otherModal !== modal) closeCart(otherModal);
    });

    promoteModal(modal);
    modal.style.display = 'flex';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('data-pycha-cart-open', 'true');
    setBodyLock(true);

    var dialog = modal.querySelector('[role="dialog"], .w-commerce-commercecartcontainer');
    if (dialog) {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus({ preventScroll: true });
    }
  }

  injectStyles();

  document.addEventListener('click', function (event) {
    var openLink = event.target.closest(OPEN_LINK);
    if (openLink) {
      window.setTimeout(function () {
        var modal = getCartModal(openLink);
        if (!modal) return;
        if (!isShown(modal)) {
          openCart(openLink);
          return;
        }

        promoteModal(modal);
        modal.style.display = 'flex';
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('data-pycha-cart-open', 'true');
        setBodyLock(true);
      }, 0);
      return;
    }

    var closeLink = event.target.closest(CLOSE_LINK);
    if (closeLink) {
      var closeModal = closeLink.closest(CART_MODAL);
      window.setTimeout(function () {
        closeCart(closeModal);
      }, 0);
      return;
    }

    var openModal = event.target.closest(CART_MODAL + '[data-pycha-cart-open="true"]');
    if (openModal && event.target === openModal) closeCart(openModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    document.querySelectorAll(CART_MODAL + '[data-pycha-cart-open="true"]').forEach(closeCart);
  });
})();
