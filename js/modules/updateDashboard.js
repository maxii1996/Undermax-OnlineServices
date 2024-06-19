// js/modules/updateDashboard.js

export function updateDashboard(plugins) {
    const tableBody = document.querySelector('#plugins tbody');
    tableBody.innerHTML = '';
    plugins.forEach(plugin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${plugin.image}" alt="${plugin.title}"></td>
            <td><a href="${plugin.link}">${plugin.title}</a></td>
            <td>${plugin.description}</td>
        `;
        tableBody.appendChild(row);
    });
    document.getElementById('pluginCount').textContent = `${plugins.length} plugins available`;
}