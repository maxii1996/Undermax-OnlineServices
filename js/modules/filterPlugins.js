// js/modules/filterPlugins.js

import { accumulateCategories, allPlugins } from './fetchItchIoData.js';
import { updateDashboard } from './updateDashboard.js';

function normalize(str) {
    return str.replace(/^RPG\s*MAKER\s*MZ\s*Plugin:\s*/i, '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export function filterPlugins() {
    const searchValue = document.getElementById('searchBox').value.toLowerCase();
    const filterBoxValue = document.getElementById('filterBox').value;

    let plugins = Array.from(allPlugins.values());

    plugins = plugins.filter(plugin => plugin.title.toLowerCase().includes(searchValue));

    if (filterBoxValue !== 'all') {
        const filterList = accumulateCategories[filterBoxValue].map(normalize) || [];
        plugins = plugins.filter(plugin => {
            const cleanTitle = normalize(plugin.title);
            return filterList.includes(cleanTitle) || filterList.some(name => cleanTitle.includes(name));
        });
    }

    updateDashboard(plugins);
}

export function filterByCategory() {
    filterPlugins();
}
