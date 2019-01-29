function setup(){

	c = createCanvas

}


class Form {

	constructor(){

		// mx = mouseX;

		// direcx = (mx - this.x) * ease;
		// direcy = (my - this.y) * ease;

		// this.mx = map(mouseX, 0, 1000, 0, 360);
		// this.my = map(mouseY, 0, 1000, 0, 360);

		this.ax = random(width);
		this.ay = random(height);
		this.bx = this.ax + 100;
		this.by = this.ay + 100;
		this.cx = (this.ax + this.bx)/2;
		this.cy = (this.ay + this.by)/2;
		this.direcx = direcx;
		this.direcy = direcy;
		this.d = d;
		// this.mx = mouseX;
		// this.newcol = newcol;

		this.h = 0;
		this.s = 100;
		this.l = 75;

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

		if(this.ad < 100){

			return true;

		}

	}

	repel(){

		this.direcx = this.direcx * -1;
		this.direcy = this.direcy * -1;

	}

	connect(other){

		t = 0.1;

			fill(this.h, this.s, this.l, t);

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
	saveCanvas(c, 'feathers', 'jpg');
} 