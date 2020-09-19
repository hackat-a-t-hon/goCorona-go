import Phaser, { Physics } from 'phaser'
import back from './assets/imageedit_2_5379813542.png'
import DOOR from './assets/door.png'
import button from './assets/set.png'
import potion from './assets/flask.png'
import map from './assets/Level4.json'
import backMusic from './game_music.ogg'
//Common Player Character import 
import Charcater from './assets/hero.png'
import tiles from './assets/imageedit_2_5379813542.png'
export class Level4Scene extends Phaser.Scene {
    
    constructor(){
        super()        
    }


    preload(){

        this.load.image('tiles',tiles);
        this.load.tilemapTiledJSON("map",map,null,Phaser.Tilemaps.Tilemap.TILED_JSON)
        
        ///Common Player Setup Starts
        this.load.spritesheet('hero',Charcater,{frameWidth:16,frameHeight:24})
        ///Common Player Setup Ends
        this.load.image('btn',button)
        this.load.image('background',back)
        this.load.image('door', DOOR);
        this.load.image('med',potion);
        this.load.audio('backM',backMusic)
    }

    create(){

        let music = this.game.add.audio
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
        let button = this.physics.add.image(190,490,'btn').setDepth(3)
        button.setScale(2)
        let button2 = this.physics.add.image(190,60,'btn').setDepth(3)
        button2.setScale(3)
        button2.tint = '0x00ff55'
        button2.body.immovable = true
        let mappy = this.add.tilemap('map')
        let terrain = mappy.addTilesetImage("imageedit_2_5379813542","tiles");
        let botLayer = mappy.createStaticLayer("bottom",[terrain],0,0).setDepth(-1);
        let topLayer = mappy.createStaticLayer("top",[terrain],0,0).setDepth(0)
        this.door = this.physics.add.image(680,540,'door').setOrigin(0,0)
        this.door.setScale(5.5)

        topLayer.setCollisionByProperty({collision:true})       
        this.physics.add.collider(this.player,button,this.collideWithButton,null,this)
        this.physics.add.collider(this.player,button2,this.collideWithButton2,null,this)
        this.physics.add.collider(this.player,topLayer)
        this.physics.add.collider(this.player,this.door,this.collideWithDoor,null,this)
        this.door.body.immovable = true
        button.body.immovable = true
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //NPC STUFF
        this.npc1= this.physics.add.sprite(140,120,"hero")
        this.npc1.setScale(2.2)
        this.npc1.tint = '0xff0000'
        this.npc1.goingDown = true;
        this.physics.add.overlap(this.npc1,this.player,this.collideWithNpc)
        
        this.npc2= this.physics.add.sprite(345,160,"hero")
        this.npc2.setScale(2.2)
        this.npc2.tint = '0xff0000'
        this.npc2.goingRight = true;
        this.physics.add.overlap(this.npc2,this.player,this.collideWithNpc)


        this.npc3= this.physics.add.sprite(532,240,"hero")
        this.npc3.setScale(2.2)
        this.npc3.tint = '0xff0000'
        this.npc3.goingDown = false;
        this.physics.add.overlap(this.npc3,this.player,this.collideWithNpc)
        this.rest= false
        ///Potions
        let meds = this.physics.add.image(750,80,'med').setScale(1.2)        
        meds.body.immovable = true
        this.physics.add.collider(this.player,meds,this.gameComplete,null,this)
   
        //Text
        this.text = this.add.text(26, 26, 'Get The Last Ingredient For The Vaccine', { fontSize: '24px', fill: '#fff' }).setDepth(5);
        // this.timeText = this.add.text(32, 32, 'Countdown: ' + this.formatTime(this.initialTime));
       
    }
    collideWithNpc(npc,play){
        console.log("damn")
        play.tint = "0xdd0000"
        play.setRotation(-1.5)
        play.rest = true
    }
    delayedCall(){
        this.text.setColor("#ff0000")
        this.player.tint = "#ff0000"
        this.player.setRotation(-1.5)
        this.text.setText("Unfortunately You Died\n So Silly")
    }
    collideWithDoor(player,door){
    }
    collideWithButton(player,btn){
        btn.y=495
        btn.tint = '0x8b0000'
        this.doorOpen1 = true
        this.door.setRotation(-1.5)
        this.door.rotation = -1.5
        this.door.x = 695
        this.door.y = 559
    }
    collideWithButton2(player,btn){
        if(this.doorOpen1){
          btn.tint = '0x00ff00'
          this.door.disableBody(true,true)    
        }
          }
  
    gameComplete(player,flask){
        flask.disableBody(true,true)
        this.text.setOrigin(.5,.5)
        this.text.setFontSize(38)
        this.text.x = 400
        
        this.text.y=320
        this.time.addEvent({ delay: 3000, callback: this.delayedCall, callbackScope: this, loop: false });
        this.text.setText("Congratulations! \nYou Got All The Ingredients")
        this.physics.pause()

    }

    update() {
        //TO RESTART THE SCENE
        if(this.player.rest==true){
            this.scene.restart()
         }

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


        ///NPC STUFFF
        if(this.npc1.goingDown){
            this.npc1.y+=2
        }else{
            this.npc1.y-=2;
        }
        if(this.npc1.y > 500){
            this.npc1.goingDown = false
            this.npc1.anims.play('up',true)
        } else if(this.npc1.y<150){
            this.npc1.goingDown=true
            this.npc1.anims.play('down',true)

        }

        if(!this.npc2.goingRight){
            this.npc2.x-=2
        }else{
            this.npc2.x+=2;
        }
        if(this.npc2.x > 472){
            this.npc2.goingRight = false
            this.npc2.anims.play('left',true)
        } else if(this.npc2.x<345){
            this.npc2.goingRight=true
            this.npc2.anims.play('right',true)

        }

        if(this.npc3.goingDown){
            this.npc3.y+=2
        }else{
            this.npc3.y-=2;
        }
        if(this.npc3.y > 412){
            this.npc3.goingDown = false
            this.npc3.anims.play('up',true)
        } else if(this.npc3.y<240){
            this.npc3.goingDown=true
            this.npc3.anims.play('down',true)

        }
        //Restart
        
    }   

}
