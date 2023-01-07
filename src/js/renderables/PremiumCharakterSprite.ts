import { Entity, game, loader, TextureAtlas, video } from 'melonjs';

class PremiumCharakterSprite extends Entity {

  /**
   * constructor
   */
  constructor(x: number, y: number, settings?: any) {
    // call the parent constructor 
    super(x, y, { width: 48, height: 48, ...settings });

    // just manually change the guy position
    this.body.setStatic();

    const texture = new TextureAtlas(
      loader.getJSON("Premium Charakter Spritesheet"),
      loader.getImage("Premium Charakter Spritesheet")
    );
    // create an animation using the cap guy sprites, and add as renderable
    this.renderable = texture.createAnimationFromName([
      "Premium Charakter Spritesheet-1", "Premium Charakter Spritesheet-1",
      "Premium Charakter Spritesheet-2", "Premium Charakter Spritesheet-3",
      "Premium Charakter Spritesheet-4", "Premium Charakter Spritesheet-5",
      "Premium Charakter Spritesheet-6", "Premium Charakter Spritesheet-7",
    ]);

    // enable this, since the entity starts off the viewport
    this.alwaysUpdate = true;
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
