const DEFAULT_LANG = 'eu';
let translations = {};

// Carga traducciones
fetch('locales.json')
    .then(res => res.json())
    .then(data => {
        translations = data;
        loadLanguage();
    })
    .catch(err => console.error('Error i18n:', err));

// Función que recorre la página y traduce elementos con data-i18n
// i18n.js

// ... resto del código (fetch, loadLanguage, etc.)

function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang] && translations[lang][key];

        if (translation) {
            // Caso especial para enlaces con iconos (Navbar)
            if (element.children.length > 0) {
                // Guardamos el icono (el primer hijo, usualmente <i>)
                const icon = element.firstElementChild.outerHTML;
                // Reconstruimos el HTML: Icono + Texto traducido
                // Importante: Aseguramos un espacio entre icono y texto
                element.innerHTML = `${icon} ${translation}`;
            } else {
                // Si no tiene hijos (texto plano), reemplazo directo
                element.textContent = translation;
            }
        }
    });

    // Actualiza el valor del selector si existe
    const selector = document.getElementById('langSelector');
    if(selector) selector.value = lang;
}

// Carga idioma guardado y sincroniza selector
function loadLanguage() {
    const storedLang = localStorage.getItem('lang') || DEFAULT_LANG;
    translatePage(storedLang);

    const langSelector = document.getElementById('langSelector');
    if (langSelector) langSelector.value = storedLang;
}

// Función global para cambiar idioma
window.setLanguage = function(lang) {
    localStorage.setItem('lang', lang);
    translatePage(lang);
};

// Espera a que el menú se cargue para actualizar selector
document.addEventListener("menuLoaded", loadLanguage);
