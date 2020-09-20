var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
    },
    scene: [StartGameScene, PlayGameScene, Level2Scene, Level3Scene ,EndGameScene]
};
var game = new Phaser.Game(config);

