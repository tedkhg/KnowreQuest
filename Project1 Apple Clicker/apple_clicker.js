var GameManager = function() {
	this.side = document.querySelectorAll('.sideBar');
	this.main = document.querySelectorAll('.main');
	this.shop = document.querySelectorAll('.shopBar');
	var apples, income;

	var ipod_level, iphone_level, ipad_level, macbook_level, imac_level;
	this._initialize();
}

var _ = GameManager.prototype;

_._initialize = function() {
	click_income = 1;
	click_level = 1;
	click_count = 0;
	income = 0;
	apples = 5000000;
	ipod_level = 1;
	iphone_level = 1;
	ipad_level = 1;
	macbook_level = 1;
	imac_level = 1;

	this._bindEvents();
	this._everyUpdate();
}

_._bindEvents = function() {
	var that = this;

	this.side[0].querySelectorAll('.appleButton')[0].onclick = function() {
		apples += click_income;
		click_count += 1;
	}

	// Mouse part
	this.shop[0].querySelectorAll('.upApple')[0].onclick = function() {
		if(click_level == 5) return;

		if(apples >= 100 * click_level) {
			apples -= 100;
			click_level += 1;
			if(click_level == 2) {
				click_income = 5;
			} else if(click_level == 3) {
				click_income = 20;
			} else if(click_level == 4) {
				click_income = 100;
			} else if(click_level == 5) {
				click_income = 500;
			}
		}
	}

	// Ipod part
	this.shop[0].querySelectorAll('.buyIpod')[0].onclick = function() {
		if(document.querySelectorAll('.ipod').length > 49) return;

		if(apples > 50 + document.querySelectorAll('.ipod').length * 50) {
			apples -= 50 + document.querySelectorAll('.ipod').length * 50;
			new Ipod(that, ipod_level);

			if(ipod_level == 1) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 3).toFixed(0) + '</span>';
			} else if(ipod_level == 2) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 6).toFixed(0) + '</span>';
			} else if(ipod_level == 3) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Classic <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 12).toFixed(0) + '</span>';
			} else if(ipod_level == 4) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Touch <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 24).toFixed(0) + '</span>';
			}
		} else return;
	}
	this.shop[0].querySelectorAll('.upIpod')[0].onclick = function() {
		if(ipod_level == 4) return;

		if(apples > ipod_level * 300) {
			apples -= ipod_level * 300;
			ipod_level += 1;
		} else return;

		if(ipod_level == 2) {
			that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 6).toFixed(0) + '</span>';
		} else if(ipod_level == 3) {
			that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Classic <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 12).toFixed(0) + '</span>';
		} else if(ipod_level == 4) {
			that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Touch <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 24).toFixed(0) + '</span>';
		}

		for(var i = 0; i < document.querySelectorAll('.ipod').length; i++) {
			document.querySelectorAll('.ipod')[i].src = './ipod' + ipod_level + '.png';
			income += 0.3 * Math.pow(2, ipod_level-2) ;
		}
	}

	// Iphone part
	this.shop[0].querySelectorAll('.buyIphone')[0].onclick = function() {
		if(document.querySelectorAll('.iphone').length > 49) return;

		if(apples > 50 + document.querySelectorAll('.iphone').length * 50) {
			apples -= 50 + document.querySelectorAll('.iphone').length * 50;
			new Iphone(that, iphone_level);

			if(iphone_level == 1) {
				that.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 3GS <span class="incomeInfo">'
				+ (document.querySelectorAll('.iphone').length * 15).toFixed(0) + '</span>';
			} else if(iphone_level == 2) {
				that.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 4S <span class="incomeInfo">'
				+ (document.querySelectorAll('.iphone').length * 30).toFixed(0) + '</span>';
			} else if(iphone_level == 3) {
				that.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 5S <span class="incomeInfo">'
				+ (document.querySelectorAll('.iphone').length * 60).toFixed(0) + '</span>';
			} else if(iphone_level == 4) {
				that.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 6 <span class="incomeInfo">'
				+ (document.querySelectorAll('.iphone').length * 120).toFixed(0) + '</span>';
			}
		} else return;
	}
	this.shop[0].querySelectorAll('.upIphone')[0].onclick = function() {
		if(iphone_level == 4) return;

		if(apples > iphone_level * 300) {
			apples -= iphone_level * 300;
			iphone_level += 1;
		} else return;

		if(iphone_level == 2) {
			that.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 4S <span class="incomeInfo">'
			+ (document.querySelectorAll('.iphone').length * 30).toFixed(0) + '</span>';
		} else if(iphone_level == 3) {
			that.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 5S <span class="incomeInfo">'
			+ (document.querySelectorAll('.iphone').length * 60).toFixed(0) + '</span>';
		} else if(iphone_level == 4) {
			that.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 6 <span class="incomeInfo">'
			+ (document.querySelectorAll('.iphone').length * 120).toFixed(0) + '</span>';
		}

		for(var i = 0; i < document.querySelectorAll('.iphone').length; i++) {
			document.querySelectorAll('.iphone')[i].src = './iphone' + iphone_level + '.png';
			income += 1.5 * Math.pow(2, iphone_level-2) ;
		}
	}

	// Ipad part
	this.shop[0].querySelectorAll('.buyIpad')[0].onclick = function() {
		if(document.querySelectorAll('.ipad').length > 49) return;

		if(apples > 50 + document.querySelectorAll('.ipad').length * 50) {
			apples -= 50 + document.querySelectorAll('.ipad').length * 50;
			new Ipad(that, ipad_level);

			if(ipad_level == 1) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad 1 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 75).toFixed(0) + '</span>';
			} else if(ipad_level == 2) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad mini <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 150).toFixed(0) + '</span>';
			} else if(ipad_level == 3) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 300).toFixed(0) + '</span>';
			} else if(ipad_level == 4) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air2 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 600).toFixed(0) + '</span>';
			}
		} else return;
	}
	this.shop[0].querySelectorAll('.upIpad')[0].onclick = function() {
		if(ipad_level == 4) return;

		if(apples > ipad_level * 300) {
			apples -= ipad_level * 300;
			ipad_level += 1;
		} else return;

		if(ipad_level == 2) {
			that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad mini <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 150).toFixed(0) + '</span>';
		} else if(ipad_level == 3) {
			that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 300).toFixed(0) + '</span>';
		} else if(ipad_level == 4) {
			that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air2 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 600).toFixed(0) + '</span>';
		}

		for(var i = 0; i < document.querySelectorAll('.ipad').length; i++) {
			document.querySelectorAll('.ipad')[i].src = './ipad' + ipad_level + '.png';
			income += 7.5 * Math.pow(2, ipad_level-2) ;
		}
	}

	// Macbook part
	this.shop[0].querySelectorAll('.buyMacbook')[0].onclick = function() {
		if(document.querySelectorAll('.macbook').length > 49) return;

		if(apples > 50 + document.querySelectorAll('.macbook').length * 50) {
			apples -= 50 + document.querySelectorAll('.macbook').length * 50;
			new Macbook(that, macbook_level);

			if(macbook_level == 1) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 11 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 500).toFixed(0) + '</span>';
			} else if(macbook_level == 2) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 13 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 1000).toFixed(0) + '</span>';
			} else if(macbook_level == 3) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 13 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 2000).toFixed(0) + '</span>';
			} else if(macbook_level == 4) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 15 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 4000).toFixed(0) + '</span>';
			}
		} else return;
	}
	this.shop[0].querySelectorAll('.upMacbook')[0].onclick = function() {
		if(macbook_level == 4) return;

		if(apples > macbook_level * 300) {
			apples -= macbook_level * 300;
			macbook_level += 1;
		} else return;

		if(macbook_level == 2) {
			that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 13 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 1000).toFixed(0) + '</span>';
		} else if(macbook_level == 3) {
			that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 13 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 2000).toFixed(0) + '</span>';
		} else if(macbook_level == 4) {
			that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 15 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 4000).toFixed(0) + '</span>';
		}

		for(var i = 0; i < document.querySelectorAll('.macbook').length; i++) {
			document.querySelectorAll('.macbook')[i].src = './macbook' + macbook_level + '.png';
			income += 50 * Math.pow(2, macbook_level-2) ;
		}
	}

	// Imac part
	this.shop[0].querySelectorAll('.buyImac')[0].onclick = function() {
		if(document.querySelectorAll('.imac').length > 49) return;

		if(apples > 50 + document.querySelectorAll('.imac').length * 50) {
			apples -= 50 + document.querySelectorAll('.imac').length * 50;
			new Imac(that, imac_level);

			if(imac_level == 1) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = '중고 iMac 21.5 <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 5000).toFixed(0) + '</span>';
			} else if(imac_level == 2) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 21.5 <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 10000).toFixed(0) + '</span>';
			} else if(imac_level == 3) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 20000).toFixed(0) + '</span>';
			} else if(imac_level == 4) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 Retina 5K <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 40000).toFixed(0) + '</span>';
			}
		} else return;
	}
	this.shop[0].querySelectorAll('.upImac')[0].onclick = function() {
		if(imac_level == 4) return;

		if(apples > imac_level * 300) {
			apples -= imac_level * 300;
			imac_level += 1;
		} else return;

		if(imac_level == 2) {
			that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 21.5 <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 10000).toFixed(0) + '</span>';
		} else if(imac_level == 3) {
			that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 20000).toFixed(0) + '</span>';
		} else if(imac_level == 4) {
			that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 Retina 5K <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 40000).toFixed(0) + '</span>';
		}

		for(var i = 0; i < document.querySelectorAll('.imac').length; i++) {
			document.querySelectorAll('.imac')[i].src = './imac' + imac_level + '.png';
			income += 500 * Math.pow(2, imac_level-2) ;
		}
	}
}

