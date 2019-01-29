function setup(){
	
	createCanvas(600, 600);
	colorMode(HSB);

	background(0, 100, 0);

}

function draw(){
	
	stroke(0, 100, 0);

	line(0, height/3, width, height/3);
	line(0, (height/3) * 2, width, (height/3) * 2);
	line(0, height, width, height);
	line(width/3, 0, width/3, height);
	line((width/3) * 2, 0, (width/3) * 2, height);
	line(width, height, width, height);

	fill(0, 100, 80);
	ellipse(0, height/6, 50, 50);

	fill(60, 100, 80);
	ellipse(width/6, height/6, 50, 50);

	fill(120, 100, 80);
	ellipse(width/3, height/6, 50, 50);

	fill(180, 100, 80);
	ellipse(width/3 + width/6, height/6, 50, 50);

	fill(240, 100, 80);
	ellipse(width - width/3, height/6, 50, 50);

	fill(320, 100, 80);
	ellipse(width - width/6, height/6, 50, 50);

	fill(360, 100, 80);
	ellipse(width, height/6, 50, 50);

	translate(0, height/6);

	fill(0, 100, 80, 0.9);
	ellipse(0, height/6, 50, 50);

	fill(60, 100, 80, 0.9);
	ellipse(width/6, height/6, 50, 50);

	fill(120, 100, 80, 0.9);
	ellipse(width/3, height/6, 50, 50);

	fill(180, 100, 80, 0.1);
	ellipse(width/3 + width/6, height/6, 50, 50);

	fill(240, 100, 80, 0.1);
	ellipse(width - width/3, height/6, 50, 50);

	fill(320, 100, 80, 0.1);
	ellipse(width - width/6, height/6, 50, 50);

	fill(360, 100, 80, 0.1);
	ellipse(width, height/6, 50, 50);

}