document.addEventListener("DOMContentLoaded", function() {

    const THEME_KEY = 'theme';
    const DALTONIC_KEY = 'daltonic';
    const LANG_KEY = 'lang';
    const body = document.body;

    // 1. Persistencia Inmediata
    const isDark = localStorage.getItem(THEME_KEY) === 'dark';
    const isDaltonic = localStorage.getItem(DALTONIC_KEY) === 'on';

    if (isDark) body.classList.add('dark-mode');
    if (isDaltonic) body.classList.add('daltonic-mode');

    // ICONO DINÁMICO (Sol vs Luna)
    // Si es oscuro -> Luna (moon-stars-fill), si es claro -> Sol (sun-fill)
    const themeIconClass = isDark ? "bi-moon-stars-fill" : "bi-sun-fill";

    // 2. HTML de Controles (Select + Switches)
    const controlsHTML = `
        <div class="theme-controls d-flex align-items-center gap-4 me-3">
            
            <select id="langSelector" class="form-select form-select-sm" style="width: auto;" onchange="setLanguage(this.value)">
                <option value="eu">EU</option>
                <option value="es">ES</option>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
                <option value="it">IT</option>
                <option value="pt">PT</option>
                <option value="zh">ZH</option>
            </select>

            <div class="control-group ${isDark ? 'dark-mode-active' : ''}" id="themeGroup" title="Modo Oscuro">
                <i class="bi ${themeIconClass} control-icon" id="themeIcon"></i>
                <label class="ios-switch">
                    <input type="checkbox" id="themeSwitch" ${isDark ? 'checked' : ''} onchange="toggleTheme(this.checked)">
                    <span class="slider"></span>
                </label>
            </div>

            <div class="control-group ${isDaltonic ? 'daltonic-mode-active' : ''}" id="daltonicGroup" title="Modo Daltónico">
                <i class="bi bi-eye-fill control-icon"></i>
                <label class="ios-switch">
                    <input type="checkbox" id="daltonicSwitch" ${isDaltonic ? 'checked' : ''} onchange="toggleDaltonic(this.checked)">
                    <span class="slider"></span>
                </label>
                
                <div id="daltonicBubble" class="status-bubble"></div>
            </div>

        </div>
    `;

    // 3. Estructura Navbar
    const menuHTML = `
    <nav class="navbar navbar-expand-lg ios-navbar fixed-top">
        <div class="container-fluid px-4">
            <a class="navbar-brand ios-brand" href="index.html">
                <i class="bi bi-mortarboard-fill"></i> GrAL info
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="bi bi-list fs-2 text-dark"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                ${controlsHTML}
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="index.html" data-i18n="nav_home"><i class="bi bi-house-fill"></i>Hasiera</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="araudia.html" data-i18n="nav_araudia"><i class="bi bi-file-text-fill"></i>Araudia</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="egutegia.html" data-i18n="nav_egutegia"><i class="bi bi-calendar-event-fill"></i>Egutegia</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="galdetegia.html" data-i18n="nav_galdetegia"><i class="bi bi-question-circle-fill"></i>Galdetegia</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="memoriak.html" data-i18n="nav_memoriak"><i class="bi bi-archive-fill"></i>Memoriak</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="norgara.html" data-i18n="nav_norgara"><i class="bi bi-people-fill"></i>Nor Gara</a></li>
                </ul>
            </div>
        </div>
    </nav>`;

    // 4. Inyección
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        menuContainer.innerHTML = menuHTML;
        document.body.style.paddingTop = '60px';
    }

    // 5. Enlace Activo
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // 6. Sincronizar Idioma
    const langSelector = document.getElementById('langSelector');
    if (langSelector) {
        langSelector.value = localStorage.getItem(LANG_KEY) || 'eu';
    }

    document.dispatchEvent(new Event("menuLoaded"));
});