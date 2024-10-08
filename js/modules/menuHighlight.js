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

export function loadMenuAndHighlight() {

    const menuPath = window.location.pathname.includes('undermax') ? '../partials/menu.html' : 'partials/menu.html';
    
    fetch(menuPath)
        .then(response => response.text())
        .then(data => {
           // document.getElementById('nav-link').innerHTML = data;
            highlightActiveMenu();
        })
        .catch(err => console.error('Failed to load menu:', err));
}
