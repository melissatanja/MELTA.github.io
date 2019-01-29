var textboxn;
var allv = ['a', 'e', 'i', 'o', 'u', 'y']; //all vowels
var allc = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']; //all consonants
var name;
var v;
var c;
var dots = []; // holds a number for each character in the name
var points = []; // holds a coordinate for each point placed around the origin
var pair;
var xpos;
var zpos;
var cols = [];

var canvas;

var saveJPG;

var xshift;
var zshift;
var adjust;

var baseProportion;
var wallThickness;

var boxl;
var boxw;
var boxy;
var TBx;
var TBz;
var LRx;
var LRz;

var mx;
var my;

var jpgButton;

var face;

// var color = new THREE.Color("rgb(255, 255, 255)");

var scene = new THREE.Scene();
// var renderer = new THREE.CanvasRenderer(canvas);
// var camera = new THREE.PerspectiveCamera(75, 500, 500, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true, alpha: true});
// var material = new THREE.MeshLambertMaterial({color: 0xFF0000});
var sceneElements = new THREE.Object3D;
var pattern = new THREE.Object3D;
var cameras = new THREE.Camera();

init();
// animate();

function init(){

	var cam = new THREE.OrthographicCamera(75, 500, 500, 0.1, 1000);

	cam.position.set(20, 20, 20);
	// camera.rotation.order('YXZ');
	cam.rotation.y = -Math.PI/4;
	cam.rotation.x = Math.atan(-1 / Math.sqrt(2));
	cameras.add(cam);
		// scene.add(cameras);

	var light = new THREE.AmbientLight( 0x404040 );
    // light.position.set(10, 0, 10);
    sceneElements.add(light);

	// textboxn = createInput();

	// textboxn.changed(newName);

	renderer.setSize(500, 500);
	// renderer.setClearColor("rgb(255, 255, 255)")
	// document.body.appendChild(renderer.domElement);

	// renderer.setSize(500, 500);
	// // renderer.setClearColor("rgb(255, 255, 255)")
	// document.body.appendChild(renderer.domElement);

    // renderer.setClearColor(0xff0000, 1);
}

function animate(){

		requestAnimationFrame(animate);

		createNameblem();

		cameras.lookAt(scene.position);

		// border();

		// emblemPoints();

		// emblem();

	document.body.appendChild(renderer.domElement);

		renderer.render(scene, cameras);
}

function setup(){

	createP('your name (lowercase)');

	textboxn = createInput();

	textboxn.changed(newName);

	createP();

	// renderer.setSize(500, 500);
	// renderer.setClearColor("rgb(255, 255, 255)")
	// document.body.appendChild(renderer.domElement);

    // renderer.setClearColor( 0xddddd, 1);
	
	// canvas = createCanvas(500, 500, WEBGL);
	noCanvas();

	// canvas = document.getElementById("EmblemCanvas")

	createP();

	// animate();

	// objButton = createButton("save as .OBJ");

	// jpgButton = createButton("save as .JPG");

	// jpgButton.mousePressed(jpg);

	// objButton.mousePressed(saveOBJ = true);

	// if(saveOBJ){

	// 	beginRecord("nervoussystem.obj.OBJEXPORT", textboxn.value(),".obj");

	// }

	// textboxn.changed(newName);

	// var exporter = new THREE.OBJExporter();

	// init();

// 	var animate = function(){

// 	requestAnimationFrame(animate);
// 	renderer.render(scene, camera);

// }

// animate();

}

