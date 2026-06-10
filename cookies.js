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
            background-color: #1E3F20;
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            z-index: 99999;
            font-family: 'Baloo 2', 'Rubik', sans-serif;
            transform: translateY(150%);
            opacity: 0;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .pycha-cookie-popup.show {
            transform: translateY(0);
            opacity: 1;
        }

        .pycha-cookie-title {
            color: #DDE5B6;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 10px;
            line-height: 1.2;
        }

        .pycha-cookie-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 20px;
            font-family: 'Rubik', sans-serif;
        }

        .pycha-cookie-actions {
            display: flex;
            justify-content: flex-end;
        }

        .pycha-cookie-btn {
            background-color: #DDE5B6;
            color: #1E3F20;
            border: none;
            padding: 10px 24px;
            border-radius: 100px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Baloo 2', 'Rubik', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .pycha-cookie-btn:hover {
            background-color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(221, 229, 182, 0.3);
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
