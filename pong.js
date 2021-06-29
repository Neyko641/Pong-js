const xBallSize = 10;
const yBallSize = 10;
/* Create a Vector for x and y positions*/
class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
/*painting rectangles */
class paintingRect {
    constructor(width, height) {
        this.pos = new Vec;
        this.size = new Vec(width, height);
    }
    /*getting the hitbox for each part of the rectangle. */
    get left() {
        return this.pos.x - this.size.x / 2;
    }
    get right() {
        return this.pos.x + this.size.x / 2;
    }
    get top() {
        return this.pos.y - this.size.y / 2;
    }
    get bottom() {
        return this.pos.y + this.size.y / 2;
    }
}
/*We create the ball and it's velocity, using inheritance we connect it with the painting class*/
class Ball extends paintingRect {
    constructor() {
        super(xBallSize,yBallSize);
        this.vel = new Vec;
    }
}
class Pong {
    constructor(canvas) {
    this.Canvas = canvas;
    this.Context = canvas.getContext('2d');
    
    this.ball = new Ball;
    this.ball.pos.x = 100;
    this.ball.pos.y = 50;
    this.ball.vel.x = 100;
    this.ball.vel.y = 100;

    let lastTime;
    /* use a callback to get the last animation frame to update the screen */
    const callBack = (miliseconds) => {
    if(lastTime) {
        this.update((miliseconds - lastTime) / 1000); // Converted to whole seconds.
        }
        lastTime = miliseconds;
        requestAnimationFrame(callBack);
        };
        callBack();
    }
    draw() {
        this.Context.fillStyle = '#000';
        this.Context.fillRect(0,0, 
        this.Canvas.width, this.Canvas.height);
        this.drawBall(this.ball);
    }
    drawBall(rect) {
        this.Context.fillStyle = '#fff';
        this.Context.fillRect(rect.pos.x, rect.pos.y, 
                              rect.size.x, rect.size.y);
    } 
    /* function to update the ball speed as the match goes on.*/
    update(dt) {
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;
        /*adding physics so that the ball bounces off */
        if(this.ball.left < 0 || this.ball.right> this.Canvas.width) {
            this.ball.vel.x = -this.ball.vel.x;
        }
        if(this.ball.top < 0 || this.ball.bottom > this.Canvas.height) {
            this.ball.vel.y = -this.ball.vel.y;
        }
        this.draw();
    }
}
const canvas = document.getElementById('Pong');
const pong = new Pong(canvas);
