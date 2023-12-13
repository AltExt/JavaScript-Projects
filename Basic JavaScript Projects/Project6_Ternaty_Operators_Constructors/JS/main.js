
function RideFunc() {
    // checks the height supplied against a value
    // uses a ternaty operator to do so
    var height = document.getElementById("height").value;
    var canRide = (height >= 52) ? "You are tall enough" : "You are too short";
    document.getElementById("ride").innerHTML = canRide + " to ride.";
}

function VoteFunc() {
    // checks the age supplied against a value
    // uses a ternaty operator to do so
    var age = document.getElementById("age").value;
    var canVote = (age >= 18) ? "Your are old enough" : "You are not old enough";
    document.getElementById("vote").innerHTML = canVote + " to vote";
}

function Ball(_radius, _color) {
    // ball constructor
    this.radius = _radius;
    this.color = _color;
}

function newFunc() {
    // create a new ball and output to screen
    var b = new Ball(5, "Red");
    document.getElementById("newTarget").innerHTML = "Created a new ball object, radius: " + b.radius + ", color: " + b.color;
    // not sure if memory management is important in JS so i'm deleting the object at the end of the func
    delete b;
}

function Count() {
    // example of nested functions
    document.getElementById("countTarget").innerHTML = CountFunc();
    
    function CountFunc() {
        // first nested function

        // read in the value of the target paragraph. if null or not an int set to 0
        var startingPoint = parseInt(document.getElementById("countTarget").innerHTML);
        if (!startingPoint) {
            startingPoint = 0;
        }

        // define the func to add one to the start point
        function AddOne() {
            // second nested function
            startingPoint++;
        }
        AddOne();
        
        return startingPoint;
    }
}