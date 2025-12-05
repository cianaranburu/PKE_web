// menu.js (MODIFICADO para Persistencia Mínima)
document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA DE PERSISTENCIA INMEDIATA ---
    const THEME_KEY = 'theme';
    const DALTONIC_KEY = 'daltonic';
    const LANG_KEY = 'lang'; // Clave para el idioma
    const body = document.body;

    // 1. Aplicar tema oscuro/daltónico si está guardado en localStorage
    if (localStorage.getItem(THEME_KEY) === 'dark') {
        body.classList.add('dark-mode');
    }
    if (localStorage.getItem(DALTONIC_KEY) === 'on') {
        body.classList.add('daltonic-mode');
    }
    // ------------------------------------------

    // Controles de Visualización (Modos de color e idioma)
    // Controles de Visualización (Modos de color e idioma)
    const controlsHTML = `
        <div class="theme-controls d-flex align-items-center gap-3 me-3">
            
            <select id="langSelector" class="form-select form-select-sm" onchange="setLanguage(this.value)">
                <option value="eu">Euskara</option>
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
                <option value="zh">中文</option>
            </select>

            <button onclick="toggleTheme()" class="btn btn-sm btn-theme-toggle">
                <i class="bi bi-moon-fill dark-icon"></i>
                <i class="bi bi-sun-fill light-icon"></i>
            </button>

            <button onclick="toggleDaltonic(this)" class="btn btn-sm btn-daltonic-toggle" id="btnDaltonicToggle" title="Modo Daltónico">
                <i class="bi bi-eye-fill"></i>
                <div id="daltonicToast" class="toast-validation">
                    <i class="bi bi-palette-fill me-2"></i>
                    <span data-i18n="msg_daltonic_active">Modo de Ayuda Activado</span>
                </div>
            </button>
        </div>
    `;

    const menuHTML = `
    <nav class="navbar navbar-expand-lg ios-navbar fixed-top">
        <div class="container-fluid px-4">
            
            <a class="navbar-brand ios-brand" href="index.html">
                <i class="bi bi-mortarboard-fill"></i>
                GrAL info
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
    </nav>
    
    `;

    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        menuContainer.innerHTML = menuHTML;
        document.body.style.paddingTop = '60px';
    }

    // Activar enlace actual
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // CLAVE: Sincronizar el valor del selector de idioma después de la inyección
    const langSelector = document.getElementById('langSelector');
    if (langSelector) {
        const storedLang = localStorage.getItem(LANG_KEY) || 'eu';
        langSelector.value = storedLang;
    }

    // *** NOTIFICACIÓN CLAVE A i18n.js ***
    document.dispatchEvent(new Event("menuLoaded"));
});

window.toggleDaltonic = function() {
    const body = document.body;

    // 1. Alternar modo y guardar (Lógica existente)
    const isDaltonic = body.classList.toggle("daltonic-mode");
    localStorage.setItem("daltonic", isDaltonic ? "on" : "off");

    // 2. Controlar el mensaje que YA EXISTE en el HTML
    const toast = document.getElementById('daltonicToast');

    if (toast) {
        if (isDaltonic) {
            // MOSTRAR: Si se activa
            toast.classList.remove('active'); // Reset por si acaso
            void toast.offsetWidth; // Truco para reiniciar animación
            toast.classList.add('active');

            // Ocultar automáticamente tras 2.5 segundos
            setTimeout(() => {
                toast.classList.remove('active');
            }, 2500);
        } else {
            // OCULTAR: Si se desactiva, quitarlo inmediatamente
            toast.classList.remove('active');
        }
    }
};