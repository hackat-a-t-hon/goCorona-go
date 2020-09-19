import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import {MenuGameScene} from './menuGameScene'
import {Level1Scene} from './level1Scene'
import {Level2Scene} from './level2Scene'
import {Level3Scene} from './level3Scene'
import {Level4Scene} from './level4Scene'
import {CreditsScene} from './creditsScene'



const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [Level4Scene],
  physics:'arcade'
  
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
