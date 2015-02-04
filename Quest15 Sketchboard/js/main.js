var id = 0;

var Sketch = function() {
	this.board = $('.board')[0];
	this.menu = document.querySelectorAll('.menu');
	this.objs = [];

	this._initialize();
}

var _ = Sketch.prototype;

_._initialize = function() {
	this._bindEvents();
}

_._bindEvents = function() {
	var that = this;
	this.menu[0].querySelectorAll('#drawCircle')[0].onclick = function() {
		var content = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
	    'style="left:20px;top:200px;width:200px;height:200px;position:absolute" id="svg' + id +'">' +
	    '<ellipse cx="50%" cy="50%" rx="50%" ry="50%" ' +
	      'stroke="#FF0000" stroke-width="1" fill="#800000" /></svg>';

	    that.board.insertAdjacentHTML('beforeend', content);
	    that.objs.push(new SVGObject('#svg' + id, that));
	}
	this.menu[0].querySelectorAll('#drawSquare')[0].onclick = function() {
		var content = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
	    'style="left:20px;top:200px;width:200px;height:200px;position:absolute" id="svg' + id +'">' +
	    '<rect x="0%" y="0%" width="100%" height="100%" ' +
	      'stroke="#FF0000" stroke-width="1" fill="#800000" /></svg>';

	    that.board.insertAdjacentHTML('beforeend', content);
	    that.objs.push(new SVGObject('#svg' + id, that));
	}
	this.menu[0].querySelectorAll('#drawTriangle')[0].onclick = function() {
		var content = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
	    'viewbox="0 0 200 200" style="left:20px;top:200px;width:100%;height:100%;position:absolute" id="svg' + id +'">' +
	    '<path d="M 0 0 L 200 0 L 100 200" ' +
	      'stroke="#FF0000" stroke-width="1" fill="#800000" /></svg>';

	    that.board.insertAdjacentHTML('beforeend', content);
	    that.objs.push(new SVGObject('#svg' + id, that));
	}

	$(document).on("keydown", function (event) {
		if(event.which == 27) {
			for(var i = 0; i < that.objs.length; i++) {
				if(that.objs[i].isEditable) {
					that.objs[i].isEditable = false;
					$($('#svgo' + that.objs[i].id).find('svg')[1]).css("display", "none");
				}
			}
		} else if(event.which == 37) {
			for(var i = 0; i < that.objs.length; i++) {
				if(that.objs[i].isEditable)
					that.objs[i].update(-2, 0, 0, 0);
			}
		} else if(event.which == 38) {
			for(var i = 0; i < that.objs.length; i++) {
				if(that.objs[i].isEditable)
					that.objs[i].update(0, -2, 0, 0);
			}
		} else if(event.which == 39) {
			for(var i = 0; i < that.objs.length; i++) {
				if(that.objs[i].isEditable)
					that.objs[i].update(2, 0, 0, 0);
			}
		} else if(event.which == 40) {
			for(var i = 0; i < that.objs.length; i++) {
				if(that.objs[i].isEditable)
					that.objs[i].update(0, 2, 0, 0);
			}
		} else if(event.which == 46) {
			var leng = that.objs.length;
			for(var i = 0; i < leng; i++) {
				if(that.objs[i].isEditable) {
					that.objs[i].destroySVG();
					var index = that.objs.indexOf(that.objs[i]);
					if(index > -1) { 
						that.objs.splice(index, 1);
						i--;
						leng--;
					}
				}			
			}
		}
	})	
}

var SVGObject = function(element, sketch) {
	this.par = sketch;
	this.origin = element;
	this.isEditable = true;
	this.currState;
	this.state = {
	    None: 0,
	    LeftResize: 1,
	    TopResize: 2,
	    RightResize: 3,
	    BottomResize: 4,
	    TopLeftResize: 5,
	    BottomLeftResize: 6,
	    TopRightResize: 7,
	    BottomRightResize: 8,
	    Move: 9
	}

	this._initialize();
}

var _ = SVGObject.prototype;

