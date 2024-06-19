// js/modules/menuHighlight.js

export function highlightActiveMenu() {
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (path === href) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
