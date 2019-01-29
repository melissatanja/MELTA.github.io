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

function setup(){

	createP('your name (lowercase)');

	textboxn = createInput();

	textboxn.changed(newName);

	createP();
	
	createCanvas(500, 500, WEBGL);

}

function draw(){

	name = textboxn.value();

	// orbitControl();

	rotateX(radians(90));

	info();

	push();

	strokeWeight(0.5);
	stroke('black'); // x

	line(500, 0, 0, -500, 0, 0);


	stroke('red'); // y

	line(0, 500, 0, 0, -500, 0);

	stroke('blue'); // z

	line(0, 0, 500, 0, 0, -500);

	pop();

}


function emblem(){


	//edge points
	wd = (-width/2) + (width/c);
	hd = (-height/2) + (height/c);

	strokeWeight(2);
	stroke(0);

	line(-width/2, 0, -height/2, -width/2, 0, height/2);
	line(width/2, 0, -height/2, width/2, 0, height/2);
	line(-width/2, 0, -height/2, width/2, 0, -height/2);
	line(-width/2, 0, height/2, width/2, 0, height/2);

	point(0, 0, 0);


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

		strokeWeight(2);
		stroke(204, 0, 0);

		point(p.x, 0, p.z);

		for(let edot = 0; edot < 5; edot++){

			line(wd, 0, -height/2, p.x, 0, p.z);
			line(wd, 0, height/2, p.x, 0, p.z);
			line(-width/2, 0, hd, p.x, 0, p.z);
			line(width/2, 0, hd, p.x, 0, p.z);

			wd = wd * -1;
			hd = hd * -1;

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
	background(255);

	console.log(name)

	emblem();

}