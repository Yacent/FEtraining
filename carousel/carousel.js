/*	
	a demo that show how the carousel work

	@param ele
		the ul that contains page
	@param pages
		each li
	@param viewWidth
		the initial width of the viewport page
	@param pageCount
		the page(li) of the ul
	@param current
		the current page show in the viewport
*/
var Carousel = function(o) {
	this.ele = document.querySelectorAll(o.sel)[0];
	this.pages = document.querySelectorAll(".page");
	this.viewWidth = document.body.offsetWidth;
	this.pageCount = this.pages.length;
	this.current = 2;

	// init the width of a page
	this.pageWidth = this.viewWidth - o.mar * 6;

	/* set the width of carousel
		-------------------------
		|   1   |   2   |   3   |
		-------------------------
	*/
	this.ele.style.width = (this.pageWidth * (this.pageCount + 4) + o.mar * 4) + "px";
	this.ele.style.padding = "0 " + (o.mar * 2) + "px";

	for (var i = 0; i < this.pageCount; i++) {
		this.pages[i].style.width = this.pageWidth - o.mar * 2 + "px";
		this.pages[i].style.margin = "" + o.mar + "px";
	}

	/* 
		achieve the loop page, insert the 2  3 to the head 
		and 1 2 to the tail
		---------------------------------------------------------
		|   2   |   3   |   1   |   2   |   3   |   1   |   2   |
		---------------------------------------------------------
	*/
	insertExtraPage(this.ele, this.pages);

	this.update();

	this.listen();
};

/*
	@param parentN
		parentNode
	@param pages
		children of parentNode
*/
function insertExtraPage(parentN, pages) {
	var copyLastChild = pages[pages.length - 1].cloneNode(true);
	var copyLastButOneChild = pages[pages.length - 2].cloneNode(true);
	var copyFirstChild = pages[0].cloneNode(true);
	var copySecondChild = pages[1].cloneNode(true);

	parentN.insertBefore(copyLastChild, pages[0]);
	parentN.insertBefore(copyLastButOneChild, copyLastChild);
	parentN.appendChild(copyFirstChild);
	parentN.appendChild(copySecondChild);
}

// Be careful of the constructor of Carousel
Carousel.prototype = {
	constructor: Carousel,

	/* 
		@param isAnimate
			true | false
	*/
	transition: function(isAnimate) {
		this.ele.style.transition = isAnimate ? "transform .4s" : "none";
		this.update();
	},

	/*
		update the value of the current
	*/
	next: function() {
		this.current++;
		this.moveTo(this.current);
	},

	prev: function() {
		this.current--;
		this.moveTo(this.current);
	},

	/*
		@param index
			this.cuurent

		turn to the page which index is the value of current
		switch to head or tail without animation
			---------------------------------------------------------
			|   2   |   3   |   1   |   2   |   3   |   1   |   2   |
			---------------------------------------------------------
	current		0		1		2		3		4 		5		6
		1. when the current is 1, u should change it to 5 without animation
		and reflow the dom, then change the current to 4 with animation
		2. when the current is 5, i should change it to 1 without animation
		and reflow the dom, then change the current to 2 with animation 
	*/
	moveTo: function(index) {
		if (index < 2 || index > this.pageCount + 1) {
			this.current = index < 2 ? this.pageCount + 2 : 1;

			this.transition(false);

			// reflow immediately
			this.ele.offsetHeight;

			this.current = index < 2 ? this.pageCount + 1 : 2;
			this.transition(true);
			return
		}
		this.current = index;
		this.update();
	},

	/*
		modify the attribute of transform of ul
	*/
	update: function() {
		this.ele.style.transform = 'translate3d(-' + (this.current) * (this.pageWidth) + 'px, 0, 0';
	},

	moveToMobile:function(index) {
		if (index == 1) {
			this.current = this.pageCount + 1;
		}
		if (index == this.pageCount + 2) {
			this.current = 2;
		}
		this.transition(true);
	},

	/*
		for mobile device
		using touchstart touchend and touchmove

		touchlist →
			targetTouches: 位于当前 DOM 元素上的手指动作的列表
			touches: 当前位于屏幕上的所有手指动作的列表
			changedTouches: 涉及当前事件的手指动作的列表。例如，在一个 touchend 事件中，这将是移开手指
	*/
	touchstart: function(e) {
		this.startX = e.touches[0].clientX;


		/*
		1. 需要提前把函数绑定了,removeEventListener的时候需要是相同的函数
		2. 若使用 document.addEventListener("touchmove", this.touchmove.bind(this), false)
				  document.removeEventListener("touchmove", this.touchmove.bind(this), false)
			实际上绑定和解除的不是同一个函数，是两个不同的函数，所以会解除不了原本的事件绑定
		*/
		this.tMove = this.touchmove.bind(this);
	    this.tEnd = this.touchend.bind(this);

		document.addEventListener("touchmove", this.tMove, false);
		document.addEventListener("touchend", this.tEnd, false);
	},

	/*
		touchmove
			u should allow the user to touch and slide
			page will follow the finger

			ps: remove the transition or it will kakakakaka
	*/
	touchmove: function(e) {
		var currentPos = e.changedTouches[0].clientX;
		var diff = currentPos - this.startX;
		var movePos = -(this.current) * this.pageWidth + diff;
		this.ele.style.transition = "none";
		this.ele.style.transform = "translate3d(" + movePos + "px, 0, 0)";
	},

	touchend: function(e) {
		var lastPos = e.changedTouches[0].clientX;
		var diff = lastPos - this.startX;

		/*
		prefix condition:
			touchmove事件事件中已经将transition设置为none

		1. 假如滑动的current值为 4，则需要想moveTo一样特殊处理，即改变current的值
		2. 当diff < 0时，即向左滑动
		3. Math.abs(diff)为判断标准，只要当大于该值才进行page更换，否则只是认为用户拖着滑动未到阀值
		*/
		if (this.current == this.pageCount + 1) {
			if (diff < 0 && Math.abs(diff) > 80) {
				var movePos = -(1 * this.pageWidth) + diff;
				this.ele.style.transform = "translate3d(" + movePos + "px, 0, 0)";
			}
		}

		if (this.current == 2) {
			if (diff > 0 && Math.abs(diff) > 80) {
				var movePos = -(5 * this.pageWidth) + diff;
				this.ele.style.transform = "translate3d(" + movePos + "px, 0, 0)";
			}
		}

		this.ele.offsetHeight;

		// move with animation
		if (Math.abs(diff) > 80) {
			if (diff > 0) {
				this.current--;
			} else {
				this.current++;
			}
		}
		this.moveToMobile(this.current);

		// remove the listner of the touch event
		document.removeEventListener("touchmove", this.tMove, false);
		document.removeEventListener("touchend", this.tEnd, false);
	},

	listen: function() {
		this.ele.addEventListener("touchstart", this.touchstart.bind(this), false);
	}
}

var carousel = new Carousel({
	sel: ".carousel",
	mar: 5
});

document.getElementById("prev").addEventListener("click", function(e) {
	carousel.prev();
});

document.getElementById("next").addEventListener("click", function(e) {
	carousel.next();
});

