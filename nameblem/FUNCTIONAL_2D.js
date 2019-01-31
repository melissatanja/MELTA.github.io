let textboxn;
let allv = ['a', 'e', 'i', 'o', 'u', 'y']; //all vowels
let allc = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']; //all consonants
let name;
let v;
let c;
let dots = []; // holds a number for each character in the name
let points = []; // holds a coordinate for each point placed around the origin
let pair;
let xpos;
let zpos;
let cols = [];

let canvas;

let saveJPG;

let xshift;
let zshift;
let adjust;

let baseProportion;
let wallThickness;

let boxl;
let boxw;
let boxy;
let TBx;
let TBz;
let LRx;
let LRz;

let mx;
let my;

let jpgButton;

let clicks;
var txt;

function setup(){

	// createP('your name (lowercase)');

	textboxn = createInput();

	createP();
	
	canvas = createCanvas(560, 560, WEBGL);

	createP();

	textboxn.changed(newName);

	txt = createGraphics(560, 650);

}

function draw(){

	background(255);
	noStroke();

	mx = map(mouseX, 0, width, 0, 255);
	my = map(mouseY, 0, height, 0, 255);

	// orbitControl();

	rotateX(PI/2);

	border();

	emblem();

	txt.fill(0);
	txt.text("MELTA", 500, 540);

}

function jpg(){

	saveCanvas(canvas, textboxn.value(), 'jpg')

}

function keyPressed(){

	if(keyCode === DELETE || keyCode === BACKSPACE){
		// points.length = 0;
		// background(255);

		window.setTimeout(location.reload());
	}

}

function mouseClicked(){

	if(mouseX > -500 && mouseX < width + 500){

		if(mouseY > 0 && mouseY < height + 500){

			// txt.text("MELTA", 500, 540);

			saveCanvas(canvas, textboxn.value(), 'jpg')

		}
	}

}

function border(){

	// strokeWeight(1);
	// stroke(0);

	// noStroke();

	fill(mx/2, my/2, (mx+my)/2);

	boxy = wallThickness/2;

	TBx = 0;
	TBz = (baseProportion/2 + wallThickness/2);

	LRx = (baseProportion/2 + wallThickness/2);
	LRz = 0;

	boxl = baseProportion;
	boxw = wallThickness;

	//T
	translate(0, boxy, TBz);
	box(boxl + boxw * 2, boxw, boxw);

	//B
	translate(0, 0, -2 * TBz);
	box(boxl + boxw * 2, boxw, boxw);

	//L
	translate(LRx, 0, TBz);
	box(boxw, boxw, boxl);

	//R
	translate(-2 * LRx, 0, 0);
	box(boxw, boxw, boxl);

	translate(LRx, 0, 0);

}

function emblem(){

	for(p of points){

		//edge points
		xpos = (baseProportion/2);
		zpos = (baseProportion/2);
		adjust = (baseProportion/2) - (baseProportion/c);
		zshift = adjust + wallThickness;
		xshift = adjust + wallThickness;

		spikeHeight = wallThickness/2;

		for(let edot = 0; edot < 3; edot++){

			//vertical top
			beginShape();
			vertex(p.x, wallThickness/2, p.z);
			vertex(xpos, wallThickness/2, adjust);
			vertex(xpos, wallThickness/2, xshift);
			vertex(p.x, wallThickness/2, p.z + spikeHeight/4);
			endShape();

			beginShape();
			vertex(p.x, -wallThickness/2, p.z,);
			vertex(xpos, -wallThickness/2, xshift);
			vertex(xpos, -wallThickness/2, adjust);
			vertex(p.x, -wallThickness/2, p.z + spikeHeight/4);
			endShape(CLOSE);

			//vertical bottom
			beginShape();
			vertex(p.x, wallThickness/2, p.z);
			vertex(xpos, wallThickness/2, -adjust);
			vertex(xpos, wallThickness/2, -xshift);
			vertex(p.x, wallThickness/2, p.z - spikeHeight/4);
			endShape(CLOSE);

			beginShape();
			vertex(p.x, -wallThickness/2, p.z);
			vertex(xpos, -wallThickness/2, -xshift);
			vertex(xpos, -wallThickness/2, -adjust);
			vertex(p.x, -wallThickness/2, p.z - spikeHeight/4);
			endShape(CLOSE);

			//horizontal left
			beginShape();
			vertex(p.x, wallThickness/2, p.z);
			vertex(adjust, wallThickness/2, zpos);
			vertex(zshift, wallThickness/2, zpos);
			vertex(p.x + spikeHeight/4, wallThickness/2, p.z);
			endShape(CLOSE);

			beginShape();
			vertex(p.x, -wallThickness/2, p.z);
			vertex(adjust, -wallThickness/2, zpos);
			vertex(zshift, -wallThickness/2, zpos);
			vertex(p.x + spikeHeight/4, -wallThickness/2, p.z);
			endShape(CLOSE);

			//horizontal right
			beginShape();
			vertex(p.x, wallThickness/2, p.z);
			vertex(-adjust, wallThickness/2, zpos);
			vertex(-zshift, wallThickness/2, zpos);
			vertex(p.x - spikeHeight/4, wallThickness/2, p.z);
			endShape(CLOSE);

			beginShape();
			vertex(p.x, -wallThickness/2, p.z);
			vertex(-adjust, -wallThickness/2, zpos);
			vertex(-zshift, -wallThickness/2, zpos);
			vertex(p.x - spikeHeight/4, -wallThickness/2, p.z);
			endShape(CLOSE);

			if(c > 3){

				xpos = xpos * -1;
				zpos = zpos * -1;
			}

		}
	}

}

function emblemPoints(){

	for(let d = 0; d < name.length; d++){

		let dx = random(-v, v);
		let dz = random(-v, v);

		pair = {

			x: (baseProportion/10) * dx,
			z: (baseProportion/10) * dz

		}

		points.push(pair);

	}

}


function info(){

	v = 0;
	c = 0;

	for(let i = 0; i < name.length; i++){

		for(av of allv){

			if(name.charAt(i) === av){

				v ++;

				dots.push(i);

			}

		}

		for(ac of allc){

			if(name.charAt(i) === ac){

				c ++;

				dots.push(i);

			}

		}

	}

}

function newName(){
	// background(255);

	wallThickness = 28;
	baseProportion = width - wallThickness;

	name = textboxn.value();

	console.log("name:", name);

	info();

	emblemPoints();

	border();

	emblem();

}