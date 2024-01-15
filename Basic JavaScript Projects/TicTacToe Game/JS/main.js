let PlayerSelection = "x";
let ComputerSelection = "o";
let Mode = 0;
let Difficulty = 0;
const X_SQUARE = "X-Square";
const O_SQUARE = "O-Square";
const cols = ["L", "M", "R"];
const rows = ["Top", "Mid", "Bottom"];

function RandomWithRange(minimum = 0.0, maximum = 1.0) {
	return (Math.random() * (maximum - minimum)) + minimum;
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
	GeneratePlayField();
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
	id = "img" + id;
	let img = document.getElementById(id);
	img.style.opacity = 1.0;

	CheckForWin();
}

function CheckForWin() {
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
		return;
	}
	else {
		console.log("in here");
		if ( Mode == 0 ) {
			ComptersTurn(board);
		}
		else {
			if (PlayerSelection == "x") {
				console.log("setting player selection to o");
				PlayerSelection = "o";
			}
			else {
				PlayerSelection = "x";
			}
		}
	}
}


function ComptersTurn(board) {
	/*  board is as follows: 
		0	3	6
		1	4	7
		2	5	8

		easy should pick a random empty cell, unless the comp has 2 in a row then it will try to win
		medium will have a 50/50 of blocking your win or trying to win itself
		hard should try to tie / win every game
	*/

	let compNumber = (PlayerSelection == "x") ? -1: 1;
	let move = 0;
	switch(Difficulty) {
		case 0:
			move = CompTurnEasy(board, compNumber);
			break;
		case 1:
			move = CompTurnMedium(board, compNumber);
			break;
		case 2:
			move = CompTurnHard(board, compNumber);
			break;
		default:
			move = CompTurnEasy(board, compNumber);
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

}

function CompTurnHard(board, compNumber) {

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
	let output = [];
	const TARGET = 2 * player;
	// vertical threats
	for (let i = 0; i < board.length; i += 3) {
		/* */if (board[i] + board[i+1] == TARGET && board[i+2] == 0) {
			output.push(i+2);
		}
		else if (board[i+1] + board[i+2] == TARGET && board[i] == 0) {
			output.push(i);
		}
	}

	// horizontal threats
	for (let i = 0; i < 3; i++) {
		/* */if (board[i] + board[i+3] == TARGET && board[i+6] == 0) {
			output.push(i+6);
		}
		else if (board[i+3] + board[i+6] == TARGET && board[i] == 0) {
			output.push(i);
		}
	}

	// diagonal threats
	/* */if (board[0] + board[4] == TARGET && board[8] == 0) {	
		output.push(8);
	}
	else if (board[4] + board[8] == TARGET && board[0] == 0) {	
		output.push(0);
	}

	/* */if (board[6] + board[4] == TARGET && board[2] == 0) {
		output.push(2);
	}
	else if (board[2] + board[4] == TARGET && board[6] == 0) {
		output.push(6);
	}

	return output;
}