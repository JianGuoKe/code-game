import { game, Renderable, event, device } from "melonjs";
import * as Blockly from "blockly";
import '../blockly';

export enum BlockType {
  vertical,
  horizontal
}

export class BlocklyWorkspace extends Renderable {
  blocklySave: { [key: string]: any; };

  constructor(x: number, y: number, w: number, h: number, type = BlockType.vertical) {
    super(x, y, w, h);

    const toolbox = {
      'kind': 'flyoutToolbox',
      'contents': [
        {
          'kind': 'block',
          'type': 'controls_repeat_ext',
          'inputs': {
            'TIMES': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 5,
                },
              },
              'block': {
                'type': 'math_number',
                'fields': {
                  'NUM': 5,
                },
              }
            },
          },
        },
        {
          'kind': 'block',
          'type': 'play_sound',
        },
      ],
    };

    event.on(event.WINDOW_ONRESIZE, () => { this.onresize(); });
    this.onresize();

    Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      scrollbars: false,
    });
  }

  onresize() {
    const nodeBounds = device.getParentBounds(game.getParentElement());
    const scaleX = nodeBounds.width / game.renderer.settings.width;
    const scaleY = nodeBounds.height / game.renderer.settings.height;
    document.querySelector('#blocklyDiv').setAttribute('style',
      `top:${this.top * scaleY}px;
      left:${this.left * scaleX}px;
      width:${this.width * scaleX}px;
      height:${this.height * scaleY}px`)
  }

  eval() {
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    // code += 'MusicMaker.play();';
    // Eval can be dangerous. For more controlled execution, check
    // https://github.com/NeilFraser/JS-Interpreter.
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  load() {
    const workspace = Blockly.getMainWorkspace();
    Blockly.serialization.workspaces.load(this.blocklySave, workspace);
  }

  save() {
    this.blocklySave = Blockly.serialization.workspaces.save(
      Blockly.getMainWorkspace()
    );
  }

  onDestroyEvent() {

  }
};