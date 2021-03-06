class PlayGameScene extends Phaser.Scene {
    constructor() {
        super('Play')
        this.score = 0;
    }
    preload() {

        this.load.image('tiles','./assets/imageedit_2_5379813542.png');
        this.load.tilemapTiledJSON("map",'./assets/Level4.json',null,Phaser.Tilemaps.Tilemap.TILED_JSON)
        
        ///Common Player Setup Starts
        this.load.spritesheet('hero','./assets/hero.png',{frameWidth:16,frameHeight:24})
        ///Common Player Setup Ends
        this.load.image('btn','./assets/set.png')
        this.load.image('background','./assets/imageedit_2_5379813542.png')
        this.load.image('door', './assets/door.png');
        this.load.image('med','./assets/flask.png');
    }

    create() {


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
        // this.player = this.physics.add.sprite(5,80, 'hero').setScale(2)
        this.player = this.physics.add.sprite(5,500, 'hero').setScale(2)
        this.player.setDepth(1)
        this.player.setCollideWorldBounds(true)
        ///Common Player Setup Ends
        let mappy = this.add.tilemap('map')
        let terrain = mappy.addTilesetImage("imageedit_2_5379813542","tiles");
        let botLayer = mappy.createStaticLayer("bottom",[terrain],0,0).setDepth(-1);
        let topLayer = mappy.createStaticLayer("top",[terrain],0,0).setDepth(0)
        topLayer.setOrigin(300,300)
        topLayer.setScale(8)

        topLayer.setCollisionByProperty({collision:true})       
        this.physics.add.collider(this.player,topLayer)
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //NPC STUFF


        this.npc3= this.physics.add.sprite(532,240,"hero")
        this.npc3.setScale(2.2)
        this.npc3.tint = '0xff0000'
        this.npc3.goingDown = false;
        this.physics.add.overlap(this.npc3,this.player,this.collideWithNpc)
        this.rest= false
        ///Potions
        let meds = this.physics.add.image(750,400,'med').setScale(1.2)        
        meds.body.immovable = true
        // this.physics.add.collider(this.player,meds,this.gameComplete,null,this)
        this.physics.add.overlap(this.player, meds, this.gameComplete, null, this);
   
        //Text
        this.text = this.add.text(26, 26, 'To Make A Vaccine Get To The First Ingredient', { fontSize: '24px', fill: '#fff' }).setDepth(5);
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
  
          //Abhishek ka game Completion tha
    gameComplete(player,flask){
        // flask.disableBody(true,true)
        // this.text.setOrigin(.5,.5)
        // this.text.setFontSize(38)
        // this.text.x = 400
        
        // this.text.y=320
        // this.time.addEvent({ delay: 3000, callback: this.delayedCall, callbackScope: this, loop: false });
        // this.text.setText("Congratulations! \nYou Got All The Ingredients")
        // this.physics.pause()

            //    this.endgame.play()
               this.physics.pause();
               this.player.setTint(0xff0000)
               this.gameOver = true;
    }


    update() {
        if (this.gameOver && !this.gameComplete.isPlaying) {
            this.scene.start('Level2')
            // { totalScore:this.score }
        }

        
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