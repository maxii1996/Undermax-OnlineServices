document.addEventListener('DOMContentLoaded', function() {
    const allPlugins = new Map();
    let filteredPlugins = [];

    const categories = {
        "january": [
            'Classic Gamepads Extensor', 'CircleBarMZ', 'SlidersMZ', 'Fake 3D Image', 'StopBar Minigame',
            'OnlineTextMZ', 'DurabilityMZ', 'Command Console', 'Dynamic Switches', 'Crafting Table',
            'Items Search Filtering', 'Conditional Party', 'SYNCRO', 'ItemDex', 'Video with Subs (Subtitles)',
            'Mistery Gift', 'Music Media Player', 'Dynamic Temperature Stats', 'Acknowledgement Window',
            'Equipment Sets System', 'SE-Extensor', 'Multi Clothes', 'Restrictor', 'Game Version Checker'
        ],
        "february": ['Pressing Minigame', 'Dynamic Online Shop'],
        "march": ['Expeditions', 'Itch.io Link (Itchio Integration)', 'Gacha Minigame'],
        "april": ['Basic Downloader'],
        "may": ['Sequence Minigame', 'Character Fears']
    };

    const accumulateCategories = {
        "january2024": categories.january,
        "february2024": [...categories.january, ...categories.february],
        "march2024": [...categories.january, ...categories.february, ...categories.march],
        "april2024": [...categories.january, ...categories.february, ...categories.march, ...categories.april],
        "may2024": [...categories.january, ...categories.february, ...categories.march, ...categories.april, ...categories.may],
        "summer2024": [
            ...categories.january, ...categories.february, ...categories.march, 
            ...categories.april, ...categories.may, 'Alternative Graphics', 'Simon Says Minigame'
        ]
    };

    fetchItchIoData();

    window.showContent = function(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
    };

    function fetchItchIoData() {
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

    function normalize(str) {
        return str.replace(/^RPG\s*MAKER\s*MZ\s*Plugin:\s*/i, '').trim().toLowerCase().replace(/\s+/g, ' ');
    }

    window.filterPlugins = function() {
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

        filteredPlugins = plugins;
        updateDashboard(filteredPlugins);
    }

    window.filterByCategory = function() {
        filterPlugins();
    }

    function updateDashboard(plugins) {
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
});
