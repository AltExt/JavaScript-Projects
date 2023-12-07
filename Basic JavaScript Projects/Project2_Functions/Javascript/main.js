var x = 0;

function ButtonPress() {
	str = "";
	if (x % 2 ==0) {
		str = "This is some text";
	}
	else {
		str = "This is some different text";
	}

	x += 1;

	document.getElementById("TargetParagraph").innerHTML = str;
}