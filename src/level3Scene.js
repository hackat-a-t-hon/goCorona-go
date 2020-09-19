import BG from './assets/level3/underWater.png'
import bubble from './assets/level3/Bubble_3.png'
import killer from './assets/level3/killer.png'
import safe_closed from './assets/level3/hest_closed.png'
import safe_open from './assets/level3/hest_open.png'
import safe_ajar from './assets/level3/hest_ajar.png'
import swim_stand from './assets/level3/swim_stand.png'
import swim from './assets/level3/swim.png'

export class Level3Scene extends Phaser.Scene {

    constructor(){
        super()
        this.player
        this.cursors
        this.hest
    }

    preload(){
        
        this.load.image('ocean', BG );
        this.load.image('bubble', bubble );
        this.load.image('killer', killer );
        this.load.image('safe_closed', safe_closed );
        this.load.image('safe_open', safe_open);
        this.load.image('safe_ajar', safe_ajar);
        // this.load.spritesheet('stand', swim_stand, { frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('swim', swim, { frameWidth: 24, frameHeight: 25})

    }

    create(){
        // this.anims.create({
        //     key: 'open-safe',
        //     frames: [
        //         {key: 'safe_closed'},
        //         {key: 'safe-ajar'},
        //         {key: 'safe-open'},
        //     ],
        //     frameRate: 10, 
        //     repeat: 1
        // })

        this.anims.create({
            key: 'left',
            frames: [ 
                {key:'swim', frame:1},
                {key:'swim', frame:9},
              
                // {key:'swim', frame:25},

             ],
            frameRate:5, 
            repeat: -1
        });

        this.anims.create({
           key: 'stand',
            frames: [ 
                {key:'swim', frame:1},
                {key:'swim', frame:9},
              
                {key:'swim', frame:25},

             ],
            frameRate:5, 
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: [ 
                {key:'swim', frame:5},
                {key:'swim', frame:13},
                

             ],
            frameRate: 5,
            repeat: -1
        });


        this.anims.create({
             key: 'up',
            frames: [ 
                {key:'swim', frame:7},
                {key:'swim', frame:21},
              
                // {key:'swim', frame:23},

             ],
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
          key: 'down',
            frames: [ 
                {key:'swim', frame:3},
                {key:'swim', frame:17},
              
                // {key:'swim', frame:25},

             ],
            frameRate: 5,
            repeat: -1
        });

       this.add.image(400,225, 'ocean').setScale(0.7)
       this.add.image(300,450, 'bubble').setScale(0.5)

       this.hest = this.add.sprite(300,450, 'safe-closed').play('open-safe').setScale(0.3)

        this.player = this.physics.add.sprite(700,300, 'swim').setScale(3)
        // this.player.setCollideWorldBounds(true)
    

        // this.player.anims.add('left', [0,9,17,25],10,true)
        // this.player.anims.add('right', [0,9,17,25],10,true)
        // this.player.anims.add('up', [0,9,17,25],10,true)
        // this.player.anims.add('down', [0,9,17,25],10,true)
        // this.player.anims.add('stand', [0,9,17,25],10,true)
        
        this.cursors = this.input.keyboard.createCursorKeys();

        console.log(this.cursors)
            this.player.setGravityY(0)

    }

    update(){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
     
            this.player.anims.play('left', true);
       
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
         else if (this.cursors.up.isDown)
        {
         
             this.player.setPosition(this.player.x, this.player.y-2)
           // this.player.setVelocityY(-160);

            this.player.anims.play('up', true);
        }
else if (this.cursors.down.isDown)
        {
            // this.player.setVelocityY(160);
            this.player.setPosition(this.player.x, this.player.y+2)

            this.player.anims.play('down', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('stand');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
            }

}