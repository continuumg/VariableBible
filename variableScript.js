const passages = {};
const text = [];
var passage = [];
var index = [];
var locks = [];


function randomizeBible(pas) {

	passage = passages[pas];
	for (let i = 0; i < passage.length; i++) {
		document.write("<br>");
		let variant = passage[i][Math.floor(Math.random() * passage[i].length)]; 
		let txt = document.createTextNode(variant);
		document.body.appendChild(txt);
	}

}

function randomizeBibleAdv(pas) {

	passage = passages[pas];
	for (let i = 0; i < passage.length; i++) {
		index[i] = Math.floor(Math.random() * (passage[i].length-1))+1
		let variant = passage[i][index[i]]; 
		for (let j = 0; j < passage[i][0]; j++) {
			document.write("<br>");
		}
		text[i] = document.createElement("span");
		text[i].innerText = variant;
		text[i].addEventListener('click', function handleClick(event) {
		   event.preventDefault();
 		   randomizeText(i);
		});
		text[i].addEventListener("contextmenu", function(event) {
		    event.preventDefault();
		    lockText(i);
		});
		text[i].addEventListener("wheel", function(event) {
			if (!locks[i]) {
			    event.preventDefault();
			    wheelText(i, event.deltaY > 0);
			}
		});
		text[i].addEventListener("mouseenter", function(event) {
			if (!locks[i]) {
			    highlightText(i, true);
			}
		});
		text[i].addEventListener("mouseleave", function(event) {
			highlightText(i, false);
		});
		locks[i] = false;
		if (passage[i].length == 2) {
			superLockText(i);
		}
		document.body.appendChild(text[i]);
	}

}

function createText(id) {

}

function randomizeText(id) {
	if ((!locks[id]) && (passage[id].length > 2)) {
		for (let i = index[id]; i == index[id]; i) {
			index[id] = Math.floor(Math.random() * (passage[id].length-1))+1
		}
		let variant = passage[id][index[id]];
		text[id].innerText = variant;
	}
}

function textUp(id) {
	if (!locks[id]) {
		if (index[id] < passage[id].length - 1) {
			index[id] += 1;
		}
		else {
			index[id] = 1;
		}
		let variant = passage[id][index[id]];
		text[id].innerText = variant;
	}
}

function textDown(id) {
	if (!locks[id]) {
		if (index[id] > 1) {
			index[id] -= 1;
		}
		else {
			index[id] = passage[id].length - 1;
		}
		let variant = passage[id][index[id]];
		text[id].innerText = variant;
	}
}

function lockText(id) {
	if (locks[id] && (passage[id].length > 2)) {
		locks[id] = false;
		text[id].style.color = "black";
	}
	else {
		locks[id] = true;
		text[id].style.color = "grey";
	//	text[id].style.backgroundColor  = "???"; Also need to turn off white background swappin
	}
}

function superLockText(id) {
	locks[id] = true;
//	text[id].style.color = "lightgrey";
	text[id].style.backgroundColor  = "lightgrey";
}

function wheelText(id, up = false) {
	if (up) {
		textUp(id);
	}
	else {
		textDown(id);
	}
}

function highlightText(id, on = false) {
	if (on) {
		text[id].style.backgroundColor  = "yellow";
	}
	else {
		if (passage[id].length > 2) {
			text[id].style.backgroundColor  = "white";
		}
	}
}