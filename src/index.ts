import {
    audio,
    loader,
    state,
    device,
    video,
    utils,
    plugin,
    pool
} from 'melonjs';

import 'index.css';

import LoadingScreen from './js/stage/loading';
import SequenceScreen from './js/stage/SequenceScreen';
import DataManifest from './manifest';


device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(960, 640, { parent: "screen", scale: '4' })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import('./js/plugin/debug/debugPanel.js').then((debugPlugin) => {
            // automatically register the debug panel
            utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, "debugPanel");
        });

    }

    // Initialize the audio.
    audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    // loader.crossOrigin = "anonymous";
    state.set(state.LOADING, new LoadingScreen());

    // set and load all resources.
    loader.preload(DataManifest, function () {
        // set the user defined game stages
        state.set(state.PLAY, new SequenceScreen());

        // add our player entity in the entity pool
        // pool.register("mainPlayer", PlayerEntity);

        // Start the game.
        state.change(state.PLAY, true);
    });
});