_._initialize = function() {
	this.id = id;
	this.currState = this.state.None;
	this.wrapStr = '<div style="position:relative" id="svgo' + this.id + '">' +
        '<div style="left:8px;top:8px;position:absolute" class="internalWrapper"></div>' +
        '</div>';
    this.borderStr = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
      'style="left:0px;top:0px;position:relative;width:100%;height:100%" >' +
    '<style type="text/css"> .actionTrigger { transition: opacity 0.5s; ' + 
    'opacity: 0;} .actionTrigger:hover{transition: opacity 0.3s;opacity: 0.3;}</style>' +
    '<line x1="0" y1="0" x2="100%" y2="0" stroke="#808080" stroke-width="1" stroke-dasharray="5,5" class="topDrawing" />' +
    '<line x1="0" y1="100%" x2="100%" y2="100%" stroke="#808080" stroke-width="1" stroke-dasharray="5,5" class="bottomDrawing" />' +
    '<line x1="0" y1="0" x2="0" y2="100%" stroke="#808080" stroke-width="1" stroke-dasharray="5,5" class="leftDrawing" />' +
    '<line x1="100%" y1="0" x2="100%" y2="100%" stroke="#808080" stroke-width="1" stroke-dasharray="5,5" class="rightDrawing" />' +
    '<circle cx="0" cy="0" r="3" stroke="#0000FF" stroke-width="1" fill="#CCCCFF" class="topLeftDrawing" />' +
    '<circle cx="100%" cy="0" r="3" stroke="#0000FF" stroke-width="1" fill="#CCCCFF" class="topRightDrawing" />' +
    '<circle cx="0" cy="100%" r="3" stroke="#0000FF" stroke-width="1" fill="#CCCCFF" class="bottomLeftDrawing" />' +
    '<circle cx="100%" cy="100%" r="3" stroke="#0000FF" stroke-width="1" fill="#CCCCFF" class="bottomRightDrawing" />' +
    '<rect x="0" y="0" width="100%" height="100%" fill-opacity="0.5" opacity="0" class="actionTrigger moveActionTrigger" style="cursor:move" />' +
    '<line x1="0" y1="0" x2="100%" y2="0" stroke="#000" stroke-width="5" opacity="0" class="actionTrigger topActionTrigger" style="cursor:n-resize" />' +
    '<line x1="0" y1="100%" x2="100%" y2="100%" stroke="#000" stroke-width="5" opacity="0" class="actionTrigger bottomActionTrigger" style="cursor:s-resize" />' +
    '<line x1="0" y1="0" x2="0" y2="100%" stroke="#000" stroke-width="5" opacity="0" class="actionTrigger leftActionTrigger" style="cursor:w-resize" />' +
    '<line x1="100%" y1="0" x2="100%" y2="100%" stroke="#000" stroke-width="5" opacity="0" class="actionTrigger rightActionTrigger" style="cursor:e-resize"/>' +
    '<circle cx="0" cy="0" r="8" stroke="#000" stroke-width="0" fill="#000" opacity="0" class="actionTrigger topLeftActionTrigger" style="cursor:nw-resize" />' +
    '<circle cx="100%" cy="0" r="8" stroke="#000" stroke-width="0" fill="#000" opacity="0" class="actionTrigger topRightActionTrigger" style="cursor:ne-resize" />' +
    '<circle cx="0" cy="100%" r="8" stroke="#000" stroke-width="0" fill="#000" opacity="0" class="actionTrigger bottomLeftActionTrigger" style="cursor:sw-resize" />' +
    '<circle cx="100%" cy="100%" r="8" stroke="#000" stroke-width="0" fill="#000" opacity="0" class="actionTrigger bottomRightActionTrigger" style="cursor:se-resize" />' +
    '</svg>';

    this.exStr = '#svgo' + this.id;
    this.inStr = this.exStr + ' .internalWrapper';

    this.moveActionTriggerQueryStr = this.exStr + ' .moveActionTrigger';
    this.topActionTriggerQueryStr = this.exStr + ' .topActionTrigger';
    this.bottomActionTriggerQueryStr = this.exStr + ' .bottomActionTrigger';
    this.leftActionTriggerQueryStr = this.exStr + ' .leftActionTrigger';
    this.rightActionTriggerQueryStr = this.exStr + ' .rightActionTrigger';
    this.topLeftActionTriggerQueryStr = this.exStr + ' .topLeftActionTrigger';
    this.topRightActionTriggerQueryStr = this.exStr + ' .topRightActionTrigger';
    this.bottomLeftActionTriggerQueryStr = this.exStr + ' .bottomLeftActionTrigger';
    this.bottomRightActionTriggerQueryStr = this.exStr + ' .bottomRightActionTrigger';

    this.topDrawingQueryStr = this.exStr + ' .topDrawing';
    this.bottomDrawingQueryStr = this.exStr + ' .bottomDrawing';
    this.leftDrawingQueryStr = this.exStr + ' .leftDrawing';
    this.rightDrawingQueryStr = this.exStr + ' .rightDrawing';
    this.topLeftDrawingQueryStr = this.exStr + ' .topLeftDrawing';
    this.topRightDrawingQueryStr = this.exStr + ' .topRightDrawing';
    this.bottomLeftDrawingQueryStr = this.exStr + ' .bottomLeftDrawing';
    this.bottomRightDrawingQueryStr = this.exStr + ' .bottomRightDrawing';
	id++;

    this._setDom();

	this._bindEvents();
}

