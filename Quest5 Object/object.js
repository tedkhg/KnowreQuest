function background() {
	this.image = "";
	this.setImage = function() {

	}
}

function Icon() {
	var x, y;
	var image;

	this.drag = function() {

	}
}

function Folder() {
	this.open = function() {

	}
	Folder.prototype = new Icon();
}

function Window() {
	var x, y;

	this.drag = function() {
		
	}
}