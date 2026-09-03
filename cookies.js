document.addEventListener("DOMContentLoaded", () => {
    const savedChoice = localStorage.getItem("cookiesAccepted");
    if (savedChoice !== null) return;

    const style = document.createElement("style");
    style.textContent = `
        .pycha-cookie-popup {
            position: fixed;
            left: 24px;
            bottom: 24px;
            z-index: 100110;
            width: min(420px, calc(100vw - 48px));
            padding: 20px;
            border: 1px solid rgba(31, 65, 25, 0.14);
            border-radius: 20px;
            background:
                radial-gradient(circle at 100% 0, rgba(195, 219, 138, 0.26), transparent 34%),
                #fffdf6;
            box-shadow: 0 20px 54px rgba(7, 29, 9, 0.2), 0 2px 8px rgba(7, 29, 9, 0.08);
            color: #173718;
            font-family: 'Rubik', sans-serif;
            opacity: 0;
            transform: translateY(18px) scale(0.98);
            transform-origin: left bottom;
            visibility: hidden;
            transition: opacity 0.36s ease, transform 0.46s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.36s ease;
        }

        .pycha-cookie-popup.show {
            opacity: 1;
            transform: translateY(0) scale(1);
            visibility: visible;
        }

        .pycha-cookie-header {
            display: grid;
            grid-template-columns: 42px minmax(0, 1fr);
            gap: 13px;
            align-items: center;
            margin-bottom: 11px;
        }

        .pycha-cookie-icon {
            display: grid;
            width: 42px;
            height: 42px;
            place-items: center;
            border-radius: 13px;
            background: #eaf1d8;
            color: #5e8d3b;
        }

        .pycha-cookie-icon svg {
            width: 22px;
            height: 22px;
            stroke: currentColor;
            stroke-width: 1.8;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .pycha-cookie-kicker {
            display: block;
            margin-bottom: 2px;
            color: #72964f;
            font-size: 9px;
            font-weight: 700;
            line-height: 1.2;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }

        .pycha-cookie-title {
            margin: 0;
            color: #173718;
            font-family: 'Baloo 2', 'Rubik', sans-serif;
            font-size: 20px;
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.015em;
        }

        .pycha-cookie-text {
            margin: 0 0 9px;
            color: #596655;
            font-size: 12px;
            line-height: 1.55;
        }

        .pycha-cookie-details {
            display: inline-flex;
            margin-bottom: 17px;
            color: #294d27;
            font-size: 11px;
            font-weight: 700;
            line-height: 1.3;
            text-decoration-color: rgba(41, 77, 39, 0.35);
            text-underline-offset: 3px;
        }

        .pycha-cookie-details:hover {
            color: #5f8e39;
            text-decoration-color: currentColor;
        }

        .pycha-cookie-actions {
            display: grid;
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
            gap: 9px;
        }

        .pycha-cookie-btn-secondary,
        .pycha-cookie-btn {
            min-height: 44px;
            padding: 10px 14px;
            border-radius: 12px;
            font-family: 'Baloo 2', 'Rubik', sans-serif;
            font-size: 12px;
            font-weight: 800;
            line-height: 1.2;
            cursor: pointer;
            transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .pycha-cookie-btn-secondary {
            border: 1px solid #ccd6c6;
            background: rgba(255, 255, 255, 0.72);
            color: #3f513b;
        }

        .pycha-cookie-btn-secondary:hover {
            border-color: #95aa84;
            background: #f4f7ec;
            color: #173718;
        }

        .pycha-cookie-btn {
            border: 1px solid #6f9f45;
            background: #6f9f45;
            color: #fff;
            box-shadow: 0 8px 18px rgba(71, 112, 42, 0.2);
        }

        .pycha-cookie-btn:hover {
            border-color: #5f8e39;
            background: #5f8e39;
            transform: translateY(-1px);
            box-shadow: 0 11px 22px rgba(71, 112, 42, 0.25);
        }

        .pycha-cookie-btn-secondary:focus-visible,
        .pycha-cookie-btn:focus-visible,
        .pycha-cookie-details:focus-visible {
            outline: 3px solid rgba(112, 153, 81, 0.3);
            outline-offset: 3px;
        }

        @media (max-width: 520px) {
            .pycha-cookie-popup {
                left: 10px;
                bottom: 10px;
                width: calc(100vw - 20px);
                padding: 18px;
                border-radius: 18px;
                transform-origin: center bottom;
            }

            .pycha-cookie-actions {
                grid-template-columns: 1fr;
            }

            .pycha-cookie-btn-secondary,
            .pycha-cookie-btn {
                min-height: 46px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .pycha-cookie-popup,
            .pycha-cookie-btn-secondary,
            .pycha-cookie-btn {
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);

    const popup = document.createElement("section");
    popup.className = "pycha-cookie-popup";
    popup.id = "pycha-cookie-popup";
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-labelledby", "pycha-cookie-title");
    popup.setAttribute("aria-describedby", "pycha-cookie-description");
    popup.innerHTML = `
        <div class="pycha-cookie-header">
            <span class="pycha-cookie-icon" aria-hidden="true">
                <svg fill="none" viewBox="0 0 24 24">
                    <path d="M12 3a4.5 4.5 0 0 0 5.7 4.3A4.5 4.5 0 0 0 21 12a9 9 0 1 1-9-9Z" />
                    <circle cx="8.5" cy="12.2" r="1" fill="currentColor" stroke="none" />
                    <circle cx="13.5" cy="16" r="1" fill="currentColor" stroke="none" />
                    <circle cx="8.5" cy="17" r=".7" fill="currentColor" stroke="none" />
                </svg>
            </span>
            <div>
                <span class="pycha-cookie-kicker">Twoje ustawienia</span>
                <h2 class="pycha-cookie-title" id="pycha-cookie-title">Dbamy o Twoją prywatność</h2>
            </div>
        </div>
        <p class="pycha-cookie-text" id="pycha-cookie-description">Ta strona korzysta z plików cookie, aby działać poprawnie i zapewniać Ci lepsze doświadczenie.</p>
        <a class="pycha-cookie-details" href="/utility/privacy-policy">Dowiedz się więcej w Polityce prywatności</a>
        <div class="pycha-cookie-actions">
            <button class="pycha-cookie-btn-secondary" id="pycha-decline-cookies" type="button">Odrzuć</button>
            <button class="pycha-cookie-btn" id="pycha-accept-cookies" type="button">Akceptuję</button>
        </div>
    `;
    document.body.appendChild(popup);

    window.setTimeout(() => popup.classList.add("show"), 450);

    const saveChoice = (accepted) => {
        localStorage.setItem("cookiesAccepted", String(accepted));
        popup.classList.remove("show");
        document.dispatchEvent(new CustomEvent("pycha:cookies-resolved", { detail: { accepted } }));
        window.setTimeout(() => popup.remove(), 480);
    };

    document.getElementById("pycha-accept-cookies").addEventListener("click", () => saveChoice(true));
    document.getElementById("pycha-decline-cookies").addEventListener("click", () => saveChoice(false));
});
