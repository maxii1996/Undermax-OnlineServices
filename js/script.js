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
                    availabilityMessage.innerHTML = `<span style="color: green;">Bundle currently available!</span> <span style="color: black;">(Available until Sunday, September 22, 2024)</span>`;
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
        } else if (selectedValue.startsWith('bundle')) {
            setTimeout(() => {
                availabilityMessage.innerHTML = `<span style="color: green;">Bundle available!</span>`;
                const bundleLinks = {
                    'bundle1': 'https://itch.io/s/111513/plugins-bundle-1',
                    'bundle2': 'https://itch.io/s/111514/plugins-bundle-2',
                    'bundle3': 'https://itch.io/s/111515/plugins-bundle-3',
                    'bundle4': 'https://itch.io/s/111516/plugins-bundle-4',
                    'bundle5': 'https://itch.io/s/115896/plugins-bundle-5',
                    'bundle6': 'https://itch.io/s/122444/plugins-bundle-6',
                    'bundle7': 'https://itch.io/s/128201/plugins-bundle-7' 

                };
                bundleButtonContainer.innerHTML = `
                    <a href="${bundleLinks[selectedValue]}" target="_blank" class="btn btn-primary btn-lg btn-block animate__animated animate__bounceIn">
                        <i class="fas fa-gift"></i> Get This Bundle
                    </a>
                `;
                spinner.style.display = 'none';
            }, 570); 
        } else if (['january2024', 'february2024', 'march2024', 'april2024', 'may2024'].includes(selectedValue)) {
            // Set the message for monthly bundles that are no longer available
            setTimeout(() => {
                availabilityMessage.innerHTML = `<span style="color: orange;">This bundle is no longer available for purchase. If you have already purchased it and need to download it, you can do so from <a href="https://itch.io/my-collections" target="_blank" style="color: orange;">your collection</a>.</span>`;
                bundleButtonContainer.innerHTML = '';
                spinner.style.display = 'none';
            }, 570); 
        } else {
            availabilityMessage.textContent = '';
            spinner.style.display = 'none';
        }
    });
});
