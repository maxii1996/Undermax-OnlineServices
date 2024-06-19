// js/script.js

import { fetchItchIoData } from './modules/fetchItchIoData.js';
import { filterPlugins, filterByCategory } from './modules/filterPlugins.js';
import { highlightActiveMenu } from './modules/menuHighlight.js';

document.addEventListener('DOMContentLoaded', function() {
    fetchItchIoData();
    highlightActiveMenu();

    window.filterPlugins = filterPlugins;
    window.filterByCategory = filterByCategory;
    window.showContent = function(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
    };
});
