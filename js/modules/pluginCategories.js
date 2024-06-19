// js/modules/pluginCategories.js

export const categories = {
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

export const accumulateCategories = {
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
