class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGame')
    }

    init(data) {
        this.score = data.totalScore;
    }

    preload() {
        this.load.image('end-game', 'assets/images/game-end.jpeg')
    }

    create() {
        this.add.image(400, 300, 'end-game').setScale(0.7)
        if(this.score)
            this.add.text(180, 50, 'Your Score : ' + this.score, { fontSize: 48 })
        else  this.add.text(70, 30, 'You Silly SILLY Person\n Your Vaccine Didnt Work', { fontSize: 38 })
            
        }
}