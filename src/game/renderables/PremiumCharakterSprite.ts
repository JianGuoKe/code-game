import { Entity, game, loader, Sprite, TextureAtlas, video } from 'melonjs';

export enum SprintDirection {
  front = 'front',
  after = 'after',
  left = 'left',
  right = 'right',
}

class PremiumCharakterSprite extends Entity {

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
      'walk_front', 'walk_after', 'walk_left', 'walk_right',
      'run_front', 'run_after', 'run_left', 'run_right',
      'dig_front', 'dig_after', 'dig_left', 'dig_right',
      'cut_front', 'cut_after', 'cut_left', 'cut_right',
      'water_front', 'water_after', 'water_left', 'water_right',
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
    (this.renderable as Sprite).setCurrentAnimation("dig_front");

    // enable this, since the entity starts off the viewport
    this.alwaysUpdate = true;
  }

  // 站立
  stand(direction = SprintDirection.front) {
    (this.renderable as Sprite).setCurrentAnimation("stand_" + direction);
  }
  walk(direction = SprintDirection.front) {
    (this.renderable as Sprite).setCurrentAnimation("walk_" + direction);
  }
  run(direction = SprintDirection.front) {
    (this.renderable as Sprite).setCurrentAnimation("run_" + direction);
  }
  dig(direction = SprintDirection.front) {
    (this.renderable as Sprite).setCurrentAnimation("dig_" + direction);
  }
  cut(direction = SprintDirection.front) {
    (this.renderable as Sprite).setCurrentAnimation("cut_" + direction);
  }
  water(direction = SprintDirection.front) {
    (this.renderable as Sprite).setCurrentAnimation("water_" + direction);
  }

  /**
   * update the entity
   */
  update(dt: number) {
    // just manually change the guy position
    // this.pos.x += 0.3 * dt;

    // // repeat once leaving the viewport
    // if (this.pos.x >= game.viewport.width) {
    //   this.pos.x = 0;
    // }

    // call the parent function  
    return super.update(dt);

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
