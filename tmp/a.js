window.onload = function() {
	var div = document.getElementById("myDiv");

	div.addEventListener("contextmenu", function(event) {
		event.preventDefault();
		var that = event.target;

		var menu = document.getElementById("myMenu");
		menu.style.left = event.clientX + "px";
		menu.style.top = event.clientY + "px";
		menu.style.visibility = "visible";
	});

	document.addEventListener("click", function() {
		document.getElementById("myMenu").style.visibility = "hidden";
	});
}