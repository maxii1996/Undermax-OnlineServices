
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
    const menuPath = '../partials/menu.html';
    fetch(menuPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-menu').innerHTML = data;
            highlightActiveMenu();
        })
        .catch(err => console.error('Failed to load menu:', err));
}