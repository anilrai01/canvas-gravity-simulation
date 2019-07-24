var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// console.log(canvas.height);

var ctx = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined,
}

var colorArray = [
    '#2900F6',
    '#9E00F5',
    '#00BCB5',
    '#FFF700',
    '#FF8900',
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
        // ctx.stroke();
        // Update the Movement
        this.update();

        // console.log(this.x);
        // console.log(this.y);
        // console.log(this.dx);
        // console.log(this.dy);
        // console.log(this.rad);
        // console.log('Change');
    }

    this.update = function(){
        
        if(this.y + this.rad + this.dy> canvas.height){
            this.dy = -this.dy * friction;
            // console.log("Friction Negative");
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

    for(var i = 0; i < 400 ; i++){
        var rad = Math.floor(Math.random() * 20 + 5);
        var x = Math.floor(Math.random() * (canvas.width - 2*rad) + rad);
        var y = Math.floor(Math.random() * (canvas.height - 2*rad) + rad);
        var dy = (Math.random() - 0.5) * 2;
        var dx = (Math.random() - 0.5) * 2;
    
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