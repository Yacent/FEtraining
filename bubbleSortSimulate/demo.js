// some prefix statement
var numBox = document.getElementsByClassName("num-box"); // fetch the item of num-box
var iArrow = document.getElementsByClassName("i-arrow")[0];
var jArrow = document.getElementsByClassName("j-arrow")[0];

// init the position of num-box
for (var i = 0, len = numBox.length; i < len; i++) {
	numBox[i].style.left = (i * 50) + "px";
}

// get the value of each num-box
var numValue = Array.prototype.map.call(numBox, function(item) {
	return parseInt(item.innerHTML);
})

// get the target num-box
// using decend since that the before will be sort firstly and it will
// use more memory if using ascending
function getTargetNumBox(n) {
	for (var i = numBox.length - 1; i >= 0; i--) {
		if (parseInt(numBox[i].style.left) === n * 50) {
			return numBox[i];
		}
	}
}

// record the state of the bubble
function bubbleSortState(numValue) {
	this.numValue = numValue;
	this.len = numValue.length;
	this.i = 0;
	this.j = this.len - 1;

	// init the position of the i, j arrow
	iArrow.style.left = (this.i * 50) + "px";
	jArrow.style.left = (this.j * 50) + "px";
}

// judge whether it is to the end
bubbleSortState.prototype.isFinish = function() {
	return this.i == this.len - 1;
}

// the inner loop, decline j each step until j == i
bubbleSortState.prototype.update = function() {
	this.j -= 1;
	if (this.j == this.i) {
		this.i += 1;
		this.j = this.len - 1;
	}
	iArrow.style.left = (this.i * 50) + "px";
	jArrow.style.left = (this.j * 50) + "px";
}

// exec the loop and do the exchange using setInterval | setTimeout
bubbleSortState.prototype.fire = function() {
	var that = this;
	if (!this.isFinish()) {

		// disabled the go button
		btn.setAttribute("disabled", "disabled");

		if (this.numValue[this.j - 1] > this.numValue[this.j]) {
			// deal with the array
			var tmp = this.numValue[this.j];
			this.numValue[this.j] = this.numValue[this.j - 1];
			this.numValue[this.j - 1] = tmp;

			// operate the DOM
			var leftBox = getTargetNumBox(this.j - 1);
			var rightBox = getTargetNumBox(this.j);
			var left = parseInt(leftBox.style.left);
			var right = parseInt(rightBox.style.left);

			var times = 50;
			var dist = (right - left) / times;
			var count = 1;

			id = setInterval((function(leftBox, rightBox, left, right) {
				return function() {
					leftBox.classList.add("active");
					rightBox.classList.add("active");
					leftBox.style.left = (left + count * dist) + "px";
					rightBox.style.left = (right - count * dist) + "px";
					count++;
					if (count > times) {
						clearInterval(id);
						leftBox.classList.remove("active");
						rightBox.classList.remove("active");
						that.update();
						setTimeout(function() {
							that.fire();
						}, 500);
					}
				}
			})(leftBox, rightBox, left, right), 20);
		} else {
			that.update();
			setTimeout(function() {
				that.fire();
			}, 500);
		}
		return that.numValue;
	} else {
		// enable the go button
		btn.removeAttribute("disabled");

		return;
	}
}

window.onload = function() {
	tmp = new bubbleSortState(numValue);

	// btn declaration
	var btn = document.getElementById("btn");

	btn.onclick = function() {
		console.log("click start");
		tmp.fire();
	}
}