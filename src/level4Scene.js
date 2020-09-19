import officeTiles from './assets/level4/officeTiles.png';
import officeJson from './assets/level4/Level4.json'
export class Level4Scene extends Phaser.Scene {
    constructor(){
        super()
        
    }

    preload(){
        this.load.tilemapTiledJSON('office', officeJson, null, Phaser.Tilemaps.Tilemap.TILED_JSON)
        this.load.image('tiles', officeTiles)
    }

    create(){
       const map = this.make.tilemap({key: 'office' })
       const tileset = map.addTilesetImage('newInterior','tiles')
       const backgroundLayer = map.createStaticLayer('newInterior', tileset,0,0)
    }

}