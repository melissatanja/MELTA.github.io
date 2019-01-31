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

var clicks = 0;

let lX;
let lY;

let xpos;
let ypos;

var w = 700;
var h = 700;

let spotlight;

function setup(){
	c = createCanvas(w, h);

	background(0);

	for(let i = 0; i < 20; i++){

		direcx = random(-1, 1);
		direcy = random(-1.2, 1.2);

		form[i] = new Form();

	}

	colorMode(RGB);

}

function draw(){

		for(n of form){

			mxc = map(mouseX, 0, 700, 20, 235);
			myc = map(mouseY, 0, 700, 20, 235);

			n.appear();
			n.move();

			for(m of form){

				if(n != m && n.intersect(m)){

					if(clicks === 0){
						n.connectA(m);
					}else if(clicks === 1){
						n.connectB(m);
					}else if(clicks === 2){
						n.connectC(m);
					}else if(clicks === 3){
						n.connectD(m);
					}else if(clicks === 4){
						n.connectE(m);
					}

				}

			}

		}

}

function clickButton(){

	clicks++;

	if(clicks > 4){

		clicks = 0;

	}

}

class Form {

	constructor(){

		this.ax = random(width);
		this.ay = random(height);
		this.bx = this.ax + 75;
		this.by = this.ay + 75;
		this.cx = (this.ax + this.bx)/2;
		this.cy = (this.ay + this.by)/2;
		this.direcx = direcx;
		this.direcy = direcy;
		this.d = d;

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

	connectA(other){

		t = 1;

			// fill(mxc + myc/6, (mxc + myc)/1.5, mxc/3 + myc, t);
			fill(mxc + myc/6, (mxc + myc)/1.5, mxc/3 + myc, t);

			noStroke();
			beginShape();
				vertex(this.ax, this.ay);
				vertex(this.bx, this.by);
				vertex(other.ax, other.ay);
				vertex(other.bx, other.by);
			endShape(CLOSE);

	}

	connectB(other){

		t = 1;

			fill(mxc + myc, (mxc - myc) * 4, mxc/3 + myc, t);

			noStroke();
			beginShape();
				vertex(this.ax, this.ay);
				vertex(this.bx, this.by);
				vertex(other.ax, other.ay);
				vertex(other.bx, other.by);
			endShape(CLOSE);

	}

	connectC(other){

		t = 1;

			fill(mxc - myc/5, (mxc - myc) * 4, mxc * 1.5 + myc, t);

			noStroke();
			beginShape();
				vertex(this.ax, this.ay);
				vertex(this.bx, this.by);
				vertex(other.ax, other.ay);
				vertex(other.bx, other.by);
			endShape(CLOSE);

	}

	connectD(other){

		t = 1;

			fill((mxc - myc) * 5, myc * 3 - mxc/1.8, (mxc + myc * 0.85), t);

			noStroke();
			beginShape();
				vertex(this.ax, this.ay);
				vertex(this.bx, this.by);
				vertex(other.ax, other.ay);
				vertex(other.bx, other.by);
			endShape(CLOSE);

	}

	connectE(other){

		t = 1;

			fill(mxc - myc/4, myc/2 + mxc, (mxc + myc), t);

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

	if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
		fill(255, 255, 255, 100);
		text("MELTA", 650, 690);
		saveCanvas(c, 'flickers', 'jpg');
	}

} 


