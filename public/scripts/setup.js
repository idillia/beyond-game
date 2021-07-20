import { createTileTexture, createCharacterTexture }  from './createTexture.js';
import { gameLoop } from './gameLoop.js';

export function setup(app, statsContainer, loader, resources) {

    const tileSize = 16;
    const SCALE = 2;
    let itemCount = 0;
    // let playerSheet = {};
    // let blob;
    //
    // const createPlayerSheet =  (player) => {
    //
    //     let  sheet = new PIXI.BaseTexture.from(resources[player].url);
    //     playerSheet["walkEast"] = [
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(0*tileSize, 0, tileSize, tileSize)),
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(1*tileSize, 0, tileSize, tileSize)),
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(2*tileSize, 0, tileSize, tileSize)),
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(3*tileSize, 0, tileSize, tileSize))
    //     ];
    //     playerSheet["walkWest"] = [
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(4*tileSize, 0, tileSize, tileSize)),
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(5*tileSize, 0, tileSize, tileSize)),
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(6*tileSize, 0, tileSize, tileSize)),
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(7*tileSize, 0, tileSize, tileSize))
    //     ]
    //     return playerSheet;
    // }
    //
    // function createPlayer () {
    //     let mplayer = new PIXI.extras.AnimatedSprite(playerSheet["walkWest"]);
    //
    //     // mplayer.anchor.set(0.5);
    //     mplayer.animationSpeed = 0.5;
    //     mplayer.loop = false;
    //     // mplayer.x = app.view.width /2;
    //     mplayer.x = 0;
    //     // mplayer.y = app.view.height /2;
    //     mplayer.y = 0;
    //     console.log('adding child', mplayer.x, mplayer.y)
    //     app.stage.addChild(mplayer);
    //     mplayer.play();
    //     blob = mplayer;
    //
    // }
    // createPlayerSheet("mplayer");
    // createPlayer();



    class Keyboard {
        constructor() {
            this.pressed = {};
        }

        watch(el) {
            el.addEventListener('keydown', (e) => {
                this.pressed[e.key] = true;
            });
            el.addEventListener('keyup', (e) => {
                this.pressed[e.key] = false;
            });
        }
    };

    let kb = new Keyboard();
    kb.watch(app.view);

    let textStyle = new PIXI.TextStyle({
        fill: '#DD3366',
        fontFamily: 'Open Sans',
        fontWeight: 300,
        fontSize: 14
    });

    let itemCountMessage = new PIXI.Text(`Item collected: ${itemCount}`, textStyle)
    // itemCountMessage.anchor.set(0.5);
    // itemCountMessage.x = 240;
    // itemCountMessage.y = 120;
    let map = resources.map.data;
    let tileTextures = createTileTexture(resources, tileSize);
    let characterFrames = createCharacterTexture(resources, tileSize);
    const blob = new PIXI.Sprite(characterFrames[0]);
    blob.scale.x = SCALE;
    blob.scale.y = SCALE;

    let character = {
        x: 0, y: 0,
        vx: 0, vy: 0,
        direction: 0,
        jumped: false,
        cycles: {
            'runLeft': [5, 6, 7, 6],
            'runRight': [1, 2, 3, 2]
        }
    };





    function testCollision(worldX, worldY) {
        let mapX = Math.floor(worldX / tileSize / SCALE);
        let mapY = Math.floor(worldY / tileSize / SCALE);
        return map.collision[mapY * map.width + mapX];
    }

    function testCollection(worldX, worldY) {
        let mapX = Math.floor(worldX / tileSize / SCALE);
        let mapY = Math.floor(worldY / tileSize / SCALE);
        let index = mapY * map.width + mapX
        let m = map.house[index];
        return {'index': index, 'value': m};
    }

    const sky = new PIXI.Container();
    const background = new PIXI.Container();
    const stage = new PIXI.Container();
    const house = new PIXI.Container();
    const houseObj = {};

    for (let y = 0; y < map.width; y++) {
        for (let x = 0; x < map.width; x++) {
            let pos = y * map.width + x;
            if (map.sky[pos] != 12) {
                let sprite = new PIXI.Sprite(tileTextures[map.sky[pos]]);
                sprite.x = x * tileSize;
                sprite.y = y * tileSize;
                sky.addChild(sprite);
            }
            if (map.background[pos] != 12) {
                let sprite = new PIXI.Sprite(tileTextures[map.background[pos]]);
                sprite.x = x * tileSize;
                sprite.y = y * tileSize;
                background.addChild(sprite);
            }
            if (map.stage[pos] != 12) {
                let sprite = new PIXI.Sprite(tileTextures[map.stage[pos]]);
                sprite.x = x * tileSize;
                sprite.y = y * tileSize;
                stage.addChild(sprite);
            }
            if (map.house[pos] != 12) {
                let sprite = new PIXI.Sprite(tileTextures[map.house[pos]]);
                sprite.x = x * tileSize;
                sprite.y = y * tileSize;
                house.addChild(sprite);
                houseObj[`${pos}`] = sprite;
            }
        }
    }

    sky.scale.x = sky.scale.y = SCALE;
    background.scale.x = background.scale.y = SCALE;
    stage.scale.x = stage.scale.y = SCALE;
    house.scale.x = house.scale.y = SCALE;
    app.stage.addChild(sky);
    app.stage.addChild(background);
    app.stage.addChild(stage);
    app.stage.addChild(blob);
    app.stage.addChild(house);

    app.view.focus();
    statsContainer.innerHTML = `Item collected: ${itemCount}`

    gameLoop(app, blob, character, tileSize, SCALE, map, houseObj, sky, background, stage,house, itemCountMessage, characterFrames, kb, itemCount, statsContainer, testCollision, testCollection)
};