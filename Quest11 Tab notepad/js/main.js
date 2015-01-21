var i = 0;

$(document).ready(function() {
	$('#newFile').click(function() {
		var content;
		$('li').removeClass("active")
		$('div.tab-pane').removeClass("active")
			
		content = '<li role="presentation" class="active"><a href="#new' + i + '" role="tab" data-toggle="tab">untitled</a></li>';
		$('#tabs').append(content);
		content = '<div role="tabpanel" class="tab-pane active" id="new' + i + '">' +
			    	'<textarea rows=30 class="form-control" placeholder="Input here!"></textarea>' +
			    '</div>';
		$('#texts').append(content)
		i++
	})

	$('#saveFile').click(function(event) {
		if($('li.active a').text() == 'untitled') {
			$('#file-name').val($('li.active a').text())
			$('#nameModal').modal('toggle')
		} else {	

			var XHR = new XMLHttpRequest();
			var param = "name=" + $('li.active a').text() + "&content=" + $($('div.tab-pane.active')[0].children[0]).val()
			XHR.onreadystatechange = function() {
				if(XHR.readyState == 4 && XHR.status == 200) {
					load()
				}
			}
			XHR.open("POST", "/saveFile", true)
			XHR.send(param)
		}
	})

	$('#saveAs').click(function(event) {
		$('#file-name').val($('li.active a').text())
		$('#nameModal').modal('toggle')
	})

	$('#deleteFile').click(function() {
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function() {
			if(XHR.readyState == 4 && XHR.status == 200) {
				load()
				$('li.active').remove()
				$('div.tab-pane.active').remove()

				$('ul#tabs li:first').addClass('active')
				$('div.tab-pane:first').addClass('active')
			}
		}
		XHR.open("DELETE", "/deleteFile?name=" + $('li.active a').text(), true)
		XHR.send()
	})

	$('#save').click(function() {
		for(var i = 0; i < $('.file').length; i++) {
			if($('#file-name').val() == $('.file')[i].innerHTML) {
				alert('이미 존재하는 파일명입니다.')
				return;
			}
		}
		if(!$('#file-name').val()) alert('파일 이름을 최소 한 글자 이상 정해주세요.')
		else {
			$('#nameModal').modal('toggle')
			$('li.active a').text($('#file-name').val())

			var XHR = new XMLHttpRequest();
			var param = "name=" + $('li.active a').text() + "&content=" + $($('div.tab-pane.active')[0].children[0]).val()
			XHR.onreadystatechange = function() {
				if(XHR.readyState == 4 && XHR.status == 200) {
					document.getElementsByClassName('tab-pane active')[0].id = $('#file-name').val().split('.')[0]
					$('li.active')[0].children[0].href.split('#')[1] =  $('#file-name').val().split('.')[0]
					load()
				}
			}
			XHR.open("POST", "/saveFile", true)
			XHR.send(param)

			load()
		}
	})

	$(document).on('dblclick', 'ul#tabs li', function() {
		$('li.active').remove()
		$('div.tab-pane.active').remove()

		$('ul#tabs li:first').addClass('active')
		$('div.tab-pane:first').addClass('active')
	})

	$(document).on('click', '.file', function() {
		for(var i = 0; i < document.getElementsByClassName('tab-pane').length; i++) {
			if(document.getElementsByClassName('tab-pane')[i].id == $(this).text().split('.')[0]) {
				$('li').removeClass("active")
				$('div.tab-pane').removeClass("active")

				$($('li a')[i].parentNode).addClass("active")
				$($('div.tab-pane')[i]).addClass('active')
				return;
			}
		}

		var that = this;
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function() {
			if(XHR.readyState == 4 && XHR.status == 200) {
				$('li').removeClass("active")
				$('div.tab-pane').removeClass("active")

				var content = '<li role="presentation" class="active"><a href="#' + $(that).text().split('.')[0] + 
							'" role="tab" data-toggle="tab">' + $(that).text() + '</a></li>';
				$('#tabs').append(content);
				content = '<div role="tabpanel" class="tab-pane active" id="' + $(that).text().split('.')[0] + '">' +
					    	'<textarea rows=30 class="form-control" placeholder="Input here!">' + XHR.responseText + '</textarea>' +
					    '</div>';
				$('#texts').append(content)
			}
		}
		XHR.open("GET", "/loadFile?name=" + $(this).text(), true);
		XHR.send();
	})

	load();
})

function load() {
	var XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function() {
		if(XHR.readyState == 4 && XHR.status == 200) {
			$('#fileList').empty()
			$('#fileList').append(XHR.responseText);
		}
	}
	XHR.open("GET", "/loadList", true);
	XHR.send();
}