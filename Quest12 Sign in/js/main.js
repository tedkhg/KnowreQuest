function load() {
	var XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function() {
		if(XHR.readyState == 4 && XHR.status == 200) {
			document.getElementById('welcome').innerHTML = XHR.responseText.split('//')[0];
			document.getElementById('field').innerHTML = XHR.responseText.split('//')[1];
		}
	}
	XHR.open("GET", "/loadCookie", true);
	XHR.send();
}

function login() {
	var XHR = new XMLHttpRequest();
	var param = "name=" + document.getElementsByName('id')[0].value +
				"&pwd=" + document.getElementsByName('pw')[0].value;
	XHR.open("POST", "/login", true);

	XHR.onreadystatechange = function() {
		if(XHR.readyState == 4 && XHR.status == 200) {
			load();
		} else if(XHR.readyState == 4 && XHR.status == 404) {
			alert("잘못된 계정입니다.")
		}
	}
	
	XHR.send(param);
}
