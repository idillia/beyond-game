export const gameLoop = (app, blob, character, tileSize, SCALE, map, houseObj, sky, background, stage,house, itemCountMessage, characterFrames, kb, itemCount, statsContainer, testCollision, testCollection) => {
    return app.ticker.add((time) => {

    let scrollX = 0;
    let scrollY = 0;
    blob.x = character.x;
    blob.y = character.y;

    character.vy = Math.min(12, character.vy + 1)
    if (character.vx > 0) {
        character.vx -= 1;
    }
    if (character.vx < 0) {
        character.vx += 1;
    }

    let touchingGround = testCollision(
        character.x + 2,
        character.y + tileSize * SCALE * 2 + 1
    ) || testCollision(
        character.x + tileSize * SCALE - 3,
        character.y + tileSize * SCALE * 2 + 1
    );


    if (character.vy > 0) {
        for (let i = 0; i < character.vy; i++) {
            let testX1 = character.x + 2;
            let testX2 = character.x + tileSize * SCALE - 3;
            let testY = character.y + tileSize * SCALE * 2;
            if (testY > map.height * tileSize * SCALE || testCollision(testX1, testY) || testCollision(testX2, testY)) {
                character.vy = 0;
                break;
            }
            let {index, value} = testCollection(testX1, testY);
            let {index1, value1} = testCollection(testX2, testY);
            let item = houseObj[index];
            let item1 = houseObj[index1];

            if ( (value !== 12 || value1 !== 12)) {
                if (item && item.visible) {
                    item.visible = false;
                    itemCount += 1;
                    itemCountMessage.text =`Item collected: ${itemCount}`
                    statsContainer.innerHTML =`Item collected: ${itemCount}`
                }
                else if (item && !item.visible){
                    // console.log('Item is hidden')
                }
                if (item1 && item1.visible) {
                    item1.visible = false;
                    itemCount += 1;
                    itemCountMessage.text =`Item collected: ${itemCount}`
                    statsContainer.innerHTML =`Item collected: ${itemCount}`
                } else if (item && !item.visible){
                    // console.log('Item1 is hidden')
                }
            }
            character.y = character.y + 1;
        }
    }
    if (character.vy < 0) {
        for (let i = character.vy; i < 0; i++) {
            let testX1 = character.x + 2;
            let testX2 = character.x + tileSize * SCALE - 3;
            let testY = character.y + 5;
            if (testCollision(testX1, testY) || testCollision(testX2, testY)) {
                character.vy = 0;
                break;
            }
            character.y = character.y - 1;
        }
    }

    if (character.vx > 0) {
        character.direction = 0;
        for (let i = 0; i < character.vx; i++) {
            let testX = character.x + tileSize * SCALE - 2;
            let testY1 = character.y + 5;
            let testY2 = character.y + tileSize * SCALE;
            let testY3 = character.y + tileSize * SCALE * 2 - 1;
            if (testX >= map.width * tileSize * SCALE || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
                character.vx = 0;
                break;
            }
            character.x = character.x + 1;
        }
    }
    if (character.vx < 0) {
        character.direction = 1;
        for (let i = character.vx; i < 0; i++) {
            let testX = character.x + 1;
            let testY1 = character.y + 5;
            let testY2 = character.y + tileSize * SCALE;
            let testY3 = character.y + tileSize * SCALE * 2 - 1;
            if (testX < 0 || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
                character.vx = 0;
                break;
            }
            character.x = character.x - 1;
        }
    }
    // console.log('cx', character.x)
    // console.log('cy', character.y)
    if (character.x + scrollX > app.view.width - tileSize * SCALE * 6) {
        scrollX = Math.max(
            app.view.width - map.width * tileSize * SCALE,
            app.view.width - character.x - tileSize * SCALE * 6
        );
    }
    if (character.x + scrollX < tileSize * SCALE * 5) {
        scrollX = Math.min(0, -character.x + tileSize * SCALE * 5);
    }
    if (character.y + scrollY > app.view.height - tileSize * SCALE * 5) {
        scrollY = Math.max(
            app.view.height - map.height * tileSize * SCALE,
            app.view.height - character.y - tileSize * SCALE * 5
        );
    }
    if (character.y + scrollY < tileSize * SCALE * 2) {
        scrollY = Math.min(0, -character.y + tileSize * SCALE * 2);
    }
    app.stage.x = scrollX;
    sky.x = -scrollX * .5;
    sky.y = -scrollY * .5;
    app.stage.y = scrollY;

    let characterFrame = 0;
    if (!touchingGround) {
        characterFrame = character.direction * 4 + 1;
    } else {
        if (character.vx > 0) {
            characterFrame = character.cycles.runRight[(Math.floor(Date.now() / 100) % 4)]
        } else if (character.vx < 0) {
            characterFrame = character.cycles.runLeft[(Math.floor(Date.now() / 100) % 4)]
        } else {
            characterFrame = character.direction * 4;
        }
    }
    blob.texture = characterFrames[characterFrame];

    if (kb.pressed.ArrowRight) {
        character.direction = 0;
        character.vx = Math.min(8, character.vx + 2);
    }
    if (kb.pressed.ArrowLeft) {
        character.direction = 1;
        character.vx = Math.max(-8, character.vx - 2);
    }
    if (!kb.pressed.ArrowUp && touchingGround && character.jumped) {
        character.jumped = false;
    }
    if (kb.pressed.ArrowUp && touchingGround && !character.jumped) {
        character.vy = -19;
        character.jumped = true;
    }

});};