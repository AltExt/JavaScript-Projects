let PlayerSelection = "x";
let ComputerSelection = "o";

let Mode = 0;
let Difficulty = 2;
let PlayerLastMove = 0;
let PlayerCanInteract = false;

const X_SQUARE = "X-Square";
const O_SQUARE = "O-Square";
const cols = ["L", "M", "R"];
const rows = ["Top", "Mid", "Bot"];

const PVP_MODE = 0;
const PVE_MODE = 1;

const LOW_DIFF = 0;
const MED_DIFF = 1;
const HIGH_DIFF = 2;


function RandomWithRange(minimum = 0.0, maximum = 1.0) {
	return (Math.random() * (maximum - minimum)) + minimum;
}

function GoToPlayerSelect() {
	document.getElementById("playButton").style.visibility = "hidden";
	
	document.getElementById("twoPlayerModeButton").style.visibility = "visible";
	document.getElementById("computerModeButton").style.visibility = "visible";
}


function SetMode(mode) {
	Mode = mode;
	
	document.getElementById("twoPlayerModeButton").style.visibility = "hidden";
	document.getElementById("computerModeButton").style.visibility = "hidden";
	
	if (mode == PVP_MODE) {
		GeneratePlayField();
		return;
	}
	
	document.getElementById("lowDiffButton").style.visibility = "visible";
	document.getElementById("medDiffButton").style.visibility = "visible";
	document.getElementById("highDiffButton").style.visibility = "visible";
}

function SetDiff(diff) {
	Difficulty = diff;
	
	document.getElementById("lowDiffButton").style.visibility = "hidden";
	document.getElementById("medDiffButton").style.visibility = "hidden";
	document.getElementById("highDiffButton").style.visibility = "hidden";
	
	GeneratePlayField();
}

function GeneratePlayField() {

	let targetDiv = document.getElementById("playField");
	targetDiv.className = "row no-gutters";
	let borderStyle = "2px solid black";

	for (let i = 0; i < 3; i++) {
		let col = document.createElement("div");
		col.className = "col-sm";
		for (let j = 0; j < 3; j++) {
			let board = document.createElement("div");
			let wrapper = document.createElement("div");
			let img = document.createElement("img");
			board.className = rows[j] + "-" + cols[i] + " TTTSquare";
			board.id = "sq-" + rows[j] +  "-" + cols[i];
			wrapper.className = "Wrapper";
			img.className = "TTTImage";
			img.id = "img-" + rows[j] +  "-" + cols[i];
			switch(i) {
				case 0:
					board.style.borderRight = borderStyle;
					break;
				case 1:
					board.style.borderRight = borderStyle;
				case 2:
					board.style.borderLeft = borderStyle;
					break;
			}

			switch(j) {
				case 0:
					board.style.borderBottom = borderStyle;
					break;
				case 1:
					board.style.borderBottom = borderStyle;
				case 2:
					board.style.borderTop = borderStyle;
					break;
			}
			wrapper.appendChild(img);
			board.appendChild(wrapper);
			col.appendChild(board);
		}
		targetDiv.appendChild(col);
	}
	PlayerCanInteract = true;
	AddOnClickEvents();
}

function ClearPlayField() {
	let targetDiv = document.getElementById("playField");
	while ( true ) {
		if (targetDiv.firstChild) {
			targetDiv.removeChild(targetDiv.firstChild);
		}
		else {
			break;
		}
	}
}

function AddOnClickEvents() {
	let elements = document.getElementsByClassName("TTTSquare");
	for (let i = 0; i < elements.length; i++) {
		let element = elements[i];
		element.addEventListener("mouseenter", function () {
			OnMouseEnterFunc(this);
		}, false);
		element.addEventListener("mouseleave", function () {
			OnMouseLeaveFunc(this);
		}, false);
		element.addEventListener("click", function () {
			OnClickFunc(this);
		}, false);
	}
}

function OnMouseEnterFunc(element) {
	// draw outline of possible placement, if none already there
	let className = element.className;
	if (className.includes(X_SQUARE) || className.includes(O_SQUARE)) {
		return;
	}
	let id = element.id.substring(2);
	id = "img" + id;
	let img = document.getElementById(id);
	img.src = ("Images/" + PlayerSelection + ".png");
	img.style.opacity = 0.1;
	img.style.display = "block";
}

function OnMouseLeaveFunc(element) {
	let className = element.className;
	if (className.includes(X_SQUARE) || className.includes(O_SQUARE)) {
		return;
	}
	let id = element.id.substring(2);
	id = "img" + id;
	let img = document.getElementById(id);
	img.src = "";
	img.style.opacity = 1.0;
	img.style.display = "none";
}

