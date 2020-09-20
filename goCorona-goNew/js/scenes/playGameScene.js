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
        this.player = this.physics.add.sprite(700,100, 'hero').setScale(2)
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
        // this.physics.add.collider(this.player,meds,this.gameComplete,null,this)
        this.physics.add.overlap(this.player, meds, this.gameComplete, null, this);
   
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

               // this.endgame.play()
               this.physics.pause();
               this.player.setTint(0xff0000)
               this.gameOver = true;
    }

    // endGame() {
    //     // this.endgame.play()
    //     this.physics.pause();
    //     this.player.setTint(0xff0000)
    //     this.gameOver = true;
    // }

    // collectCoins(jet, coin) {
    //     this.coinHit.play()
    //     coin.disableBody(true, true)
    //     this.score += 10;
    //     this.scoreText.setText('Score : ' + this.score);

    //     let x = Phaser.Math.Between(0, config.width);
    //     let y = Phaser.Math.Between(0, 200);
    //     coin.enableBody(true, x, y, true, true)
    //     let xVel = Phaser.Math.Between(-100, 100);
    //     let yVel = Phaser.Math.Between(150, 200);
    //     coin.setVelocity(xVel, yVel)
    // }

    // setObjVelocity(bombs) {
    //     bombs.children.iterate(function (bomb) {
    //         let x = Phaser.Math.Between(-100, 100);
    //         let y = Phaser.Math.Between(150, 200);
    //         bomb.setVelocity(x, y)
    //     })
    // }

    // shoot() {
    //     this.ammo = this.physics.add.image(this.jet.x, this.jet.y, 'ammo').setScale(0.1)
    //     this.ammo.setRotation(-Phaser.Math.PI2 / 4);
    //     this.ammo.setVelocityY(-600)
    //     this.physics.add.collider(this.ammo, this.bombs, this.destroyBomb, null, this)
    // }

    // destroyBomb(ammo, bomb) {
    //     this.gunShot.play()
    //     this.explosion = this.add.sprite(bomb.x, bomb.y, 'explosion').setScale(4);
    //     this.explosion.play('explode')
    //     this.score += 5;
    //     this.scoreText.setText('Score : ' + this.score);
    //     this.ammo.disableBody(true, true)
    //     bomb.disableBody(true, true)
    //     let randomX = Phaser.Math.Between(15, config.width - 15)
    //     bomb.enableBody(true, randomX, 0, true, true)
    //     let x = Phaser.Math.Between(-100, 100);
    //     let y = Phaser.Math.Between(150, 200);
    //     bomb.setVelocity(x, y);
    // }

    update() {
        if (this.gameOver && !this.gameComplete.isPlaying) {
            this.scene.start('Level2' 
            // { totalScore: this.score }
            )
        }

        // if (this.cursors.left.isDown) {
        //     this.jet.setVelocityX(-150);
        // } else if (this.cursors.right.isDown) {
        //     this.jet.setVelocityX(150);
        // } else {
        //     this.jet.setVelocityX(0);
        // }

        // if (this.cursors.up.isDown) {
        //     this.jet.setVelocityY(-150);
        // } else if (this.cursors.down.isDown) {
        //     this.jet.setVelocityY(150);
        // } else {
        //     this.jet.setVelocityY(0);
        // }

        // this.checkForRepos(this.bombs)
        // this.checkForRepos(this.coins)

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
    // checkForRepos(bombs) {
    //     let game = this;
    //     bombs.children.iterate(function (bomb) {
    //         if (bomb.y > config.height) {
    //             game.resetPos(bomb);
    //         }
    //     })
    // }
    // resetPos(bomb) {
    //     bomb.y = 0;
    //     let randomX = Phaser.Math.Between(15, config.width - 15);
    //     bomb.x = randomX;
    // }
}