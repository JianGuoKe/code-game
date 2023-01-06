// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [

    { name: "bg", type: "tmx", src: "./data/map/bg.tmx" },
    { name: "desert", type: "tmx", src: "./data/map/desert.tmx" },
    { name: "desert", type: "tsx", src: "./data/map/desert.tsx" },
    { name: "tmw_desert_spacing", type: "image", src: "./data/map/tmw_desert_spacing.png" },

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
