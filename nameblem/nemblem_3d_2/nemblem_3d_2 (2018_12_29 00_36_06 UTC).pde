// import nervoussystem.obj.*;

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

let canvas;

let saveOBJ;
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

let objButton;
let jpgButton;

let shape = [];

function setup(){

  createP('your name (lowercase)');

  textboxn = createInput();

  createP();
  
  canvas = createCanvas(500, 500, WEBGL);

  createP();

  objButton = createButton("save as .OBJ");

  jpgButton = createButton("save as .JPG");

  jpgButton.mousePressed(saveJPG = true);

  objButton.mousePressed(saveOBJ = true);

  if(saveOBJ){

    beginRecord("nervoussystem.obj.OBJEXPORT", textboxn.value(),".obj");

  }

  if(saveJPG){

    saveCanvas(canvas, textboxn.value(), 'jpg')

  }

  textboxn.changed(newName);

}

function draw(){

  // mx = map(mouseX, 0, width, 0, 255);
  // my = map(mouseY, 0, height, 0, 255);

  orbitControl();

  rotateX(PI/2);

  // push();

  // strokeWeight(0.5);
  // stroke('black'); // x

  // line(500, 0, 0, -500, 0, 0);


  // stroke('red'); // y

  // line(0, 500, 0, 0, -500, 0);

  // stroke('blue'); // z

  // line(0, 0, 500, 0, 0, -500);

  // pop();

  if(saveOBJ){

    endRecord();

    saveOBJ = false;

  }

}

function keyPressed(){

  if(keyCode === DELETE || keyCode === BACKSPACE){
    points.length = 0;
    background(255);
  }

}


function border(){

  strokeWeight(1);
  stroke(0);
  fill(random(255), random(255), random(255), 100);
  // noFill();

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

  for(let d = 0; d < name.length; d++){

    let dx = random(-v, v);
    let dz = random(-v, v);

    pair = {

      x: (baseProportion/10) * dx,
      z: (baseProportion/10) * dz

    }

    points.push(pair);

  }

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

  shape.push(this);

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

  wallThickness = 15;
  baseProportion = 300 - wallThickness;

  name = textboxn.value();

  console.log("name:", name);

  info();

  // console.log("vowels:", v);
  // console.log("consonants:", c)

  border();

  emblem();

}
