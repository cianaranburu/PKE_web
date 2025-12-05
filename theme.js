// theme.js (VERSIÓN DEFINITIVA)
const body = document.body;
const THEME_KEY = 'theme';
const DALTONIC_KEY = 'daltonic';

// ==========================================
// 1. LÓGICA DE ESTADO (Sin efectos visuales de UI)
// ==========================================

function setDarkMode(isDark) {
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function setDaltonicMode(isDaltonic) {
    // Solo cambia la clase y guarda. No muestra mensajes.
    body.classList.toggle('daltonic-mode', isDaltonic);
    localStorage.setItem(DALTONIC_KEY, isDaltonic ? 'on' : 'off');
}

// ==========================================
// 2. CARGA INICIAL (Al abrir la web)
// ==========================================

function loadTheme() {
    // 1. Cargar Tema Oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem(THEME_KEY);

    if (storedTheme === 'dark' || (storedTheme === null && prefersDark)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    // 2. Cargar Modo Daltónico
    // Esto se ejecuta silenciosamente al cargar la página
    if (localStorage.getItem(DALTONIC_KEY) === 'on') {
        setDaltonicMode(true);
    } else {
        setDaltonicMode(false);
    }
}

// ==========================================
// 3. INTERACCIÓN DEL USUARIO (Botones)
// ==========================================

window.toggleTheme = function() {
    const isDark = !body.classList.contains('dark-mode');
    setDarkMode(isDark);
};

// theme.js - Sustituir window.toggleDaltonic

window.toggleDaltonic = function() {
    // 1. Calcular nuevo estado y aplicarlo
    const isDaltonic = !body.classList.contains('daltonic-mode');
    setDaltonicMode(isDaltonic); // Aplica la clase y guarda

    // 2. Localizar el elemento Toast (debe estar dentro del botón)
    const toast = document.getElementById('daltonicToast');

    if (toast) {
        if (isDaltonic) {
            // Mostrar si se activa
            toast.classList.remove('active'); // Reset animación
            void toast.offsetWidth; // Forzar reflow
            toast.classList.add('active');

            // Ocultar automáticamente si el usuario no hace nada
            setTimeout(() => {
                toast.classList.remove('active');
            }, 3000); // 3 segundos visible

        } else {
            // Ocultar inmediatamente si se desactiva
            toast.classList.remove('active');
        }
    }
};

// Cargar configuración al iniciar
document.addEventListener("DOMContentLoaded", loadTheme);