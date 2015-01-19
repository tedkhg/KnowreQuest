
var obj = {
	strTexts : " 은 정말 몸에 좋아요 ^^ ",
	registerEvents : function() {
		var that = this;

		for(var i = 0; i < 3; i++) {
			(function(i) {
				document.querySelectorAll('.sel')[i].onclick = function() {
					console.log(i);
					console.log(document.querySelectorAll('.sel')[i].innerHTML + that.strTexts);
				}
			})(i);
		}
	}
}

obj.registerEvents();
