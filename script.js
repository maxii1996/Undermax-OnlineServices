const pluginData = {
    "january": [
        'Classic Gamepads Extensor', 'CircleBarMZ', 'SlidersMZ', 'Fake 3D Image',
        'Stop Bar Minigame', 'OnlineTextMZ', 'DurabilityMZ', 'Command Console',
        'Dynamic Switches', 'Crafting Table', 'Items Search Filtering', 'Conditional Party',
        'SYNCRO', 'ItemDex', 'Video with Subtitles', 'Mistery Gift', 'Music Media Player',
        'Dynamic Temperature Stats', 'Acknowledgement Window', 'Equipment Sets System',
        'Multi Clothes', 'Restrictor', 'Game Version Checker'
    ],
    "february": [
        'Classic Gamepads Extensor', 'CircleBarMZ', 'SlidersMZ', 'Fake 3D Image',
        'Stop Bar Minigame', 'OnlineTextMZ', 'DurabilityMZ', 'Command Console',
        'Dynamic Switches', 'Crafting Table', 'Items Search Filtering', 'Conditional Party',
        'SYNCRO', 'ItemDex', 'Video with Subtitles', 'Mistery Gift', 'Music Media Player',
        'Dynamic Temperature Stats', 'Acknowledgement Window', 'Equipment Sets System',
        'Multi Clothes', 'Restrictor', 'Game Version Checker', 'Pressing Minigame', 'Dynamic Online Shop'
    ],
    "march": [
        'Classic Gamepads Extensor', 'CircleBarMZ', 'SlidersMZ', 'Fake 3D Image',
        'Stop Bar Minigame', 'OnlineTextMZ', 'DurabilityMZ', 'Command Console',
        'Dynamic Switches', 'Crafting Table', 'Items Search Filtering', 'Conditional Party',
        'SYNCRO', 'ItemDex', 'Video with Subtitles', 'Mistery Gift', 'Music Media Player',
        'Dynamic Temperature Stats', 'Acknowledgement Window', 'Equipment Sets System',
        'Multi Clothes', 'Restrictor', 'Game Version Checker', 'Pressing Minigame',
        'Dynamic Online Shop', 'Expeditions', 'Itchio Link', 'Gacha Minigame'
    ],
    "april": [
        'Classic Gamepads Extensor', 'CircleBarMZ', 'SlidersMZ', 'Fake 3D Image',
        'Stop Bar Minigame', 'OnlineTextMZ', 'DurabilityMZ', 'Command Console',
        'Dynamic Switches', 'Crafting Table', 'Items Search Filtering', 'Conditional Party',
        'SYNCRO', 'ItemDex', 'Video with Subtitles', 'Mistery Gift', 'Music Media Player',
        'Dynamic Temperature Stats', 'Acknowledgement Window', 'Equipment Sets System',
        'Multi Clothes', 'Restrictor', 'Game Version Checker', 'Pressing Minigame',
        'Dynamic Online Shop', 'Expeditions', 'Itchio Link', 'Gacha Minigame', 'Basic Downloader'
    ],
    "may": [
        'Classic Gamepads Extensor', 'CircleBarMZ', 'SlidersMZ', 'Fake 3D Image',
        'Stop Bar Minigame', 'OnlineTextMZ', 'DurabilityMZ', 'Command Console',
        'Dynamic Switches', 'Crafting Table', 'Items Search Filtering', 'Conditional Party',
        'SYNCRO', 'ItemDex', 'Video with Subtitles', 'Mistery Gift', 'Music Media Player',
        'Dynamic Temperature Stats', 'Acknowledgement Window', 'Equipment Sets System',
        'Multi Clothes', 'Restrictor', 'Game Version Checker', 'Pressing Minigame',
        'Dynamic Online Shop', 'Expeditions', 'Itchio Link', 'Gacha Minigame',
        'Basic Downloader', 'Sequence Minigame', 'Character Fears'
    ],
};

const baseUrl = "https://undermax.itch.io/";

async function fetchPageContent(url) {
    const response = await fetch(url);
    const data = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(data, 'text/html');
}

async function generatePluginList(month, plugins) {
    const listElement = document.getElementById(`${month}-plugins`);
    if (listElement) {
        listElement.innerHTML = `<tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
        </tr>`;

        const doc = await fetchPageContent(baseUrl);
        plugins.forEach(plugin => {
            const pluginSlug = plugin.replace(/\s+/g, '-').toLowerCase();
            const pluginElement = [...doc.querySelectorAll('.game_cell')].find(el => 
                el.querySelector('.game_title').innerText.trim().toLowerCase().includes(plugin.toLowerCase())
            );

            if (pluginElement) {
                const image = pluginElement.querySelector('img').src;
                const name = pluginElement.querySelector('.game_title a').innerText;
                const description = pluginElement.querySelector('.game_text').innerText;
                const price = pluginElement.querySelector('.price_value').innerText || 'Free';

                const listItem = document.createElement('tr');
                listItem.innerHTML = `
                    <td><img src="${image}" alt="${name}"></td>
                    <td><a href="${baseUrl}${pluginSlug}" target="_blank">${name}</a></td>
                    <td>${description}</td>
                    <td>${price}</td>
                `;
                listElement.appendChild(listItem);
            } else {
                console.error(`Plugin ${plugin} not found.`);
            }
        });
    } else {
        console.error(`Element with id ${month}-plugins not found.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(pluginData).forEach(month => {
        generatePluginList(month.toLowerCase(), pluginData[month]);
    });

    // Show the first section by default
    showContent('january');
});

function showContent(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    } else {
        console.error(`Element with id ${sectionId} not found.`);
    }
}
