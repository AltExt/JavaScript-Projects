
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let currentPlayer = 1;

const CANVAS_ELEMENT = document.getElementById("TicTacToeCanvas");
const CANVAS = CANVAS_ELEMENT.getContext("2d");

const CANVAS_WIDTH = CANVAS_ELEMENT.width;
const CANVAS_HEIGHT = CANVAS_ELEMENT.height;
const DEAD_ZONE = 7;

const H_INCREMENT = Math.floor(CANVAS_WIDTH / 3);
const V_INCREMENT = Math.floor(CANVAS_HEIGHT / 3);

const GM_PVP = 0;
const GM_PVE = 1;

const GD_EASY = 0;
const GD_NORAML = 1;
const GD_HARD = 2;

const PLAYER_ONE_TURN = 1;
const PLAYER_TWO_TURN = -1;

let xImage;
let oImage;

let allowInputToCanvas = true;
let gameDifficulty = 0;
let gameMode = 0;
let playerChoice = -1;

let playerOneName = "";
let playerTwoName = "";


// Util funcs
function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function RandomWithRange(minimum = 0.0, maximum = 1.0) {
	return (Math.random() * (maximum - minimum)) + minimum;
}

function SwapDivs(d1, d2) {
	document.getElementById(d1).style.display = "none";
	document.getElementById(d2).style.display = "block";
}

// HTML UI Funcs
function MoveToOpponentSelect() {
	SwapDivs("playButtonDiv", "opponentSelectDiv");
}

function GameModeSelection(input) {
	/* */if (input == GM_PVP) {
		gameMode = GM_PVP;
	}
	else if (input == GM_PVE) {
		document.getElementById("playerTwo").value = "Jarvis";
		gameMode = GM_PVE;
	}
	
	SwapDivs("opponentSelectDiv", "playerNamesDiv");
}

function ConfirmPlayerNames() {
	let p1 = document.getElementById("playerOne").value;
	let p2 = document.getElementById("playerTwo").value;

	if ( p1.length == 0 || p2.length == 0 ) {
		const NAMES = ["Alice", "Bob", "Claire", "Dan", "Eunice", "Finbarr", "Geraldine", "Harry", "Ivolthe", "Josh", "Kathrine"];
		if (p1.length == 0) {
			p1 = NAMES[Math.floor(RandomWithRange(0, NAMES.length))];
		}
		if (p2.length == 0) {
			p2 = NAMES[Math.floor(RandomWithRange(0, NAMES.length))];
		}
	}

	playerOneName = p1;
	playerTwoName = p2;

	document.getElementById("playerOneButton").textContent = playerOneName;
	document.getElementById("playerTwoButton").textContent = playerTwoName;

	/* */if (gameMode == GM_PVE) {
		SwapDivs("playerNamesDiv", "difficultySelectionDiv");
	}
	else if (gameMode == GM_PVP) {
		SwapDivs("playerNamesDiv", "turnOrderSelectionDiv");
	}
}

function SetDiff(d) {
	gameDifficulty = d;
	SwapDivs("difficultySelectionDiv", "turnOrderSelectionDiv");
}

function SetPlayerFirst(player) {
	currentPlayer = player;
	SwapDivs("turnOrderSelectionDiv", "TicTacToeCanvas");
	if (gameMode == GM_PVE && currentPlayer == PLAYER_TWO_TURN) {
		allowInputToCanvas = false;
	}
	SetupCanvas();
}

// Setup Funcs
function SetupCanvas() {
	console.log("called");

	let hStartPoint = H_INCREMENT;
	let vStartPoint = V_INCREMENT;

	//CANVAS.fillStyle = "black"
	CANVAS.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	CANVAS.strokeStyle = "rgba(0, 0, 0, 255)";
	CANVAS.lineWidth = (DEAD_ZONE * 2);

	CANVAS.beginPath();
	for (let i = 0; i < 2; i++) {
		let hPosition = hStartPoint + (H_INCREMENT * i);
		CANVAS.moveTo(hPosition, 0);
		CANVAS.lineTo(hPosition, CANVAS_HEIGHT);
		CANVAS.stroke();

		let vPosition = vStartPoint + (V_INCREMENT * i);
		CANVAS.moveTo(0, vPosition);
		CANVAS.lineTo(CANVAS_WIDTH, vPosition);
		CANVAS.stroke();
	}
	CANVAS.lineWidth = 1;
	SetupImages();
	CANVAS_ELEMENT.style.display = "block";

	if (gameMode == GM_PVE && currentPlayer == PLAYER_TWO_TURN) {
		ComputerTurn();
	}
}

