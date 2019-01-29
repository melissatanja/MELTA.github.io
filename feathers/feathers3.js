let c;
let form = [];
let direcx;
let direcy;
let d;
let t;
let colgroup1;
let mx;
let my;
let cols = [];

let lX;
let lY;

let xpos;
let ypos;
// let mxc;
// let myc;

let spotlight;

function setup(){
	c = createCanvas(700, 1400);

	// colorMode(HSB);

	// mx = mouseX;
	background(0);

	for(let i = 0; i < 20; i++){

		direcx = random(-1, 1);
		direcy = random(-1.2, 1.2);

		form[i] = new Form();

	}

	// mx = mouseX;

	// spotlight = createGraphics(width/4, height/4);

}

function draw(){

	// console.log(mx);

	// mx = map(mouseX, 0, 1000, 0, 255);
	// my = map(mouseY, 0, 1000, 0, 255);

	// fill(mx, mx, mx);
	// ellipse(mx, my, 100, 100);

	// push();
	// fill(0, 0, 0, 10);
	// rect(0, 0, width, height);
	// pop();

		// stroke(0, 100, 0);
		// line(width/2, height/2, mouseX, mouseY);

		// console.log(mouseX, mouseY);
	// spotlight.background(255);
	// spotlight.noStroke();
	// spotlight.fill(255, 255, 255, 1);
	// spotlight.filter(BLUR, 5);
	// spotlight.ellipse(mouseX, mouseY, 150, 150);

	for(let i = 0; i < 75; i++){

		// mx = map(mouseX, 0, 1000, 0, 345);
		// my = map(mouseY, 0, 1000, 0, 345);


		// form[i].h = mx + my;

	}

		for(n of form){

			mxc = map(mouseX, 0, 1000, 0, 255);
			myc = map(mouseY, 0, 1000, 0, 255);

			// xpos = mouseX;
			// ypos = mouseY;

			// ellipse(mx, my, 100, 100);

			n.appear();
			n.move();

			// if(n.x < mouseX + 10 && n.x > mouseX - 10){

			// 	// if(n.y < mouseY +10 || n.y > mouseY - 10){

			// 		n.repel();
			// 		console.log(mouseX);

			// 	// }

			// }

			for(m of form){

				if(n != m && n.intersect(m)){

					n.connect(m);

				}

			}

		}

}

class Form {

	constructor(){

		// mx = mouseX;

		// this.x = (mx - this.x) * ease;
		// this.y = (my - this.y) * ease;

		// this.mx = map(mouseX, 0, 800, 0, 255);
		// this.my = map(mouseY, 0, 800, 0, 255);

		// this.mouseX = mouseX;

		// this.ax = xpos;
		// this.ay = ypos;

		this.ax = random(width);
		this.ay = random(height);
		this.bx = this.ax + 75;
		this.by = this.ay + 75;
		this.cx = (this.ax + this.bx)/2;
		this.cy = (this.ay + this.by)/2;
		this.direcx = direcx;
		this.direcy = direcy;
		this.d = d;

		// this.mx = mouseX;
		// this.newcol = newcol;

		// this.h = 0;
		// this.s = 100;
		// this.l = 75;

		// console.log(mouseX);

	}

	move(){

		this.ax = this.ax + this.direcx;
		this.ay = this.ay + this.direcy;
		this.bx = this.bx + this.direcx;
		this.by = this.by + this.direcy;

		if(this.ax < 0 && this.bx < 0){

			this.ax = width;
			this.bx = this.ax + 25;

		}

		if(this.ay < 0 && this.by < 0){

			this.ay = height;
			this.by = this.ay + 25;

		}

		if(this.ax > width && this.bx > width){

			this.ax = 0;
			this.bx = this.ax + 25;
		}

		if(this.ay > height && this.by > width){

			this.ay = 0;
			this.by = this.ay + 25;

		}

	}

	appear(){

		noStroke();

		line(this.ax, this.ay, this.bx, this.by);

	}

	intersect(other){

		this.ad = dist(this.ax, this.ay, other.ax, other.ay);
		this.bd = dist(this.bx, this.by, other.bx, other.by);
		this.cd = dist(this.cx, this.cy, other.cx, other.cy);

		d = (this.ad + this.bd + this.cd);

		if(this.ad < 125){

			return true;

		}

	}

	repel(){

		this.direcx = this.direcx * -1.5;
		this.direcy = this.direcy * -1.5;

	}

	connect(other){

		t = 1;

			fill(mxc + myc/6, (mxc + myc)/1.5, mxc/3 + myc, t);

			// ellipse(mx, my, 100, 100);

			noStroke();
			beginShape();
				vertex(this.ax, this.ay);
				vertex(this.bx, this.by);
				vertex(other.ax, other.ay);
				vertex(other.bx, other.by);
			endShape(CLOSE);

	}

}

function mousePressed(){
	saveCanvas(c, 'flickers', 'jpg');
} 


// tutorial help
// https://www.youtube.com/watch?v=W1-ej3Wu5zg&index=31&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA
// https://www.youtube.com/watch?v=5Q9cA0REztY&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=32

// colour reference
// http://www.workwithcolor.com/cyan-blue-color-hue-range-01.htm
// https://digitalsynopsis.com/design/color-thesaurus-correct-names-of-shades/