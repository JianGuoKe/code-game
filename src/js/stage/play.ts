import { Stage, game, level, BitmapText } from 'melonjs';

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // load the new level
        level.load('desert', {
            "container": game.world,
            "onLoaded": () => {
                // set the background to black
                // game.world.backgroundColor.setColor(255, 255, 255);
                // force redraw
                game.repaint();
            }
        });
    }
};

export default PlayScreen;