function draw(){

	// animate();

	// mx = map(mouseX, 0, width, 0, 255);
	// my = map(mouseY, 0, height, 0, 255);

	// orbitControl();

	// rotateX(PI/2);

	// border();

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

function jpg(){

	saveCanvas(canvas, textboxn.value(), 'jpg')

}

function keyPressed(){

	if(keyCode === DELETE || keyCode === BACKSPACE){
		points.length = 0;
		// background(255);
	}

}

// function mouseClicked(){

// 	if(mouseX > 0 && mouseX < width){

// 		if(mouseY > 0 && mouseY < height){

// 			saveCanvas(canvas, textboxn.value(), 'jpg')

// 		}
// 	}

// }

// function border(){

function context(){

	//info
	v = 0;
	c = 0;

	for(var i = 0; i < name.length; i++){

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

	// emblemPoints

	for(var d = 0; d < name.length; d++){

		var dx = random(-v, v);
		var dz = random(-v, v);

		pair = {

			x: (baseProportion/10) * dx,
			z: (baseProportion/10) * dz

		}

		points.push(pair);

	}

}

function createNameblem(){

	//border
    var material = new THREE.MeshLambertMaterial({color: 0xFFFF99}); //yellow

	boxy = wallThickness/2;

	TBx = 0;
	TBz = (baseProportion/2 + wallThickness/2);

	LRx = (baseProportion/2 + wallThickness/2);
	LRz = 0;

	boxl = baseProportion;
	boxw = wallThickness;

	//T
	translate(0, boxy, TBz);
	var box = new THREE.BoxGeometry(boxl + boxw * 2, boxw, boxw);
	var border = new THREE.Mesh(box, material);
	sceneElements.add(border);

	//B
	translate(0, 0, -2 * TBz);
	var box = new THREE.BoxGeometry(boxl + boxw * 2, boxw, boxw);
	var border = new THREE.Mesh(box, material);
	sceneElements.add(border);

	//L
	translate(LRx, 0, TBz);
	var box = new THREE.BoxGeometry(boxw, boxw, boxl);
	var border = new THREE.Mesh(box, material);
	sceneElements.add(border);

	//R
	translate(-2 * LRx, 0, 0);
	var box = new THREE.BoxGeometry(boxw, boxw, boxl);
	var border = new THREE.Mesh(box, material);
	sceneElements.add(border);

	translate(LRx, 0, 0);

	//emblem

	var emblem = new THREE.Geometry();

	for(p of points){

		//edge points
		xpos = (baseProportion/2);
		zpos = (baseProportion/2);
		adjust = (baseProportion/2) - (baseProportion/c);
		zshift = adjust + wallThickness;
		xshift = adjust + wallThickness;

		// push();

		// noStroke();

		translate(p.x, 0, p.z);
		var joinBox = new THREE.BoxGeometry(wallThickness/2, wallThickness/2, wallThickness/2);
		var join = new THREE.Mesh(joinBox);
		pattern.add(join);
		translate(-p.x, 0, -p.z);

		// pop();

		for(var edot = 0; edot < 3; edot++){


			// fill(r, g, b, 100);
			// noFill();

			// beginShape();
			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(xpos, wallThickness/2, adjust));
			emblem.vertices.push(new THREE.Vector3(xpos, wallThickness/2, xshift));

			face = new THREE.Face3(0, 1, 2);
			emblem.faces.push(face);

			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(xpos, -wallThickness/2, xshift));
			emblem.vertices.push(new THREE.Vector3(xpos, -wallThickness/2, adjust));
			// endShape(CLOSE);

			face = new THREE.Face3(3, 4, 5);
			emblem.faces.push(face);

			// beginShape();
			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(xpos, wallThickness/2, -adjust));
			emblem.vertices.push(new THREE.Vector3(xpos, wallThickness/2, -xshift));

			face = new THREE.Face3(6, 7, 8);
			emblem.faces.push(face);

			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(xpos, -wallThickness/2, -xshift));
			emblem.vertices.push(new THREE.Vector3(xpos, -wallThickness/2, -adjust));
			// endShape(CLOSE);

			face = new THREE.Face3(9, 10, 11);
			emblem.faces.push(face);

			// beginShape();
			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(adjust, wallThickness/2, zpos));
			emblem.vertices.push(new THREE.Vector3(zshift, wallThickness/2, zpos));

			face = new THREE.Face3(12, 13, 14);
			emblem.faces.push(face);

			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(adjust, -wallThickness/2, zpos));
			emblem.vertices.push(new THREE.Vector3(zshift, -wallThickness/2, zpos));
			// endShape(CLOSE);

			face = new THREE.Face3(15, 16, 17);
			emblem.faces.push(face);

			// beginShape();
			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(-adjust, wallThickness/2, zpos));
			emblem.vertices.push(new THREE.Vector3(-zshift, wallThickness/2, zpos));

			face = new THREE.Face3(18, 19, 20);
			emblem.faces.push(face);

			emblem.vertices.push(new THREE.Vector3(p.x, 0, p.z));
			emblem.vertices.push(new THREE.Vector3(-adjust, -wallThickness/2, zpos));
			emblem.vertices.push(new THREE.Vector3(-zshift, -wallThickness/2, zpos));
			// endShape(CLOSE);

			face = new THREE.Face3(21, 22, 23);
			emblem.faces.push(face);

			if(c > 3){

				xpos = xpos * -1;
				zpos = zpos * -1;

			}

			emblem.computeFaceNormals();
			emblem.computeVertexNormals();

			pattern.add(new THREE.Mesh(emblem, material));
		}

	}

	sceneElements.add(pattern);

	scene.add(sceneElements);

}

// function emblemPoints(){

// 	for(var d = 0; d < name.length; d++){

// 		var dx = random(-v, v);
// 		var dz = random(-v, v);

// 		pair = {

// 			x: (baseProportion/10) * dx,
// 			z: (baseProportion/10) * dz

// 		}

// 		points.push(pair);

// 	}

// }


// function info(){

// 	v = 0;
// 	c = 0;

// 	for(var i = 0; i < name.length; i++){

// 		for(av of allv){

// 			if(name.charAt(i) === av){

// 				v ++;

// 				dots.push(i);

// 			}

// 		}

// 		for(ac of allc){

// 			if(name.charAt(i) === ac){

// 				c ++;

// 				dots.push(i);

// 			}

// 		}

// 	}

// }

function newName(){

	wallThickness = renderer.width/3;
	baseProportion = renderer.width - wallThickness;

	name = textboxn.value();

	context();

	animate();

	console.log("width:", renderer.width);

	console.log("name:", name);

}