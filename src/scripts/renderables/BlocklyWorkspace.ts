import { game, Renderable, event, device, input } from "melonjs";
import * as Blockly from "blockly";
import '../blockly';

export enum BlockType {
  vertical,
  horizontal
}

export class BlocklyWorkspace extends Renderable {
  blocklySave: { [key: string]: any; };
  blocklyDiv: HTMLDivElement;
  showBlockly = false;

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

    this.blocklyDiv = (document.querySelector('#blocklyDiv') as HTMLDivElement);
    event.on(event.WINDOW_ONRESIZE, () => { this.onresize(); });
    this.onresize();

    Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      scrollbars: false,
    });
    input.bindKey(input.KEY.SPACE, "show");
  }

  onresize() {
    const nodeBounds = device.getParentBounds(game.getParentElement());
    const scaleX = nodeBounds.width / game.renderer.settings.width;
    const scaleY = nodeBounds.height / game.renderer.settings.height;
    const style = this.blocklyDiv.style;
    style.top = `${this.top * scaleY}px`
    style.left = `${this.left * scaleX}px`
    style.width = `${this.width * scaleX}px`
    style.height = `${this.height * scaleY}px`
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

  update(dt: number) {
    if (input.isKeyPressed("show")) {
      this.showBlockly = false;
    }

    if (this.showBlockly) {
      this.blocklyDiv.style.display = 'block'
    } else {
      this.blocklyDiv.style.display = 'none'
    }
    return false;
  }

  onDestroyEvent() {

  }
};