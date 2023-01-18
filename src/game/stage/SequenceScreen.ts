import { Stage, game, level, audio, TextureAtlas, loader } from 'melonjs';
import { BlocklyWorkspace } from '../renderables/BlocklyWorkspace';
import PremiumCharakterSprite from '../renderables/PremiumCharakterSprite';

class SequenceScreen extends Stage {


    /**
     *  action to perform on state change
     */
    onResetEvent() {

        game.world.backgroundColor.setColor(155, 212, 195);

        // load the new level
        level.load('Big Grass', {
            "container": game.world,
            "onLoaded": () => {
                // viewport width and height
                var w = game.viewport.width;
                var h = game.viewport.height;

                // add the sprite
                game.world.addChild(new PremiumCharakterSprite(w / 2, h / 2) as any, 2);
                game.world.addChild(new BlocklyWorkspace(w - 100, 0, 100, 320));

                // 播放背景音乐
                // audio.play('Red Carpet Wooden Floor', true);

                // force redraw
                game.repaint();

            }
        });
    }
};

export default SequenceScreen;
