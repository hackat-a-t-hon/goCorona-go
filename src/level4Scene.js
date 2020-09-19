import Phaser from 'phaser'
import back from './assets/imageedit_2_5379813542.png'
import map from './assets/Level4.json'
import tiles from './assets/imageedit_2_5379813542.png'
export class Level4Scene extends Phaser.Scene {
    constructor(){
        super()
    }

    preload(){

        this.load.image('tiles',tiles);
        this.load.tilemapTiledJSON("map",map,null,Phaser.Tilemaps.Tilemap.TILED_JSON)

        this.load.image('background',back)
    }

    create(){
        // this.add.image(400,400,"background")
        let mappy = this.add.tilemap('map')
        
        // console.log(mappy)
        let terrain = mappy.addTilesetImage("newInterior","tiles");
        // let layer = map.createLayer('bottom')
        let botLayer = mappy.createStaticLayer("bottom",[terrain],0,0);
        let topLayer = mappy.createStaticLayer("top",[terrain],0,0)


    }

}
