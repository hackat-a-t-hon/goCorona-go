import Phaser, { Physics } from 'phaser'
import back from './assets/imageedit_2_5379813542.png'
import map from './assets/Level4.json'
import Charcater from './assets/hero.png'
import tiles from './assets/imageedit_2_5379813542.png'
export class Level4Scene extends Phaser.Scene {
    
    constructor(){
        super()
    }


    preload(){

       
        this.load.image('tiles',tiles);
        this.load.tilemapTiledJSON("map",map,null,Phaser.Tilemaps.Tilemap.TILED_JSON)
        this.load.spritesheet('hero',Charcater,{frameWidth:120,frameHeight:100})
        this.load.image('background',back)
    
    
    }

    create(){
        this.player = this.physics.add.sprite(700,300, 'hero').setScale(.6)
        this.player.setCollideWorldBounds(true)

        // this.add.image(400,400,"background")
        let mappy = this.add.tilemap('map')
        // console.log(mappy)
        let terrain = mappy.addTilesetImage("imageedit_2_5379813542","tiles");
        let botLayer = mappy.createStaticLayer("bottom",[terrain],0,0).setDepth(-1);
        let topLayer = mappy.createStaticLayer("top",[terrain],0,0).setDepth(1)
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(){
        if(this.cursors.left.isDown){
            this.hero.setVelocityX(-40)
        }
    }   

}
