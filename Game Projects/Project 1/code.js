// initial state
let playerState = 'idle';
const dropdown = document.getElementById('animations');
// listens for the changes in the dropdown
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
}) 

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGTH = canvas.height = 600;

// creates new image
const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
// keeps track of the animations
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
// array of animations
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
// loops through each animation state 
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j=0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
})
console.log(animationStates);

function animate() {
    // clears canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();