_._everyUpdate = function() {
	var that = this;

	setInterval(function() {
		apples += income;
		that.side[0].querySelectorAll('.countApples')[0].innerHTML = parseInt(apples);
		//console.log(income);
	}, 100);
}

_.setIncome = function(_income) {
	income = _income;
}

_.getIncome = function() {
	return income;
}

var Ipod = function(gamemanager, level) {
	this.gamemanager = gamemanager;
	this.dom = null;
	this.level = level;

	this._initialize();
}

_ = Ipod.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
}

_._setDom = function() {
	this.dom = document.createElement("img");
	this.dom.className = 'ipod';
	this.dom.src = './ipod' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.ipod').length * 13) + '.px';
	this.dom.style.top = '18%';

	this.gamemanager.main[0].querySelectorAll('.ipodArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 0.3 * Math.pow(2, this.level-1));
}

_._bindEvents = function() {
	var that = this;
}

var Iphone = function(gamemanager, level) {
	this.gamemanager = gamemanager;
	this.dom = null;
	this.level = level;

	this._initialize();
}

_ = Iphone.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
}

_._setDom = function() {
	this.dom = document.createElement("img");
	this.dom.className = 'iphone';
	this.dom.src = './iphone' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.iphone').length * 13) + '.px';
	this.dom.style.top = '34%';

	this.gamemanager.main[0].querySelectorAll('.iphoneArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 1.5 * Math.pow(2, this.level-1));
}

_._bindEvents = function() {
	var that = this;
}

var Ipad = function(gamemanager, level) {
	this.gamemanager = gamemanager;
	this.dom = null;
	this.level = level;

	this._initialize();
}

_ = Ipad.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
}