function SetupImages() {
	function SetupImage(img, str) {
		img.src = "./images/" + str + ".png";
		//img.width = hIncrement;
		//img.height = vIncrement;
	}

	xImage = new Image();
	oImage = new Image();

	SetupImage(xImage, "x");
	SetupImage(oImage, "o");

	console.log(xImage.width + "w - h" + xImage.height);
}

// Player Input funcs
function PlayerClick(event) {
	if (allowInputToCanvas) {
		let offsetX = CANVAS_ELEMENT.offsetLeft;
		let offsetY = CANVAS_ELEMENT.offsetTop;

		let mousePosX = event.clientX - offsetX;
		let mousePosY = event.clientY - offsetY;

		let playerChoice = CheckClickPositionInBox(mousePosX, mousePosY);
	}
}

function CheckClickPositionInBox(xPos, yPos) {

	if ( xPos < DEAD_ZONE || xPos > CANVAS_WIDTH - DEAD_ZONE ) {
		return -1;
	}
	if ( yPos < DEAD_ZONE || yPos > CANVAS_HEIGHT - DEAD_ZONE ) {
		return -1;
	}

	let hStartPoint = 0;
	let vStartPoint = 0;

	for (let i = 0; i < 3; i++) {
		let yMin = vStartPoint + (V_INCREMENT * i) - DEAD_ZONE;
		let yMax = vStartPoint + (V_INCREMENT * (i + 1)) - DEAD_ZONE;

		for (let j = 0; j < 3; j++) {
			let xMin = hStartPoint + (H_INCREMENT * j) + DEAD_ZONE;
			let xMax = hStartPoint + (H_INCREMENT * (j + 1)) - DEAD_ZONE;

			if ( xPos > xMin && xPos < xMax && yPos > yMin && yPos < yMax  ) {
				return (i * 3) + j;
			}
		}
	}

	return -1;
}

function PlayGame() {
	while (true) {
		// if it is the current player's turn we do nothing, if it is the computer's turn simulate that

		if (gameMode == GM_PVP) {

			if(playerChoice >= 0) {
				if (board[playerChoice] == 0) {
					board[playerChoice] = currentPlayer;
				}
			}
	
			UpdateBoardPVP();
		}
		else if (gameMode == GM_PVE) {
			if (currentPlayer == 1) {
				// normal player turn
			}
			else {
				// 
			}
		}
	}
}

function DrawLatestMove() {
	let drawPosX = H_INCREMENT * (playerChoice % 3) + DEAD_ZONE;
	let drawPosY = V_INCREMENT * Math.floor(playerChoice / 3) + DEAD_ZONE;

	if ( board[playerChoice] == 1 ) {
		CANVAS.drawImage(xImage, drawPosX, drawPosY);
	}
	else {
		CANVAS.drawImage(oImage, drawPosX, drawPosY);
	}
}

function UpdateBoardPVP() {
	if (playerChoice >= 0) {
		DrawLatestMove();
		playerChoice = -1;
		let squares = CheckForWin();
		if ( squares.length != 0 ) {
			allowInputToCanvas = false;
			AnimateWin(squares);
		}
		else {
			currentPlayer *= -1;
		}
	}
}

function UpdateBoardPVE() {

}

function UpdateBoard(calledFromCompTurn = false) {
	// this draw func would be called constantly which is not needed
	for (let i = 0; i < board.length; i++) {
		if (board[i] == 0) continue;

		let drawPosX = H_INCREMENT * (i % 3) + DEAD_ZONE;
		let drawPosY = V_INCREMENT * Math.floor(i / 3) + DEAD_ZONE;
	}

	let squares = CheckForWin();
	if ( squares.length != 0 ) {
		allowInputToCanvas = false;
		AnimateWin(squares);
	}
	else {
		/* */if (gameMode == GM_PVE && !calledFromCompTurn) {
			// computer turn
			allowInputToCanvas = false;
			ComputerTurn();
			allowInputToCanvas = true;

		}
		else if (gameMode == GM_PVP) {
			// other player turn
			currentPlayer *= -1;
		}
	}

	if (calledFromCompTurn) {
		allowInputToCanvas = true;
	}
}

