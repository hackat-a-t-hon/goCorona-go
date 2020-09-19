
import map from './assets/level1/Level1.json'
import back from './assets/level1/desert_house_exterior_01.png'
import tiles from './assets/level1/hjm-plain_grass_patch-66.png'
import button from './assets/set.png'
import DOOR from './assets/door.png'
import Charcater from './assets/hero.png'


export class Level1Scene extends Phaser.Scene {
    constructor(){
        super()
    }

    preload(){
        console.log("lelo mu me");
        this.load.image('tiles',tiles);
        this.load.tilemapTiledJSON("map",map,null,Phaser.Tilemaps.Tilemap.TILED_JSON);
        
         ///Common Player Setup Starts
         this.load.spritesheet('hero',Charcater,{frameWidth:16,frameHeight:24});
         ///Common Player Setup Ends
        this.load.image('btn',button);
        this.load.image('background',back);
        this.load.image('door', DOOR);
        
        
    }

    create(){
        console.log("motu chutiya hai");

       ///Common Player Setup Starts
       this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero',{
            start:4,
            end:7,
        }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero',{
            start:8,
            end:11,
        }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames:this.anims.generateFrameNumbers('hero',{
            start:12,
            end:15,
        }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('hero',{
            start:0,
            end:3,
        }),
        frameRate: 5,
        repeat: -1
    });
    this.player = this.physics.add.sprite(5,80, 'hero').setScale(2)
    this.player.setDepth(1)
    this.player.setCollideWorldBounds(true)
    ///Common Player Setup Ends
    
    let button = this.physics.add.image(30,30,'btn')
    let mappy = this.add.tilemap('map')
    let terrain1 = mappy.addTilesetImage("hjm-plain_grass_patch-66","tiles");
    let terrain2 = mappy.addTilesetImage("desert_house_exterior_01","tiles");
    let terrain3 = mappy.addTilesetImage("grass_water","tiles");
    let terrain4 = mappy.addTilesetImage("Water Top","tiles");
    let botLayer = mappy.createStaticLayer("Tile Layer 1",[terrain1,terrain2,terrain3,terrain4],0,0).setDepth(-1);
    let topLayer = mappy.createStaticLayer("Tile Layer 2",[terrain1,terrain2,terrain3,terrain4],0,0).setDepth(0)
    this.door = this.physics.add.image(700,590,'door').setScale(1.5)
    topLayer.setCollisionByProperty({collision:true})       
    this.physics.add.collider(this.player,button,this.collideWithButton,null,this)
    this.physics.add.collider(this.player,topLayer)
    this.physics.add.collider(this.player,this.door,this.collideWithDoor,null,this)
    this.door.body.immovable = true
    button.body.immovable = true
    this.cursors = this.input.keyboard.createCursorKeys();
    }
    update (){
        ///Common Player Setup Starts
        if(this.cursors.left.isDown){
            this.player.setVelocity(-100,0)
            this.player.anims.play('left',true)
        } else if(this.cursors.right.isDown){
            this.player.setVelocity(100,0)
            this.player.anims.play('right',true)
        } else if(this.cursors.up.isDown){
            this.player.setVelocity(0,-100)            
            this.player.anims.play('up',true)
        } else if(this.cursors.down.isDown){
            this.player.setVelocity(0,100)
            this.player.anims.play('down',true)
        } else{
            this.player.setVelocity(0,0)
            this.player.anims.stop()
        }
        ///Common Player Setup Ends
    }

}