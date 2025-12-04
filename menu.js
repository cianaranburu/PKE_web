// menu.js

document.addEventListener("DOMContentLoaded", function() {

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
            
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="index.html"><i class="bi bi-house-fill"></i>Hasiera</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="araudia.html"><i class="bi bi-file-text-fill"></i>Araudia</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="egutegia.html"><i class="bi bi-calendar-event-fill"></i>Egutegia</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="galdetegia.html"><i class="bi bi-question-circle-fill"></i>Galdetegia</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="memoriak.html"><i class="bi bi-archive-fill"></i>Memoriak</a></li>
                    <li class="nav-item"><a class="nav-link ios-nav-link" href="norgara.html"><i class="bi bi-people-fill"></i>Nor Gara</a></li>
                </ul>
            </div>
        </div>
    </nav>
    `;

    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        menuContainer.innerHTML = menuHTML;
        // Importante: Empujamos el contenido hacia abajo
        document.body.style.paddingTop = '100px';
    }

    // Activar enlace actual
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});