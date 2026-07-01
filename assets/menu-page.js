(function () {
  const dayOrder = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];
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

  function parseDish(rawDish) {
    const text = String(rawDish || "").replace(/\s+/g, " ").trim();
    const match = text.match(/^(\d+(?:[,.]\d{1,2})?)\s*zł\s+(.+)$/i);

    if (!match) {
      return { name: text, price: "" };
    }

    return {
      name: match[2].trim(),
      price: `${match[1].replace(".", ",")} zł`,
    };
  }

  function orderedCategories(dayData) {
    const knownCategories = categoryOrder.filter((category) => Array.isArray(dayData[category]) && dayData[category].length);
    const extraCategories = Object.keys(dayData).filter((category) => !categoryOrder.includes(category) && Array.isArray(dayData[category]) && dayData[category].length);

    return knownCategories.concat(extraCategories);
  }

  function countDishes(dayData) {
    return orderedCategories(dayData).reduce((total, category) => total + dayData[category].length, 0);
  }

  function renderCategory(category, dishes, icons) {
    const block = createElement("section", "weekly-category-block");
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

    title.appendChild(document.createTextNode(category));
    block.appendChild(title);

    const list = createElement("ul", "weekly-dish-list");
    dishes.forEach((dish) => {
      const parsed = parseDish(dish);
      if (!parsed.name) return;

      const item = createElement("li", "weekly-dish-item");
      item.appendChild(createElement("span", "weekly-dish-name", parsed.name));

      if (parsed.price) {
        item.appendChild(createElement("span", "weekly-dish-price", parsed.price));
      }

      list.appendChild(item);
    });

    block.appendChild(list);
    return block;
  }

  function renderDay(dayName, dayData, icons) {
    const card = createElement("article", "weekly-day-card");
    const header = createElement("div", "weekly-day-header");
    const title = createElement("h3", "weekly-day-name", dayName);
    const dishCount = countDishes(dayData);
    const count = createElement("span", "weekly-day-count", `${dishCount} dań`);

    header.appendChild(title);
    header.appendChild(count);
    card.appendChild(header);

    const body = createElement("div", "weekly-day-body");
    orderedCategories(dayData).forEach((category) => {
      body.appendChild(renderCategory(category, dayData[category], icons));
    });
    card.appendChild(body);

    return card;
  }

  function renderWeek(weeklyMenu, icons, weekName, grid) {
    const weekData = weeklyMenu[weekName] || {};
    grid.textContent = "";

    dayOrder.forEach((dayName) => {
      const dayData = weekData[dayName] || {};
      grid.appendChild(renderDay(dayName, dayData, icons));
    });
  }

  function renderMenu(menuData) {
    const tabs = document.getElementById("weeklyMenuWeekTabs");
    const grid = document.getElementById("weeklyMenuGrid");
    const weeklyMenu = menuData && menuData.weeklyMenu;

    if (!tabs || !grid) return;

    if (!weeklyMenu || typeof weeklyMenu !== "object" || !Object.keys(weeklyMenu).length) {
      grid.innerHTML = "";
      grid.appendChild(createElement("p", "weekly-menu-empty", "Menu chwilowo niedostępne."));
      return;
    }

    const icons = (menuData && menuData.catIcons) || fallbackIcons;
    const weekNames = Object.keys(weeklyMenu);
    let activeWeek = weekNames[0];

    tabs.textContent = "";
    weekNames.forEach((weekName) => {
      const button = createElement("button", "weekly-menu-week-tab", weekName);
      button.type = "button";
      button.setAttribute("aria-pressed", weekName === activeWeek ? "true" : "false");
      if (weekName === activeWeek) button.classList.add("is-active");

      button.addEventListener("click", () => {
        activeWeek = weekName;
        tabs.querySelectorAll(".weekly-menu-week-tab").forEach((tab) => {
          const isActive = tab === button;
          tab.classList.toggle("is-active", isActive);
          tab.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        renderWeek(weeklyMenu, icons, activeWeek, grid);
      });

      tabs.appendChild(button);
    });

    renderWeek(weeklyMenu, icons, activeWeek, grid);
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
