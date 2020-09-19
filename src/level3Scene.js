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
        this.bubble 
        this.bubbleUp = false
        this.text = "open the hest"
        this.killers
        this.gameOver = false
        this.timerOver = false
        this.timer
        this.time = 0
        this.initialTime
        this.timeText = ''

    }

    preload(){
        
        this.load.image('ocean', BG );
        this.load.image('bubble', bubble );
        this.load.image('killer', killer );
        this.load.image('safe_closed', safe_closed );
        this.load.image('safe_open', safe_open);
        this.load.image('safe_ajar', safe_ajar);
        // this.load.spritesheet('stand', swim_stand, { frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('swim', swim, { frameWidth: 24, frameHeight: 24})

    }

    create(){
        // this.timer = this.game.time.create(false)
        // this.timer.loop(1000, updateCounter, this)

       
        // this.timeText = this.add.text(400, 300, `${this.time} Sec`, { fontSize: '24px', fill: '#000' });

        this.initialTime = 10;

 
    // this.timeText = this.add.text(400, 300, 'Countdown: ' + this.formatTime(this.initialTime), { fontSize: '24px', fill: '#000' });

    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        this.anims.create({
            key: 'open-safe',
            frames: [
                {key: 'safe_open', frame: 'safe_open'},
                {key: 'safe_closed', frame: 'safe_closed'},
                // {key: 'safe-open'},
            ],
            frameRate: 1, 
            repeat: 0
        })

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
       this.bubble = this.physics.add.image(300,450, 'bubble').setScale(0.5)

       this.hest = this.physics.add.sprite(300,450, 'safe-closed').play('open-safe').setScale(0.3)

        this.killers = this.physics.add.group({
            key: 'killer',
            repeat: Math.max(Math.floor(Math.random()*3) + 1, 2),
            setXY: {x: -50, y:Math.random() * 11, stepY: Math.min(Math.random()*300,200)}
        })
     
        this.killers.children.iterate(function(child){
            child.setBounceX(Phaser.Math.FloatBetween(0.5,0.9))
            child.setScale(0.5)
            // child.body.collideWorldBounds=true;
        })

        // let t = this;
        // setInterval(function(){
        //     t.killers.children.iterate(function(child){
        //         child.setBounceX(Phaser.Math.FloatBetween(0.5,0.9))
        //         child.setScale(0.5)
        //         // child.body.collideWorldBounds=true;
        //     })
        // },1000)

        
        this.player = this.physics.add.sprite(700,300, 'swim').setScale(3)
        this.player.setCollideWorldBounds(true)
        

        this.physics.add.overlap(this.player, this.killers, this.killerKissedMe, null, this)
        this.cursors = this.input.keyboard.createCursorKeys();

        console.log(this.cursors)
        this.player.setGravityY(0)

        this.physics.add.overlap(this.player, this.hest,this.openHest, null, this);

        this.text = this.add.text(16, 16, 'Open The Hest', { fontSize: '24px', fill: '#000' });
        // this.timeText = this.add.text(32, 32, 'Countdown: ' + this.formatTime(this.initialTime));
        this.timeText = this.add.text(250, 490,'open in '+this.formatTime(this.initialTime), { fontSize: '18px', fill: '#000' });
        // console.log(this.killers)
    }

    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }
     onEvent ()
{

    this.initialTime -= 1; // One second

    if(this.gameOver){
        this.timeText.setText('');

    }
    else if(this.initialTime <= 0 && !this.gameOver){
        this.timeText.setText('You can access the Treasure Now',{ fontSize: '24px', fill: '#FF0000' });

    }
    // if(this.initialTime <= 0 && this.gameOver){
    //     this.timeText.setText('');

    // }
    else {

        this.timeText.setText('open in '+this.formatTime(this.initialTime));
    }
}



    killerKissedMe(){
        console.log("killer killed me")
        this.text.setText('Oh crap You got killed.');
        this.player.setVelocityY(-100)
        this.timeText.setText("");
        this.physics.pause();
        this.gameOver = true

    }

    openHest(){
        if(!this.bubbleUp && this.initialTime <= 0){
            console.log('i ran')
            let y;
            this.hest.anims.play('open-safe', true)
            for( let i = 0; i < 10; i++){
                this.bubble.setPosition(this.bubble.x, this.bubble.y -= 2*i)
            }
            this.bubbleUp = true
            this.timeText.setText("");
            this.text.setText('You Got the special ingredient. Well Done!');
            this.gameOver = true
        }
    }
    update(){
        // this.physics.world.on('worldbounds', function(body){
        //     body.disableBody(true,true)
        // })
        let t = this


        this.killers.children.iterate((child) => {
            if(child){

                child.setVelocityX(Math.max(Math.random()*500, 10));
                // console.log(this.frameHeight)
                if(child.x >= 800){
                    this.killers.remove(child,true)
                }
            }
    
        })
        if(this.killers.countActive() <= 2){

        if(!this.gameOver){
            let rand = Math.max(Math.random(),0.5)
            t.killers = t.physics.add.group({
                key: 'killer',
                repeat: Math.max(Math.floor(Math.random()*3) + 1, 2),
                setXY: {x: -50, y:Math.random() * 11, stepY: Math.min(Math.random()*500,300)},
                setScale: {
                    x: rand,y:rand
                }
            })
            // child.setBounceX(Phaser.Math.FloatBetween(0.5,0.9))
            // child.setScale(0.5)
            t.physics.add.overlap(t.player, t.killers, t.killerKissedMe, null, t)

            // this.killers.children.iterate(function(child){
            //     t.killers = t.physics.add.group({
            //         key: 'killer',
            //         repeat: Math.max(Math.floor(Math.random()*5) + 1, 3),
            //         setXY: {x: -50, y:10, stepY: Math.min(Math.random()*500,300)},
            //         setScale: {
            //             x: Math.random(),y: Math.random()
            //         }
            //     })
            //     // child.setBounceX(Phaser.Math.FloatBetween(0.5,0.9))
            //     // child.setScale(0.5)
            //     t.physics.add.overlap(t.player, t.killers, t.killerKissedMe, null, t)
    
            //     // child.body.collideWorldBounds=true;
            // })
            }
        }
        // this.killers.children.iterate(function(child){
        //     child.setBounceX(Phaser.Math.FloatBetween(0.5,0.9))
        //     child.setScale(0.5)
        //     // child.body.collideWorldBounds=true;
        // })

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