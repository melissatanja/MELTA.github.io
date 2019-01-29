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

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true, alpha: true});
var material = new THREE.MeshLambertMaterial({color: 0xFF0000});
var sceneElements = new THREE.Object3D;
var pattern = new THREE.Object3D;
var cameras = new THREE.Camera();

init();

function init(){

var cam = new THREE.OrthographicCamera(75, 500, 500, 0.1, 1000);

// looking down on scene as if it were 2D
cam.position.set(20, 20, 20);
cam.rotation.y = -Math.PI/4;
cam.rotation.x = Math.atan(-1 / Math.sqrt(2));
cameras.add(cam);
scene.add(cameras);

var light = new THREE.AmbientLight( 0x404040 );
sceneElements.add(light);

renderer.setSize(500, 500);
renderer.setClearColor("rgb(255, 255, 255)")
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xff0000, 1);
}

function animate(){

requestAnimationFrame(animate);

cameras.lookAt(scene.position);

border();

emblemPoints();

emblem();

renderer.render(scene, cameras);
}

function setup(){

// textbox for user input

createP('your name (lowercase)');

textboxn = createInput();

textboxn.changed(newName);

createP();

noCanvas();

// objButton = createButton("save as .OBJ");

// jpgButton = createButton("save as .JPG");

// jpgButton.mousePressed(jpg);

// objButton.mousePressed(saveOBJ = true);

// if(saveOBJ){

// 	beginRecord("nervoussystem.obj.OBJEXPORT", textboxn.value(),".obj");

// }

// var exporter = new THREE.OBJExporter();

}

function jpg(){

// saves 2D pattern as jpg
saveCanvas(canvas, textboxn.value(), 'jpg')

}

function keyPressed(){

// clears the canvas when input is changed or edited
if(keyCode === DELETE || keyCode === BACKSPACE){
points.length = 0;
}

}

function createNameblem(){

// draws the border around the pattern
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

boxy = wallThickness/2;

TBx = 0;
TBz = (baseProportion/2 + wallThickness/2);

LRx = (baseProportion/2 + wallThickness/2);
LRz = 0;

boxl = baseProportion;
boxw = wallThickness;

// top edge
translate(0, boxy, TBz);
var box = new THREE.BoxGeometry(boxl + boxw * 2, boxw, boxw);
var border = new THREE.Mesh(box, material);
sceneElements.add(border);

// bottom edge
translate(0, 0, -2 * TBz);
var box = new THREE.BoxGeometry(boxl + boxw * 2, boxw, boxw);
var border = new THREE.Mesh(box, material);
sceneElements.add(border);

// left edge
translate(LRx, 0, TBz);
var box = new THREE.BoxGeometry(boxw, boxw, boxl);
var border = new THREE.Mesh(box, material);
sceneElements.add(border);

// right edge
translate(-2 * LRx, 0, 0);
var box = new THREE.BoxGeometry(boxw, boxw, boxl);
var border = new THREE.Mesh(box, material);
sceneElements.add(border);

translate(LRx, 0, 0);

// reference points for the pattern

for(var d = 0; d < name.length; d++){

var dx = random(-v, v);
var dz = random(-v, v);

pair = {

x: (baseProportion/10) * dx,
z: (baseProportion/10) * dz

}

points.push(pair);

}

//draws the pattern

sceneElements.add(pattern);

var emblem = new THREE.Geometry();

for(p of points){

//edge points
xpos = (baseProportion/2);
zpos = (baseProportion/2);
adjust = (baseProportion/2) - (baseProportion/c);
zshift = adjust + wallThickness;
xshift = adjust + wallThickness;

translate(p.x, 0, p.z);
var joinBox = new THREE.BoxGeometry(wallThickness/2, wallThickness/2, wallThickness/2);
var join = new THREE.Mesh(joinBox);
pattern.add(join);
translate(-p.x, 0, -p.z);


for(var edot = 0; edot < 3; edot++){

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

scene.add(sceneElements);

}

function newName(){

wallThickness = 15;
baseProportion = 300 - wallThickness;

name = textboxn.value();

console.log("name:", name);

}