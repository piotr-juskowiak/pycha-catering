(function () {
  var OPEN_LINK = '.w-commerce-commercecartopenlink';
  var CLOSE_LINK = '.w-commerce-commercecartcloselink';
  var CART_WRAP = '.w-commerce-commercecartwrapper';
  var CART_MODAL = '[data-node-type="commerce-cart-container-wrapper"]';

  function injectStyles() {
    if (document.getElementById('pycha-cart-popup-fix-styles')) return;

    var style = document.createElement('style');
    style.id = 'pycha-cart-popup-fix-styles';
    style.textContent = [
      '.w-commerce-commercecartcontainerwrapper.cart-wrapper{z-index:100200!important;}',
      '.w-commerce-commercecartcontainerwrapper.cart-wrapper[data-pycha-cart-open="true"]{display:flex!important;}',
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

  function closeCart(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    modal.removeAttribute('data-pycha-cart-open');
    modal.setAttribute('aria-hidden', 'true');

    var anyOpen = document.querySelector(CART_MODAL + '[data-pycha-cart-open="true"]');
    if (!anyOpen) setBodyLock(false);
  }

  function openCart(trigger) {
    var wrapper = trigger && trigger.closest(CART_WRAP);
    var modal = wrapper && wrapper.querySelector(CART_MODAL);
    if (!modal) return;

    document.querySelectorAll(CART_MODAL).forEach(function (otherModal) {
      if (otherModal !== modal) closeCart(otherModal);
    });

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
        var wrapper = openLink.closest(CART_WRAP);
        var modal = wrapper && wrapper.querySelector(CART_MODAL);
        if (!modal) return;
        if (!isShown(modal)) {
          openCart(openLink);
          return;
        }

        modal.removeAttribute('aria-hidden');
        modal.setAttribute('data-pycha-cart-open', 'true');
        setBodyLock(true);
      }, 120);
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
