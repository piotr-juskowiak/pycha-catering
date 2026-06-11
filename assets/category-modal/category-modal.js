/* ============================================================
   PYCHA CATERING — Category Modal JS
   ============================================================ */

(function () {
  const categoryData = {
    'kanapki-wrapy': {
      title: 'Kanapki i wrapy',
      products: [
        { name: 'Klasyczna Kanapka Premium', desc: 'Świeża bagietka, wolno pieczona szarpana wołowina, rukola, konfitura z czerwonej cebuli i domowy sos aioli.', price: '16,50 zł', img: 'https://i.imgur.com/nfieVTn.jpeg' },
        { name: 'Wrap Falafel (Wege)', desc: 'Pełnoziarnista tortilla, chrupiący falafel, świeży hummus, pomidorki koktajlowe, ogórek, szpinak i sos tahini.', price: '18,00 zł', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80' },
        { name: 'Kanapka z Łososiem', desc: 'Rzemieślnicze pieczywo żytnie, wędzony łosoś atlantycki, serek śmietankowy z koperkiem, świeży ogórek i kapary.', price: '19,50 zł', img: 'https://images.unsplash.com/photo-1550507992-eb63ffee0224?w=800&q=80' },
      ]
    },
    'przerwy-kawowe': {
      title: 'Przerwy kawowe',
      products: [
        { name: 'Zestaw Kawowy Mini', desc: 'Świeżo palona kawa 100% Arabica w termosach, wybór herbat premium, mleko, cukier oraz mieszanka mini ciasteczek bankietowych.', price: 'od 22 zł/os', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80' },
        { name: 'Zestaw Słodki Poranek', desc: 'Kawa, herbata oraz patery rzemieślniczych rogalików z czekoladą i malinami, świeże drożdżówki i puszyste muffiny.', price: 'od 35 zł/os', img: 'https://images.unsplash.com/photo-1495147466023-e6a925cd9294?w=800&q=80' },
        { name: 'Zestaw Zdrowa Energia', desc: 'Kawa, zielona herbata, świeżo wyciskane soki owocowe, jogurty z granolą domowej roboty oraz koreczki owocowe.', price: 'od 42 zł/os', img: 'https://images.unsplash.com/photo-1542691457-cbe4df041ef2?w=800&q=80' },
      ]
    },
    'zestawy-obiadowe': {
      title: 'Zestawy obiadowe',
      products: [
        { name: 'Zestaw Polski Tradycyjny', desc: 'Złocisty schabowy z kością smażony na smalcu, ziemniaki z koperkiem oraz zasmażana młoda kapusta.', price: '32,00 zł', img: 'https://i.imgur.com/93WwKW8.jpeg' },
        { name: 'Zestaw Włoski', desc: 'Grillowana pierś z kurczaka supreme, kremowe risotto szafranowe i glazurowane szparagi z parmezanem.', price: '36,50 zł', img: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=800&q=80' },
        { name: 'Zestaw Roślinny (Vege)', desc: 'Pieczony batat faszerowany ciecierzycą, kasza pęczak z warzywami korzeniowymi i wegański sos pieczeniowy.', price: '29,00 zł', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
      ]
    },
    'finger-food': {
      title: 'Finger food',
      products: [
        { name: 'Koreczki Caprese', desc: 'Mozzarella di bufala, pomidorki cherry, świeża bazylia i gęsty krem balsamiczny. Idealne na jedną porcję.', price: 'od 6 zł/szt', img: 'https://images.unsplash.com/photo-1605333396914-2f228498b843?w=800&q=80' },
        { name: 'Tatar z Łososia na Pumperniklu', desc: 'Drobno siekany świeży łosoś z kawiorem, koperkiem i czerwoną cebulką na chrupiącym krążku pumpernikla.', price: 'od 9 zł/szt', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },
        { name: 'Mini Tartaletki z Kozim Serem', desc: 'Kruche tartaletki z puszystym musem z koziego sera, karmelizowaną gruszką i orzechami włoskimi.', price: 'od 8 zł/szt', img: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=800&q=80' },
      ]
    },
    'zupy-krem': {
      title: 'Zupy krem',
      products: [
        { name: 'Krem z Pomidorów Pelati', desc: 'Aksamitny krem z włoskich pomidorów dojrzewających w słońcu, z nutą świeżej bazylii i domowymi grzankami ziołowymi.', price: '14,00 zł', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80' },
        { name: 'Krem z Białych Warzyw', desc: 'Delikatny krem z pieczonego kalafiora, selera i pietruszki, podawany z oliwą truflową i prażonymi płatkami migdałów.', price: '15,50 zł', img: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&q=80' },
        { name: 'Pikantny Krem z Dyni', desc: 'Rozgrzewający krem z dyni hokkaido z dodatkiem mleczka kokosowego, imbiru, chilli i prażonych pestek dyni.', price: '16,00 zł', img: 'https://images.unsplash.com/photo-1605634563452-f19b22e11894?w=800&q=80' },
      ]
    },
    'slodkie-bufety': {
      title: 'Słodkie bufety',
      products: [
        { name: 'Mini Monoporcje Bankietowe', desc: 'Ekskluzywne mini desery musowe: marakuja z białą czekoladą, ciemna czekolada z wiśnią oraz pistacja z maliną.', price: 'od 12 zł/szt', img: 'https://images.unsplash.com/photo-1601314115160-c3d396cd84cb?w=800&q=80' },
        { name: 'Sernik z Palonym Masłem', desc: 'Nasz popisowy, niezwykle kremowy sernik nowojorski z nutą palonego masła, na kruchym spodzie ciasteczkowym.', price: '18,00 zł/porcja', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80' },
        { name: 'Pucharki Chia & Mango', desc: 'Lekki deser w słoiczku: pudding chia na mleku kokosowym ze świeżym musem z dojrzałego mango Alphonso.', price: '14,50 zł/szt', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80' },
      ]
    }
  };

  const svgClose = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  function buildModalHtml() {
    return `
      <div class="cat-modal-overlay" id="catModalOverlay" aria-hidden="true">
        <div class="cat-modal" role="dialog" aria-modal="true">
          <div class="cat-modal-header">
            <h3 class="cat-modal-title" id="catModalTitle">Kategoria</h3>
            <button class="cat-modal-close" id="catModalClose" aria-label="Zamknij">
              ${svgClose}
            </button>
          </div>
          <div class="cat-modal-body" id="catModalBody">
            <!-- Products injected here -->
          </div>
        </div>
      </div>
    `;
  }

  function renderProducts(products) {
    return products.map(p => `
      <div class="cat-product-card">
        <div class="cat-product-img-wrap">
          <img src="${p.img}" alt="${p.name}" class="cat-product-img" loading="lazy">
        </div>
        <div class="cat-product-info">
          <h4 class="cat-product-name">${p.name}</h4>
          <p class="cat-product-desc">${p.desc}</p>
          <div class="cat-product-footer">
            <span class="cat-product-price">${p.price}</span>
            <button class="cat-product-btn">Zamów</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function init() {
    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', buildModalHtml());

    const overlay = document.getElementById('catModalOverlay');
    const closeBtn = document.getElementById('catModalClose');
    const titleEl = document.getElementById('catModalTitle');
    const bodyEl = document.getElementById('catModalBody');

    function closeModal() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      overlay.setAttribute('aria-hidden', 'true');
    }

    function openModal(catId) {
      const data = categoryData[catId];
      if (!data) return;

      titleEl.textContent = data.title;
      bodyEl.innerHTML = renderProducts(data.products);

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      overlay.setAttribute('aria-hidden', 'false');
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });

    // Attach to category cards
    document.querySelectorAll('.category-card').forEach((card, index) => {
      // Map existing order to categories
      const keys = ['kanapki-wrapy', 'przerwy-kawowe', 'zestawy-obiadowe', 'finger-food', 'zupy-krem', 'slodkie-bufety'];
      const catId = card.getAttribute('data-category-id') || keys[index];
      
      if (!card.getAttribute('data-category-id')) {
        card.setAttribute('data-category-id', catId);
      }

      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        openModal(catId);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
