var nns = ["man", "girl", "boy", "stranger", "woman", "dog", "cat", 
"horse", "cow", "table", "bed", "pillow", "lamp", "chair", "bottle", 
"hammer", "painting", "laptop", "picture", "mountain", "ocean", "photo", 
"house", "flower", "movie", "song", "book", "band", "office", "hero", 
"monkey", "child", "baby", "artwork", "planet", "toy", "spaceship", 
"map", "compass", "pioneer", "ghost", "zombie", "vampire", "werewolf", 
"monster", "duck", "family", "computer", "phone", "clock", "cable", 
"mouse", "desk", "snake", "goat", "zebra", "elephant", "peacock", 
"pigeon", "musician", "artist", "pilot", "doctor", "teacher", "student",
"police-man", "police-woman", "firefighter", "ballerina", "princess", 
"prince", "king", "queen", "jester", "clown", "burger", "french fry",
"pizza", "milkshake", "salad", "steak", "pudding cup", "bowl", "jug", "plate",
"taco", "chip", "school", "library", "gym", "pool", "bank", "machine", "robot",
"spa", "video"];

var ads = ["adorable", "angry", "ambitious", "attractive", "adventurous", 
"aggressive", "amused", "annoyed", "awful", 

"bloody", "bored", "boring", "brainy", "big", "brave", "busy", "blue", 

"calm", "cautious", "charming", "clean", "cheerful", "concerned", 
"confused", "cruel", "creepy", "cute", "curious", "crooked", "crazy", 
"clever", "clumsy", 

"dark", "dangerous", "defiant", "disgusted", "dizzy", "dazzling", "doubtful",
"dull", 

"eager", "enchanting", "elegant", 

"funny", "fair", "fancy", "famous", "foolish", 

"gentle", "grumpy", "green", 

"happy", "helpful", "huge", 

"icy", "important", "innocent", 

"jolly", "jittery", "jealous", 

"kind", 

"little", "lazy", "lonely", "lucky", "long", 

"mean", "modern", "motionless", "muddy", "mysterious", 

"nervous", "nasty", "nice", "naughty", 

"obedient", "odd", "obnoxious", "orange", 

"poor", "powerful", "polite", "perfect", "pretty", "purple",

"quiet", "quirky", 

"ridiculous", "rough", "red", "repulsive", "rich", 

"silly", "soft", "shy", "smooth", "scary", "sleepy", "smiling", "stormy",
"strange", "successful", "stupid", 

"thin", "tall", "talented", "tough", "tired", "thoughtful", "tasty", "terrible", 

"ugly", "unusual", "uptight", 

"wicked", "worried", "wild", "wrong", 

"yellow", "yucky"];

var vbs = ["ran into","jumped on", "scratched", "coughed on", 
"yelled at", "shook", "bent", "pulled on", "made", "put down", 
"touched", "hugged", "smiled at", "fell on", "tore up", "looked at", 
"laughed at", "hit", "appreciated", "stopped", "talked to", "cooked for", 
"washed", "bit", "carried", "chased", "comforted", "embarrassed", 
"grabbed", "ignored", "kissed", "measured", "needed", "played with", 
"pined for", "licked", "replaced", "wanted", "used", "found", "needed", 
"turned into"];

var ats = ["the", "a"];

var cns = ["then", "and", "after", "even though", "while", "before", "since", "because", "however", "and then", "meanwhile"];

var start = 120;
var ww = 160;

var w = 1450;
var h = 500;

var i = 0;

var l1 = h/3;
var l2 = h/1.5;

function setup(){
	var c = createCanvas(w, h);
	textSize(22);
	noLoop();
}

function draw(){

	background(255);
	strokeWeight(15);
	rect(0, 0, w, h);

	if(mouseClicked){
		write(i);
	}

}

function mouseClicked(){

	if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
		i++;
		write(i);
		if(i > 15){
			background(255);
			strokeWeight(15);
			rect(0, 0, w, h);
			i = 0;
		}
	}

}

function write(i){

	var atr = int(random(ats.length));
	var adr = int(random(ads.length));
	var nnr = int(random(nns.length));
	var vbr = int(random(vbs.length));

		if(i == 1){
			text(ats[atr], start, l1);
		} 
		else if(i == 5){
			text(ats[atr], ww * i, l1);
		}
		else if(i == 2 || i == 6){
			text(ads[adr], ww * i, l1);
		} 
		else if(i == 3 || i == 7){
			text(nns[nnr], ww * i, l1);
		}
		else if(i == 4){
			text(vbs[vbr], ww * i, l1);
		}
		else if(i == 8){
			text(cns[0], start, l2);
		}
		else if(i == 9 || i == 13){
			text(ats[atr], ww * (i - 7), l2);
		}
		else if(i == 10 || i == 14){
			text(ads[adr], ww * (i - 7), l2);
		}
		else if(i == 11 || i == 15){
			text(nns[nnr], ww * (i - 7), l2);
		}
		else if(i == 12){
			text(vbs[vbr], ww * (i - 7), l2);
		}
}

// function keyPressed(){
// 	if(key == "s" || key == "S"){
// 		saveCanvas(c, "myMadlib", "jpg");
// 	}
// }

// sentence structure:
// ats: 1, 5, 9, 13
// ads: 2, 6, 10, 14
// nns: 3, 7, 11, 15
// vbs: 4, 12
// cns: 8


// https://creative-coding.decontextualize.com/arrays-and-objects/
// help setting up a string array

// https://www.youtube.com/watch?v=9857701OsDE&index=17&list=RDUvSjtiW-RH8
// help with if / and

// https://processing.org/reference/random_.html
// help pulling random words from an array

// https://p5js.org/reference/#/p5.Element/mouseClicked
// help with mouseClicked function

// https://forum.processing.org/two/discussion/3647/how-execute-a-function-only-once
// help getting only one word to display per click

// https://p5js.org/reference/#/p5/saveCanvas
// help with saving canvas