_._setDom = function() {
	this.dom = document.createElement("img");
	this.dom.className = 'ipad';
	this.dom.src = './ipad' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.ipad').length * 12) + '.px';
	this.dom.style.top = '52%';

	this.gamemanager.main[0].querySelectorAll('.ipadArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 7.5 * Math.pow(2, this.level-1));
}

_._bindEvents = function() {
	var that = this;
}

var Macbook = function(gamemanager, level) {
	this.gamemanager = gamemanager;
	this.dom = null;
	this.level = level;

	this._initialize();
}

_ = Macbook.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
}

_._setDom = function() {
	this.dom = document.createElement("img");
	this.dom.className = 'macbook';
	this.dom.src = './macbook' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.macbook').length * 11) + '.px';
	this.dom.style.top = '70%';

	this.gamemanager.main[0].querySelectorAll('.macbookArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 50 * Math.pow(2, this.level-1));
}

_._bindEvents = function() {
	var that = this;
}

var Imac = function(gamemanager, level) {
	this.gamemanager = gamemanager;
	this.dom = null;
	this.level = level;

	this._initialize();
}

_ = Imac.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
}

_._setDom = function() {
	this.dom = document.createElement("img");
	this.dom.className = 'imac';
	this.dom.src = './imac' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.imac').length * 11) + '.px';
	this.dom.style.top = '87%';

	this.gamemanager.main[0].querySelectorAll('.imacArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 500 * Math.pow(2, this.level-1));
}

_._bindEvents = function() {
	var that = this;
}


