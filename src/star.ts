import * as Phaser from 'phaser'
import Level from './level';

/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
export default class Star extends Phaser.GameObjects.Sprite {
  base: any;
  
  /**
   * Constructor de Star
   * @param {Sceme} scene Escena en la que aparece la estrella
   * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
  constructor(scene : Level, base, x, y) {
    super(scene, x, y, 'star');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.y -= this.height;
    this.base = base;
  }

  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  preUpdate(time: number, delta: number) {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    super.preUpdate(time, delta);
    if (this.scene.physics.overlap((<Level>this.scene).player, this)) {
        // Delegamos en la escena para decidir qué hacer al 
        // haber cogido una estrella
        (<Level>this.scene).starPickt(this.base);
        this.destroy();
    }
  }
}
