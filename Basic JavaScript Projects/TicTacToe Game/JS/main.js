
function GeneratePlayField() {

	let rows = ["Top", "Mid", "Bottom"];
	let cols = ["L", "M", "R"];
	let targetDiv = document.getElementById("playField");
	targetDiv.className = "row no-gutters";

	for (let i = 0; i < 3; i++) {
		let col = document.createElement("div");
		col.className = "col-sm";
		for (let j = 0; j < 3; j++) {
			let board = document.createElement("div");
			board.className = rows[j] + " " + cols[i] + " TTTSquare";
			col.appendChild(board);
		}
		targetDiv.appendChild(col);
	}
}