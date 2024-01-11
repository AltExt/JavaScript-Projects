
async function RunBubbles() {
	if (b_running) {
		b_running = false;
		return;
	}

	const canvas_element = document.getElementById("canvas");
	const canvas_context = canvas_element.getContext("2d");
	canvas_context.fillStyle = "blue";

	let bubbles = [];
	// add bubbles here

	const MARGIN = 20;
	for (let i = 0; i < 3; i++) {
		let r = Math.floor(RandomWithRange( 15, 30 ));
		let x = Math.floor(RandomWithRange( MARGIN, canvas_element.width - MARGIN ));
		let y = canvas_element.height + (2 * r);
		bubbles.push( new Bubble(x, y, r, 3, 3) );
	}

	if (b_logging)	console.log("Bubbles created, array contains " + bubbles.length);

	if (b_logging)	console.log("Going to while loop!");
	b_running = true;
	b_pause = false;
	let lastTick = new Date().getMilliseconds();
	let acc = 0;
	while (b_running) {
		let millis = new Date().getMilliseconds();

		if (b_pause) {
			if (b_logging)	console.log("paused loop");
			lastTick = millis;
			await Sleep(250);
			continue;
		}
		
		if (millis < lastTick) {
			millis += 1000;
		}
		else {
			if (b_logging)	console.log("loop");
		}


		acc = millis - lastTick;

		if (b_logging) {
			console.log("Millis:      " + millis);
			console.log("Last Update: " + lastTick);
			console.log("Accumulator: " + acc);
		}

		if (acc >= 300) {
			acc = 300;
		}

		let x = 0;
		while (acc >= 10) { //=============================================================================================
			x++;
			// update each bubble
			for (let i = 0; i < bubbles.length; i++) {
				let xSway = Math.sin(millis / 1000);
				let bubble = bubbles[i];
				bubble.Update(xSway, -1, canvas_element);
				if (b_logging && acc <= 20) {
					console.log("Bubbles[" + i + "].Spew():");
					bubble.Spew();
				}
			}
			acc -= 10;
			lastTick = millis;
		}
		
		if (b_logging) {
			console.log("Total updates: " + x);
		}

		// draw each bubble
		canvas_context.clearRect(0, 0, canvas_element.width, canvas_element.height);
		for (let i = 0; i < bubbles.length; i++) {
			if (b_logging) console.log("Drawing bubbles[" + i + "]:");
			if (bubbles[i].CheckBounds(canvas_element.width, canvas_element.height)) {
				bubbles[i].Draw(canvas_context);
				if (b_logging) console.log("Draw function called for " + i);
			}
		}
		
		await Sleep(10);
	}

	canvas_context.clearRect(0, 0, canvas_element.width, canvas_element.height);
}

function Start() {
	RunBubbles();
}

function ToggleLogging() {
	b_logging = !b_logging;
	if (b_logging) {
		document.getElementById("logButton").textContent = "Stop Logging!";
	}
	else {
		document.getElementById("logButton").textContent = "Start Logging!";
	}
}

function ToggleRunning() {
	b_running = !b_running;
}

function TogglePause() {
	b_pause = !b_pause;
	if (b_pause) {
		document.getElementById("pauseButton").textContent = "Unpause!";
	}
	else {
		document.getElementById("pauseButton").textContent = "Pause!";
	}
}

class Bubble {
	constructor(_xPos, _yPos, _radius, _xVelMult, _yVelMult) {
		this.xPos = _xPos;
		this.yPos = _yPos;
		this.radius = _radius;
		this.xVelMult = _xVelMult;
		this.yVelMult = _yVelMult;

	}

	Draw(canvas_context) {
		canvas_context.beginPath();
		canvas_context.arc(this.xPos, this.yPos, this.radius, 0, TWO_PI);
		canvas_context.stroke();
	}

	Update(xVel, yVel, canvas_element) {
		this.xPos += xVel * this.xVelMult;
		this.yPos += yVel * this.yVelMult;

		// bounds here instead
		this.CheckBounds( canvas_element.width, canvas_element.height );
	}

	CheckBounds(width, height) {
		const MARGIN = 20;
		/*
			-> screen:
			0, 0		W, 0
			#===========#
			|			|
			|			|
			|			|
			|			|
			|			|
			#===========#
			0, H		W, H

			-> bubble:
			P1			P2
			#===========#
			|			|
			|			|
			|			|
			|			|
			|			|
			#===========#
			P3			P4
			p1 = minx, miny
			p2 = maxx, miny
			p3 = minx, maxy
			p4 = maxx, maxy
		*/

		let thisMaxX = this.xPos + this.radius + MARGIN;
		let thisMinX = this.xPos - this.radius - MARGIN;
		let thisMaxY = this.yPos + this.radius + MARGIN;
		let thisMinY = this.yPos - this.radius - MARGIN;

		let inBounds = true;
		// For lhs check the rightmost point of the circle against the left bound
		if ( thisMaxX < 0 ) {
			this.xPos = width + this.radius;
			inBounds = false;
		}
		// for rhs check the leftmost point against the right bound
		if ( thisMinX > width ) {
			this.xPos = 0 - this.radius;
			inBounds = false;
		}
		// for top check max y against 0
		if ( thisMaxY < 0 ) {
			this.yPos = height + this.radius;
			inBounds = false;
		}
		if ( thisMinY > height ) {
			this.yPos = 0 - this.radius;
			inBounds = false;
		}
		return inBounds;
	}

	Spew() {
		console.log("\txPos:   " + this.xPos);
		console.log("\tyPos:   " + this.yPos);
		console.log("\tRadius: " + this.radius);
	}
}