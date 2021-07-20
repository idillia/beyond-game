export const createTileTexture = (resources, tileSize) => {
    let tileTextures = [];
    for (let i = 0; i < 7 * 11; i++) {
        let x = i % 7;
        let y = Math.floor(i / 7);
        tileTextures[i] = new PIXI.Texture(
            resources.tileset.texture,
            new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
        );
    }
    return tileTextures;
};

export const createCharacterTexture = (resources, tileSize) => {

    let characterFrames = [];
    for (let i = 0; i < 8; i++) {
        characterFrames[i] = new PIXI.Texture(
            resources.mplayer.texture,
            new PIXI.Rectangle(i * tileSize, 0, tileSize, tileSize * 2)
        );
    }
    return characterFrames;
};