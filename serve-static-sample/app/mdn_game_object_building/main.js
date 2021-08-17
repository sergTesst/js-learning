
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width =  window.innerWidth;
const height = canvas.height = window.innerHeight;

const heatPower = 0.4;
const density = 1000;

const random = (min,max)=>Math.floor(Math.random()*(max-min+1))+min;

const rndColor=() =>`rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
let balls = [];

function Ball(x, y, velX, velY, color, size){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}

Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI);//detects form on a paper
	ctx.fill();
}

Ball.prototype.update = function(){
	if((this.x+this.size)>=width){
		this.velX = -(this.velX);
	}
	if((this.x-this.size)<=0){
		this.velX = -(this.velX);
	}
	if((this.y+this.size)>=height){
		this.velY = -(this.velY);
	}
	if((this.y-this.size)<=0){
		this.velY = -(this.velY);
	}
	this.x += this.velX;
	this.y += this.velY;
}


Ball.prototype.collisionDetect = function(){
	balls.forEach(ball=>{
		if(!(this===ball)){
			const dx = this.x-ball.x;
			const dy = this.y-ball.y;
			const distance = Math.sqrt(dx * dx + dy*dy );

			if ( distance < this.size + ball.size ){
				ball.color = this.color = rndColor();
				changeVelocityOnColicion(this,ball);

			}
		}
	})
};

function changeVelocityOnColicion(ball1, ball2){
				let dVelX = Math.abs(ball1.velX-ball2.velX);
				let dVelY = Math.abs(ball1.velY-ball2.velY);
				//debugger;
				if(ball1.velX>=0 && ball2.velX>=0 && ball1.velX>ball2.velX){
					ball1.velX -=dVelX;
					ball2.velX +=dVelX; 
				}
				if(ball1.velY>=0 && ball2.velY>=0 && ball1.velY>ball2.velY){
					ball1.velY -=(dVelY);
					ball2.velY +=(dVelY); 
				}

				if(ball1.velX>=0 && ball2.velX<=0 && ball1.velX>ball2.velX){
					ball1.velX -=(dVelX);
					ball2.velX +=(dVelX); 
				}
				if(ball1.velY>=0 && ball2.velY<=0&& ball1.velY>ball2.velY){
					ball1.velY -=(dVelY);
					ball2.velY +=(dVelY); 
				}
}



function loop(){
	ctx.fillStyle = 'rgba(0,0,0.25)';
	ctx.fillRect(0,0,width,height);

	while(balls.length<25){
		let size = random(10,20);
		let ball = new Ball(
			random(size,width-size),
			random(size,height-size),
			random(-7,7),
			random(-7,7),
			rndColor(),
			size
		);
		balls.push(ball);
	}
	balls.forEach(b=>{
		b.draw();
		b.update();
		b.collisionDetect();
	})
	requestAnimationFrame(loop);
}

// const ball = new Ball(50,50,4,4,'yellow',14);
// ball.draw();
// ball.update();

loop();




