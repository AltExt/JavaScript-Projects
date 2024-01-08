// GLOBAL VARIABLES
// Time globals: (onClickFunc)
const Late_Cut_Off = 23;
const Early_Cut_Off = 7;
const Evening_Cut_Off = 18;
const Afternoon_Cut_Off = 12;

// Age globals: (ButtonFunc)
const Max_Age = 150;
const Min_Age = 18;

function OnClickFunc() {
	// called by the click me text on the top of the screen
	// gets the current time in hours and minutes
	// outputs an appropriate greeting and tells the user the time
	
	// getting time using Date() methods
	let hours = new Date().getHours(); //hrs
	let mins = new Date().getMinutes();
	let str = "";
	
	// logic
	// for the night owls
	if (hours > Late_Cut_Off || hours < Early_Cut_Off) {
		str = "You chould go to bed!";
	}
	// if time is after 6pm (18:00) then say good evening
	else if ( hours > Evening_Cut_Off ) {
		str = "Good Evening!";
	}
	// if the time is between 6pm and noon say good afternoon
	else if ( hours > Afternoon_Cut_Off ) {
		str = "Good Afternoon!";
	}
	// otherwise say good morning
	else {
		str = "Good Morning!";
	}
	
	// add the current time to the output str and display on screen
	str += " It is currently " + hours + ":" + mins + ".";
	document.getElementById("clickme").textContent = str;
}

function ButtonFunc() {
	// same idea as the vote func in the previous project.
	// determines the users age and weather they are old enough to vote

	// get the age from  the input
    let age = document.getElementById("age").value;
	let str = "You are ";

	// decided to cap the age at 150, makes no sense that someone 1234 years old be votin
	if (age > Max_Age) {
		return;
	}

	// normal logic
	if (age >= Min_Age) {
		str += "old enough";
	}
	else {
		str += "too young";
	}
	
	// finish output string and display to screen
	str += " to vote";
	document.getElementById("output").textContent = str;
}

function ThrowAnError() {
	// this function only exists to throw an "error"
	// in this case we have some value i that should ideally be between 0 and 30
	// any other value is an error, and results in console.log being called

	let i = 100;

	if ( i < 10) {
		// do something
	}
	else if ( i < 20) {
		// do something
	}
	else if ( i < 30) {
		// do somthing
	}
	else {
		console.warn("i is too large!");
	}
}