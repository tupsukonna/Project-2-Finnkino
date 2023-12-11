const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
// initial gamespeed
let gameSpeed = 4;
// let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

// runs the animation when the windows loads
window.addEventListener('load', function(){
    // slider with the default speed
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    // shows the current gamespeed
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    // listens for the change in the gamespeed
    slider.addEventListener('change', function(e){
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = gameSpeed;
    })
    
    class Layer {
        constructor(image, speedModifier){
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            // changes the speed of the images based on ehat the gamespeed is
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update(){
            this.speed = gameSpeed * this.speedModifier;
            // repeats image if it has gone over the width of the image
            if (this.x <= -this.width){
                this.x = 0;
            }
            // moves the image based on speed
            this.x = this.x - this.speed;
            // this.x=gameFrame * this.speed % this.width;
        }
        draw(){
            // draws image at current position
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            // makes image keep scrolling
            ctx.drawImage(this.image, this.width, this.y, this.width, this.height);
        }
    }
    
    // game speed is different for each picture
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    const gameObjects = [layer1, layer2, layer3, layer4, layer5];
    
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });
        // gameFrame--;
        requestAnimationFrame(animate);
    };
    animate();
});