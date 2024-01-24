let arg1 = 0;
let arg2 = 0;
let result = 0;

let operator = null;
let arg1Passed = false;
let arg2Passed = false;
let nextInputClearScreen = false;
let nextInputClearAll = false;

Setup();

function Setup() {

	// Add functionallity to each button
	let numberButtons = document.getElementsByClassName("number");
	for (let i = 0; i < numberButtons.length; i++) {
		let element = numberButtons[i];
		element.addEventListener("click", function(e) {
			AddToCalcScreen(this.value);
		}, false);
	}

	let operatorButtons = document.getElementsByClassName("operator");
	for (let i = 0; i < operatorButtons.length; i++) {
		let element = operatorButtons[i];
		element.addEventListener("click", function(e) {
			SelectOperator(this);
		});
	}

	let equalsButton = document.getElementById("equalsButton");
	equalsButton.addEventListener("click", function(e) {
		EqualsButtonPressed();
	});

	let ACButton = document.getElementById("ACButton");
	ACButton.addEventListener("click", function(e) {
		ACButtonPressed();
	}, false);
}

function AddToCalcScreen(param) {
	// In ordder to add to the screen, get the current screen and append the pressed button's value to it

	let calcScreen = GetScreen();
	let str = calcScreen.value;

	// if the string only contains 0 and we are not adding a decimal
	if (str === "0" && param != ".") {
		str = "";
	}

	// if the clearAll bool has been set then set all data back to initial values
	// this is ususally set to true after equals has been pressed, meaning the user does not hae to clear the sceren manually
	if (nextInputClearAll) {
		str = "";
		ClearAll();
	}

	// removes the current data on the screen, but leaves all other data intact eg after user input 12, then clicks +
	if (nextInputClearScreen) {
		str = "";
		nextInputClearScreen = false;
	}

	// limit on the input length
	if (str.length >= 12) {
		return;
	}

	// add the new digit and write that
	str += param;
	calcScreen.value = str;
}

function SelectOperator(element) {

	// set and unset here add / remove a border on the active operator's button on the calculator
	UnsetOperator();
	SetOperator(element);
	operator = element.value;

	// this is set when equals has been pressed
	// this case handles if hte user wants to continue operations on the result of a different calculation
	if (nextInputClearAll) {
		nextInputClearAll = false;
		result = arg1;
		WriteToScreen();
		nextInputClearScreen = true;
		arg2Passed = false;
		
		return;
	}

	if (arg1Passed && !arg2Passed) {
		// gets the second argument from the screen, if needed
		arg2 = GetScreenContents();
		arg2Passed = true;
		ClearCalcScreen();
	}
	else {
		// gets the first argument from the screen
		arg1 = GetScreenContents();
		arg1Passed = true;
		ClearCalcScreen();
	}

	// performs the calculation and sets arg1 to that value for future calculations
	if (arg1Passed && arg2Passed) {
		result = PerformCalculation();
		arg1 = result;
		arg2Passed = false;
		WriteToScreen();
	}
}

function EqualsButtonPressed() {

	// return if arg1 is not present
	if (!arg1Passed) {
		nextInputClearScreen = true;
		return;
	}

	// if arg2 is not present, take the contents of the screen as arg2
	if (!arg2Passed) {
		arg2 = GetScreenContents();
		arg2Passed = true;
	}

	// perform the calculation and write to screen
	result = PerformCalculation();
	WriteToScreen();
	arg1 = result;

	nextInputClearAll = true;
}

function ACButtonPressed() {
	ClearAll();
}

function ClearAll() {
	// resets all values back to original states
	ClearCalcScreen();
	UnsetOperator();
	arg1 = 0;
	arg2 = 0;
	result = 0;
	operator = null;
	arg1Passed = false;
	arg2Passed = false;
	nextInputClearScreen = false;
	nextInputClearAll = false;
}

function PerformCalculation() {
	if (operator != null) {
		// only perform calculaiton if operator is not null
		// switch over operator to find out which calculation to perform

		let output = 0;
		switch(operator) {
			case "+":
				output = arg1 + arg2;
				break;
			case "-":
				output = arg1 - arg2;
				break;
			case "*":
				output = arg1 * arg2;
				break;
			case "/":
				if (arg2 == 0) {
					output = 0;
				}
				else {
					output = arg1 / arg2;
				}
				break;
		}
		return output;
	}

	// this ideally should never be reached, this means something has gone terribly wrong!
	console.log("This should not be possible, oh no!");
	return null;
}

// helper functions for the calculator screen
function GetScreen() {
	return document.getElementById("calculatorScreen");
}

function GetScreenContents() {
	return parseFloat(GetScreen().value);
}

function ClearCalcScreen() {
	GetScreen().value = "0";
}

function WriteToScreen() {
	GetScreen().value = result;
} 

// helper functions to add or remove id from the active operators button on the calculator
function SetOperator(button) {
	button.id = "activeOperator";
}

function UnsetOperator() {
	let activeButton = document.getElementById("activeOperator");
	if (activeButton != null) {
		activeButton.id = "";
	}
	operator = null;
}