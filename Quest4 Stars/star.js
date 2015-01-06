function star() {
	var num = prompt();
	var i, j;
	var text = "";
	for(i=0; i<num; i++) {
		var temp = num - i;
		for(j=1; j<temp; j++) {
			text += " ";
		}
		var temp = (2*i)+1;
		for(j=0; j<temp; j++) {
			text += "*";
		}
		console.log(text);
		text = "";
	}
}