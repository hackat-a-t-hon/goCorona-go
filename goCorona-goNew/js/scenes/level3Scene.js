
class Level3Scene extends Phaser.Scene {
    constructor() {
        super('Level3')
        this.score = 0;
    }
    preload() {
        // this.load.image('sky', 'assets/images/snowfloor.jpg');
        // this.load.image('jet', 'assets/images/man21.png');
        // this.load.image('tree', 'assets/images/tree.png');
        // this.load.image('bigmountain', 'assets/images/newmont.png');
        // this.load.image('snowTrees', 'assets/images/snowTrees.png');
        this.load.image('horse', 'assets/level2/images/horse.png');
        this.load.spritesheet('hero','./assets/hero.png',{frameWidth:16,frameHeight:24})

        // this.load.image('snowTree', 'assets/images/snowTree.png');
        this.load.image('box', 'assets/level2/images/box.png');

        this.load.image('floor', 'assets/level2/images/snowfloor.jpg');
        this.load.image('man', 'assets/level2/images/man21.png');
        this.load.image('tree', 'assets/level2/images/tree.png');
        this.load.image('bigmountain', 'assets/level2/images/newmont.png');
        this.load.image('snowTrees', 'assets/level2/images/snowTrees.png');
        
        this.load.audio('endgame', 'assets/audio/end.mp3')
        // this.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', {
        //     frameWidth: 16,
        //     frameHeight: 16
        // })
    }

    create() {
        var i,j;
        for(i = 125; i<=800;i+=125){
            for(j = 128; j<=600; j+=128 ){
            this.floor =  this.add.image(i,j, 'floor');

            }
        }


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
        this.man= this.physics.add.sprite(780,600, 'hero').setScale(2)
        this.man.setDepth(1)
        this.man.setCollideWorldBounds(true)
        ///Common Player Setup Ends


        this.add.image(30,30,'tree').setScale(.5);
        this.add.image(60,30,'tree').setScale(.5);
        this.add.image(100,30,'tree').setScale(.5);
        this.add.image(25,70,'tree').setScale(.5);
        this.add.image(30,110,'tree').setScale(.5);
        this.tree = this.physics.add.image(60, 115, 'tree').setScale(0.5)
        this.tree.body.immovable = true;

        this.treea = this.physics.add.image(88, 105, 'tree').setScale(0.5)
        this.treea.body.immovable = true;

        this.mountain = this.physics.add.image(200,100,'bigmountain').setScale(.5);
        this.mountain.body.immovable = true;

        this.mountaina = this.physics.add.image(100,210,'bigmountain').setScale(.5);
        this.mountaina.body.immovable = true;

        this.add.image(300,100,'bigmountain').setScale(.5);
        this.add.image(400,100,'bigmountain').setScale(.5);
        this.add.image(500,100,'bigmountain').setScale(.5);
        this.add.image(700,100,'bigmountain').setScale(.5);

        this.snowTrees =  this.physics.add.image(400,300,'snowTrees').setScale(.5);
        this.snowTrees.body.immovable = true;

        this.snowTree =  this.physics.add.image(400,300,'snowTree');
        this.snowTree.body.immovable = true;

        this.horse =  this.physics.add.image(500,600,'horse').setScale(1.5);
        this.horse.body.immovable = true;

        this.box =  this.physics.add.image(70,80,'box').setScale(.5);
        this.box.body.immovable = true;

        // this.man = this.physics.add.image(780, 600, 'man').setScale(1.5).setOrigin(0.5, 0)
        // this.man.setCollideWorldBounds(true)

        //endgame
        this.endgame = this.sound.add('endgame');
        this.physics.add.overlap(this.man, this.box, this.endGame, null, this);



        //colliderjet
        this.physics.add.collider(this.man,this.box);
        this.physics.add.collider(this.man,this.mountain);
        this.physics.add.collider(this.man,this.mountaina);
        this.physics.add.collider(this.man,this.snowTrees);
        this.physics.add.collider(this.man,this.snowTree);
        this.physics.add.collider(this.man,this.horse);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(15, 15, 'Score : 0', { fontSize: 32, fill: '#ff0000' })


    }
    endGame() {
        this.endgame.play()
        this.physics.pause();
        this.man.setTint(0xff0000)
        this.gameOver = true;
    }

    update() {
        if (this.gameOver && !this.endgame.isPlaying) {
            this.scene.start('L4', { totalScore: this.score })
            
        }

        if (this.cursors.left.isDown) {
            this.man.setVelocityX(-150);
            this.man.anims.play('left',true)

        } else if (this.cursors.right.isDown) {
            this.man.setVelocityX(150);
            this.man.anims.play('right',true)

        } else {
            this.man.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.man.setVelocityY(-150);
            this.man.anims.play('up',true)

        } else if (this.cursors.down.isDown) {
            this.man.setVelocityY(150);
            this.man.anims.play('down',true)

        } else {
            this.man.setVelocityY(0);
        }
  
    }

}