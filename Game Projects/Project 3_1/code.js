/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
// change the number of npc's in the screen
const numberOfEnemies = 100;
// stores the enemies
const enemiesArray = [];

// initial gameframe
let gameFrame = 0;

class Enemy {
    constructor(){
        // creates image with a source
        this.image = new Image();
        this.image.src = 'enemy1.png';
        // this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width=this.spriteWidth / 2.5;
        this.height=this.spriteHeight / 2.5;
        // sets enemies on a random  position in the canvas
        this.x=Math.random() * (canvas.width - this.width);
        this.y=Math.random() * (canvas.height - this.height);
        this.frame = 0;
        // enemies have a different randomized animation speed
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update(){
        this.x+= Math.random() * 15 - 7.5;
        this.y+= Math.random() * 10 - 5;
        // updates animation frames
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    // adds the enemy to canvas
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};
// const enemy1=new Enemy();
for (let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();