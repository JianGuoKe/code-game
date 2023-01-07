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
      "Premium Charakter Spritesheet-8", "Premium Charakter Spritesheet-9",
      "Premium Charakter Spritesheet-10", "Premium Charakter Spritesheet-11",
      "Premium Charakter Spritesheet-12", "Premium Charakter Spritesheet-13",
      "Premium Charakter Spritesheet-14", "Premium Charakter Spritesheet-15",
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
