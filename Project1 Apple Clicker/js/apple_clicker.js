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
	apples = 0;
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

		if(click_level == 1 && apples >= 100) {
			document.querySelectorAll('.infoValue')[0].innerHTML = '10000';
			apples -= 100;
			click_income = 2;
		} else if(click_level == 2 && apples >= 10000) {
			document.querySelectorAll('.infoValue')[0].innerHTML = '1000000';
			apples -= 10000;
			click_income = 25;
		} else if(click_level == 3 && apples >= 1000000) {
			document.querySelectorAll('.infoValue')[0].innerHTML = '100000000';
			apples -= 1000000;
			click_income = 300;
		} else if(click_level == 4 && apples >= 100000000) {
			document.querySelectorAll('.info')[0].innerHTML = '<span class="infoValue"></span>Maximum';
			apples -= 100000000;
			click_income = 4000;
		} else {
			return;
		}

		click_level += 1;
		
	}

	// Ipod part
	this.shop[0].querySelectorAll('.buyIpod')[0].onclick = function() {
		if(document.querySelectorAll('.ipod').length > 49) return;

		if(apples >= 50 + document.querySelectorAll('.ipod').length * 50) {
			apples -= 50 + document.querySelectorAll('.ipod').length * 50;
			new Ipod(that, ipod_level);
			document.querySelectorAll('.infoValue')[1].innerHTML = 50 + document.querySelectorAll('.ipod').length * 50;
			if(ipod_level == 1) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 1).toFixed(0) + '</span>';
			} else if(ipod_level == 2) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 2).toFixed(0) + '</span>';
			} else if(ipod_level == 3) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Classic <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 4).toFixed(0) + '</span>';
			} else if(ipod_level == 4) {
				that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Touch <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipod').length * 8).toFixed(0) + '</span>';
			}
		} else return;

		if(document.querySelectorAll('.ipod').length > 49)
			document.querySelectorAll('.info')[1].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	this.shop[0].querySelectorAll('.upIpod')[0].onclick = function() {
		if(ipod_level == 4) return;

		if(apples >= Math.pow(3, ipod_level) * 400) {
			apples -= Math.pow(3, ipod_level) * 400;
			ipod_level += 1;
			document.querySelectorAll('.infoValue')[2].innerHTML = Math.pow(3, ipod_level) * 400;
		} else return;

		if(ipod_level == 2) {
			that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 2).toFixed(0) + '</span>';
		} else if(ipod_level == 3) {
			that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Classic <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 4).toFixed(0) + '</span>';
		} else if(ipod_level == 4) {
			that.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Touch <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 8).toFixed(0) + '</span>';
			document.querySelectorAll('.info')[2].innerHTML = '<span class="infoValue"></span>Maximum';
		}

		for(var i = 0; i < document.querySelectorAll('.ipod').length; i++) {
			document.querySelectorAll('.ipod')[i].src = './img/ipod' + ipod_level + '.png';
			income += 0.1 * Math.pow(2, ipod_level-2) ;
		}
	}

	// Iphone part
	this.shop[0].querySelectorAll('.buyIphone')[0].onclick = function() {
		if(document.querySelectorAll('.iphone').length > 49) return;

		if(apples >= 800 + document.querySelectorAll('.iphone').length * 800) {
			apples -= 800 + document.querySelectorAll('.iphone').length * 800;
			new Iphone(that, iphone_level);
			document.querySelectorAll('.infoValue')[3].innerHTML = 800 + document.querySelectorAll('.iphone').length * 800;
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

		if(document.querySelectorAll('.iphone').length > 49)
			document.querySelectorAll('.info')[3].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	this.shop[0].querySelectorAll('.upIphone')[0].onclick = function() {
		if(iphone_level == 4) return;

		if(apples >= Math.pow(3, iphone_level) * 6400) {
			apples -= Math.pow(3, iphone_level) * 6400;
			iphone_level += 1;
			document.querySelectorAll('.infoValue')[4].innerHTML = Math.pow(3, iphone_level) * 6400;
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
			document.querySelectorAll('.info')[4].innerHTML = '<span class="infoValue"></span>Maximum';
		}

		for(var i = 0; i < document.querySelectorAll('.iphone').length; i++) {
			document.querySelectorAll('.iphone')[i].src = './img/iphone' + iphone_level + '.png';
			income += 1.5 * Math.pow(2, iphone_level-2) ;
		}
	}

	// Ipad part
	this.shop[0].querySelectorAll('.buyIpad')[0].onclick = function() {
		if(document.querySelectorAll('.ipad').length > 49) return;

		if(apples >= 5000 + document.querySelectorAll('.ipad').length * 5000) {
			apples -= 5000 + document.querySelectorAll('.ipad').length * 5000;
			new Ipad(that, ipad_level);
			document.querySelectorAll('.infoValue')[5].innerHTML = 5000 + document.querySelectorAll('.ipad').length * 5000;
			if(ipad_level == 1) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad 1 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 100).toFixed(0) + '</span>';
			} else if(ipad_level == 2) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad mini <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 200).toFixed(0) + '</span>';
			} else if(ipad_level == 3) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 400).toFixed(0) + '</span>';
			} else if(ipad_level == 4) {
				that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air2 <span class="incomeInfo">'
				+ (document.querySelectorAll('.ipad').length * 800).toFixed(0) + '</span>';
			}
		} else return;

		if(document.querySelectorAll('.ipad').length > 49)
			document.querySelectorAll('.info')[5].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	this.shop[0].querySelectorAll('.upIpad')[0].onclick = function() {
		if(ipad_level == 4) return;

		if(apples >= Math.pow(3, ipad_level) * 40000) {
			apples -= Math.pow(3, ipad_level) * 40000;
			ipad_level += 1;
			document.querySelectorAll('.infoValue')[6].innerHTML = Math.pow(3, ipad_level) * 40000;
		} else return;

		if(ipad_level == 2) {
			that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad mini <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 200).toFixed(0) + '</span>';
		} else if(ipad_level == 3) {
			that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 400).toFixed(0) + '</span>';
		} else if(ipad_level == 4) {
			that.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air2 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 800).toFixed(0) + '</span>';
			document.querySelectorAll('.info')[6].innerHTML = '<span class="infoValue"></span>Maximum';
		}

		for(var i = 0; i < document.querySelectorAll('.ipad').length; i++) {
			document.querySelectorAll('.ipad')[i].src = './img/ipad' + ipad_level + '.png';
			income += 10 * Math.pow(2, ipad_level-2) ;
		}
	}

	// Macbook part
	this.shop[0].querySelectorAll('.buyMacbook')[0].onclick = function() {
		if(document.querySelectorAll('.macbook').length > 49) return;

		if(apples >= 60000 + document.querySelectorAll('.macbook').length * 60000 ) {
			apples -= 60000 + document.querySelectorAll('.macbook').length * 60000 ;
			new Macbook(that, macbook_level);
			document.querySelectorAll('.infoValue')[7].innerHTML = 60000 + document.querySelectorAll('.macbook').length * 60000 ;
			if(macbook_level == 1) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 11 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 1500).toFixed(0) + '</span>';
			} else if(macbook_level == 2) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 13 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 3000).toFixed(0) + '</span>';
			} else if(macbook_level == 3) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 13 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 6000).toFixed(0) + '</span>';
			} else if(macbook_level == 4) {
				that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 15 <span class="incomeInfo">'
				+ (document.querySelectorAll('.macbook').length * 12000).toFixed(0) + '</span>';
			}
		} else return;

		if(document.querySelectorAll('.macbook').length > 49)
			document.querySelectorAll('.info')[7].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	this.shop[0].querySelectorAll('.upMacbook')[0].onclick = function() {
		if(macbook_level == 4) return;

		if(apples >= Math.pow(3, macbook_level) * 480000) {
			apples -= Math.pow(3, macbook_level) * 480000;
			macbook_level += 1;
			document.querySelectorAll('.infoValue')[8].innerHTML = Math.pow(3, macbook_level) * 480000;
		} else return;

		if(macbook_level == 2) {
			that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 13 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 3000).toFixed(0) + '</span>';
		} else if(macbook_level == 3) {
			that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 13 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 6000).toFixed(0) + '</span>';
		} else if(macbook_level == 4) {
			that.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 15 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 12000).toFixed(0) + '</span>';
			document.querySelectorAll('.info')[8].innerHTML = '<span class="infoValue"></span>Maximum';
		}

		for(var i = 0; i < document.querySelectorAll('.macbook').length; i++) {
			document.querySelectorAll('.macbook')[i].src = './img/macbook' + macbook_level + '.png';
			income += 150 * Math.pow(2, macbook_level-2) ;
		}
	}

	// Imac part
	this.shop[0].querySelectorAll('.buyImac')[0].onclick = function() {
		if(document.querySelectorAll('.imac').length > 49) return;

		if(apples >= 500000 + document.querySelectorAll('.imac').length * 500000) {
			apples -= 500000 + document.querySelectorAll('.imac').length * 500000;
			new Imac(that, imac_level);
			document.querySelectorAll('.infoValue')[9].innerHTML = 500000 + document.querySelectorAll('.imac').length * 500000;
			if(imac_level == 1) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = '중고 iMac 21.5 <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 10000).toFixed(0) + '</span>';
			} else if(imac_level == 2) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 21.5 <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 20000).toFixed(0) + '</span>';
			} else if(imac_level == 3) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 40000).toFixed(0) + '</span>';
			} else if(imac_level == 4) {
				that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 Retina 5K <span class="incomeInfo">'
				+ (document.querySelectorAll('.imac').length * 80000).toFixed(0) + '</span>';
			}
		} else return;

		if(document.querySelectorAll('.imac').length > 49)
			document.querySelectorAll('.info')[9].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	this.shop[0].querySelectorAll('.upImac')[0].onclick = function() {
		if(imac_level == 4) return;

		if(apples >= Math.pow(3, imac_level) * 4000000) {
			apples -= Math.pow(3, imac_level) * 4000000;
			imac_level += 1;
			document.querySelectorAll('.infoValue')[10].innerHTML = Math.pow(3, imac_level) * 4000000;
		} else return;

		if(imac_level == 2) {
			that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 21.5 <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 20000).toFixed(0) + '</span>';
		} else if(imac_level == 3) {
			that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 40000).toFixed(0) + '</span>';
		} else if(imac_level == 4) {
			that.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 Retina 5K <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 80000).toFixed(0) + '</span>';
			document.querySelectorAll('.info')[10].innerHTML = '<span class="infoValue"></span>Maximum';
		}

		for(var i = 0; i < document.querySelectorAll('.imac').length; i++) {
			document.querySelectorAll('.imac')[i].src = './img/imac' + imac_level + '.png';
			income += 1000 * Math.pow(2, imac_level-2) ;
		}
	}

	this.side[0].querySelectorAll('.save-btn')[0].onclick = function() {
		var that = this;

		var sc = '';
		sc += btoa(apples + '/' + income + '/' + click_income + '/' + click_count + '/' 
			+ click_level + '/' + ipod_level + '/' + iphone_level + '/' + ipad_level + '/'
			+ macbook_level + '/' + imac_level + '/' + document.querySelectorAll('.ipod').length + '/'
			+ document.querySelectorAll('.iphone').length + '/' 
			+ document.querySelectorAll('.ipad').length + '/'
			+ document.querySelectorAll('.macbook').length + '/'
			+ document.querySelectorAll('.imac').length + '/');
		// console.log(sc);

		var sv = {
			state0: {
				title: '아래의 세이브 코드를 기록해주세요.',
				html:'<p>' + sc + '</p>',
				buttons: {"close":true },
				focus: 1,
				submit:function(e,v,m,f){
					if(v){
						e.preventDefault();
						$.prompt.goToState('state1', true);
						return false;
					}
					$.prompt.close();
				}
			},
			state1: {
				title: "세이브 코드 복사 완료!",
				html: "복사한 코드를 Load Game을 통해 언제 어디서나 불러올 수 있습니다!",
				buttons: { Close: 0 },
				focus: 0
			}
		};

		$.prompt(sv);
	}

	this.side[0].querySelectorAll('.load-btn')[0].onclick = function() {
		var sc;
		var ld = {
			state0: {
				title: '세이브 코드를 입력해주세요.',
				html:'<label>Code <input type="text" name="code" value=""></label><br />',
				buttons: { '확인': 1 },
				submit:function(e,v,m,f){
					sc = atob(f.code);
					console.log(sc);
					var load = sc.split("/");
					that.loadData(load);
					e.preventDefault();
					$.prompt.goToState('state1');
				}
			},
			state1: {
				html: "성공적으로 게임을 불러왔습니다.",
				buttons: { Close: 0 },
				focus: 0
			}
		};

		$.prompt(ld);	
	}

	this.side[0].querySelectorAll('.tuto-btn')[0].onclick = function() {
		var tourSubmitFunc = function(e,v,m,f){
			if(v === -1){
				$.prompt.prevState();
				return false;
			}
			else if(v === 1){
				$.prompt.nextState();
				return false;
			}
		},
		tutorial = [
			{
				title: '환영합니다!',
				html: 'Apple Clicker의 세계에 오신 것을 환영합니다!',
				buttons: { Next: 1 },
				focus: 0,
				position: { container: '.title', x: 30, y: 60, width: 200, arrow: 'tc' },
				submit: tourSubmitFunc
			},
			{
				title: '사과들',
				html: '이 숫자는 당신이 소유하고 있는 apple을 나타냅니다. apple을 모아서 다양한 제품을 구매하세요!',
				buttons: { Prev: -1, Next: 1 },
				focus: 1,
				position: { container: '.countApples', x: 230, y: 0, width: 300, arrow: 'lt' },
				submit: tourSubmitFunc
			},
			{
				title: "애플 로고",
				html: '애플 로고를 누르시면 apple을 획득합니다.',
				buttons: { Prev: -1, Next: 1 },
				focus: 1,
				position: { container: '.appleButton', x: 50, y: 300, width: 200, arrow: 'tc' },
				submit: tourSubmitFunc
			},
			{
				title: '마우스 강화',
				html: '일정 apple을 지불하고 마우스 강화를 하시면 애플 로고를 클릭할 때 더 많은 apple을 획득할 수 있어요.',
				buttons: { Prev: -1, Next: 1 },
				focus: 1,
				position: { container: '.upApple', x: -100, y: 50, width: 300, arrow: 'tc' },
				submit: tourSubmitFunc
			},
			{
				title: '보유 중인 애플 기기',
				html: '이 곳에서 구매한 애플 기기를 볼 수 있습니다. 검은 글씨가 현재 제품명, 보라색이 초당 apple 획득량을 나타냅니다.',
				buttons: { Prev: -1, Next: 1 },
				focus: 1,
				position: { container: '.ipodType', x: -120, y: 50, width: 400, arrow: 'tc' },
				submit: tourSubmitFunc
			},
			{
				title: '애플 스토어',
				html: '이 곳에서 기기를 구매하거나 신제품으로 업그레이드 할 수 있습니다. 업그레이드시 초당 apple 획득량이 증가합니다.',
				buttons: { Prev: -1, Next: 1 },
				focus: 1,
				position: { container: '.shopBar', x: -30, y: 80, width: 400, arrow: 'tc' },
				submit: tourSubmitFunc
			},
			{
				title: '시작하세요!',
				html: '튜토리얼이 끝났습니다. 이제 apple clicker를 시작해볼까요? 애플 로고를 마구 눌러주세요!',
				buttons: { Done: 2 },
				focus: 0,
				position: { container: '.appleButton', x: 320, y: 120, width: 275, arrow: 'lt' },
				submit: tourSubmitFunc
			}
		];
		$.prompt(tutorial);
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

_.loadData = function(code) {
	var data = code;
	apples = parseInt(data[0]);
	income = parseInt(data[1]);
	click_income = parseInt(data[2]);
	click_level = parseInt(data[3]);
	click_count = parseInt(data[4]);
	ipod_level = parseInt(data[5]);
	iphone_level = parseInt(data[6]);
	ipad_level = parseInt(data[7]);
	macbook_level = parseInt(data[8]);
	imac_level = parseInt(data[9]);

	$('.ipod').remove();$('.iphone').remove();$('.ipad').remove();
	$('.macbook').remove();$('.imac').remove();
	for(var i=0; i < parseInt(data[10]); i++) {
		new Ipod(this, ipod_level);
		document.querySelectorAll('.infoValue')[1].innerHTML = 50 + document.querySelectorAll('.ipod').length * 50;
		if(ipod_level == 1) {
			this.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 3).toFixed(0) + '</span>';
		} else if(ipod_level == 2) {
			this.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Nano2 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 6).toFixed(0) + '</span>';
		} else if(ipod_level == 3) {
			this.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Classic <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 12).toFixed(0) + '</span>';
		} else if(ipod_level == 4) {
			this.main[0].querySelectorAll('.ipodType')[0].innerHTML = 'Ipod Touch <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipod').length * 24).toFixed(0) + '</span>';
		}

		if(document.querySelectorAll('.ipod').length > 49)
			document.querySelectorAll('.info')[1].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	if(ipod_level != 4) {
		document.querySelectorAll('.infoValue')[2].innerHTML = Math.pow(3, ipod_level) * 400;
	} else {
		document.querySelectorAll('.info')[2].innerHTML = '<span class="infoValue"></span>Maximum';
	}

	for(var i=0; i < parseInt(data[11]); i++) {
		new Iphone(this, iphone_level);
		document.querySelectorAll('.infoValue')[3].innerHTML = 800 + document.querySelectorAll('.iphone').length * 800;
		if(iphone_level == 1) {
			this.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 3GS <span class="incomeInfo">'
			+ (document.querySelectorAll('.iphone').length * 15).toFixed(0) + '</span>';
		} else if(iphone_level == 2) {
			this.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 4S <span class="incomeInfo">'
			+ (document.querySelectorAll('.iphone').length * 30).toFixed(0) + '</span>';
		} else if(iphone_level == 3) {
			this.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 5S <span class="incomeInfo">'
			+ (document.querySelectorAll('.iphone').length * 60).toFixed(0) + '</span>';
		} else if(iphone_level == 4) {
			this.main[0].querySelectorAll('.iphoneType')[0].innerHTML = 'iphone 6 <span class="incomeInfo">'
			+ (document.querySelectorAll('.iphone').length * 120).toFixed(0) + '</span>';
		}

		if(document.querySelectorAll('.iphone').length > 49)
			document.querySelectorAll('.info')[3].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	if(iphone_level != 4) {
		document.querySelectorAll('.infoValue')[4].innerHTML = Math.pow(3, iphone_level) * 6400;
	} else {
		document.querySelectorAll('.info')[4].innerHTML = '<span class="infoValue"></span>Maximum';
	}

	for(var i=0; i < parseInt(data[12]); i++) {
		new Ipad(this, ipad_level);
		document.querySelectorAll('.infoValue')[5].innerHTML = 5000 + document.querySelectorAll('.ipad').length * 5000;
		if(ipad_level == 1) {
			this.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad 1 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 75).toFixed(0) + '</span>';
		} else if(ipad_level == 2) {
			this.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad mini <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 150).toFixed(0) + '</span>';
		} else if(ipad_level == 3) {
			this.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 300).toFixed(0) + '</span>';
		} else if(ipad_level == 4) {
			this.main[0].querySelectorAll('.ipadType')[0].innerHTML = 'ipad air2 <span class="incomeInfo">'
			+ (document.querySelectorAll('.ipad').length * 600).toFixed(0) + '</span>';
		}

		if(document.querySelectorAll('.ipad').length > 49)
			document.querySelectorAll('.info')[5].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	if(ipad_level != 4) {
		document.querySelectorAll('.infoValue')[6].innerHTML = Math.pow(3, ipad_level) * 40000;
	} else {
		document.querySelectorAll('.info')[6].innerHTML = '<span class="infoValue"></span>Maximum';
	}

	for(var i=0; i < parseInt(data[13]); i++) {
		new Macbook(this, macbook_level);
		document.querySelectorAll('.infoValue')[7].innerHTML = 60000 + document.querySelectorAll('.macbook').length * 60000 ;
		if(macbook_level == 1) {
			this.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 11 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 500).toFixed(0) + '</span>';
		} else if(macbook_level == 2) {
			this.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Air 13 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 1000).toFixed(0) + '</span>';
		} else if(macbook_level == 3) {
			this.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 13 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 2000).toFixed(0) + '</span>';
		} else if(macbook_level == 4) {
			this.main[0].querySelectorAll('.macbookType')[0].innerHTML = 'Macbook Pro 15 <span class="incomeInfo">'
			+ (document.querySelectorAll('.macbook').length * 4000).toFixed(0) + '</span>';
		}

		if(document.querySelectorAll('.macbook').length > 49)
			document.querySelectorAll('.info')[7].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	if(macbook_level != 4) {
		document.querySelectorAll('.infoValue')[8].innerHTML = Math.pow(3, macbook_level) * 480000;
	} else {
		document.querySelectorAll('.info')[8].innerHTML = '<span class="infoValue"></span>Maximum';
	}

	for(var i=0; i < parseInt(data[14]); i++) {
		new Imac(this, imac_level);
		document.querySelectorAll('.infoValue')[9].innerHTML = 500000 + document.querySelectorAll('.imac').length * 500000;
		if(imac_level == 1) {
			this.main[0].querySelectorAll('.imacType')[0].innerHTML = '중고 iMac 21.5 <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 5000).toFixed(0) + '</span>';
		} else if(imac_level == 2) {
			this.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 21.5 <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 10000).toFixed(0) + '</span>';
		} else if(imac_level == 3) {
			this.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 20000).toFixed(0) + '</span>';
		} else if(imac_level == 4) {
			this.main[0].querySelectorAll('.imacType')[0].innerHTML = 'iMac 27 Retina 5K <span class="incomeInfo">'
			+ (document.querySelectorAll('.imac').length * 40000).toFixed(0) + '</span>';
		}

		if(document.querySelectorAll('.imac').length > 49)
			document.querySelectorAll('.info')[9].innerHTML = '<span class="infoValue"></span>Maximum';
	}
	if(imac_level != 4) {
		document.querySelectorAll('.infoValue')[10].innerHTML = Math.pow(3, imac_level) * 4000000;
	} else {
		document.querySelectorAll('.info')[10].innerHTML = '<span class="infoValue"></span>Maximum';
	}

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
	this.dom.src = './img/ipod' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.ipod').length * 13) + '.px';
	this.dom.style.top = '18%';

	this.gamemanager.main[0].querySelectorAll('.ipodArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 0.1 * Math.pow(2, this.level-1));
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
	this.dom.src = './img/iphone' + this.level + '.png';
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
	this.dom.src = './img/ipad' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.ipad').length * 12) + '.px';
	this.dom.style.top = '52%';

	this.gamemanager.main[0].querySelectorAll('.ipadArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 10 * Math.pow(2, this.level-1));
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
	this.dom.src = './img/macbook' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.macbook').length * 11) + '.px';
	this.dom.style.top = '70%';

	this.gamemanager.main[0].querySelectorAll('.macbookArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 150 * Math.pow(2, this.level-1));
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
	this.dom.src = './img/imac' + this.level + '.png';
	this.dom.style.left = 10 + (document.querySelectorAll('.imac').length * 11) + '.px';
	this.dom.style.top = '87%';

	this.gamemanager.main[0].querySelectorAll('.imacArea')[0].appendChild(this.dom);
	this.gamemanager.setIncome(this.gamemanager.getIncome() + 1000 * Math.pow(2, this.level-1));
}

_._bindEvents = function() {
	var that = this;
}
