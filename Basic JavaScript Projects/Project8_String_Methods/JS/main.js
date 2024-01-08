/*
	str.concat(s1, s2, s3, ...) - equal to str = str + s1 + s2 + s3 ...

	str.slice(start_index, end_index) - returns a substring of the given string from start_index to end_index

	str.search("input") - returns the start index of the "input" string if it is found within the str string
	str.search(/regex/i) - same as above, however using regular expressions. the string above is actually converted to regex first before the str is searched.

	str.toLowerCase() - returns the string with all letters converted to lowercase. Does not overwrite the original str so str = str.toLower is needed.

	<number>.toString() - returns a string containing the value of <number>

	<number>.toPrecision(n) - returns a string containing number, containing exactly n digits. Can be in floating point or scientific notation

	<number>.toFixed()
	<number>.toFixed(n) - returns a string containing number. if n is specified, rounds the number to n places, adding 0's if needed
			the main difference between this and precision is that this function counts n places after the decimal point, 111.123456 <-n digits after decimal
			and precision counts n digits total, 123.456 <- n digits total

	str.valueOf() - returns the primitive value of the string. Mainly used internally by JS and not in code.
			let x = str.valueOf(); === let x = str;
*/

function OnClickConcat() {
	// called by the first button on the page

	// declare strings to concat
	let s1 = "Hello, ";
	let s2 = "this ";
	let s3 = "is ";
	let s4 = "a ";
	let s5 = "string.";

	// perform concat
	let str = s1.concat(s2, s3, s4, s5);

	// display result.
	document.getElementById("OnClickConcatOutput").textContent = str;
}

function OnClickSlice() {
	// function using slice, search, toLower, toString, toPrecision, toFixed and valueOf methods

	// consts for this function
	const Len = 6;
	const Divisor = 13;
	const Precision = 10;
	const str = "All work and no play makes Johnny a dull boy.";
	
	// searching for the start point of the string "Johnny" 
	let start = str.search(/J/i);
	let end = start + Len;

	// taking the slice and converting to lowercase
	let slice = str.slice(start, end).toLowerCase();

	// performing a division here to use toPrecision and toFixed
	let result = start / Divisor;
	
	// toprecision vs tofixed
	let precisionString = start.toString() + " / " + Divisor.toString() + " = " + result.toPrecision(Precision);

	let fixedString = start.toString() + " / " + Divisor.toString() + " = " + result.toFixed(Precision);

	// concat into one output string and display
	let output = slice.concat(". ToPrecision(): ", precisionString, ". ToFixed(): ", fixedString);
	document.getElementById("OnClickSliceOutput").textContent = output.valueOf();
}