function OnClickFunc(element) {
	if (PlayerCanInteract) {
		let className = element.className;
		if (className.includes(X_SQUARE) || className.includes(O_SQUARE)) {
			return;
		}
		let s = " ";
		if (PlayerSelection == "x") {
			s += X_SQUARE;
		}
		else {
			s += O_SQUARE;
		}

		element.className += s;
		let id = element.id.substring(2);

		// here we can get the player's actual move:
		let row = id.substring(1, 4);
		let col = id.substring(5);
		let i = 0;
		let j = 0;
		for (i = 0; i < rows.length; i++) {
			if (row == rows[i]) {
				break;
			}
		}
		for (j = 0; j < cols.length; j++) {
			if (col == cols[j]) {
				break;
			}
		}

		PlayerLastMove = i + (3 * j);

		id = "img" + id;
		let img = document.getElementById(id);
		img.style.opacity = 1.0;

		RunOtherTurn();
}
}

function RunOtherTurn() {
	// check if the player's move won, if not then take a computer turn and check that before passing back to the player, or reset the player's selection for 2 player mode

	if ( CheckForWin() ) {
		// game over, return
		AllowPlayerToPlayAgain();
	}
	else {
		// here either a computer move or the second player gains control
		if (Mode == PVE_MODE) {
			ComputersTurn();
		}
		else {
			// mode is PVP_MODE
			if (PlayerSelection == "x") {
				PlayerSelection = "o";
			}
			else {
				PlayerSelection = "x";
			}
		}
		if (CheckForWin()) {
			AllowPlayerToPlayAgain();
		}
	}
}

function GetBoardState() {
	// get the board and store each cell as 1 0 or -1

	let board = [];
	let elements = document.getElementsByClassName("TTTSquare");
	for (let i = 0; i < elements.length; i++) {
		let className = elements[i].className;
		/* */if (className.includes(X_SQUARE)) {
			board.push(1);
		}
		else if (className.includes(O_SQUARE)) {
			board.push(-1);
		}
		else {
			board.push(0);
		}
	}

	return board;
}

function CheckForWin() {

	let board = GetBoardState();

	let hasSomeOneWon = false;
	let winner = 0;

	// check vertically
	if (!hasSomeOneWon) {
		for (let i = 0; i < board.length; i+=3) {
			let test = board[i] + board[i+1] + board[i+2];
			/* */if (test === 3) {
				hasSomeOneWon = true;
				winner = 1;
				break;
			}
			else if (test === -3) {
				hasSomeOneWon = true;
				winner = -1;
				break;
			}
		}
	}

	// check horizontally
	if (!hasSomeOneWon) {
		for (let i = 0; i < 3; i++) {
			let test = board[i] + board[i+3] + board[i+6];
			/* */if (test === 3) {
				hasSomeOneWon = true;
				winner = 1;
				break;
			}
			else if (test === -3) {
				hasSomeOneWon = true;
				winner = -1;
				break;
			}
		}
	}

	// check diagonals
	if (!hasSomeOneWon) {
		let d1 = board[0] + board[4] + board[8];
		let d2 = board[6] + board[4] + board[2];

		/* */if (d1 === 3 || d2 === 3) {
			hasSomeOneWon = true;
			winner = 1;
		}
		else if (d1 === -3 || d2 === -3) {
			hasSomeOneWon = true;
			winner = -1;
		}
	}

	// check if board is full
	if (!hasSomeOneWon) {
		let x = 0;
		for (let i = 0; i < board.length; i++) {
			x += Math.abs(board[i]);
		}
		if (x >= 9) {
			hasSomeOneWon = true;
			winner = -100;
		}
	}

	if (hasSomeOneWon) {
		/* */if (winner == 1) {
			alert("X Won!");
		}
		else if (winner == -1) {
			alert("O Won!");
		}
		else {
			alert("Draw!");
		}
		return true;
	}
	else return false;
}


function ComputersTurn() {
	/*  board is as follows: 
		0	3	6
		1	4	7
		2	5	8

		easy should pick a random empty cell, unless the comp has 2 in a row then it will try to win
		medium will have a 50/50 of blocking your win or trying to win itself
		hard should try to tie / win every game
	*/

	let board = GetBoardState();

	let compNumber = (PlayerSelection == "x") ? -1: 1;
	let move = 0;
	console.log(board);
	console.log("comp num: " + compNumber);
	switch(Difficulty) {
		case LOW_DIFF:
			move = CompTurnEasy(board, compNumber);
			break;
		case MED_DIFF:
			move = CompTurnMedium(board, compNumber);
			break;
		case HIGH_DIFF:
			move = CompTurnHard(board, compNumber);
			break;
		default:
			move = CompTurnEasy(board, compNumber);
			break;
	}
	ComputerPlayMove(move);
}

