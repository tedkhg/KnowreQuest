var icon_num = 0;
var folder_num = 0;

createIcon();
createIcon();
createFolder();

function createIcon() {
	var tag = document.createElement("img");
	tag.id = "icon" + icon_num;
	tag.className = 'icon';
	tag.src = "./search.png";
	tag.style.width = "40px";
	tag.style.position = "absolute";

	document.body.appendChild(tag);
	tag.onmousedown = function() {
	  this.style.position = 'absolute'
	 
	  var self = this
	 
	  document.onmousemove = function(e) {

	    self.style.left = e.pageX-25+'px'
	    self.style.top = e.pageY-25+'px'
	  }
	  this.onmouseup = function() {
	    document.onmousemove = null
	  }
	}

	tag.ondragstart = function() { return false }

	icon_num += 1;
}

function createFolder() {
	var tag = document.createElement("img");
	tag.id = "folder" + folder_num;
	tag.className = 'folder';
	tag.src = "./folder.png";
	tag.style.width = "50px";
	tag.style.position = "absolute";

	document.body.appendChild(tag);
	tag.onmousedown = function() {
	  this.style.position = 'absolute'
	 
	  var self = this
	 
	  document.onmousemove = function(e) {

	    self.style.left = e.pageX-25+'px'
	    self.style.top = e.pageY-25+'px'
	  }
	  this.onmouseup = function() {
	    document.onmousemove = null
	  }
	}

	tag.ondragstart = function() { return false }

	tag.ondblclick = function() {
		if(document.getElementById(tag.id + "_window")) {
			return;
		}
		var fold = document.createElement("img");
		fold.id = tag.id + "_window";
		fold.className = 'folder_window';
		fold.src ="./window.png";
		fold.style.position = "absolute";
		fold.style.left = tag.style.left;
		fold.style.top = tag.style.top;
		// fold.style.width = "200px";
		// fold.style.height = "400px";
		// fold.style.backgroundColor = '#00ff00';
		// fold.draggable = false; 

		document.body.appendChild(fold);
		fold.onmousedown = function(e) {
			this.style.position = 'absolute'
		 
			var self = this
			document.onmousemove = function(e) {
		    	// var left = e.pageX - Number(self.style.left.split('px')[0]);
		    	// console.log(Number(self.style.left.split('px')[0]));
			    // console.log(typeof e.pageX);
			    // console.log('left' + left);
			    // var top = e.pageY - Number(self.style.top.split('px')[0]);
			    // console.log('top' + top);
			    self.style.left = e.pageX - 30 + 'px';
			    self.style.top = e.pageY - 30 + 'px';
			}
			this.onmouseup = function() {
		    	document.onmousemove = null
			}
		}

		fold.ondragstart = function() { return false }

		fold.ondblclick = function() {
			document.body.removeChild(this);
		}
	}

	folder_num += 1;
}

// var icons = document.getElementsByClassName('icon');
// for(var i = 0; i < icons.length; i++) {
// 	icons[i].onmousedown = function() {
// 	  this.style.position = 'absolute'
	 
// 	  var self = this
	 
// 	  document.onmousemove = function(e) {
	    
// 	    self.style.left = e.pageX-25+'px'
// 	    self.style.top = e.pageY-25+'px'
// 	  }
// 	  this.onmouseup = function() {
// 	    document.onmousemove = null
// 	  }
// 	}

// 	icons[i].ondragstart = function() { return false }
// }