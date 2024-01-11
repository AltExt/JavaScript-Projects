const TWO_PI = Math.PI * 2;

let b_running = false;
let b_pause = false;
let b_randomCircles = false;

let b_logging = false;

let currentColor = 0;
let correctCalls = [];
let incorrectCalls = []

const COLORS = {//	 R		 G		 B
	"black":	[	0,   0,   0  ],
	"white":	[	255, 255, 255],
	"gray":	 	[	50,  50,  50 ],
                            
//                  R    G    B          
	"red":	 	[	255, 0,   0  ],
	"orange":	[	255, 128, 0  ],
	"yellow":	[	255, 255, 0  ],
	"lime":		[	128, 255, 0  ],
                            
	//              R    G    B              
	"green":	[	0,   128, 0  ],
	"jade":	 	[	0,   255, 128],
	"teal":	 	[	0,   255, 255],
	"cerulean":	[	0,   128, 255],
                            
	//              R    G    B              
	"blue":	 	[	0,   0,   255],
	"purple":	[	128, 0,   128],
	"violet":	[	255, 0,   255],
	"fuscia":	[	255, 0,   128]
};

function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function RandomWithRange(minimum = 0.0, maximum = 1.0) {

	let range = maximum - minimum;
	let rand = Math.random();
	let step1 = rand * range;
	let result = step1 + minimum;

	return result;

	return (Math.random() % (maximum - minimum)) + minimum;
}

function DrawCircle(canvas_context, xPos, yPos, radius, fill = false) {
	canvas_context.beginPath();
	canvas_context.arc(xPos, yPos, radius, 0, TWO_PI);
	if (fill) {
		canvas_context.fill();
	}
	//canvas_context.stroke();
}

function OnClick() {
	let elements = document.getElementsByClassName("OnClickParagraph")

	for (let i = 0; i < elements.length; i++) {
		let e = elements[i];
		e.textContent = "This was added by document.getElementsByClassName()!";
	}
}

function AddCircle(canvas_element = null, canvas_context = null, pallette = null) {

	if (canvas_element === null || canvas_context === null) {
		console.log("yup.");
		canvas_element = document.getElementById("canvas");
		canvas_context = canvas_element.getContext("2d");
	}
	
	const MARGIN = 80;
	let x = Math.floor(RandomWithRange( 0, canvas.width ));
	let y = Math.floor(RandomWithRange( 0, canvas.height ));
	let r = 80;//Math.floor(RandomWithRange( 5, MARGIN ));
	let f = RandomWithRange() > 0.5 ? true: false;

	if (pallette == null) {
		pallette = [	"black", "white", "gray", "red", "orange", "yellow", "lime", "green",
						"jade", "teal", "cerulean", "blue", "purple", "violet", "fuscia"]; // default pallette if none supplied
	}

	let rand = Math.round(RandomWithRange(0, pallette.length - 1));
	
	let c = COLORS[ pallette[rand] ];
	
	let rgbstr = "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",255)";
	canvas_context.fillStyle = rgbstr;

	DrawCircle(canvas_context, x, y, r, true);
	//ClearCanvas();
	//canvas_context.fillRect(0, 0, canvas_element.width, canvas_element.height);
	/*
	r = 50
	x = r * 1.5;
	y = 0
	increment = x;
	let str = "";

	for (let i = 0; i < pallette.length; i++) {
		c = COLORS[ pallette[i] ];
		if (i % 5 == 0) {
			y += increment;
			x = increment;
			str = str.slice(0, str.length - 2);
			str += "\n";	
		}
		canvas_context.fillStyle = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
		DrawCircle(canvas_context, x, y, r, true);
		
		
		str += pallette[i] + ", ";
		x += increment;
	}
	console.log(str);
	*/
}

function ClearCanvas() {
	const canvas_element = document.getElementById("canvas");
	const canvas_context = canvas_element.getContext("2d");
	canvas_context.clearRect(0, 0, canvas_element.width, canvas_element.height);
}

function OnClickLoopAddRandomCircles() {
	if (!b_randomCircles) {
		b_randomCircles = true;
		RandomCircles();
	}
	else {
		b_randomCircles = false;
	}
}

function RandomCircles() {

	const canvas_element = document.getElementById("canvas");
	const canvas_context = canvas_element.getContext("2d");

	if ( b_randomCircles ) {

		function wrapper() {
			AddCircle(canvas_element, canvas_context);
			let funcCall = setTimeout(wrapper, 100);
			if (!b_randomCircles) {
				clearTimeout(funcCall);
			}
		}
		wrapper();

	}
	else {
		for (let i = 0; i < 50; i++) {
			AddCircle(canvas_element, canvas_context);
		}
	}
}
