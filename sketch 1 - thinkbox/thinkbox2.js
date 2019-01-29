var w = 700;
var h = 700;

function setup(){
	createCanvas(w, h);
	var typew = textWidth("think");
	var typeh = 25;
	frameRate(2.5);
}

function draw(){
	var typew = textWidth("think") + random(2, 4, 6, 8);
	var typeh = 25;
	background (255);

	for(var i = 5; i < (w + typew); i = i + (1.5 * typew)){
		for(var j = 30; j < h; j = j + (1.5 * typeh)){
			textSize(random(40));
			fill(random(255), random(255), random(255));
			text("think", i, j);
		}
	}
	var s = 100;
	var t = 255;
	for(var x = 0; x < w; x = x + s){
		for(var y = 0; y < h; y = y +s){
				
			if(mouseX > x && mouseX < (x+s)){
				if(mouseY > y && mouseY > (y+s)){
					t = 0;
				}
			}
			else{
				t = 255;
			}

			noStroke();
			fill(0, 0, 0, t);
			rect(x, y, s, s);
		}
	}

	push();
	fill(255);
	stroke(125);
	strokeWeight(15);
	rect(w/3, h/3, w/3, h/3);
	noFill();
	rect(0, 0, w, h);
	pop();
}

function mousePressed(){
	console.log(mouseX, mouseY);
}