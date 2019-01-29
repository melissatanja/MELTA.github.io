// let capturer;
// let canvas;

let form = [];
let direcx;
let direcy;
let c;
let d;
let t;
let colgroup1;

function setup(){
	c = createCanvas(1000, 1000);
	// canvas = P5canvas.canvas;

	for(let i = 0; i < 75; i++){

		direcx = random(-1, 1);
		direcy = random(-1, 1);

		form[i] = new Form();

	}

	// capturer = new CCapture( {
	//   framerate: 60,
	//   format: 'gif',
	//   worksPath: '../../p5/addons/',
	//   verbose: true
	// } );

	// capturer.start();
}

function draw(){

		for(n of form){

			n.appear();
			n.move();

			for(m of form){

				if(n != m && n.intersect(m)){

					// n.repel();
					// m.repel();

					n.connect(m);

				}

			}

		}

	push();
	fill(255, 255, 255, 10);
	rect(0, 0, width, height);
	pop();

	// if(frameCount < 300){
	// 	capturer.capture(canvas);
	// }else if(frameCount === 300){
	// 	capturer.stop();
	// }

	// if(frameCount === 301){
	// 	capturer.save();
	// }

}

class Form {

	constructor(){

		this.ax = random(width);
		this.ay = random(height);
		this.bx = this.ax + 100;
		this.by = this.ay + 100;
		this.cx = (this.ax + this.bx)/2;
		this.cy = (this.ay + this.by)/2;
		this.direcx = direcx;
		this.direcy = direcy;
		this.d = d;

		//blues
		this.r = random(100);
		this.g = random(40, 100);
		this.b = random(70, 175);

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

		t = 5;

			fill(this.r, this.g, this.b, t);

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

// https://webspace.ocad.ca/~3161139/GitHub/ATLR-Experiment-2/feathers/feathers.html


// tutorial help
// https://www.youtube.com/watch?v=W1-ej3Wu5zg&index=31&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA
// https://www.youtube.com/watch?v=5Q9cA0REztY&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=32

// colour reference
// http://www.workwithcolor.com/cyan-blue-color-hue-range-01.htm
// https://digitalsynopsis.com/design/color-thesaurus-correct-names-of-shades/