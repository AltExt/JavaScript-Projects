ResetSelection();

// helper funcs
function GetElementByID(id) {
	return document.getElementById(id);
}

function GetElementsByName(name) {
	return document.getElementsByName(name);
}

function GetElementsByClassName(classname) {
	return document.getElementsByClassName(classname);
}

function printarrays() {
	console.log("veg: " + veggies + "\nmeats: " + meats);
}

function ResetSelection() {

	function SetDefault(name, defaultVal = -1) {
		let elements = GetElementsByName(name);
		for (let i = 0; i < elements.length; i++) {
			let element = elements[i];
			element.checked = (i == defaultVal);
			element.disabled = false;
		}
	}
	let listOfSauces = GetElementsByName("sauceSelection");

	SetDefault("pizzaSize", 1);
	SetDefault("crustSelection", 0);
	SetDefault("sauceSelection", 0);
	SetDefault("cheeseSelection", 0);
	SetDefault("veggieSelection");
	SetDefault("meatSelection");

	GetElementByID("sauceSelectionExtra").checked = false;
	GetElementByID("cheeseSelectionExtra").checked = false;
}

function ValidateExtraToppingHelperFunc(extraToppingCB, noToppingRadio, defaultToppingRadio) {
	// helper function for validation the selection of "no sauce" or "no cheese"
	if (extraToppingCB.checked) {
		noToppingRadio.disabled = true;
		if (noToppingRadio.checked) {
			noToppingRadio.checked = false;
			defaultToppingRadio.checked = true;
		}
	}
	else {
		noToppingRadio.disabled = false;
	}
}

function ValidateExtraSauce() {
	// called when the "extra sauce" checkbox is clicked
	// if this box is active, the "no sauce" button should be greyed out and if it was selected then a default sauce will be selected instead  
	let cb = GetElementByID("sauceSelectionExtra");
	let noSauce = GetElementByID("sauceSelectionNone");
	let defaultSauce = GetElementByID("sauceSelectionRegular");
	ValidateExtraToppingHelperFunc(cb, noSauce, defaultSauce);
}

function ValidateExtraCheese() {
	// same as validateExtraSauce but for the cheese selection
	let cb = GetElementByID("cheeseSelectionExtra");
	let noCheese = GetElementByID("cheeseSelectionNone");
	let defaultCheese = GetElementByID("cheeseSelectionRegular");
	ValidateExtraToppingHelperFunc(cb, noCheese, defaultCheese);
}

function ToggleExtraToppingHelperFunc(noToppingRadio, extraToppingCB) {
	if (noToppingRadio.checked) {
		if (extraToppingCB.checked) {
			extraToppingCB.checked = false;
		}
		extraToppingCB.disabled = true;
	}
	else {
		extraToppingCB.disabled = false;
	}
}

function ToggleExtraSauce() {
	let noSauce = GetElementByID("sauceSelectionNone");
	let cb = GetElementByID("sauceSelectionExtra");
	ToggleExtraToppingHelperFunc(noSauce, cb);
}

function ToggleExtraCheese() {
	let noCheese = GetElementByID("cheeseSelectionNone");
	let cb = GetElementByID("cheeseSelectionExtra");
	ToggleExtraToppingHelperFunc(noCheese, cb);
}

function AddCurrentPizzaToOrder() {

	// helper func to parse data
	function GetSelectedItem(elementsName) {
		console.log("searching for: " + elementsName);
		let output = {val: "", price: 0};
		let elements = GetElementsByName(elementsName);
		console.log("found " + elements.length);
		
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].checked) {
				console.log(i + " was selected");
				output.val = elements[i].value;
				output.price = parseFloat(elements[i].getAttribute("data-price"));
				break;
			}
		}
		console.log(output.val + " - " + output.price);
		return output;
	}

	// another helper func for parsing through the selected veg / meat options
	function GetToppings(name) {
		let output = [];
		console.log("searching for " + name);
		let elements = GetElementsByName(name);
		console.log("found: " + elements.length);
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].checked) {
				console.log(i + " was selected");
				output.push( elements[i].value );
			}
		}
		return output;
	}

	// get pizza size:
	let pizzaSize = GetSelectedItem("pizzaSize");

	// get crust type:
	let crustType = GetSelectedItem("crustSelection");

	// get sauce type:
	let sauceType = GetSelectedItem("sauceSelection");

	// get cheese type:
	let cheeseType = GetSelectedItem("cheeseSelection");

	// get all meats and veggies added to pizza
	let veggieToppingsOnThisPizza = GetToppings("veggieSelection");
	let meatToppingsOnThisPizza = GetToppings("meatSelection");
	let veggieToppingsPrice = 0;
	let meatToppingsPrice = 0;

	console.log("selected vegs: " + veggieToppingsOnThisPizza);
	console.log("selected meat: " + meatToppingsOnThisPizza);

	if (veggieToppingsOnThisPizza.length > 1) {
		veggieToppingsPrice = veggieToppingsOnThisPizza.length - 1;
	}
	if (meatToppingsOnThisPizza.length > 1) {
		meatToppingsPrice = meatToppingsOnThisPizza.length - 1;
	}

	let totalPrice = pizzaSize.price + crustType.price + sauceType.price + cheeseType.price + veggieToppingsPrice + meatToppingsPrice;
	console.log("total price: " + totalPrice);
}