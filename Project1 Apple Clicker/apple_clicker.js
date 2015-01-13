var Game = function() {
	this.dom = document.querySelectorAll('.sideBar');
	var apples;
	this._initialize();
}

var _ = Game.prototype;

_._initialize = function() {
	this._bindEvents();
	this._everyUpdate();
	apples = 0;
}

_._bindEvents = function() {
	var that = this;

	this.dom[0].querySelectorAll('.appleButton')[0].onclick = function() {
		apples += 1;
	}
}

_._everyUpdate = function() {
	var that = this;

	setInterval(function() {
		apples += 0.1;
		that.dom[0].querySelectorAll('.countApples')[0].innerHTML = parseInt(apples);

	}, 100);
}