import { Stage, game, level, audio } from 'melonjs';
import PremiumCharakterSprite from '../renderables/PremiumCharakterSprite';

class SequenceScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // load the new level
        level.load('Small Grass', {
            "container": game.world,
            "onLoaded": () => {
                // viewport width and height
                var w = game.viewport.width;
                var h = game.viewport.height;
                // add the Cap Guy
                game.world.addChild(new PremiumCharakterSprite(w / 2, h / 2) as any, 2);

                audio.play('Red Carpet Wooden Floor', true);
                // set the background to black
                // game.world.backgroundColor.setColor(255, 255, 255);
                // force redraw
                game.repaint();
            }
        });
    }
};

export default SequenceScreen;
