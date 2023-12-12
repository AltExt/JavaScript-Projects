function RandomWithRange(min, max) {
	// generate a random number between MIN and MAX-1
	return Math.floor( min + (Math.random() * (max - min)) );
}
function FindFirstOf(str, char, startPoint = 0) {
	// loop through a string at a starting point and find the first char matching input char
	for (var i = startPoint; i < str.length; i++) {
		if ( str.charAt(i) == char ) {
			return i;
		}
	}
	return Infinity;
}

function MathButtonPress() {
	// generate 3 random values to use in UpdateMathParagraph

	var x = RandomWithRange(1, 50), y = RandomWithRange(1, 50), op = RandomWithRange(0, 5);

	UpdateMathParagraph(x, y, op);
}

function UpdateMathParagraph(x, y, op) {
	// this function takes in 3 arguments and uses them to generate a math expression
	// x and y are operands, and op is the operator

	// ensure x and y are of type int
	x = parseInt(x);
	y = parseInt(y);


	// determine which operator is being used
	// it is also easier to perform the calculation here
	// and also the create the string which will be displayed on the page
	var z = 0;
	switch (op) {
		case 0:
			z = x + y;
			op = x + " + " + y + " = " + z;
			break;
		case 1:
			z = x - y;
			op = x + " - " + y + " = " + z;
			break;
		case 2:
			z = x / y;
			op = x + " / " + y + " = " + z;
			break;
		case 3:
			z = x * y;
			op = x + " * " + y + " = " + z;
			break;
		case 4:
			z = x % y;
			op = x + " % " + y + " = " + z;
			break;
		default:
			op = "Unknown value passed in!"
			break;
	}
	document.getElementById("math").innerHTML = op;
}

function GetNumbersAndOperation() {
	// this function parses the data in the /math/ paragraph
	// it will find each number in the paragraph, and the operation being used
	// it will then assemble them into an array and return that array

	var str = document.getElementById("math").innerHTML;
	
	// by finding where each space is in the string we can locate the numbers
	var firstSpace = FindFirstOf(str, ' ');
	var secondSpace = FindFirstOf(str, ' ', firstSpace+1);
	var thirdSpace = FindFirstOf(str, ' ', secondSpace+1);

	var firstNum = str.substring(0, firstSpace);
	var operation = str.substring(firstSpace+1, secondSpace);
	var secondNum = str.substring(secondSpace+1, thirdSpace);

	// because the operaiton is in literal format (+-/*%) it needs to be converted to a number for further processing
	switch (operation) {
		case '+':
			operation = 0;
			break;
		case '-':
			operation = 1;
			break;
		case '/':
			operation = 2;
			break;
		case '*':
			operation = 3;
			break;
		case '%':
			operation = 4;
			break;
	
		default:
			break;
	}

	// return the values in array form, using parseint to convert from string to int values
	return [parseInt(firstNum), parseInt(secondNum), parseInt(operation)];
}

/*
the following four functions are used to increment or decrement the values of x amd y in the expression
for each the steps are the same, as follows:
	*use GetNums... to read the current expression
	*increment or decrement the correct value
	*use UpdateMath... to perform a new calculation and print the results to the screen as before
*/
function BumpUpX() {
	var items = GetNumbersAndOperation();

	items[0]++;

	UpdateMathParagraph(items[0], items[1], items[2]);

}

function BumpUpY() {
	
	var items = GetNumbersAndOperation();

	items[1]++;

	UpdateMathParagraph(items[0], items[1], items[2]);
}

function BumpDownX() {
	var items = GetNumbersAndOperation();

	items[0]--;

	UpdateMathParagraph(items[0], items[1], items[2]);
}

function BumpDownY() {
	var items = GetNumbersAndOperation();

	items[1]--;

	UpdateMathParagraph(items[0], items[1], items[2]);
}