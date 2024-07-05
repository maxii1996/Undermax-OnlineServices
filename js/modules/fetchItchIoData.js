// js/modules/fetchItchIoData.js

import { updateDashboard } from './updateDashboard.js';
import { categories, accumulateCategories } from './pluginCategories.js';

export const allPlugins = new Map();
export let filteredPlugins = [];

export function fetchItchIoData() {
    const proxies = [
        { url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://undermax.itch.io/'), name: 'Server 1' },
        { url: 'https://corsproxy.io/?' + encodeURIComponent('https://undermax.itch.io/'), name: 'Server 2' },
        { url: 'https://cors-proxy.htmldriven.com/?url=' + encodeURIComponent('https://undermax.itch.io/'), name: 'Server 3' }
    ];

    const skeletonScreen = document.getElementById('skeletonScreen');
    const pluginTable = document.getElementById('plugins');

    function showSkeletonScreen() {
        skeletonScreen.style.display = 'grid';
        pluginTable.style.display = 'none';
    }

    function hideSkeletonScreen() {
        skeletonScreen.style.display = 'none';
        pluginTable.style.display = 'table';
    }

    showSkeletonScreen();

    (function tryFetch(proxyIndex = 0) {
        if (proxyIndex >= proxies.length) {
            const serverStatus = document.getElementById('serverStatus');
            if (serverStatus) {
                serverStatus.textContent = 'Offline Server';
            }
            hideSkeletonScreen();
            return;
        }

        fetch(proxies[proxyIndex].url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                const serverStatus = document.getElementById('serverStatus');
                if (serverStatus) {
                    serverStatus.textContent = `Connected to Undermax ${proxies[proxyIndex].name} successfully`;
                }
                return response.json(); // Cambiamos a JSON para allorigins.win
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, "text/html"); // Usamos data.contents para allorigins.win
                const gameCells = doc.querySelectorAll('[data-game_id]');
                
                gameCells.forEach(game => {
                    const gameID = game.getAttribute('data-game_id');
                    if (!allPlugins.has(gameID)) {
                        const gameTitleElement = game.querySelector('.game_title a');
                        const gameTitle = gameTitleElement ? gameTitleElement.textContent : '';
                        if (/^RPG\s*MAKER\s*MZ\s*Plugin:/i.test(gameTitle)) {
                            const gameImageElement = game.querySelector('.game_thumb img');
                            const gameImage = gameImageElement ? (gameImageElement.src || gameImageElement.getAttribute('data-lazy_src')) : '';
                            const gameLink = gameTitleElement ? gameTitleElement.href : '#';
                            const gameDescriptionElement = game.querySelector('.game_text');
                            const gameDescription = gameDescriptionElement ? gameDescriptionElement.textContent : 'No description available';

                            allPlugins.set(gameID, {
                                image: gameImage,
                                title: gameTitle,
                                link: gameLink,
                                description: gameDescription
                            });
                        }
                    }
                });

                filteredPlugins = Array.from(allPlugins.values()).sort((a, b) => a.title.localeCompare(b.title));
                updateDashboard(filteredPlugins);
                hideSkeletonScreen();
            })
            .catch(() => tryFetch(proxyIndex + 1));
    })();
}

export { categories, accumulateCategories };
