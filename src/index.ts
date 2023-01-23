
import { audio, loader, state, device, video, utils, plugin, event, input, pool } from "melonjs";
import LoadingScreen from "./scripts/stage/loading";
import SequenceClass from "./scripts/stage/SequenceClass";
import DataManifest from "./manifest";
import * as serviceWorker from './serviceWorker';
import './index.less';
import PremiumCharakterSprite from "./scripts/renderables/PremiumCharakterSprite";

device.onReady(() => {
  // initialize the display canvas once the device/browser is ready
  if (!video.init(320, 320, { parent: "screen", scale: "auto", scaleMethod: "fill-max" })) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }

  // initialize the debug plugin in development mode.
  if (process.env.NODE_ENV === "development") {
    import("./scripts/plugin/debug/debugPanel.js").then((debugPlugin) => {
      // automatically register the debug panel
      utils.function.defer(
        plugin.register,
        this,
        debugPlugin.DebugPanelPlugin,
        "debugPanel"
      );
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
    state.set(state.PLAY, new SequenceClass());

    // add our player entity in the entity pool
    pool.register("mainPlayer", PremiumCharakterSprite);

    // add some keyboard shortcuts
    event.on(event.KEYDOWN, (action: any, keyCode: number /*, edge */) => {

      // change global volume setting
      if (keyCode === input.KEY.PLUS) {
        // increase volume
        audio.setVolume(audio.getVolume() + 0.1);
      } else if (keyCode === input.KEY.MINUS) {
        // decrease volume
        audio.setVolume(audio.getVolume() - 0.1);
      }

      // toggle fullscreen on/off
      if (keyCode === input.KEY.F) {
        if (!device.isFullscreen()) {
          device.requestFullscreen();
        } else {
          device.exitFullscreen();
        }
      }
    });

    // Start the ga
    state.change(state.PLAY, true);
  });
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
