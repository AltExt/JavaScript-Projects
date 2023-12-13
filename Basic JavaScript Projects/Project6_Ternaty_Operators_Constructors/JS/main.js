function RideFunc() {
    var height = document.getElementById("height").value;
    var canRide = (height >= 52) ? "You are tall enough" : "You are too short";
    document.getElementById("ride").innerHTML = canRide + " to ride.";
}

function VoteFunc() {
    var age = document.getElementById("age").value;
    var canVote = (age >= 18) ? "Your are old enough" : "You are not old enough";
    document.getElementById("vote").innerHTML = canVote + " to vote";
}