import { setup }  from './setup.js';

console.log('P', PIXI)
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
  width: 480*3,
  height: 360*3
});

// const stats = new PIXI.Application({
//   width: 200,
//   height: 310*2
// });

let appContainer = document.getElementById('app');
let statsContainer = document.getElementById('stats');
appContainer.appendChild(app.view);
// statsContainer.appendChild(stats.view);
app.view.setAttribute('tabindex', 0);


function loadProgressHandler(e) {
  console.log('Loading', e.progress);
}

function completeLoadingHandler(e) {
  console.log('Done loading');
}

function loadErrorHandler(e) {
  console.error('Error ' + e.message);
}


app.loader
    .add('map', 'map.json')
    .add('tileset', 'bf08baaa-913a-4fd3-af23-ba148998403d-nature-paltformer-tileset-16x16.png')
    .add('mplayer', 'bf08baaa-913a-4fd3-af23-ba148998403d-character.png')
    .on('progress', loadProgressHandler)
    .on('complete', completeLoadingHandler)
    .on('error', loadErrorHandler)
    .load((loader, resources) => setup(app, statsContainer, loader, resources));



