let d = function(design){

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

let space;

// let nameblem = new THREE.Object3D();
// let exporter = new THREE.STLExporter();
// let exp = exporter.parse(canvas);
// let file = new Blob([exp], {type: 'application/vnd.ms-pki.stl'});

design.setup = function(){

	// design.createElement('h1', 'nameblem');

	design.createP();

	design.createP('your name (lowercase)');

	textboxn = design.createInput();

	design.createP();

	// space = document.querySelector("#glCanvas");

	// canvas1 = document.getElementById('canvas');

	// canvas2 = document.getElementById('inverse');

	// canvas = canvas1.getContext('webgl');

	// inverse = canvas2.getContext('webgl');
	
	canvas = design.createCanvas(500, 500, design.WEBGL);
	// canvas.position(windowWidth/2, windowHeight/2);
	// inverse = createCanvas(500, 500, WEBGL);
	// inverse.position(canvas.position);

	// inverse = createCanvas(500, 500, WEBGL);

	design.createP();

	textboxn.changed(design.newName);

}

design.draw = function(){

	// noCanvas();

	mx = design.map(design.mouseX, 0, design.width, 0, 255);
	my = design.map(design.mouseY, 0, design.height, 0, 255);

	// orbitControl();

	design.rotateX(design.PI/2);

	design.border();

	design.emblem();

}

// design.negative = function(){

// 	// inverse = createCanvas(500, 500, WEBGL);

// 	// rotateX(PI/2);

// 	// inverse.getContext('WEBGL');

// 	wallThickness = 15;
// 	baseProportion = 300 - wallThickness;

// 	boxy = wallThickness/2;

// 	TBx = 0;
// 	TBz = (baseProportion/2 + wallThickness/2);

// 	LRx = (baseProportion/2 + wallThickness/2);
// 	LRz = 0;

// 	boxl = baseProportion;
// 	boxw = wallThickness;

// 	// globalCompositeOperation = 'source-out';

// 	design.translate(0, boxw/2, 0);
// 	design.fill(0);
// 	design.box(boxl + boxw * 2, boxw, boxl + boxw * 2);

// }

design.jpg = function(){

	design.saveCanvas(canvas, textboxn.value(), 'jpg')

}

design.keyPressed = function(){

	if(keyCode === DELETE || keyCode === BACKSPACE){
		points.length = 0;
		design.canvas.background(255);
	}

}

design.mouseClicked = function(){

	if(mouseX > 0 && mouseX < width){

		if(mouseY > 0 && mouseY < height){

			design.saveCanvas(canvas, textboxn.value(), 'jpg')

		}
	}

}

design.border = function(){

	design.strokeWeight(1);
	design.stroke(0);

	design.fill(mx, my, (mx+my)/2);

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
	design.translate(0, boxy, TBz);
	design.box(boxl + boxw * 2, boxw, boxw);

	//B
	design.translate(0, 0, -2 * TBz);
	design.box(boxl + boxw * 2, boxw, boxw);

	//L
	design.translate(LRx, 0, TBz);
	design.box(boxw, boxw, boxl);

	//R
	design.translate(-2 * LRx, 0, 0);
	design.box(boxw, boxw, boxl);

	design.translate(LRx, 0, 0);

}

design.emblem = function(){

	for(p of points){

		//edge points
		xpos = (baseProportion/2);
		zpos = (baseProportion/2);
		adjust = (baseProportion/2) - (baseProportion/c);
		zshift = adjust + wallThickness;
		xshift = adjust + wallThickness;

		design.push();

		design.noStroke();

		design.translate(p.x, 0, p.z);
		design.box(wallThickness/2);
		design.translate(-p.x, 0, -p.z);

		design.pop();

		for(let edot = 0; edot < 3; edot++){


			// fill(r, g, b, 100);
			// noFill();

			design.beginShape();
			design.vertex(p.x, 0, p.z);
			design.vertex(xpos, wallThickness/2, adjust);
			design.vertex(xpos, wallThickness/2, xshift);
			design.vertex(xpos, -wallThickness/2, xshift);
			design.vertex(xpos, -wallThickness/2, adjust);
			design.endShape(CLOSE);

			design.beginShape();
			design.vertex(p.x, 0, p.z);
			design.vertex(xpos, wallThickness/2, -adjust);
			design.vertex(xpos, wallThickness/2, -xshift);
			design.vertex(xpos, -wallThickness/2, -xshift);
			design.vertex(xpos, -wallThickness/2, -adjust);
			design.endShape(CLOSE);

			design.beginShape();
			design.vertex(p.x, 0, p.z);
			design.vertex(adjust, wallThickness/2, zpos);
			design.vertex(zshift, wallThickness/2, zpos);
			design.vertex(adjust, -wallThickness/2, zpos);
			design.vertex(zshift, -wallThickness/2, zpos);
			design.endShape(CLOSE);

			design.beginShape();
			design.vertex(p.x, 0, p.z);
			design.vertex(-adjust, wallThickness/2, zpos);
			design.vertex(-zshift, wallThickness/2, zpos);
			design.vertex(-adjust, -wallThickness/2, zpos);
			design.vertex(-zshift, -wallThickness/2, zpos);
			design.endShape(CLOSE);

			if(c > 3){

				xpos = xpos * -1;
				zpos = zpos * -1;
			}

		}
	}

}

design.emblemPoints = function(){

	for(let d = 0; d < name.length; d++){

		let dx = design.random(-v, v);
		let dz = design.random(-v, v);

		pair = {

			x: (baseProportion/10) * dx,
			z: (baseProportion/10) * dz

		}

		points.push(pair);

	}

}


design.info = function(){

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

design.newName = function(){
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

	let sketch2 = new p5(i, document.getElementById('p5sketch2'));
}

};

let i = function(inverse){

let canvas;
let textboxn;
// let 

let nameblem = new THREE.Object3D();
let exporter = new THREE.STLExporter();
let exp = exporter.parse(canvas);
let file = new Blob([exp], {type: 'application/vnd.ms-pki.stl'});

inverse.setup = function(){

	canvas = inverse.createCanvas(500, 500, inverse.WEBGL);

	stlButton = inverse.createButton("save as .STL");

	stlButton.mousePressed(inverse.stl);

	// textboxn.changed(inverse.newName);

}

inverse.draw = function(){

	inverse.rotateX(inverse.PI/2);

	inverse.globalCompositeOperation = 'source-out';

	wallThickness = 15;
	baseProportion = 300 - wallThickness;

	boxy = wallThickness/2;

	TBx = 0;
	TBz = (baseProportion/2 + wallThickness/2);

	LRx = (baseProportion/2 + wallThickness/2);
	LRz = 0;

	boxl = baseProportion;
	boxw = wallThickness;

	// globalCompositeOperation = 'source-out';

	inverse.translate(0, boxw/2, 0);
	inverse.fill(0);
	inverse.box(boxl + boxw * 2, boxw, boxl + boxw * 2);

}

inverse.stl = function(){

	let link = document.createElement('a');
	link.style.display = 'none';
	document.body.appendChild(link);
	link.href = URL.createObjectURL(file);
	link.download = textboxn.value(), '.stl';
	link.click();

}

// inverse.newName = function(){
// 	wallThickness = 15;
// 	baseProportion = 300 - wallThickness;

// 	boxy = wallThickness/2;

// 	TBx = 0;
// 	TBz = (baseProportion/2 + wallThickness/2);

// 	LRx = (baseProportion/2 + wallThickness/2);
// 	LRz = 0;

// 	boxl = baseProportion;
// 	boxw = wallThickness;

// 	// globalCompositeOperation = 'source-out';

// 	design.translate(0, boxw/2, 0);
// 	design.fill(0);
// 	design.box(boxl + boxw * 2, boxw, boxl + boxw * 2);
// }

};

let sketch1 = new p5(d, document.getElementById('p5sketch1'));
let sketch2 = new p5(i, document.getElementById('p5sketch2'));