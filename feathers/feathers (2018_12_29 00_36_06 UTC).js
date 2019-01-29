let c;

let xpos = [];
let ypos = [];
let movex = [];
let movey = [];
let forms = [];

let f; 
let t;
let s;
let n;
let x;
let y;
let dirx;
let diry;

function setup(){
	c = createCanvas(500, 500);

	for(l = 0; l < 50; l++){

		form = new Form();
		forms.push(form);

	}

	n = 0;
}

function draw(){

	// background(255);

	f = 0;

	for(let n = 0; n < forms.length; n++){

		if(frameCount % 15 === 0){

			// forms.push(form);

		// }
			
			forms[n].display();

			forms[n].move();

			forms[n].act();
		}

			// n += 1;

	}

	// if(frameCount % 15 === 0){

	// 	n += 1;

	// }
}

function mousePressed(){
	saveCanvas(c, 'feathers', 'jpg');
} 

function Form(){

	this.x = random(width);
	this.y = random(height);
	this.dirx = random(-5, 5);
	this.diry = random(-5, 5);
	// this.dirx = 5;
	this.t = 25;
	this.f = 0;
	this.s = 50;

	this.display = function(){

		stroke(this.f);

		line(this.x, this.y, this.x + 10, this.y + 10);
		line(this.x, this.y, this.x - 10, this.y - 10);

		xpos.push(this.x);
		ypos.push(this.y);
	}

	this.move = function(){

		// this.dirx ;
		// this.diry ;

		this.x = this.x + this.dirx;
		this.y = this.y + this.diry;

		movex.push(this.dirx);
		movey.push(this.diry);

		for(let i = 0; i < xpos.length; i++){
			if(this.x < xpos[i] + 5 && this.x > xpos[i] - 5){

				this.dirx = this.dirx * -1;

			}else{

				this.dirx = random(-1, 1);

			}
		}

		// for(let j = 0; j < ypos.length; j++){
		// 	if(this.y < ypos[j] + 5 && this.y > ypos[j] - 5){

		// 		this.diry = this.diry * -1;

		// 	}else{

		// 		this.diry = random(-1, 1);

		// 	}
		// }

		if(this.x > width){

			this.x = 0;
			this.x += this.dirx;

		}

		if(this.x < 0){

			this.x = width;
			this.x += this.dirx;

		}

		if(this.y > height){

			this.y = 0;
			this.y += this.diry;

		}

		if(this.y < 0){

			this.y = height;
			this.y += this.diry;

		}

	}

	this.act = function(){

		for(let a = 0; a < xpos.length; a++){

			if(this.x === xpos[a] && this.y === ypos[a]){

				fill(this.f, this.t);

				quad(this.x - 10, this.y - 10, xpos[a] - 10, ypos[a] - 10, this.x + 10, this.y + 10, xpos[a] + 10, ypos[a] + 10);

			}

			while(this.x === xpos[a] && this.y === ypos[a]){

				this.t = 175;

			}

		}

	}

}