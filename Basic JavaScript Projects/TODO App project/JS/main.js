const KEY = "todo";

function Get(str) {
	return document.getElementById(str);
}

function Create(str) {
	return document.createElement(str);
}

function keyPressFunc(e) {
	if (e.code == "Enter" || e.code == "NumpadEnter") {
		AddItemToList();
	}
}

function Setup() {
	DisplayItems();
	Get("task").addEventListener("keydown", keyPressFunc);
}

function ClearLocalStorage() {
	localStorage.clear();
	DisplayItems();
}

function GetList() {
	// read old todos from local storage
	let todoString = localStorage.getItem(KEY);
	let todoList = new Array;
	if (todoString != null) {
		todoList = JSON.parse(todoString);
	}
	return todoList;
}

function AddItemToList() {
	let newItem = Get("task").value;
	Get("task").value = "";
	if (newItem != null) {
		if (newItem.length == 0) {
			return;
		}
		let todoList = GetList();
		todoList.push(newItem);
		localStorage.setItem(KEY, JSON.stringify(todoList));
		DisplayItems(todoList);
	}
}

function DisplayItems(todoList = null) {
	if (todoList == null) {
		todoList = GetList();
	}

	if (todoList.length == 0) {
		Get("todoListContainer").style.display = "none";
		return;	
	}
	else {
		Get("todoListContainer").style.display = "block";
	}

	let targetList = Get("todoList");
	targetList.innerHTML = "";
	for (let i = 0; i < todoList.length; i++) {
		// create necessary elements
		let listItem = Create("li");
		let container = Create("div");
		let div1 = Create("div");
		let div2 = Create("div");
		let listP = Create("p");
		let clearButton = Create("button");
		
		// assign id/class etc
		listItem.id = "todoItem_" + i;
		div1.className = "listButtonContainer";
		div2.className = "listParaContainer";
		container.className = "itemContainer";
		listP.textContent = todoList[i];
		clearButton.innerHTML = "X";
		clearButton.className = "clear_button";
		clearButton.addEventListener("click", function() {
			RemoveItem(i);
		});

		// append and add to document
		div1.appendChild(clearButton);
		div2.appendChild(listP);
		container.appendChild(div1);
		container.appendChild(div2);
		listItem.appendChild(container);
		targetList.appendChild(listItem);
	}
}

function CreateItemHTML(task, index) {
	return listItem;
}

function RemoveItem(index) {
	let todoList = GetList();
	if (index >= todoList.length || index < 0) {
		return false;
	}
	todoList.splice(index, 1);
	localStorage.setItem(KEY, JSON.stringify(todoList));
	DisplayItems();
	return true;
}