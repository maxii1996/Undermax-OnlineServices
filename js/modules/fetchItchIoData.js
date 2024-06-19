// js/modules/fetchItchIoData.js

import { updateDashboard } from './updateDashboard.js';
import { categories, accumulateCategories } from './pluginCategories.js';

export const allPlugins = new Map();
export let filteredPlugins = [];

export function fetchItchIoData() {
    const proxies = [
        { url: 'https://cors-anywhere.herokuapp.com/https://undermax.itch.io/', name: 'Server 1' },
        { url: 'https://corsproxy.io/?' + encodeURIComponent('https://undermax.itch.io/'), name: 'Server 2' },
        { url: 'https://cors-proxy.htmldriven.com/?url=' + encodeURIComponent('https://undermax.itch.io/'), name: 'Server 3' }
    ];

    (function tryFetch(proxyIndex = 0) {
        if (proxyIndex >= proxies.length) {
            document.getElementById('serverStatus').textContent = 'Offline Server';
            return;
        }

        fetch(proxies[proxyIndex].url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                document.getElementById('serverStatus').textContent = `Connected to ${proxies[proxyIndex].name} successfully`;
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");
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
            })
            .catch(() => tryFetch(proxyIndex + 1));
    })();
}

export { categories, accumulateCategories };