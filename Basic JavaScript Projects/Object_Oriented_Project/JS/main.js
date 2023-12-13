function Vehicle(_make, _model, _year, _color) {
    this.Vehicle_Make = _make;
    this.Vehicle_Model = _model;
    this.Vehicle_Year = _year;
    this.Vehicle_Color = _color;
}

var Eoghan = new Vehicle("Skoda", "Fabia", 2013, "Silver");
var Denis = new Vehicle("Skoda", "Superb", 2023, "Red");
var Caroline = new Vehicle("Volkswagen", "Passat", 2015, "White");

function myFunc() {
    document.getElementById("target").innerHTML = "Eoghan drives a " + Eoghan.Vehicle_Color + "-colored " + Eoghan.Vehicle_Model + " manufactured in " + Eoghan.Vehicle_Year;
}