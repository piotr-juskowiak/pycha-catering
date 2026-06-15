document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('cookiesAccepted')) {
        // Inject CSS
        const style = document.createElement('style');
        style.textContent = `
        .pycha-cookie-popup {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 380px;
            max-width: calc(100% - 60px);
            background-color: #fff8e8;
            border-radius: 18px;
            padding: 30px;
            box-shadow: 0 24px 48px rgba(11, 37, 12, 0.12);
            z-index: 99999;
            font-family: 'Baloo 2', 'Rubik', sans-serif;
            transform: translateY(150%);
            opacity: 0;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
            border: 1px solid rgba(120, 164, 79, 0.2);
        }

        .pycha-cookie-popup.show {
            transform: translateY(0);
            opacity: 1;
        }

        .pycha-cookie-title {
            color: #0b250c;
            font-size: 22px;
            font-weight: 800;
            margin-bottom: 12px;
            line-height: 1.2;
        }

        .pycha-cookie-text {
            color: #5D675C;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 24px;
            font-family: 'Rubik', sans-serif;
        }

        .pycha-cookie-actions {
            display: flex;
            justify-content: flex-end;
        }

        .pycha-cookie-btn {
            background-color: #78a44f;
            color: #fff;
            border: none;
            padding: 12px 28px;
            border-radius: 12px;
            font-weight: 800;
            font-size: 15px;
            cursor: pointer;
            transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
            font-family: 'Baloo 2', 'Rubik', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 8px 16px rgba(120, 164, 79, 0.24);
        }

        .pycha-cookie-btn:hover {
            background-color: #5f8b3d;
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(120, 164, 79, 0.32);
        }
        `;
        document.head.appendChild(style);

        // Inject HTML
        const popup = document.createElement('div');
        popup.className = 'pycha-cookie-popup';
        popup.id = 'pycha-cookie-popup';
        popup.innerHTML = `
            <div class="pycha-cookie-content">
                <div class="pycha-cookie-title">Dbamy o Twoją prywatność</div>
                <div class="pycha-cookie-text">Nasza strona używa plików cookies, aby zapewnić Ci najwyższą jakość przeglądania i dostosować treści do Twoich potrzeb. Klikając „Akceptuję”, zgadzasz się na ich użycie.</div>
            </div>
            <div class="pycha-cookie-actions">
                <button id="pycha-accept-cookies" class="pycha-cookie-btn">Akceptuję</button>
            </div>
        `;
        document.body.appendChild(popup);

        // Show popup
        setTimeout(() => {
            popup.classList.add('show');
        }, 1000);

        // Handle accept
        document.getElementById('pycha-accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 600);
        });
    }
});
