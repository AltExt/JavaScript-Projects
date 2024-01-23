let PlayerSelection = "x";
let ComputerSelection = "o";

let Mode = 0;
let Difficulty = 2;
let PlayerLastMove = 0;
let PlayerCanInteract = false;

let hasSomeOneWon = false;
let winner = 0;
let winData = [];

const X_SQUARE = "X-Square";
const O_SQUARE = "O-Square";
const X_SQ_REP = "x";
const O_SQ_REP = "o";
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
	//<canvas id="canvas" width="300px" height="300px"></canvas>

	let targetDiv = document.getElementById("playField");
	targetDiv.className = "row no-gutters";
	let borderStyle = "2px solid black";

	let canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = 300;
	canvas.height = 300;
	canvas.style.display = "none";
	targetDiv.appendChild(canvas);

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

	if ( CheckForWin(PlayerSelection) ) {
		// game over, return
		AnimateGameEnd();
		AllowPlayerToPlayAgain();
	}
	else {
		// here either a computer move or the second player gains control
		if (Mode == PVE_MODE) {
			ComputersTurn();
		}
		else {
			// mode is PVP_MODE
			if (PlayerSelection == X_SQ_REP) {
				PlayerSelection = O_SQ_REP;
			}
			else {
				PlayerSelection = X_SQ_REP;
			}
		}
		if (CheckForWin(ComputerSelection)) {
			AnimateGameEnd();
			AllowPlayerToPlayAgain();
		}
	}
}

function AnimateGameEnd() {
	console.log("AnimateGameEnd");
	if ( winData.length == 1 ) {
		return;
	}
	console.log("winData: " + winData);

	const C_ELEMENT = document.getElementById("canvas");
	const CANVAS = C_ELEMENT.getContext("2d");

	C_ELEMENT.style.display = "block"
	let startPoint = GetCentrePointOfSquare(winData[0]);
	let endPoint = GetCentrePointOfSquare(winData[2]);
	let startX = startPoint[0], startY = startPoint[1];
	let endX = endPoint[0], endY = endPoint[1];
	let drawX = startX, drawY = startY;
	let distance = Math.sqrt( ((endX - startX) ** 2) + ((endY - startY) ** 2) );
	
	const STEP_AMT = 90;
	const STEP_DST = distance / STEP_AMT;

	function AnimateLine() {
		const animationLoop = requestAnimationFrame(AnimateLine);
		CANVAS.beginPath();
		CANVAS.moveTo(startX, startY);
		CANVAS.lineTo(drawX, drawY);
		CANVAS.lineWidth = 5;
		CANVAS.strokeStyle = "rgba(172, 242, 30, 1.0)"; // ac e2 1d
		CANVAS.stroke();

		// because of how i'm storing windata i know the 0th element will be top/left
		// and the 2nd element will be bottom/right

		if ( drawX < endX ) {
			drawX += STEP_DST;
		}
		if ( drawY < endY ) {
			drawY += STEP_DST;
		}
		if (drawX >= endX && drawY >= endY) {
			cancelAnimationFrame(animationLoop);
		}
	}
	AnimateLine();
}

function GetCentrePointOfSquare(square) {
	const CELL_WIDTH = document.getElementById("canvas").width / 3;
	const CELL_HEIGHT = document.getElementById("canvas").height / 3;

	let y = (square % 3) + 0.5;
	let x = Math.floor(square / 3) + 0.5;

	x *= CELL_WIDTH;
	y *= CELL_HEIGHT;

	return [x, y]
}

function GetBoardState() {
	// get the board and store each cell as 1 0 or -1

	let board = [];
	let elements = document.getElementsByClassName("TTTSquare");
	for (let i = 0; i < elements.length; i++) {
		let className = elements[i].className;
		/* */if (className.includes(X_SQUARE)) {
			board.push(X_SQ_REP);
		}
		else if (className.includes(O_SQUARE)) {
			board.push(O_SQ_REP);
		}
		else {
			board.push(0);
		}
	}

	return board;
}

function CheckForWin(currentPlayer) {

	let board = GetBoardState();

	// helper function
	function SumParts(parts) {
		return  board[parts[0]]!=0 &&
				board[parts[0]]==board[parts[1]] && 
				board[parts[1]]==board[parts[2]];
	}
	
	/*	board layout
		0	3	6
		1	4	7
		2	5	8
	*/

	for(let i = 0; i < 3; i++) {
		let horizontal = [i, i+3, i+6, currentPlayer];
		if (SumParts(horizontal)) {
			winData = horizontal;
			return true;
		}

		let j = i*3;
		let vertical = [j, j+1, j+2, currentPlayer];
		if (SumParts(vertical)) {
			winData = vertical
			return true;
		}
	}
	
	let d1 = [0, 4, 8, currentPlayer];
	if (SumParts(d1)) {
		winData = d1;
		return true; 
	}
	let d2 = [2, 4, 6, currentPlayer];
	if (SumParts(d2)) {
		winData = d2;
		return true; 
	}

	for (let i = 0; i < board.length; i++) {
		if (board[i] == 0) {
			return false;
		}
	}
	winData = [false];
	return true;
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