function CompTurnEasy(board, compNumber) {

	let winningMoves = GetWinningMoves(board, compNumber)
	if (winningMoves.length != 0) {
		return winningMoves[0];
	}

	while (true) {
		let r = Math.floor(RandomWithRange(0, 9));

		if (board[r] == 0) {
			return r;
		}
	}
}

function CompTurnMedium(board, compNumber) {
	let winningMoves = GetWinningMoves(board, compNumber);
	if (winningMoves.length != 0) {
		console.log("Winning move found 1!");
		return winningMoves[0];
	}

	let threats = GetWinningMoves(board, compNumber * -1);
	if (threats.length != 0) {
		return threats[0];
	}
	
	while (true) {
		let r = Math.floor(RandomWithRange(0, 9));

		if (board[r] == 0) {
			return r;
		}
	}
}

function CompTurnHard(board, compNumber) {
	// if this is the first turn, all we need to do is make sure we make a move in one of the diagonals
	let winningMoves = GetWinningMoves(board, compNumber);
	if (winningMoves.length != 0) {
		console.log("Winning move found 1!");
		return winningMoves[0];
	}

	let threats = GetWinningMoves(board, compNumber * -1);
	if (threats.length != 0) {
		return threats[0];
	}
	
	let corners = [0, 2, 6, 8]
	let middles = [1, 3, 5, 7];
	let centre = 4;
	// at this point, its most likely best to secure the centre, then a corner, then a middle 

	if (board[centre] == 0) {
		return centre;
	}
	else {
		for (let i = 0; i < corners.length; i++) {
			if (board[corners[i]] == 0) {
				return corners[i];
			}
		}

		for (let i = 0; i < middles.length; i++) {
			if (board[middles[i]] == 0) {
				return middles[i]
			}
		}
	}

	while (true) {
		let r = Math.floor(RandomWithRange(0, 9));

		if (board[r] == 0) {
			return r;
		}
	}
}

function ComputerPlayMove(move) {
	// need to decode the move into a row and column to add a thing to
	let x = move % 3;
	let y = Math.floor(move / 3);

	let str = "sq-" + rows[x] + "-" + cols[y];

	let element = document.getElementById(str);
	let s = " ";
	if (ComputerSelection == "x") {
		s += X_SQUARE;
	}
	else {
		s += O_SQUARE;
	}

	element.className += s;
	let id = element.id.substring(2);
	id = "img" + id;
	let img = document.getElementById(id);
	img.src = ("Images/" + ComputerSelection + ".png");
	img.style.opacity = 1.0;
	img.style.display = "block";
}

