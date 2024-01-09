/*	str.length - returns the number of characters in the string
	return = if you need a function to pass a value back to the function it was called from, use return <value>
	break - if this statement is encountered in a loop then the loop exits immediately, even if it's normal exit condition is not met
	continue - if this statement is encountered in a loop, then the loop immediately returns to the top of the loop to run again, unless the exit condition is also met

*/

function Loop() {
	// While Loop assignment
	let i = 0;
	let s = "string";
	while (i < s.length) {
		console.log(s[i]);
		i++;
	}
}

function Instruments() {
	// For Loop Assignment + innerHTML Assignment
	let instruments = ["Guitar", "Drums", "Piano", "Bass", "Violin", "Trumpet" , "Flute"];
	let str = "";
	for (let i = 0; i < instruments.length; i++) {
		str += i + ": " + instruments[i] + "<br>";
	}
	document.getElementById("forloop").innerHTML = str;
}

function Const() {
	// Const Keyword Assignment
	const instrument = {type:"Guitar", brand:"Fender", color:"Blue"};
	instrument.color = "Black";
	instrument.price = "900";
	document.getElementById("const").textContent = "The cost of the " + instrument.brand + " " + instrument.type + " is " + instrument.price;
}

function LetKeyword() {
	// Let Keyword Assignment
	let x = 10;
	if (x > 5) {
		let x = 15;
		console.log(x + " - deeper block");
		x += 5;
		console.log(x + " - deeper block");
	}
	console.log(x + " - outer block");
}

function AddNums(a, b) {
	// Return Statemenet Assignment
	return a + b;
}

function ObjectAssignment() {
	// Object Assignment
	let car = {
		make: "Toyota",
		model: "Corolla",
		year: "2004",
		color: "Black",
		Description: function () {
			return ( "The car is a " + this.color + " " + this.year + " " + this.make + " " + this.model + "." );
		}
	};

	console.log(car.Description());
}

function BreakAndContinue() {
	// finds the first 100 primes, then displays them

	let Limit = 100;
	let x = 1;
	let Primes = [];
	while (true) {
		x++;

		if (x % 2 == 0) {
			continue;
		}

		if (IsPrime(x)) {
			Primes.push(x);
		}

		if (Primes.length >= Limit) break;
		if (x >= 100000) break;
	}
	
	for (let i = 0; i < Primes.length; i++) {
		console.log(i + ": " + Primes[i]);
	}
}

function IsPrime(n) {
	// Brute force method to search for primes
	// Just check all numbers from 3 -> n/2, if none divide n evenly then n is prime
	if (n % 2 == 0) return false;

	for (let i = 3; i <= n/2; i++) {
		if (n % i == 0) {
			return false;
		}
	}
	return true;
}
