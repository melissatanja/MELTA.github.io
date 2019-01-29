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

let img;

// let jpgButton;

// let nameblem = new THREE.Object3D();
let exporter = new THREE.STLExporter();
let exp = exporter.parse(canvas);
let file = new Blob([exp], {type: 'application/vnd.ms-pki.stl'});

function setup(){

	createP('your name (lowercase)');

	textboxn = createInput();

	createP();

	// space = document.querySelector("#glCanvas");

	// canvas1 = document.getElementById('canvas');

	// canvas2 = document.getElementById('inverse');

	// canvas = canvas1.getContext('webgl');

	// inverse = canvas2.getContext('webgl');

	img = createImage(500, 500);

	img.loadPixels();
	
	canvas = createCanvas(500, 500, WEBGL);
	// inverse = createCanvas(500, 500, WEBGL);

	// canvas.position(windowWidth/2, windowHeight/2);
	// inverse.position(canvas.position);

	// inverse = createCanvas(500, 500, WEBGL);

	createP();

	objButton = createButton("save as .STL");

	// jpgButton = createButton("save as .JPG");

	// jpgButton.mousePressed(jpg);

	objButton.mousePressed(stl);

	textboxn.changed(newName);

}

function draw(){

	// noCanvas();

	background(255);

	mx = map(mouseX, 0, width, 0, 255);
	my = map(mouseY, 0, height, 0, 255);

	orbitControl();

	rotateX(PI/2);

	border();

	emblem();

	// push();

	// strokeWeight(0.5);
	// stroke('black'); // x

	// line(500, 0, 0, -500, 0, 0);


	// stroke('red'); // y

	// line(0, 500, 0, 0, -500, 0);

	// stroke('blue'); // z

	// line(0, 0, 500, 0, 0, -500);

	// pop();

	// if(saveOBJ){

	// 	endRecord();

	// 	saveOBJ = false;

	// }

	// nameblem.add(border);
	// nameblem.add(emblem);

	// negative();

}

// function ref(){

// 	img = loadImage('../../../',textboxn.value(),'.jpg');

// 	console.log(loadImage);

// }

function negative(){

	// inverse = createCanvas(500, 500, WEBGL);

	// rotateX(PI/2);

	// inverse.getContext('WEBGL');

	img.updatePixels();

	inverse = createCanvas(500, 500, WEBGL);

	wallThickness = 15;
	baseProportion = 300 - wallThickness;

	boxy = wallThickness/2;

	TBx = 0;
	TBz = (baseProportion/2 + wallThickness/2);

	LRx = (baseProportion/2 + wallThickness/2);
	LRz = 0;

	boxl = baseProportion;
	boxw = wallThickness;

	image(img, 0, 0, 250, 250);

	inverse.globalCompositeOperation = 'source-out';

	// orbitControl();

	// rotateX(PI/2);
	// translate(0, 0, 0);
	fill(0);
	box(boxl + boxw * 2, boxw, boxl + boxw * 2);
	// inverse.restore();

}

function jpg(){

	saveCanvas(canvas, textboxn.value(), 'jpg')

}

function stl(){

	let link = document.createElement('a');
	link.style.display = 'none';
	document.body.appendChild(link);
	link.href = URL.createObjectURL(file);
	link.download = textboxn.value(), '.stl';
	link.click();

}

function keyPressed(){

	if(keyCode === DELETE || keyCode === BACKSPACE){
		points.length = 0;
		canvas.background(255);
	}

}

function mouseClicked(){

	if(mouseX > 0 && mouseX < width){

		if(mouseY > 0 && mouseY < height){

			saveCanvas(canvas, textboxn.value(), 'jpg')

			ref();

		}
	}

}

function border(){

	strokeWeight(1);
	stroke(0);

	fill(mx, my, (mx+my)/2);
	// noFill();

	boxy = wallThickness/2;

	TBx = 0;
	TBz = (baseProportion/2 + wallThickness/2);

	LRx = (baseProportion/2 + wallThickness/2);
	LRz = 0;

	boxl = baseProportion;
	boxw = wallThickness;

	// let tborder = new THREE.BoxGeometry(boxl + boxw *2, boxw, boxw);
	// tborder.position = (0, boxy, TBz);
	// let bborder = new THREE.BoxGeometry(boxl + boxw *2, boxw, boxw);
	// bborder.position = (0, boxy, -TBz);
	// let lborder = new THREE.BoxGeometry(boxw, boxw, boxl);
	// lborder.position = (LRx, boxy, 0);
	// let rborder = new THREE.BoxGeometry(boxw, boxw, boxl);
	// rborder.position = (-LRx, boxy, 0);

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

		push();

		noStroke();

		translate(p.x, 0, p.z);
		box(wallThickness/2);
		translate(-p.x, 0, -p.z);

		pop();

		for(let edot = 0; edot < 3; edot++){


			// fill(r, g, b, 100);
			// noFill();

			beginShape();
			vertex(p.x, 0, p.z);
			vertex(xpos, wallThickness/2, adjust);
			vertex(xpos, wallThickness/2, xshift);
			vertex(xpos, -wallThickness/2, xshift);
			vertex(xpos, -wallThickness/2, adjust);
			endShape(CLOSE);

			beginShape();
			vertex(p.x, 0, p.z);
			vertex(xpos, wallThickness/2, -adjust);
			vertex(xpos, wallThickness/2, -xshift);
			vertex(xpos, -wallThickness/2, -xshift);
			vertex(xpos, -wallThickness/2, -adjust);
			endShape(CLOSE);

			beginShape();
			vertex(p.x, 0, p.z);
			vertex(adjust, wallThickness/2, zpos);
			vertex(zshift, wallThickness/2, zpos);
			vertex(adjust, -wallThickness/2, zpos);
			vertex(zshift, -wallThickness/2, zpos);
			endShape(CLOSE);

			beginShape();
			vertex(p.x, 0, p.z);
			vertex(-adjust, wallThickness/2, zpos);
			vertex(-zshift, wallThickness/2, zpos);
			vertex(-adjust, -wallThickness/2, zpos);
			vertex(-zshift, -wallThickness/2, zpos);
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

	wallThickness = 15;
	baseProportion = 300 - wallThickness;

	name = textboxn.value();

	console.log("name:", name);

	info();

	// console.log("vowels:", v);
	// console.log("consonants:", c)

	// border();

	emblemPoints();

	// saveFrames(textboxn.value(), 'jpg', 1, 1, ref());

	negative();
}