function GetWinningMoves(board, player) {
	/*  board is as follows: 
		0	3	6
		1	4	7
		2	5	8
	*/
	let output = [];
	let bool = false;
	const TARGET = 2 * player;

	// vertical threats
	if (bool) {
		let v1Threat1 = board[0] + board[1];
		let v1Threat2 = board[1] + board[2];
		let v1Threat3 = board[0] + board[2];
		let v1Pos1 = board[2];
		let v1Pos2 = board[0];
		let v1Pos3 = board[1];

		let v2Threat1 = board[3] + board[4];
		let v2Threat2 = board[4] + board[5];
		let v2Threat3 = board[3] + board[5];
		let v2Pos1 = board[4];
		let v2Pos2 = board[3];
		let v2Pos3 = board[5];

		let v3Threat1 = board[6] + board[7];
		let v3Threat2 = board[7] + board[8];
		let v3Threat3 = board[6] + board[8];
		let v3Pos1 = board[7];
		let v3Pos2 = board[6];
		let v3Pos3 = board[8];

		console.log("v1:");
		console.log( v1Threat1 + " - " + v1Pos1 );
		console.log( v1Threat2 + " - " + v1Pos2 );
		console.log( v1Threat3 + " - " + v1Pos3 );
		
		console.log("v2:");
		console.log( v2Threat1 + " - " + v2Pos1 );
		console.log( v2Threat2 + " - " + v2Pos2 );
		console.log( v2Threat3 + " - " + v2Pos3 );
		
		console.log("v3:");
		console.log( v3Threat1 + " - " + v3Pos1 );
		console.log( v3Threat2 + " - " + v3Pos2 );
		console.log( v3Threat3 + " - " + v3Pos3 );
	}

	for (let i = 0; i < board.length; i += 3) {
		if (board[i] + board[i+1] == TARGET && board[i+2] == 0) {
			output.push(i+2);
		}
		if (board[i+1] + board[i+2] == TARGET && board[i] == 0) {
			output.push(i);
		}
		if (board[i] + board[i+2] == TARGET && board[i+1] == 0) {
			output.push(i+1);
		}
	}

	// horizontal threats
	if (bool) {
		let h1Threat1 = board[0] + board[3];
		let h1Threat2 = board[3] + board[6];
		let h1Threat3 = board[0] + board[6];
		let h1Pos1 = board[6];
		let h1Pos2 = board[0];
		let h1Pos3 = board[3];
		
		let h2Threat1 = board[1] + board[4];
		let h2Threat2 = board[4] + board[7];
		let h2Threat3 = board[1] + board[7];
		let h2Pos1 = board[7];
		let h2Pos2 = board[1];
		let h2Pos3 = board[4];
		
		let h3Threat1 = board[2] + board[5];
		let h3Threat2 = board[5] + board[8];
		let h3Threat3 = board[2] + board[8];
		let h3Pos1 = board[8];
		let h3Pos2 = board[2];
		let h3Pos3 = board[5];

		console.log("h1:");
		console.log( h1Threat1 + " - " + h1Pos1 );
		console.log( h1Threat2 + " - " + h1Pos2 );
		console.log( h1Threat3 + " - " + h1Pos3 );
		
		console.log("h2:");
		console.log( h2Threat1 + " - " + h2Pos1 );
		console.log( h2Threat2 + " - " + h2Pos2 );
		console.log( h2Threat3 + " - " + h2Pos3 );
		
		console.log("h3:");
		console.log( h3Threat1 + " - " + h3Pos1 );
		console.log( h3Threat2 + " - " + h3Pos2 );
		console.log( h3Threat3 + " - " + h3Pos3 );
	}

	for (let i = 0; i < 3; i++) {
		if (board[i] + board[i+3] == TARGET && board[i+6] == 0) {
			output.push(i+6);
		}
		if (board[i+3] + board[i+6] == TARGET && board[i] == 0) {
			output.push(i);
		}
		if (board[i] + board[i+6] == TARGET && board[i+3] == 0) {
			output.push(i+3);
		}
	}

	// diagonal threats
	if (bool) {
		let d1Threat1 = board[0] + board[4];
		let d1Threat2 = board[0] + board[8];
		let d1Threat3 = board[4] + board[8];
		let d1Pos1 = board[8];
		let d1Pos2 = board[4];
		let d1Pos3 = board[0];

		let d2Threat1 = board[2] + board[4];
		let d2Threat2 = board[2] + board[6];
		let d2Threat3 = board[4] + board[6];
		let d2Pos1 = board[6];
		let d2Pos2 = board[4];
		let d2Pos3 = board[2];

		console.log("d1:");
		console.log( d1Threat1 + " - " + d1Pos1 );
		console.log( d1Threat2 + " - " + d1Pos2 );
		console.log( d1Threat3 + " - " + d1Pos3 );
		
		console.log("d2:");
		console.log( d2Threat1 + " - " + d2Pos1 );
		console.log( d2Threat2 + " - " + d2Pos2 );
		console.log( d2Threat3 + " - " + d2Pos3 );
	}

	if (board[0] + board[4] == TARGET && board[8] == 0) {	
		output.push(8);
	}
	if (board[4] + board[8] == TARGET && board[0] == 0) {	
		output.push(0);
	}
	if (board[0] + board[8] == TARGET && board[4] == 0) {
		output.push(4);
	}

	if (board[6] + board[4] == TARGET && board[2] == 0) {
		output.push(2);
	}
	if (board[2] + board[4] == TARGET && board[6] == 0) {
		output.push(6);
	}
	if (board[2] + board[6] == TARGET && board[4] == 0) {
		output.push(4);
	}

	return output;
}

function AllowPlayerToPlayAgain() {
	PlayerCanInteract = false;
	document.getElementById("playAgainButton").style.visibility = "visible";
}

function PlayAgian() {
	ClearPlayField();
	
	document.getElementById("playAgainButton").style.visibility = "hidden";
	document.getElementById("playButton").style.visibility = "visible";
}