_._setDom = function() {
	$(this.origin).wrap(this.wrapStr);
	$(this.inStr).after(this.borderStr);

	var wrapLeft = (parseInt($(this.origin).css('left')) - 8) + 'px';
	var wrapTop = (parseInt($(this.origin).css('top')) - 8) + 'px';
	
	$(this.exStr).css('left', wrapLeft);
	$(this.exStr).css('top', wrapTop);
	$(this.exStr).css('position', $(this.origin).css('position'));

	$(this.origin).css('left', 0);
    $(this.origin).css('top', 0);
    $(this.origin).css('position', 'relative');	
}

_._bindEvents = function() {
	var that = this;

	if(this.isEditable) {
		$(this.moveActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.Move;
	    });

	    $(this.topActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.TopResize;
	    });

	    $(this.bottomActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.BottomResize;
	    });

	    $(this.leftActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.LeftResize;
	    });

	    $(this.rightActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.RightResize;
	    });

	    $(this.topLeftActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.TopLeftResize;
	    });

	    $(this.topRightActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.TopRightResize;
	    });

	    $(this.bottomLeftActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.BottomLeftResize;
	    });

	    $(this.bottomRightActionTriggerQueryStr).mousedown(function (event) {
	        that.currState = that.state.BottomRightResize;
	    });

	    $(document).mouseup(function (event) {
	        that.currState = that.state.None;
	    });

	    $(document).mousemove(function (event) {
	    	// console.log(that.currState);
	        that.onMouseMove(event);
	    });
	}

	$(this.moveActionTriggerQueryStr).dblclick(function (event) {
		if(that.isEditable) {
			that.toggleWrapper();
		}
	})


	$(this.origin).dblclick(function(event) {
		that.toggleWrapper();
	})

}

_.onMouseMove = function(e) {
	var x = e.clientX;
	var y = e.clientY;

	var dx = x - this.ox;
	var dy = y - this.oy;

	var dt = 0, dl = 0, dw = 0, dh = 0;

	if (this.currState == this.state.RightResize ||
             this.currState == this.state.TopRightResize ||
             this.currState == this.state.BottomRightResize) {
        dw = dx;
    }

    if (this.currState == this.state.LeftResize ||
             this.currState == this.state.TopLeftResize ||
             this.currState == this.state.BottomLeftResize) {
        dw =- dx;
        dl = dx;
    }

    if (this.currState == this.state.BottomResize ||
             this.currState == this.state.BottomLeftResize ||
             this.currState == this.state.BottomRightResize) {
        dh = dy;
    }

    if (this.currState == this.state.TopResize ||
             this.currState == this.state.TopLeftResize ||
             this.currState == this.state.TopRightResize) {
        dh =- dy;
        dt = dy;
    }

    if (this.currState == this.state.Move) {
        dl = dx;
        dt = dy;
    }

    this.update(dl, dt, dw, dh);
    this.adjust();

	this.ox = e.pageX;
	this.oy = e.pageY;
}

