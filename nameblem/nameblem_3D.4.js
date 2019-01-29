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

// let mx;
// let my;

let faces = [];

let nameblem = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let Border = new THREE.Object3D();
let Emblem = new THREE.Object3D();
let renderer = new THREE.WebGLRenderer({alpha: true});
// renderer.setSize(500, 500);
// document.body.appendChild(renderer.domElement);
let exporter = new THREE.STLExporter();
// let exp = exporter.parse(nameblem);
// let file = new Blob([exp], {type: 'application/vnd.ms-pki.stl'});

function setup(){

	noCanvas();

	createP('your name (lowercase)');

	textboxn = createInput();

	createP();
	
	// canvas = createCanvas(500, 500, WEBGL);

	renderer.setSize(56, 56);
	document.body.appendChild(renderer.domElement);

	createP();

	objButton = createButton("save as .STL");

	// objButton.position();

	objButton.mousePressed(stl);

	textboxn.changed(newName);

	// animate();

	// console.log(animate);

}

function draw(){

	// noCanvas();

	// background(255);

	// mx = map(mouseX, 0, width, 0, 255);
	// my = map(mouseY, 0, height, 0, 255);

	// animate();

	// console.log(animate);

	// orbitControl();

	// rotateX(PI/2);

	// emblem();

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

}

function animate(){

	requestAnimationFrame(animate);

	// console.log('render functional');

	border();

	// console.log(Border);

	nameblem.add(Border);

	// console.log(nameblem);

	emblem();

	nameblem.add(Emblem);

	renderer.render(nameblem, camera);

}

function jpg(){

	saveCanvas(canvas, textboxn.value(), 'jpg')

}

function stl(){

	let exp = exporter.parse(nameblem);
	let file = new Blob([exp], {type: 'model/stl'});
	let link = document.createElement('a');

	link.style.display = 'none';
	document.body.appendChild(link);
	link.href = URL.createObjectURL(file);
	link.download = 'nameblem.stl';
	link.click();

}

// function keyPressed(){

// 	if(keyCode === DELETE || keyCode === BACKSPACE){
// 		points.length = 0;
// 		canvas.background(255);
// 	}

// }

function mouseClicked(){

	if(mouseX > 0 && mouseX < width){

		if(mouseY > 0 && mouseY < height){

			saveCanvas(canvas, textboxn.value(), 'jpg')

		}
	}

}

function border(){

	// strokeWeight(1);
	// stroke(0);

	// fill(mx, my, (mx+my)/2);
	// noFill();

	boxy =0;

	TBx = 0;
	TBz = (baseProportion/2) + (wallThickness/2);

	LRx = (baseProportion/2) + (wallThickness/2);
	LRz = 0;

	boxl = baseProportion;
	boxw = wallThickness;

	// let Border = new THREE.Object3D;

	let t = new THREE.BoxGeometry(boxl + boxw *2, boxw, boxw);
	let tborder = new THREE.Mesh(t);
	tborder.position.set(0, boxy, TBz);
	// tborder.rotateX(Math.PI/2);

	let b = new THREE.BoxGeometry(boxl + boxw *2, boxw, boxw);
	let bborder = new THREE.Mesh(b);
	bborder.position.set(0, boxy, -TBz);
	// bborder.rotateX(Math.PI/2);

	let l = new THREE.BoxGeometry(boxw, boxw, boxl);
	let lborder = new THREE.Mesh(l);
	lborder.position.set(LRx, boxy, 0);
	// lborder.rotateX(Math.PI/2);

	let r = new THREE.BoxGeometry(boxw, boxw, boxl);
	let rborder = new THREE.Mesh(r);
	rborder.position.set(-LRx, boxy, 0);
	// rborder.rotateX(Math.PI/2);

	// let Border = new THREE.Group();

	Border.add(tborder);
	Border.add(bborder);
	Border.add(lborder);
	Border.add(rborder);

	// Border.rotateX(Math.PI/2);

	// //T
	// translate(0, boxy, TBz);
	// box(boxl + boxw * 2, boxw, boxw);

	// //B
	// translate(0, 0, -2 * TBz);
	// box(boxl + boxw * 2, boxw, boxw);

	// //L
	// translate(LRx, 0, TBz);
	// box(boxw, boxw, boxl);

	// //R
	// translate(-2 * LRx, 0, 0);
	// box(boxw, boxw, boxl);

	// translate(LRx, 0, 0);

}

