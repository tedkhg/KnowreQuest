var i = 0;

var Notepad = function() {
	this._initialize();
};

var _ = Notepad.prototype;

_._initialize = function() {
	this.menu = new Menu(this);
	this.list = new List(this);
	this.tab = new Tab(this);

	this._bindEvents();
};

_._bindEvents = function() {
	
}

var Menu = function(notepad) {
	this.notepad = notepad;
	this.dom = $('.buttons');

	this._initialize();
};

var _ = Menu.prototype;

_._initialize = function() {

	this._bindEvents();
};

_._bindEvents = function() {
	var that = this;

	this.dom.find('#newFile').click(function() {
		notepad.tab.tabList.find('li').removeClass("active")
		notepad.tab.noteArea.find('div.tab-pane').removeClass("active")
			
		notepad.tab.notes.push(new Note(notepad.tab));
	})

	this.dom.find('#saveFile').click(function(event) {
		if(notepad.tab.tabList.find('li.active a').text() == 'untitled') {
			that.dom.find('#file-name').val(notepad.tab.tabList.find('li.active a').text())
			that.dom.find('#nameModal').modal('toggle')
		} else {	

			var XHR = new XMLHttpRequest();
			var param = "name=" + notepad.tab.tabList.find('li.active a').text() + "&content=" + $(notepad.tab.noteArea.find('div.tab-pane.active')[0].children[0]).val()
			XHR.onreadystatechange = function() {
				if(XHR.readyState == 4 && XHR.status == 200) {
					notepad.list.load()
				}
			}
			XHR.open("POST", "/saveFile", true)
			XHR.send(param)
		}
	})

	this.dom.find('#saveAs').click(function(event) {
		that.dom.find('#file-name').val(notepad.tab.tabList.find('li.active a').text())
		that.dom.find('#nameModal').modal('toggle')
	})

	this.dom.find('#deleteFile').click(function() {
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function() {
			if(XHR.readyState == 4 && XHR.status == 200) {
				notepad.list.load()
				notepad.tab.tabList.find('li.active').remove()
				notepad.tab.noteArea.find('div.tab-pane.active').remove()

				notepad.tab.tabList.find('li:first').addClass('active')
				notepad.tab.noteArea.find('div.tab-pane:first').addClass('active')
			}
		}
		XHR.open("DELETE", "/deleteFile?name=" + notepad.tab.tabList.find('li.active a').text(), true)
		XHR.send()
	})

	this.dom.find('#save').click(function() {
		for(var i = 0; i < notepad.list.fileList.find('.file').length; i++) {
			if(that.dom.find('#file-name').val() == notepad.list.fileList.find('.file')[i].innerHTML) {
				alert('이미 존재하는 파일명입니다.')
				return;
			}
		}
		if(!that.dom.find('#file-name').val()) alert('파일 이름을 최소 한 글자 이상 정해주세요.')
		else {
			that.dom.find('#nameModal').modal('toggle')
			notepad.tab.tabList.find('li.active a').text(that.dom.find('#file-name').val())

			var XHR = new XMLHttpRequest();
			var param = "name=" + notepad.tab.tabList.find('li.active a').text() + "&content=" + $(notepad.tab.noteArea.find('div.tab-pane.active')[0].children[0]).val()
			XHR.onreadystatechange = function() {
				if(XHR.readyState == 4 && XHR.status == 200) {
					document.getElementsByClassName('tab-pane active')[0].id = $('#file-name').val().split('.')[0]
					$('li.active')[0].children[0].href.split('#')[1] =  $('#file-name').val().split('.')[0]
					notepad.list.load()
				}
			}
			XHR.open("POST", "/saveFile", true)
			XHR.send(param)

			notepad.list.load()
		}
	})
}

var List = function(notepad) {
	this.notepad = notepad;
	this.fileList = $('#fileList');

	this._initialize();
};

var _ = List.prototype;

_._initialize = function() {
	this._bindEvents();
	this.load();
};

_._bindEvents = function() {
	var that = this;

	this.load = function load() {
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function() {
			if(XHR.readyState == 4 && XHR.status == 200) {
				that.fileList.empty()
				that.fileList.append(XHR.responseText);
			}
		}
		XHR.open("GET", "/loadList", true);
		XHR.send();
	}

	$(document).on('click', '.file', function() {
		for(var i = 0; i < notepad.tab.noteArea.find('div.tab-pane').length; i++) {
			if(notepad.tab.noteArea.find('div.tab-pane')[i].id == $(this).text().split('.')[0]) {
				notepad.tab.tabList.find('li').removeClass("active")
				notepad.tab.noteArea.find('div.tab-pane').removeClass("active")

				notepad.tab.tabList.find('li').eq(i).addClass("active")
				notepad.tab.noteArea.find('div.tab-pane').eq(i).addClass('active')
				return;
			}
		}

		var that = this;
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function() {
			if(XHR.readyState == 4 && XHR.status == 200) {
				notepad.tab.tabList.find('li').removeClass("active")
				notepad.tab.noteArea.find('div.tab-pane').removeClass("active")

				notepad.tab.notes.push(new Note(notepad.tab, $(that).text(), XHR.responseText));
			}
		}
		XHR.open("GET", "/loadFile?name=" + $(this).text(), true);
		XHR.send();

	})
}

var Tab = function(notepad) {
	this.notepad = notepad;
	this.tabList = $('#tabs');
	this.noteArea = $('#texts');
	this.notes = [];

	this._initialize();
};

var _ = Tab.prototype;

_._initialize = function() {

	this._bindEvents();
};

_._bindEvents = function() {

}

var Note = function(tab, name, content) {
	this.tab = tab;
	this.titleName = name;
	this.noteContent = content;

	this._initialize();
};

var _ = Note.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {
	if(this.titleName) {
		var content = '<li role="presentation" class="active"><a href="#' + this.titleName.split('.')[0] + 
					'" role="tab" data-toggle="tab">' + this.titleName + '</a></li>';
		this.tab.tabList.append(content);
		content = '<div role="tabpanel" class="tab-pane active" id="' + this.titleName.split('.')[0] + '">' +
			    	'<textarea rows=30 class="form-control" placeholder="Input here!">' + this.noteContent + '</textarea>' +
			    '</div>';
		this.tab.noteArea.append(content)
	} else {
		var content = '<li role="presentation" class="active"><a href="#new' + i + '" role="tab" data-toggle="tab">untitled</a></li>';
		this.tab.tabList.append(content);
		content = '<div role="tabpanel" class="tab-pane active" id="new' + i + '">' +
			    	'<textarea rows=30 class="form-control" placeholder="Input here!"></textarea>' +
			    '</div>';
		this.tab.noteArea.append(content);
	}
	this.dom = $('ul#tabs li.active');
	i++
}

_._bindEvents = function() {
	var that = this;

	this.dom.dblclick(function() {
		that.tab.tabList.find('li.active').remove()
		that.tab.noteArea.find('div.tab-pane.active').remove()

		that.tab.tabList.find('li:first').addClass('active')
		that.tab.noteArea.find('div.tab-pane:first').addClass('active')
	})
}
