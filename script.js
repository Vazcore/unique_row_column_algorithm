var field,
	setFieldBtn = document.querySelector("#setField"),
	calcBtn = document.querySelector("#calcBtn"),
	possibleValues,
	preDefined,
	n,
	limit = 1,
	smallestPossibleSequence = 0, 
	sequence,
	backUpField,
	setPredefined = false;


setFieldBtn.addEventListener("click", function (event) {
	n = parseInt(document.querySelector("#n").value);
	limit = n * n;
	sequence = createSequence(n);
	field = createField(n);
	possibleValues = createField(n);
	preDefined = createField(n);
	drawField(field);
});

calcBtn.addEventListener("click", function (event) {
	let failue = false;
	fillFieldWithValues(field);

	
	for (let i = 0; i < limit; i++) {
		let isSolved = calculate(field, setPredefined);
		updateField(field);
		
		if (isSolved === true) {
			break;
		}
		if (isSolved > 1) {
			if (!failue) {
				backUpField = createBackUp(field);
			}
			isSolved = calculate(field, setPredefined);
			updateField(field);			
			calculateManually(field, isSolved);
		}
	}
	
});

function calculateManually(field, smallestPossibleSequence) {
	let filled = false;
	for (var i = 0; i < n; i++) {
		if (filled === true) break;
		for (var j = 0; j < n; j++) {			
			if (field[i][j] === 0 && possibleValues[i][j].length === smallestPossibleSequence) {
				field[i][j] = possibleValues[i][j][0];
				filled = true;
				break;
			}
		}
	}
	return field;
}

function createBackUp(field) {
	let backUp = [];
	for (var i = 0; i < n; i++) {
		backUp[i] = [];
		for (var j = 0; j < n; j++) {
			backUp[i][j] = field[i][j];
		}
	}
	return backUp;
}

function calculate(field, predefined) {
	var leftElementsToSolve = 0,
	smallestPossibleSequence = n * 2;

	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			if (field[i][j] === 0) {				
				let exceptValues = [];
				
				leftElementsToSolve++;

				getValuesInRow(field, i, j, exceptValues);
				getValuesInColumn(field, j, i, exceptValues);

				possibleValues[i][j] = findPossibleValues(exceptValues);

				if (
					possibleValues[i][j].length !== 0 
					&& 
					possibleValues[i][j].length < smallestPossibleSequence
				) {
					smallestPossibleSequence = possibleValues[i][j].length;
				}

				if (possibleValues[i][j].length === 1) {
					field[i][j] = possibleValues[i][j][0];
				}
			} else {
				// pre defined
				if (predefined !== true) {
					preDefined[i][j] = field[i][j];
					setPredefined = true;
				}
			}
		}	
	}

	if (smallestPossibleSequence !== 1 && smallestPossibleSequence !==  n*2) {
		return smallestPossibleSequence;
	}

	return leftElementsToSolve === 0;
}

function createSequence(n) {
	var sequence = [];
	for (let i = 0; i < n; i++) {
		sequence.push(i+1);
	}
	return sequence;
}

function updateField(field) {
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			document.querySelector("tr[data-n='"+i+"'] td[data-n='"+j+"'] input").value = field[i][j] !== 0 ? field[i][j] : NaN;
		}	
	}
}

function fillFieldWithValues(field) {
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			let value = parseInt(
				document.querySelector("tr[data-n='"+i+"'] td[data-n='"+j+"'] input")
				.value
			);

			field[i][j] = value || 0;
		}	
	}
	return field;
}

function findPossibleValues(exceptValues) {
	return sequence.filter(function (el) {
		return exceptValues.indexOf(el) === -1;
	});
}

function getValuesInRow (field, row, exceptColumn, values) {
	for (var i = 0; i < n; i++) {
		if (i !== exceptColumn) {
			let value = field[row][i];
			if (value !== 0 && values.indexOf(value) === -1) {
				values.push(value);
			}
		}
	}
	return values;
}

function getValuesInColumn (field, column, exceptRow, values) {
	for (var i = 0; i < n; i++) {
		if (i !== exceptRow) {
			let value = field[i][column];
			if (value !== 0 && values.indexOf(value) === -1) {
				values.push(value);
			}
		}
	}
	return values;
}

function createField(n) {
	var field = [];
	for (var i = 0; i < n; i++) {
		field[i] = []; 
		for (var j = 0; j < n; j++) {
			field[i][j] = 0;
		}	
	}
	return field;
}

function drawField(field) {
	var table = document.createElement("table");
	for (var i = 0; i < n; i++) {
		let tr = document.createElement("tr");
		tr.setAttribute("data-n", i);
		table.appendChild(tr);
		for (var j = 0; j < n; j++) {
			let td = document.createElement("td");
			let input = document.createElement("input");
			input.setAttribute("type", "number");
			td.setAttribute("data-n", j);
			td.appendChild(input);
			tr.appendChild(td);
		}	
	}
	document.querySelector("body").appendChild(table);
}