function emblem(){

	// console.log("emblem functional");

	// let Emblem = new THREE.Group();

	for(p of points){

		//edge points
		xpos = (baseProportion/2) + wallThickness/2;
		zpos = (baseProportion/2) + wallThickness/2;
		adjust = (baseProportion/2) - (baseProportion/c);
		xshift = adjust + wallThickness;
		zshift = adjust + wallThickness;

		spikeHeight = wallThickness * 1.5;

		// push();

		// noStroke();

		// translate(p.x + spikeHeight/4, 0, p.z);
		// box(spikeHeight);
		// translate(-p.x + spikeHeight/4, 0, -p.z);

		// pop();



		for(let edot = 0; edot < 3; edot++){

			// console.log("for loop functional");

			//vertical top
			let spike1 = new THREE.Geometry();

			//top face
			spike1.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(zpos, wallThickness/2, adjust));
			spike1.vertices.push(new THREE.Vector3(zpos, wallThickness/2, zshift));

			let face1 = new THREE.Face3(0, 1, 2);

			spike1.vertices.push(new THREE.Vector3(zpos, wallThickness/2, zshift));
			spike1.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, wallThickness/2, p.z + spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));

			let face2 = new THREE.Face3(3, 4, 5);

			//bottom face
			spike1.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, -wallThickness/2, p.z - spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, adjust));
			spike1.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, zshift));

			let face3 = new THREE.Face3(6, 7, 8);

			spike1.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, zshift));
			spike1.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, -wallThickness/2, p.z + spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, -wallThickness/2, p.z - spikeHeight/4));
			
			let face4 = new THREE.Face3(9, 10, 11);

			//left face
			spike1.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(zpos, wallThickness/2, adjust));
			spike1.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, adjust));

			let face5 = new THREE.Face3(12, 13, 14);

			spike1.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, adjust));
			spike1.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, -wallThickness/2, p.z - spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));

			let face6 = new THREE.Face3(15, 16, 17);

			//right face
			spike1.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, wallThickness/2, p.z + spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(zpos, wallThickness/2, zshift));
			spike1.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, zshift));

			let face7 = new THREE.Face3(18, 19, 20);

			spike1.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, zshift));
			spike1.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, -wallThickness/2, p.z + spikeHeight/4));
			spike1.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, wallThickness/2, p.z + spikeHeight/4));

			let face8 = new THREE.Face3(21, 22, 23);

			spike1.faces.push(face1);
			spike1.faces.push(face2);
			spike1.faces.push(face3);
			spike1.faces.push(face4);
			spike1.faces.push(face5);
			spike1.faces.push(face6);
			spike1.faces.push(face7);
			spike1.faces.push(face8);

			spike1.computeFaceNormals();
			spike1.computeVertexNormals();

			let spike_1 = new THREE.Mesh(spike1);

			Emblem.add(spike_1);

			//vertical bottom
			let spike2 = new THREE.Geometry();

			//vertical top
			//top face
			spike2.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(zpos, wallThickness/2, -adjust));
			spike2.vertices.push(new THREE.Vector3(zpos, wallThickness/2, -zshift));

			let face9 = new THREE.Face3(0, 1, 2);

			spike2.vertices.push(new THREE.Vector3(zpos, wallThickness/2, -zshift));
			spike2.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, wallThickness/2, p.z + spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));

			let face11 = new THREE.Face3(3, 4, 5);

			//bottom face
			spike2.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, -wallThickness/2, p.z - spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, -adjust));
			spike2.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, -zshift));

			let face12 = new THREE.Face3(6, 7, 8);

			spike2.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, -zshift));
			spike2.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, -wallThickness/2, p.z + spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, -wallThickness/2, p.z - spikeHeight/4));
			
			let face13 = new THREE.Face3(9, 10, 11);

			//left face
			spike2.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(zpos, wallThickness/2, -adjust));
			spike2.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, -adjust));

			let face14 = new THREE.Face3(12, 13, 14);

			spike2.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, -adjust));
			spike2.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, -wallThickness/2, p.z - spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(p.x - spikeHeight/2, wallThickness/2, p.z - spikeHeight/4));

			let face15 = new THREE.Face3(15, 16, 17);

			//right face
			spike2.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, wallThickness/2, p.z + spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(zpos, wallThickness/2, -zshift));
			spike2.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, -zshift));

			let face16 = new THREE.Face3(18, 19, 20);

			spike2.vertices.push(new THREE.Vector3(zpos, -wallThickness/2, -zshift));
			spike2.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, -wallThickness/2, p.z + spikeHeight/4));
			spike2.vertices.push(new THREE.Vector3(p.x + spikeHeight/2, wallThickness/2, p.z + spikeHeight/4));

			let face17 = new THREE.Face3(21, 22, 23);

			spike2.faces.push(face9);
			spike2.faces.push(face11);
			spike2.faces.push(face12);
			spike2.faces.push(face13);
			spike2.faces.push(face14);
			spike2.faces.push(face15);
			spike2.faces.push(face16);
			spike2.faces.push(face17);

			spike2.computeFaceNormals();
			spike2.computeVertexNormals();

			let spike_2 = new THREE.Mesh(spike2);

			Emblem.add(spike_2);

			//horizontal left
			let spike3 = new THREE.Geometry();

			//top face
			spike3.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z  - spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(adjust, wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(zshift, wallThickness/2, zpos));

			let face18 = new THREE.Face3(0, 1, 2);

			spike3.vertices.push(new THREE.Vector3(zshift, wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, wallThickness/2, p.z + spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z - spikeHeight/2));

			let face19 = new THREE.Face3(3, 4, 5);

			//bottom face
			spike3.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, -wallThickness/2, p.z - spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(adjust, -wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(zshift, -wallThickness/2, zpos));

			let face20 = new THREE.Face3(6, 7, 8);

			spike3.vertices.push(new THREE.Vector3(zshift, -wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, -wallThickness/2, p.z + spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, -wallThickness/2, p.z - spikeHeight/2));
			
			let face21 = new THREE.Face3(9, 10, 11);

			//left face
			spike3.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z - spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(adjust, wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(adjust, -wallThickness/2, zpos));

			let face22 = new THREE.Face3(12, 13, 14);

			spike3.vertices.push(new THREE.Vector3(adjust, -wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, -wallThickness/2, p.z - spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z - spikeHeight/2));

			let face23 = new THREE.Face3(15, 16, 17);

			//right face
			spike3.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, wallThickness/2, p.z + spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(zshift, wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(zshift, -wallThickness/2, zpos));

			let face24 = new THREE.Face3(18, 19, 20);

			spike3.vertices.push(new THREE.Vector3(zshift, -wallThickness/2, zpos));
			spike3.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, -wallThickness/2, p.z + spikeHeight/2));
			spike3.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, wallThickness/2, p.z + spikeHeight/2));

			let face25 = new THREE.Face3(21, 22, 23);

			spike3.faces.push(face18);
			spike3.faces.push(face19);
			spike3.faces.push(face20);
			spike3.faces.push(face21);
			spike3.faces.push(face22);
			spike3.faces.push(face23);
			spike3.faces.push(face24);
			spike3.faces.push(face25);

			spike3.computeFaceNormals();
			spike3.computeVertexNormals();

			let spike_3 = new THREE.Mesh(spike3);

			Emblem.add(spike_3);

			//horizontal right
			let spike4 = new THREE.Geometry();

			//top face
			spike4.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z - spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(-adjust, wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(-zshift, wallThickness/2, zpos));

			let face26 = new THREE.Face3(0, 1, 2);

			spike4.vertices.push(new THREE.Vector3(-zshift, wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, wallThickness/2, p.z + spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z - spikeHeight/2));

			let face27 = new THREE.Face3(3, 4, 5);

			//bottom face
			spike4.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, -wallThickness/2, p.z - spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(-adjust, -wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(-zshift, -wallThickness/2, zpos));

			let face28 = new THREE.Face3(6, 7, 8);

			spike4.vertices.push(new THREE.Vector3(-zshift, -wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, -wallThickness/2, p.z + spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, -wallThickness/2, p.z - spikeHeight/2));
			
			let face29 = new THREE.Face3(9, 10, 11);

			//left face
			spike4.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z - spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(-adjust, wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(-adjust, -wallThickness/2, zpos));

			let face30 = new THREE.Face3(12, 13, 14);

			spike4.vertices.push(new THREE.Vector3(-adjust, -wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, -wallThickness/2, p.z - spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(p.x - spikeHeight/4, wallThickness/2, p.z - spikeHeight/2));

			let face31 = new THREE.Face3(15, 16, 17);

			//right face
			spike4.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, wallThickness/2, p.z + spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(-zshift, wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(-zshift, -wallThickness/2, zpos));

			let face32 = new THREE.Face3(18, 19, 20);

			spike4.vertices.push(new THREE.Vector3(-zshift, -wallThickness/2, zpos));
			spike4.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, -wallThickness/2, p.z + spikeHeight/2));
			spike4.vertices.push(new THREE.Vector3(p.x + spikeHeight/4, wallThickness/2, p.z + spikeHeight/2));

			let face33 = new THREE.Face3(21, 22, 23);

			spike4.faces.push(face26);
			spike4.faces.push(face27);
			spike4.faces.push(face28);
			spike4.faces.push(face29);
			spike4.faces.push(face30);
			spike4.faces.push(face31);
			spike4.faces.push(face32);
			spike4.faces.push(face33);

			spike4.computeFaceNormals();
			spike4.computeVertexNormals();

			let spike_4 = new THREE.Mesh(spike4);

			Emblem.add(spike_4);

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

	wallThickness = 5;
	baseProportion = width -0;

	name = textboxn.value();

	console.log("name:", name);

	// info();

	// console.log("vowels:", v);
	// console.log("consonants:", c)

	// border();

	// emblemPoints();

	border();

	console.log("Border:", Border);

	nameblem.add(Border);

	console.log("Nameblem:", nameblem);

	info();
	emblemPoints();

	emblem();

	// console.log();

	console.log("Emblem:", Emblem);

	nameblem.add(Emblem);

	console.log("Nameblem:", nameblem);

	animate();

	// console.log(animate);
}