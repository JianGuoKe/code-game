import { game, Stage } from 'melonjs';

class LoadingScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        game.world.backgroundColor.setColor(155, 212, 195);
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        ; // TODO
    }
};

export default LoadingScreen;
