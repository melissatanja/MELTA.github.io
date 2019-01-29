import unlekker.modelbuilder.*;

UGeometry model;

let textboxn;
let allv = ['a', 'e', 'i', 'o', 'u', 'y']; //all vowels
let allc = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']; //all consonants
let name;
let v;
let c;
let dots = []; // holds a number for each character in the name
let points = []; // holds a coordinate for each point placed around the origin
let wd;
let hd;
let pair;

let faces = [];
let positions = [];

let baseProportion;
let wallThickness;

function setup(){

	createP('your name (lowercase)');

	textboxn = createInput();

	textboxn.changed(newName);

	createP();
	
	createCanvas(500, 500, WEBGL);

}

// function draw(){

// 	name = textboxn.value();

// 	// orbitControl();

// 	rotateX(radians(90));

// 	info();

// 	push();

// 	strokeWeight(0.5);
// 	stroke('black'); // x

// 	line(500, 0, 0, -500, 0, 0);


// 	stroke('red'); // y

// 	line(0, 500, 0, 0, -500, 0);

// 	stroke('blue'); // z

// 	line(0, 0, 500, 0, 0, -500);

// 	pop();

// }

	// // label a refers to corner of quadrant 1
	// //inside corners
	// UVec3 A = new UVec3(width/2, 0, -height/2);
	// UVec3 B = new UVec3(-width/2, 0, -height/2);
	// UVec3 C = new UVec3(-width/2, 0, height/2);
	// UVec3 D = new UVec3(width/2, 0, height/2);

	// //outside corners
	// UVec3 AA = new UVec3(width/2 + wallThickness, 0, -height/2 - wallThickness);
	// UVec3 BB = new UVec3(-width/2 - wallThickness, 0, -height/2 - wallThickness);
	// UVec3 CC = new UVec3(-width/2 - wallThickness, 0, height/2 + wallThinkness);
	// UVec3 DD = new UVec3(width/2 + wallThickness, 0, height/2 + wallThickness);

	// // bottom corners
	// translate(0, wallThickness, 0);

	// UVec3 a = new UVec3(width/2, 0, -height/2);
	// UVec3 b = new UVec3(-width/2, 0, -height/2);
	// UVec3 c = new UVec3(-width/2, 0, height/2);
	// UVec3 d = new UVec3(width/2, 0, height/2);

	// //outside corners
	// UVec3 aa = new UVec3(width/2 + wallThickness, 0, -height/2 - wallThickness);
	// UVec3 bb = new UVec3(-width/2 - wallThickness, 0, -height/2 - wallThickness);
	// UVec3 cc = new UVec3(-width/2 - wallThickness, 0, height/2 + wallThinkness);
	// UVec3 dd = new UVec3(width/2 + wallThickness, 0, height/2 + wallThickness);

	// UVec3 faces[] = {{A, B, AA, BB},
	// 					{A, B, a, b},
	// 					{aa, bb, a, b}, 
	// 					{aa, bb, AA, BB}, 
	// 					{B, C, BB, CC}, 
	// 					{B, C, b, c}, 
	// 					{bb, cc, b, c}, 
	// 					{bb, cc, BB, CC}, 
	// 					{C, D, CC, DD},
	// 					{C, D, c, d},
	// 					{cc, dd, c, d},
	// 					{cc, dd, CC, DD}};

function drawBorder() {

	boxy = wallThickness/2;

	TBx = 0;
	TBz = (baseProportion/2 + wallThickness/2);

	LRx = (baseProportion/2 + wallThickness/2);
	LRz = 0;

	boxl = baseProportion;
	boxw = wallThickness;

	UGeometry[] borderRects = {
		UPrimitive.rect(boxl + boxw * 2, boxw, boxw),
		UPrimitive.rect(boxl + boxw * 2, boxw, boxw),
		UPrimitive.rect(boxw, boxw, boxl),
		UPrimitive.rect(boxw, boxw, boxl)
	};

	UVec3 positions[] = {
		new UVec3(0, boxy, TBz),
		new UVec3(0, 0, -2 * TBz),
		new UVec3(LRx, 0, TBz),
		new UVec3(-2 * LRx, 0, 0)
	};
	
	translate(LRx, 0, 0);

	model.beginShape();
	for(int i = 0; i < faces.length; i++){

		model.addFace(faces[i]);

	}

	model.endShape()


	for(let d = 0; d < name.length; d++){

		let dx = random(-v, v);
		let dz = random(-v, v);

		pair = {

			x: (width/10) * floor(dx),
			z: (height/10) * floor(dz)

		}

		points.push(pair);

	}

	for(p of points){

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
			let o = (p.x, 0, p.z);
			let edge1 = (xpos, wallThickness/2, adjust);
			let edge2 = (xpos, wallThickness/2, xshift);
			let edge3 = (xpos, -wallThickness/2, xshift);
			let edge4 = (xpos, -wallThickness/2, adjust);

			let edge5 = (xpos, wallThickness/2, -adjust);
			let edge6 = (xpos, wallThickness/2, -xshift);
			let edge7 = (xpos, -wallThickness/2, -xshift);
			let edge8 = (xpos, -wallThickness/2, -adjust);
	
			let edge9 = (adjust, wallThickness/2, zpos);
			let edge10 = (zshift, wallThickness/2, zpos);
			let edge11 = (adjust, -wallThickness/2, zpos);
			let edge12 = (zshift, -wallThickness/2, zpos);

			let edge13 = (-adjust, wallThickness/2, zpos);
			let edge14 = (-zshift, wallThickness/2, zpos);
			let edge15 = (-adjust, -wallThickness/2, zpos);
			let edge16 = (-zshift, -wallThickness/2, zpos);

			if(c > 3){

				xpos = xpos * -1;
				zpos = zpos * -1;
			}
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
	wallThickness = 15;
	baseProportion = 300 - wallThickness;

	name = textboxn.value();

	build();

}

function build(){

	model = new UGeometry();

	info();

	border();

	emblem();

}