_.update = function(dl, dt, dw, dh) {
	var newLeft = parseInt($(this.exStr).css('left')) + dl;
	var newTop = parseInt($(this.exStr).css('top')) + dt;
	var newWidth = parseInt($(this.origin).width()) + dw;
	var newHeight = parseInt($(this.origin).height()) + dh;
	if (newWidth < 18) {
        newWidth = 18;
    }
    if (newHeight < 18) {
        newHeight = 18;
    }

	$(this.exStr).css('left', newLeft + 'px');
	$(this.exStr).css('top', newTop + 'px');

    $(this.origin).css('width', newWidth + 'px');
	$(this.origin).css('height', newHeight + 'px');

}

_.adjust = function() {
    var minX = '8px';
    var minY = '8px';
    var maxX = (8 + parseInt($(this.origin).width())) + 'px';
    var maxY = (8 + parseInt($(this.origin).height())) + 'px';

    $(this.inStr).width($(this.origin).width());
    $(this.inStr).height($(this.origin).height());
    $(this.exStr).width(parseInt($(this.origin).width() + 16) + 'px');
    $(this.exStr).height(parseInt($(this.origin).height() + 16) + 'px');

    this.setRectangleAttributes(this.moveActionTriggerQueryStr, 
    	minX, minY, parseInt($(this.origin).width()) + 'px', parseInt($(this.origin).height()) + 'px');

    this.setLineAttributes(this.topDrawingQueryStr, minX, minY, maxX, minY);
    this.setLineAttributes(this.bottomDrawingQueryStr, minX, maxY, maxX, maxY);
    this.setLineAttributes(this.leftDrawingQueryStr, minX, minY, minX, maxY);
    this.setLineAttributes(this.rightDrawingQueryStr, maxX, minY, maxX, maxY);
    this.setLineAttributes(this.topActionTriggerQueryStr, minX, minY, maxX, minY);
    this.setLineAttributes(this.bottomActionTriggerQueryStr, minX, maxY, maxX, maxY);
    this.setLineAttributes(this.leftActionTriggerQueryStr, minX, minY, minX, maxY);
    this.setLineAttributes(this.rightActionTriggerQueryStr, maxX, minY, maxX, maxY);

    this.setCircleAttributes(this.topLeftDrawingQueryStr, minX, minY);
    this.setCircleAttributes(this.topRightDrawingQueryStr, maxX, minY);
    this.setCircleAttributes(this.bottomLeftDrawingQueryStr, minX, maxY);
    this.setCircleAttributes(this.bottomRightDrawingQueryStr, maxX, maxY);
    this.setCircleAttributes(this.topLeftActionTriggerQueryStr, minX, minY);
    this.setCircleAttributes(this.topRightActionTriggerQueryStr, maxX, minY);
    this.setCircleAttributes(this.bottomLeftActionTriggerQueryStr, minX, maxY);
    this.setCircleAttributes(this.bottomRightActionTriggerQueryStr, maxX, maxY);
}

_.setRectangleAttributes = function (rectQueryStr, x, y, width, height) {
    var rectElem = $(rectQueryStr);
    rectElem.attr('x', x);
    rectElem.attr('y', y);
    rectElem.attr('width', width);
    rectElem.attr('height', height);
}

_.setLineAttributes = function (lineQueryStr, x1, y1, x2, y2) {
    var lineElem = $(lineQueryStr);
    lineElem.attr('x1', x1);
    lineElem.attr('y1', y1);
    lineElem.attr('x2', x2);
    lineElem.attr('y2', y2);
}

_.setCircleAttributes = function (circleQueryStr, cx, cy) {
    var circleElem = $(circleQueryStr);
    circleElem.attr('cx', cx);
    circleElem.attr('cy', cy);
}

_.toggleWrapper = function() {
	if(this.isEditable) {
		this.isEditable = false;
		$($('#svgo' + this.id).find('svg')[1]).css("display", "none");
	} else {
		this.isEditable = true;
		$($('#svgo' + this.id).find('svg')[1]).css("display", "");
	}
	
}

_.destroySVG = function() {
	$('#svgo' + this.id).remove();
}



