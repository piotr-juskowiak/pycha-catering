(function () {
  const dayOrder = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];
  const dayShort = {
    "Poniedziałek": "Pon",
    "Wtorek": "Wt",
    "Środa": "Śr",
    "Czwartek": "Czw",
    "Piątek": "Pt",
  };

  const categoryOrder = [
    "Dania mięsne",
    "Dania wege",
    "Zupy",
    "Mączne",
    "Desery",
    "Sałatki",
    "Makaron",
    "Stałe codziennie",
    "Kanapki",
  ];
  const sandwichesCategory = "Kanapki";

  const categoryLabels = {
    all: "Wszystkie",
    "Stałe codziennie": "Stałe pozycje",
  };

  const fallbackIcons = {
    "Dania mięsne": "https://i.imgur.com/mk96eYb.png",
    "Dania wege": "https://i.imgur.com/VcumTo0.png",
    "Zupy": "https://i.imgur.com/fQPU7Q3.png",
    "Mączne": "https://i.imgur.com/5dmembW.png",
    "Desery": "https://i.imgur.com/hMAugNx.png",
    "Sałatki": "https://i.imgur.com/VcumTo0.png",
    "Makaron": "https://i.imgur.com/mk96eYb.png",
    "Stałe codziennie": "https://i.imgur.com/fQPU7Q3.png",
    "Kanapki": "https://i.imgur.com/5dmembW.png",
  };

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function getCategoryLabel(category) {
    return categoryLabels[category] || category;
  }

  function parseDish(rawDish) {
    if (rawDish && typeof rawDish === "object") {
      return {
        name: String(rawDish.name || rawDish.title || "").trim(),
        price: String(rawDish.price || "").trim(),
        weight: String(rawDish.weight || "").trim(),
      };
    }

    const text = String(rawDish || "").replace(/\s+/g, " ").trim();
    const match = text.match(/^(\d+(?:[,.]\d{1,2})?)\s*zł\s+(.+)$/i);

    if (!match) {
      return { name: text, price: "", weight: "" };
    }

    return {
      name: match[2].trim(),
      price: `${match[1].replace(".", ",")} zł`,
      weight: "",
    };
  }

  function getSandwiches(menuData) {
    return Array.isArray(menuData && menuData.sandwiches) ? menuData.sandwiches : [];
  }

  function getCategoryDishes(dayData, category, sandwiches) {
    const dayItems = dayData && dayData[category];

    if (category === sandwichesCategory && Array.isArray(sandwiches) && sandwiches.length) {
      return sandwiches;
    }

    return Array.isArray(dayItems) ? dayItems : [];
  }

  function orderedCategories(dayData, activeCategory, sandwiches) {
    const categories = categoryOrder.filter((category) => {
      return getCategoryDishes(dayData, category, sandwiches).length;
    });

    const extraCategories = Object.keys(dayData || {}).filter((category) => {
      const items = dayData[category];
      return !categoryOrder.includes(category) && Array.isArray(items) && items.length;
    });

    const allCategories = categories.concat(extraCategories);
    if (!activeCategory || activeCategory === "all") return allCategories;
    return allCategories.filter((category) => category === activeCategory);
  }

  function countDishes(dayData, activeCategory, sandwiches) {
    return orderedCategories(dayData, activeCategory, sandwiches).reduce((total, category) => {
      return total + getCategoryDishes(dayData, category, sandwiches).length;
    }, 0);
  }

  function getWeekCategoryCounts(weekData, sandwiches) {
    const counts = {};
    let total = 0;
    const sandwichCount = Array.isArray(sandwiches) ? sandwiches.length : 0;

    dayOrder.forEach((dayName) => {
      const dayData = weekData[dayName] || {};
      Object.keys(dayData).forEach((category) => {
        if (category === sandwichesCategory && sandwichCount) return;
        const items = dayData[category];
        if (!Array.isArray(items) || !items.length) return;
        counts[category] = (counts[category] || 0) + items.length;
        total += items.length;
      });
    });

    if (sandwichCount) {
      counts[sandwichesCategory] = sandwichCount * dayOrder.length;
      total += counts[sandwichesCategory];
    }

    return { counts, total };
  }

  function renderCategory(category, dishes, icons) {
    const block = createElement("section", "weekly-category-block");
    block.setAttribute("data-category", category);

    const header = createElement("div", "weekly-category-header");
    const title = createElement("h4", "weekly-category-title");
    const iconSrc = icons[category] || fallbackIcons[category];

    if (iconSrc) {
      const icon = document.createElement("img");
      icon.className = "weekly-category-icon";
      icon.src = iconSrc;
      icon.alt = "";
      icon.loading = "lazy";
      title.appendChild(icon);
    }

    title.appendChild(createElement("span", "weekly-category-title-text", getCategoryLabel(category)));
    header.appendChild(title);
    header.appendChild(createElement("span", "weekly-category-count", String(dishes.length)));
    block.appendChild(header);

    const list = createElement("ul", "weekly-dish-list");
    dishes.forEach((dish) => {
      const parsed = parseDish(dish);
      if (!parsed.name) return;

      const item = createElement("li", "weekly-dish-item");
      const copy = createElement("span", "weekly-dish-copy");
      copy.appendChild(createElement("span", "weekly-dish-name", parsed.name));

      if (parsed.weight) {
        copy.appendChild(createElement("span", "weekly-dish-weight", parsed.weight));
      }

      item.appendChild(copy);
      item.appendChild(createElement("span", parsed.price ? "weekly-dish-price" : "weekly-dish-price weekly-dish-price-empty", parsed.price));
      list.appendChild(item);
    });

    block.appendChild(list);
    return block;
  }

  function renderDay(dayName, dayData, icons, activeCategory, sandwiches) {
    const card = createElement("article", "weekly-day-card");
    const categories = orderedCategories(dayData, activeCategory, sandwiches);
    const dishCount = countDishes(dayData, activeCategory, sandwiches);
    const header = createElement("div", "weekly-day-header");
    const dayLabel = createElement("div", "weekly-day-label");
    const meta = createElement("div", "weekly-day-meta");

    dayLabel.appendChild(createElement("span", "weekly-day-short", dayShort[dayName] || dayName.slice(0, 3)));
    dayLabel.appendChild(createElement("h3", "weekly-day-name", dayName));
    meta.appendChild(createElement("span", "", `${dishCount} dań`));
    meta.appendChild(createElement("span", "", `${categories.length} kategorii`));

    header.appendChild(dayLabel);
    header.appendChild(meta);
    card.appendChild(header);

    const body = createElement("div", "weekly-day-body");
    categories.forEach((category) => {
      body.appendChild(renderCategory(category, getCategoryDishes(dayData, category, sandwiches), icons));
    });

    if (!categories.length) {
      body.appendChild(createElement("p", "weekly-day-empty", activeCategory === "all" ? "Menu na ten dzień pojawi się wkrótce." : "Brak pozycji w tej kategorii."));
    }

    card.appendChild(body);
    return card;
  }

  function renderWeekTabs(tabs, weekNames, activeWeek, setWeek) {
    const activeIndex = Math.max(0, weekNames.indexOf(activeWeek));
    tabs.textContent = "";
    tabs.style.setProperty("--week-count", String(weekNames.length));
    tabs.style.setProperty("--active-index", String(activeIndex));

    weekNames.forEach((weekName, index) => {
      const isActive = weekName === activeWeek;
      const button = createElement("button", "weekly-menu-week-tab", weekName);
      button.type = "button";
      button.id = `weekly-menu-week-tab-${index}`;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("aria-controls", "weeklyMenuGrid");
      button.tabIndex = isActive ? 0 : -1;
      if (isActive) button.classList.add("is-active");

      button.addEventListener("click", () => setWeek(weekName));
      button.addEventListener("keydown", (event) => {
        const keyMap = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        let nextIndex = index;

        if (event.key in keyMap) {
          event.preventDefault();
          nextIndex = (index + keyMap[event.key] + weekNames.length) % weekNames.length;
        } else if (event.key === "Home") {
          event.preventDefault();
          nextIndex = 0;
        } else if (event.key === "End") {
          event.preventDefault();
          nextIndex = weekNames.length - 1;
        } else {
          return;
        }

        setWeek(weekNames[nextIndex]);
        window.requestAnimationFrame(() => document.getElementById(`weekly-menu-week-tab-${nextIndex}`)?.focus());
      });

      tabs.appendChild(button);
    });
  }

  function renderCategoryFilters(filters, resetButton, weekData, activeCategory, setCategory, sandwiches) {
    const { counts, total } = getWeekCategoryCounts(weekData, sandwiches);
    const categories = categoryOrder.filter((category) => counts[category]);
    const extras = Object.keys(counts).filter((category) => !categoryOrder.includes(category));
    const filterItems = ["all"].concat(categories, extras);

    filters.textContent = "";
    filterItems.forEach((category) => {
      const isAll = category === "all";
      const isActive = category === activeCategory;
      const count = isAll ? total : counts[category];
      const button = createElement("button", `weekly-menu-filter-chip${isActive ? " is-active" : ""}`);
      button.type = "button";
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      button.dataset.category = category;
      button.appendChild(createElement("span", "weekly-menu-filter-name", getCategoryLabel(category)));
      button.appendChild(createElement("span", "weekly-menu-filter-count", String(count || 0)));
      button.addEventListener("click", () => setCategory(category));
      filters.appendChild(button);
    });

    resetButton.hidden = activeCategory === "all";
    resetButton.onclick = () => setCategory("all");
  }

  function renderWeek(weeklyMenu, icons, weekName, grid, activeCategory, sandwiches) {
    const weekData = weeklyMenu[weekName] || {};
    grid.textContent = "";

    dayOrder.forEach((dayName) => {
      grid.appendChild(renderDay(dayName, weekData[dayName] || {}, icons, activeCategory, sandwiches));
    });
  }

  function renderMenu(menuData) {
    const tabs = document.getElementById("weeklyMenuWeekTabs");
    const filters = document.getElementById("weeklyMenuCategoryFilters");
    const resetButton = document.getElementById("weeklyMenuFilterReset");
    const grid = document.getElementById("weeklyMenuGrid");
    const weeklyMenu = menuData && menuData.weeklyMenu;

    if (!tabs || !filters || !resetButton || !grid) return;

    if (!weeklyMenu || typeof weeklyMenu !== "object" || !Object.keys(weeklyMenu).length) {
      grid.textContent = "";
      grid.appendChild(createElement("p", "weekly-menu-empty", "Menu chwilowo niedostępne."));
      return;
    }

    const icons = (menuData && menuData.catIcons) || fallbackIcons;
    const sandwiches = getSandwiches(menuData);
    const weekNames = Object.keys(weeklyMenu);
    let activeWeek = weekNames[0];
    let activeCategory = "all";

    function setWeek(weekName) {
      activeWeek = weekName;
      const { counts } = getWeekCategoryCounts(weeklyMenu[activeWeek] || {}, sandwiches);
      if (activeCategory !== "all" && !counts[activeCategory]) {
        activeCategory = "all";
      }
      renderAll();
    }

    function setCategory(category) {
      activeCategory = category;
      renderAll();
    }

    function renderAll() {
      renderWeekTabs(tabs, weekNames, activeWeek, setWeek);
      renderCategoryFilters(filters, resetButton, weeklyMenu[activeWeek] || {}, activeCategory, setCategory, sandwiches);
      renderWeek(weeklyMenu, icons, activeWeek, grid, activeCategory, sandwiches);
    }

    renderAll();
  }

  function initWeeklyMenuPage() {
    const dataReady = window.PYCHA_MENU_DATA_READY || Promise.resolve(window.PYCHA_MENU_DATA);

    dataReady
      .then((menuData) => renderMenu(menuData || window.PYCHA_MENU_DATA))
      .catch(() => renderMenu(window.PYCHA_MENU_DATA));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWeeklyMenuPage);
  } else {
    initWeeklyMenuPage();
  }
})();
