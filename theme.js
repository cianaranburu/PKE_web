// theme.js (VERSIÓN FINAL CON i18n INTEGRADO)

const body = document.body;
const THEME_KEY = 'theme';
const DALTONIC_KEY = 'daltonic';
let notificationTimeout;

// 1. Inyectar HTML de notificación
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById('sysNotification')) {
        const notif = document.createElement('div');
        notif.id = 'sysNotification';
        notif.className = 'sys-notification';
        notif.innerHTML = `
            <i id="sysNotificationIcon" class="bi bi-palette-fill"></i>
            <span id="sysNotificationText" style="font-weight: 500;"></span>
        `;
        document.body.appendChild(notif);
    }
    loadTheme();
});

// --- FUNCIÓN AUXILIAR PARA OBTENER TEXTO TRADUCIDO ---
function getLocalizedText(key) {
    // 1. Obtener idioma actual (o 'eu' por defecto)
    const currentLang = localStorage.getItem('lang') || 'eu';

    // 2. Intentar leer de la variable global 'translations' (definida en i18n.js)
    if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }

    // 3. Fallback si no carga rápido o no existe la clave
    return key;
}

// 2. Mostrar Notificación
function showSystemNotification(text, isActive) {
    const notif = document.getElementById('sysNotification');
    const txt = document.getElementById('sysNotificationText');
    const icon = document.getElementById('sysNotificationIcon');

    if (notif && txt) {
        txt.textContent = text;

        if (isActive) {
            notif.style.color = '#34c759'; // Verde
            icon.className = "bi bi-eye-fill";
        } else {
            notif.style.color = '#ff453a'; // Rojo
            icon.className = "bi bi-eye-slash-fill";
        }

        notif.classList.remove('show');
        void notif.offsetWidth;
        notif.classList.add('show');

        if (notificationTimeout) clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => {
            notif.classList.remove('show');
        }, 1500);
    }
}

// 3. Lógica de Estado
function setDarkMode(isDark) {
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function setDaltonicMode(isDaltonic) {
    body.classList.toggle('daltonic-mode', isDaltonic);
    localStorage.setItem(DALTONIC_KEY, isDaltonic ? 'on' : 'off');

    const group = document.getElementById('daltonicGroup');
    if(group) {
        if(isDaltonic) group.classList.add('daltonic-mode-active');
        else group.classList.remove('daltonic-mode-active');
    }
}

// 4. Funciones Globales (Botones)
window.toggleTheme = function(isChecked) {
    const isDark = isChecked;
    setDarkMode(isDark);
};

window.toggleDaltonic = function(isChecked) {
    const isDaltonic = isChecked;
    setDaltonicMode(isDaltonic);

    // --- OBTENER TEXTO TRADUCIDO ---
    // Usamos las claves que añadiste al JSON
    const textKey = isDaltonic ? "msg_daltonic_on" : "msg_daltonic_off";
    const localizedMessage = getLocalizedText(textKey);

    showSystemNotification(localizedMessage, isDaltonic);
};

// 5. Carga Inicial
function loadTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem(THEME_KEY);
    const storedDaltonic = localStorage.getItem(DALTONIC_KEY);

    if (storedTheme === 'dark' || (storedTheme === null && prefersDark)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    if (storedDaltonic === 'on') {
        setDaltonicMode(true);
    }
}