// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [

    /* sprite */
    { name: "Premium Charakter Spritesheet", type: "json", src: "./data/characters/Premium Charakter Spritesheet.json" },
    { name: "Premium Charakter Spritesheet", type: "image", src: "./data/characters/Premium Charakter Spritesheet.png" },



    /* map */
    { name: "Grass tiles v.2", type: "image", src: "./data/tilesets/Ground tiles/new tiles/Grass tiles v.2.png" },
    { name: "Water", type: "image", src: "./data/tilesets/Water.png" },
    { name: "Grass tile layers", type: "image", src: "./data/tilesets/Ground tiles/new tiles/Grass tile layers.png" },
    { name: "Mushrooms, Flowers, Stones", type: "image", src: "./data/objects/Mushrooms, Flowers, Stones.png" },

    { name: "Grass tiles v.2", type: "tsx", src: "./data/tilesets/Ground tiles/new tiles/Grass tiles v.2.tsx" },
    { name: "Water", type: "tsx", src: "./data/tilesets/Water.tsx" },
    { name: "Grass tile layers", type: "tsx", src: "./data/tilesets/Ground tiles/new tiles/Grass tile layers.tsx" },
    { name: "Mushrooms, Flowers, Stones", type: "tsx", src: "./data/objects/Mushrooms, Flowers, Stones.tsx" },

    { name: "Small Grass", type: "tmx", src: "./data/tilesets/Small Grass.tmx" },
    { name: "Big Grass", type: "tmx", src: "./data/tilesets/Big Grass.tmx" },

    { name: "Red Carpet Wooden Floor", type: "audio", src: "./data/soundtrack/" },

    /* Bitmap Text */
    {
        name: "PressStart2P",
        type: "image",
        src: "./data/fnt/PressStart2P.png"
    },
    {
        name: "PressStart2P",
        type: "binary",
        src: "./data/fnt/PressStart2P.fnt"
    }
];

export default DataManifest;
