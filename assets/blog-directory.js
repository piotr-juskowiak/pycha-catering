(() => {
  "use strict";

  const init = () => {
    const directory = document.querySelector("#pychaBlogDirectory");
    if (!directory) return;

    const grid = directory.querySelector("#pychaBlogGrid");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll("[data-blog-card]"));
    const filters = Array.from(directory.querySelectorAll("[data-blog-filter]"));
    const count = directory.querySelector("#pychaBlogCount");
    const empty = directory.querySelector("#pychaBlogEmpty");

    const entries = cards.map((card, index) => ({
      card,
      index,
      category: card.dataset.category || "",
      date: card.dataset.date || "",
    }));

    let category =
      filters.find((filter) => filter.getAttribute("aria-pressed") === "true")
        ?.dataset.blogFilter || "all";

    const articleWord = (number) => {
      if (number === 1) return "artykuł";
      const tens = number % 100;
      const ones = number % 10;
      return ones >= 2 && ones <= 4 && (tens < 12 || tens > 14)
        ? "artykuły"
        : "artykułów";
    };

    const compare = (a, b) =>
      b.date.localeCompare(a.date) || a.index - b.index;

    const update = () => {
      let visible = 0;
      const sorted = entries.slice().sort(compare);
      const fragment = document.createDocumentFragment();

      for (const entry of sorted) {
        entry.card.hidden = !(category === "all" || entry.category === category);
        if (!entry.card.hidden) visible += 1;
        fragment.appendChild(entry.card);
      }

      grid.appendChild(fragment);
      if (count) count.textContent = `${visible} ${articleWord(visible)}`;
      if (empty) empty.hidden = visible !== 0;
    };

    for (const filter of filters) {
      filter.addEventListener("click", () => {
        category = filter.dataset.blogFilter || "all";
        for (const button of filters) {
          button.setAttribute(
            "aria-pressed",
            String(button.dataset.blogFilter === category)
          );
        }
        update();
      });
    }

    update();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
