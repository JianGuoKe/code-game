import { Entity, game, input, loader, Sprite, TextureAtlas, video } from 'melonjs';

export enum SpriteDirection {
  front = 'front',
  after = 'after',
  left = 'left',
  right = 'right',
}

class PremiumCharakterSprite extends Entity {
  lastDirection: SpriteDirection;

  /**
   * constructor
   */
  constructor(x: number, y: number, settings?: any) {
    // call the parent constructor 
    super(x, y, { width: 48, height: 48, ...settings });

    // just manually change the guy position
    this.body.setStatic();

    // set the viewport to follow this renderable on both axis, and enable damping
    game.viewport.follow(this, game.viewport.AXIS.BOTH, 0.1);

    const texture = new TextureAtlas(
      loader.getJSON("Premium Charakter Spritesheet"),
      loader.getImage("Premium Charakter Spritesheet")
    );
    // create an animation using the cap guy sprites, and add as renderable
    const names = [];
    for (let i = 0; i < 192; i++) {
      // 一共有192格动画
      names.push("Premium Charakter Spritesheet-" + i)
    }
    this.renderable = texture.createAnimationFromName(names);

    // define a basic walking animatin
    const animations = [
      'stand_front', 'stand_after', 'stand_left', 'stand_right',
      'walk_front', 'walk_after', 'walk_right', 'walk_left',
      'run_front', 'run_after', 'run_right', 'run_left',
      'dig_front', 'dig_after', 'dig_right', 'dig_left',
      'cut_front', 'cut_after', 'cut_right', 'cut_left',
      'water_front', 'water_after', 'water_right', 'water_left',
    ];

    for (let i = 0; i < 24; i++) {
      const index = [];
      // 每个动作8格      
      for (let j = 0; j < 8; j++) {
        index.push(i * 8 + j);
      }
      (this.renderable as Sprite).addAnimation(animations[i], index);
    }
    // set as default
    (this.renderable as Sprite).setCurrentAnimation("stand_front");

    // enable this, since the entity starts off the viewport
    this.alwaysUpdate = true;

    // enable keyboard
    input.bindKey(input.KEY.A, "left");
    input.bindKey(input.KEY.D, "right");
    input.bindKey(input.KEY.W, "up");
    input.bindKey(input.KEY.S, "down");

    input.bindKey(input.KEY.SHIFT, "run");

    input.bindKey(input.KEY.Z, "dig");
    input.bindKey(input.KEY.X, "cut");
    input.bindKey(input.KEY.C, "water");
  }

  // 站立
  stand(direction = SpriteDirection.front) {
    if ((this.renderable as Sprite).isCurrentAnimation("stand_" + direction)) {
      return;
    }
    this.lastDirection = direction;
    (this.renderable as Sprite).setCurrentAnimation("stand_" + direction);
  }
  walk(direction = SpriteDirection.front) {
    if ((this.renderable as Sprite).isCurrentAnimation("walk_" + direction)) {
      return;
    }
    this.lastDirection = direction;
    (this.renderable as Sprite).setCurrentAnimation("walk_" + direction);
  }
  run(direction = SpriteDirection.front) {
    if ((this.renderable as Sprite).isCurrentAnimation("run_" + direction)) {
      return;
    }
    this.lastDirection = direction;
    (this.renderable as Sprite).setCurrentAnimation("run_" + direction);
  }

  dig(direction = SpriteDirection.front) {
    if ((this.renderable as Sprite).isCurrentAnimation("dig_" + direction)) {
      return;
    }
    this.lastDirection = direction;
    (this.renderable as Sprite).setCurrentAnimation("dig_" + direction);
  }
  cut(direction = SpriteDirection.front) {
    if ((this.renderable as Sprite).isCurrentAnimation("cut_" + direction)) {
      return;
    }
    this.lastDirection = direction;
    (this.renderable as Sprite).setCurrentAnimation("cut_" + direction);
  }
  water(direction = SpriteDirection.front) {
    if ((this.renderable as Sprite).isCurrentAnimation("water_" + direction)) {
      return;
    }
    this.lastDirection = direction;
    (this.renderable as Sprite).setCurrentAnimation("water_" + direction);
  }

  /**
   * update the entity
   */
  update(dt: number) {
    if (input.isKeyPressed("left")) {
      // this.body.force.x = -this.body.maxVel.x;
      if (input.isKeyPressed("run")) {
        this.run(SpriteDirection.left);
      } else {
        this.walk(SpriteDirection.left);
      }
    } else if (input.isKeyPressed("right")) {
      // this.body.force.x = this.body.maxVel.x;
      if (input.isKeyPressed("run")) {
        this.run(SpriteDirection.right);
      } else {
        this.walk(SpriteDirection.right);
      }
    } else if (input.isKeyPressed("up")) {
      // this.body.force.x = this.body.maxVel.x;
      if (input.isKeyPressed("run")) {
        this.run(SpriteDirection.after);
      } else {
        this.walk(SpriteDirection.after);
      }
    } else if (input.isKeyPressed("down")) {
      // this.body.force.x = this.body.maxVel.x;
      if (input.isKeyPressed("run")) {
        this.run(SpriteDirection.front);
      } else {
        this.walk(SpriteDirection.front);
      }
    } else {
      this.stand(this.lastDirection);
    }

    // check if we moved (an "idle" animation would definitely be cleaner)
    // if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
    //   (this.renderable && (this.renderable as Sprite).isFlickering())
    // ) {
    //   super.update(dt);
    //   return true;
    // }
    return super.update(dt);;
  }

  /**
    * colision handler
    * (called when colliding with other objects)
    */
  // onCollision(response, other) {
  //     // Make all other objects solid
  //     return true;
  // }
};

export default PremiumCharakterSprite;
