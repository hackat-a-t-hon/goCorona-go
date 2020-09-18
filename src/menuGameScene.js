export class MenuGameScene extends Phaser.Scene {
    constructor(){
        super()
    }

    preload(){
        this.load.image("start","")
    }
    create(){
        this.add.image(400,300,'start-game')
    }

}