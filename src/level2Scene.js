export class Level2Scene extends Phaser.Scene {
    constructor(){
        super()
    }

    preload(){
        this.load.image('floor', 'assets/level2/images/snowfloor.jpg');
        this.load.image('man', 'assets/level2/images/man21.png');
        this.load.image('tree', 'assets/level2/images/tree.png');
        this.load.image('bigmountain', 'assets/level2/images/newmont.png');
        this.load.image('snowTrees', 'assets/level2/images/snowTrees.png');
        
    }

    create(){
        var i,j;
        for(i = 125; i<=800;i+=125){
            for(j = 128; j<=600; j+=128 ){
            this.floor =  this.add.image(i,j, 'floor');

            }
        }

        this.tree = this.physics.add.image(400, 500, 'tree').setScale(0.5)
        this.tree.body.immovable = true;

        this.mountain = this.physics.add.image(200, 100, 'bigmountain').setScale(.5);
        this.mountain.body.immovable = true;

      this.snowTree =  this.physics.add.image(400,300,'snowTrees').setScale(.5);
      this.snowTree.body.immovable = true;

      this.man = this.physics.add.image(780, 600, 'man').setScale(1.5).setOrigin(0.5, 0)
      this.man.setCollideWorldBounds(true)

      //collider
      this.physics.add.collider(this.man,this.tree);
      this.physics.add.collider(this.man,this.mountain);
      this.physics.add.collider(this.man,this.snowTree);

    }
    update() {

        if (this.cursors.left.isDown) {
            this.man.setVelocityX(-150);
        } else if (this.cursors.right.isDown) {
            this.man.setVelocityX(150);
        } else {
            this.man.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.man.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.man.setVelocityY(150);
        } else {
            this.man.setVelocityY(0);
        }
  
    }

}