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
    "may": ['Sequence Minigame', 'Character Fears'],
    "bundle1": [
        'Classic Gamepads Extensor', 'CircleBarMZ', 'SlidersMZ', 'Fake 3D Image', 'StopBar Minigame'
    ],
    "bundle2": [
        'OnlineTextMZ', 'DurabilityMZ', 'Command Console', 'Dynamic Switches', 'Crafting Table'
    ],
    "bundle3": [
        'Items Search Filtering', 'Conditional Party', 'SYNCRO', 'ItemDex', 'Video with Subs (Subtitles)'
    ],
    "bundle4": [
        'Mistery Gift', 'Music Media Player', 'Dynamic Temperature Stats', 'Acknowledgement Window', 'Equipment Sets System'
    ],
    "bundle5": [
        'SE-Extensor', 'Multi Clothes', 'Restrictor', 'Game Version Checker', 'Pressing Minigame'
    ],
    "bundle6": [
        'Dynamic Online Shop', 'Expeditions', 'Itch.io Link (Itchio Integration)', 'Gacha Minigame', 'Basic Downloader'
    ],
    "bundle7": [
        'Sequence Minigame', 'Character Fears', 'Alternative Graphics', 'Simon Says Minigame', 'Simple Radio System', 'Items Recycle'
    ]
};

export const accumulateCategories = {
    "january2024": categories.january,
    "february2024": [...categories.january, ...categories.february],
    "march2024": [...categories.january, ...categories.february, ...categories.march],
    "april2024": [...categories.january, ...categories.february, ...categories.march, ...categories.april],
    "may2024": [...categories.january, ...categories.february, ...categories.march, ...categories.april, ...categories.may],
    "summer2024": [
        ...categories.january, ...categories.february, ...categories.march, 
        ...categories.april, ...categories.may, 'Alternative Graphics', 'Simon Says Minigame', 'Simple Radio System', 'Items Recycle'
    ],
    "bundle1": categories.bundle1,
    "bundle2": categories.bundle2,
    "bundle3": categories.bundle3,
    "bundle4": categories.bundle4,
    "bundle5": categories.bundle5,
    "bundle6": categories.bundle6,
    "bundle7": categories.bundle7
};
