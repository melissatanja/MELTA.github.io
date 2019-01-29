let textbox;
let allv = ['a', 'e', 'i', 'o', 'u', 'y']; //all vowels
let allc = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']; //all consonants
let name;
let v;
let c;

function setup(){

	createP("your name (lowercase):");

	textbox = createInput();

	name = textbox.value();

	textbox.changed(newName);

	createP();
	
	createCanvas(500, 500, WEBGL);

	v = 0;
	c = 0;

}

function info(){

	// for every character, check if it is a vowel or a consonant
	for(let i = 0; i < name.ln; i++){

		for(av of allv){

			if(name.charAt(i) === av){

				v ++;

			}

		}

		for(ac of allc){

			if(name.charAt(i) === ac){

				c ++;

			}

		}

	}

}

function newName(){

	console.log(textbox.value());

	info();

}
