window.onload = function() {
	var DragDrop = function() {
		var dragging = null;
		var diffX = 0;
		var diffY = 0;

		function handleEvent(event) {
			var that = event.target;

			switch(event.type) {
				case "mousedown":
					if (that.className.indexOf("draggable") > -1) {
						dragging = that;
						diffX = event.clientX - that.offsetLeft;
						diffY = event.clientY - that.offsetTop;
					}
					break;

				case "mousemove":
					if (dragging !== null) {
						dragging.style.left = (event.clientX - diffX) + "px";
						dragging.style.top = (event.clientY - diffY) + "px";
					}
					break;

				case "mouseup":
					dragging = null;
					break;
			}
		};

		return {
			enable : function() {
				document.addEventListener("mousedown", handleEvent);
				document.addEventListener("mousemove", handleEvent);
				document.addEventListener("mouseup", handleEvent);
			},

			disable : function() {
				document.removeEventListener("mousedown", handleEvent);
				document.removeEventListener("mousemove", handleEvent);
				document.removeEventListener("mouseup", handleEvent);
			}
		}
	}();

	DragDrop.enable();
}