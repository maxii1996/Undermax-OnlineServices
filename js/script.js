// js/script.js

import { fetchItchIoData } from './modules/fetchItchIoData.js';
import { filterPlugins, filterByCategory } from './modules/filterPlugins.js';
import { loadMenuAndHighlight, highlightActiveMenu } from './modules/menuHighlight.js';

document.addEventListener('DOMContentLoaded', function() {
    fetchItchIoData();
    loadMenuAndHighlight();

    window.filterPlugins = filterPlugins;
    window.filterByCategory = filterByCategory;
    window.highlightActiveMenu = highlightActiveMenu; 
    window.showContent = function(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
    };

    document.getElementById('filterBox').addEventListener('change', function() {
        const selectedValue = this.value;
        const availabilityContainer = document.getElementById('availabilityContainer');
        const bundleButtonContainer = document.getElementById('bundleButtonContainer');
        const availabilityMessage = document.getElementById('availabilityMessage');
        const spinner = document.getElementById('spinner');

        availabilityContainer.style.display = 'flex';
        spinner.style.display = 'block';
        availabilityMessage.textContent = 'Checking Availability...';
        bundleButtonContainer.innerHTML = '';

        if (selectedValue === 'summer2024') {
            setTimeout(() => {
                const currentDate = new Date();
                const endDate = new Date('2024-09-22');

                if (currentDate <= endDate) {
                    availabilityMessage.innerHTML = `<span style="color: #c7ffe4;">Bundle currently available!</span> <span style="color: black;">(Available until Sunday, September 22, 2024)</span>`;
                    bundleButtonContainer.innerHTML = `
                        <a href="https://undermax.itch.io/summer-bundle-2024" target="_blank" class="btn btn-primary btn-lg btn-block animate__animated animate__bounceIn">
                            <i class="fas fa-gift"></i> Get This Bundle
                        </a>
                    `;
                } else {
                    availabilityMessage.innerHTML = `<span style="color: red;">Bundle no longer available</span>`;
                    bundleButtonContainer.innerHTML = '';
                }
                spinner.style.display = 'none';
            }, 570);
        } else if (selectedValue === 'fall2024') {
            setTimeout(() => {
                const currentDate = new Date();
                const endDate = new Date('2024-12-21');

                if (currentDate <= endDate) {
                    availabilityMessage.innerHTML = `<span style="color: #c7ffe4;">Bundle currently available!</span> <span style="color: black;">(Available until Saturday, December 21, 2024)</span>`;
                    bundleButtonContainer.innerHTML = `
                        <a href="https://undermax.itch.io/fall-bundle-2024" target="_blank" class="btn btn-primary btn-lg btn-block animate__animated animate__bounceIn">
                            <i class="fas fa-gift"></i> Get This Bundle
                        </a>
                    `;
                } else {
                    availabilityMessage.innerHTML = `<span style="color: #000000;">Bundle no longer available</span>`;
                    bundleButtonContainer.innerHTML = '';
                }
                spinner.style.display = 'none';
            }, 570);
        } else if (selectedValue.startsWith('bundle')) {
        } else if (['january2024', 'february2024', 'march2024', 'april2024', 'may2024'].includes(selectedValue)) {
        } else {
            availabilityMessage.textContent = '';
            spinner.style.display = 'none';
        }
    });
});
