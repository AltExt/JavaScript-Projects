function OnClick() {
	let elements = document.getElementsByClassName("OnClickParagraph");
	for (let i = 0; i < elements.length; i++) {
		elements[i].textContent = "This element was set by getElementsByClassName()";
	}
}


function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function ClearCanvas() {
	const eCanvas = document.getElementById("canvas");
	const cCanvas = eCanvas.getContext("2d");
	cCanvas.clearRect(0, 0, eCanvas.width, eCanvas.height);
}

function ClickToAddColorGradient() {
	const eCanvas = document.getElementById("canvas");
	const cCanvas = eCanvas.getContext("2d");

	const gradient = cCanvas.createLinearGradient(0, 0, eCanvas.height, 0);
	gradient.addColorStop(0.0, "red");
	gradient.addColorStop(0.5, "green");
	gradient.addColorStop(1.0, "blue");

	cCanvas.fillStyle = gradient;
	cCanvas.fillRect(0, 0, eCanvas.width, eCanvas.height);
}

function ValidateForm() {
	let elements = document.forms["contactForm"];
	
	for (let i = 0; i < elements.length; i++) {
		let x = elements[i];

		if (x.value == "") {
			alert(x.name + " must be filled out!");
			return false;
		}
	}
}

function DisplayType(character) {
	let type = character.getAttribute("data-character");
	alert(type + " is in the " + character.innerHTML + " universe");
}