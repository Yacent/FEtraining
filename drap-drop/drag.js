window.onload = function() {
	// 定义自定义事件
	function EventTarget() {
		this.handlers = {};
	}

	EventTarget.prototype = {
		constructor: EventTarget,
		addHandler: function(type, handler) {
			if (typeof this.handlers[type] == "undefined") {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
		},

		fire: function(event) {
			if (event.target) {
				event.target = this;
			}
			if (this.handlers[event.type] instanceof Array) {
				var handlers = this.handlers[event.type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](event);
				}
			}
		},

		removeHandler: function(type, handler) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						break;
					}
				}
				handlers.splice(i, 1);
			}
		}
	};

	var DragDrop = function() {
		var drapdrop = new EventTarget();
		var dragging = null;
		var diffX = 0;
		var diffY = 0;

		function handleEvent(event) {
			var that = event.target;

			// 确定事件的类型
			switch(event.type) {
				case "mousedown":
					if (that.className.indexOf("draggable") > -1) {
						dragging = that;
						diffX = event.clientX - that.offsetLeft;
						diffY = event.clientY - that.offsetTop;
						drapdrop.fire({type: "dragstart",
									   target: dragging,
									   x: event.clientX,
									   y: event.clientY});
					}
					break;

				case "mousemove":
					if (dragging !== null) {
						dragging.style.left = (event.clientX - diffX) + "px";
						dragging.style.top = (event.clientY - diffY) + "px";

						drapdrop.fire({type: "drag",
									   target: dragging,
									   x: event.clientX,
									   y: event.clientY});
					}
					break;

				case "mouseup":
					drapdrop.fire({type: "dragend",
								   target: dragging,
								   x: event.clientX,
								   y: event.clientY});
					dragging = null;
					break;
			}
		};

		drapdrop.enable = function() {
			document.addEventListener("mousedown", handleEvent);
			document.addEventListener("mousemove", handleEvent);
			document.addEventListener("mouseup", handleEvent);
		},

		drapdrop.disable = function() {
			document.removeEventListener("mousedown", handleEvent);
			document.removeEventListener("mousemove", handleEvent);
			document.removeEventListener("mouseup", handleEvent);
		}

		return drapdrop;

	}();

	DragDrop.enable();
}