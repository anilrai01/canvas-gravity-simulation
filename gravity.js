var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var ctx = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined,
}

var colorArray = [
    '#0C39A0',
    '#FF2828',
    '#CF398E',
    '#FF7E14',
    '#FFEB14',
    '#58E912',
];

var gravity = 1;
var friction = 0.95;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

addEventListener('click', function(){
    init();
})

function Ball(x,y,dx,dy,rad){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = Math.floor(Math.random() * colorArray.length);

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.rad, 0,Math.PI * 2, false);
        ctx.fillStyle = colorArray[this.color];
        ctx.fill();
        ctx.stroke();
        // Update the Movement
        this.update();

        console.log(this.x);
        console.log(this.y);
        console.log(this.dx);
        console.log(this.dy);
        console.log(this.rad);
        console.log('Change');
    }

    this.update = function(){
        
        if(this.y + this.rad> canvas.height){
            this.dy = -this.dy * friction;
        }else{
            this.dy += gravity;
        }

        if(this.x + this.rad > canvas.width || this.x - this.rad < 0){
            this.dx = -this.dx;
        }

        this.x+= this.dx;
        this.y+= this.dy;
    }
}

// console.log('Draw');

var BallArray = [];

function init(){
    BallArray = [];

    for(var i = 0; i < 1; i++){
        var rad = Math.floor(Math.random() * 30 + 10);
        var x = Math.floor(Math.random() * (canvas.width - 2*rad) + rad);
        var y = Math.floor(Math.random() * (canvas.height - 2*rad) + rad);
        var dy = Math.floor(Math.random() * 6 + 1);
        var dx = Math.floor(Math.random() * 2 + 1);
    
        BallArray.push(new Ball(x,y,dx,dy,rad));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // ctx.beginPath();
    // ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0,Math.PI * 2, false);
    // // ctx.fillStyle = colorArray[this.color];
    // ctx.fill();

    for(var i = 0; i<BallArray.length; i++){
        BallArray[i].draw();
    }

}

init();
animate();