function CheckForWin() {
	// need to check 3 different possible win conditions
	// horiztonal, vertical and diagonal
	
	// this func will take in the 3 square
	function SumParts(a, b, c) {
		let test = board[a] + board[b] + board[c];
		/* */if (test == 3) {
			return "x"
		}
		else if (test == -3) {
			return "o";
		}
		else return "";
	}

	let winner = "";
	let winningSquares = [];

	/*	board
		0, 1, 2
		3, 4, 5
		6, 7, 8
	*/

	if (winner.length == 0) {
		for (let i = 0; i < 3; i++) {
			// horizontal
			let startPoint = i*3;
			winner = SumParts( startPoint, startPoint+1, startPoint+2);
			if (winner.length != 0) {
				// winner
				winningSquares = [ startPoint, startPoint+2, ];
				break;
			}
			
			// vertical
			startPoint = i;
			winner = SumParts(startPoint, startPoint+3, startPoint+6);
			if (winner.length != 0) {
				// winner
				winningSquares = [ startPoint, startPoint+6 ];
				break;
			}
		}
	}

	// diagonal
	if (winner.length == 0) {
		winner = SumParts(0, 4, 8);
		if (winner.length != 0) {
			winningSquares = [ 0, 8 ];
		}
	}
	if (winner.length == 0) {
		winner = SumParts(2, 4, 6);
		if (winner.length != 0) {
			winningSquares = [ 2, 6 ];
		}
	}

	if (winner.length != 0 && winningSquares.length == 2) {
		winningSquares.push(winner);
		return winningSquares;
	}

	return [];
}

async function AnimateWin(squares) {
	let winner = squares.pop();
	
	// first we need to get the centre of the first and last squares so we know which direction we're going in
	// a 2d vector would be great here

	let endPoint = GetCentrePointOfSquare(squares.pop());
	let startPoint = GetCentrePointOfSquare(squares.pop());
	let drawPos = startPoint;

	let loopAmount = 50;
	let totalTime = 600;
	let timeStep = totalTime / loopAmount;

	let dir = GetUnitVec([ endPoint[0] - startPoint[0], endPoint[1] - startPoint[1] ]);
	
	let distTotal = Dist(startPoint, endPoint);
	let distAmt = distTotal  / loopAmount;
	let distanceStep = [dir[0]*distAmt, dir[1]*distAmt];
	
	if (winner == "x") {
		// ac e2 1d
		CANVAS.strokeStyle = "rgba(172, 242, 30, 1.0)";
	}
	else {
		// e2 1d ac
		CANVAS.strokeStyle = "rgba(242, 30, 172, 1.0)";
	}
		
	CANVAS.beginPath();
	let thisthreadwaitsuntilimfuckingdone = true;

	function Step(i = 0) {
		CANVAS.moveTo( drawPos[0], drawPos[1] );
		drawPos[0] += distanceStep[0];
		drawPos[1] += distanceStep[1];
		CANVAS.lineTo(drawPos[0], drawPos[1]);
		CANVAS.lineWidth = 5;
		CANVAS.stroke();

		let t = setTimeout(Step, totalTime / loopAmount, i+1);
		if (i == loopAmount - 1) {
			thisthreadwaitsuntilimfuckingdone = false;
			clearTimeout(t);
		}
	}

	Step();

	console.log("called step, going to sleep");

	await Sleep(totalTime);

	console.log("done");
}

function GetCentrePointOfSquare(square) {
	let x = (square % 3) + 0.5;
	let y = Math.floor(square / 3) + 0.5;

	x *= H_INCREMENT;
	y *= V_INCREMENT;

	return [x, y]
}

function Mag(vec) {
	function Dot(vec1, vec2) {
		return vec1[0] * vec2[0] + vec1[1] * vec2[1];
	}

	return Math.sqrt(Dot(vec, vec));
}

function GetUnitVec(vec) {

	let m = Mag(vec);
	vec[0] /= m;
	vec[1] /= m;

	return vec;
}

function CompareVecs(vec1, vec2) {
	function IsEqual(f1, f2) {
		let TOLERANCE = 0.01;
		return Math.abs(f1 - f2) < TOLERANCE;
	}
	return IsEqual(vec1[0], vec2[0]) && IsEqual(vec1[1], vec2[1]);
}

function Dist(vec1, vec2) {
	let v3 = [vec2[0] - vec1[0], vec2[1] - vec1[1]];
	return Mag(v3);
}

//=============================================================================================================

function ComputerTurn() {

	let move = 0;

	switch(gameDifficulty) {
		case GD_EASY:
			move = CompTurnEasy();
			break;
		case GD_NORAML:
			move = CompTurnMedium();
			break;
		case GD_HARD:
			move = CompTurnHard();
			break;
		default:
			move = CompTurnEasy();
			break;
	}

	ComputerPlayMove(move);
	UpdateBoard(true);
}

function ComputerPlayMove(move) {
	board[move] = currentPlayer * -1;
}

function CompTurnEasy() {

	let winningMoves = GetWinningMoves(currentPlayer)
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

function CompTurnMedium() {
	return CompTurnEasy();
}

function CompTurnHard() {
	return CompTurnEasy();
}

function GetWinningMoves(player) {
	/*  board is as follows: 
		0 1 2
		3 4 5
		6 7 8
	*/
	let output = [];
	let bool = false;
	const TARGET = 2 * player;

	// horizontal threats
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

	// vertical threats
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