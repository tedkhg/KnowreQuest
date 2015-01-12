
var obj = {
	strTexts : " 은 정말 몸에 좋아요 ^^ ",
	registerEvents : function() {
		var that = this;
		document.querySelectorAll('.sel')[0].onclick = function() {
			console.log(this.innerHTML + that.strTexts);
		}
		document.querySelectorAll('.sel')[1].onclick = function() {
			console.log(this.innerHTML + that.strTexts);
		}
		document.querySelectorAll('.sel')[2].onclick = function() {
			console.log(this.innerHTML + that.strTexts);
		}
	}
}

obj.registerEvents();
