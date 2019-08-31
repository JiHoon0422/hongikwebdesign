/**
 * Date :  2016-11-26 오후 6:50
 */

/**
 * 태그의 모든 속성 삭제
 * @returns {*}
 */
$.fn.removeAttributes = function(){
	return this.each(function(){
		var attributes = $.map(this.attributes, function( item ){
			return item.name;
		});
		var img = $(this);
		$.each(attributes, function( i, item ){
			img.removeAttr(item);
		});
	});
}

/**
 * $("div").removeClassExcept("aa bb");
 * @param val aa, bb 를 제외한 모든 클래스 제거
 * @returns {*}
 */
$.fn.removeClassExcept = function( val ){
	return this.each(function( index, el ){
		var keep = val.split(" "),  // list we'd like to keep
			reAdd = [],          // ones that should be re-added if found
			$el = $(el);       // element we're working on
		
		// look for which we re-add (based on them already existing)
		for( var i = 0; i < keep.length; i++ ){
			if( $el.hasClass(keep[i]) ) reAdd.push(keep[i]);
		}
		
		// drop all, and only add those confirmed as existing
		$el.removeClass()               // remove existing classes
			.addClass(reAdd.join(' '));  // re-add the confirmed ones
	});
};

/**
 * outerHTML
 */
$.fn.extend({
	/**
	 * $(target).outerHTML();
	 * @returns {String}
	 */
	outerHTML:function(){
		return $(this).clone().wrapAll("<div></div>").parent().html();
	},
	changeTag:function( tag ){
		$(this).replaceWith('<'+tag+'>'+$(this).html()+'</'+tag+'>');
	}
});

/**
 * 오늘날짜 문자열반환
 */
$.getToday = function( betweenStr ){
	if( typeof betweenStr==="undefined" ) betweenStr = "";
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	
	if( dd < 10 ) dd = '0'+dd;
	if( mm < 10 ) mm = '0'+mm;
	
	today = yyyy+betweenStr+mm+betweenStr+dd;
	return today;
}

/**
 * 지금시간 문자열반환
 */
$.getTime = function( betweenStr ){
	if( typeof betweenStr==="undefined" ) betweenStr = "";
	var today = new Date();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	
	if( hour < 10 ) hour = '0'+hour;
	if( minute < 10 ) minute = '0'+minute;
	if( second < 10 ) second = '0'+second;
	
	today = hour+betweenStr+minute+betweenStr+second;
	return today;
}

/**
 * 오늘날짜 및 시간 문자열반환
 */
$.getFullTime = function( betweenStr ){
	if( typeof betweenStr==="undefined" ) betweenStr = "";
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	
	if( dd < 10 ) dd = '0'+dd;
	if( mm < 10 ) mm = '0'+mm;
	if( hour < 10 ) hour = '0'+hour;
	if( minute < 10 ) minute = '0'+minute;
	if( second < 10 ) second = '0'+second;
	
	today = yyyy+betweenStr+mm+betweenStr+dd+betweenStr+hour+betweenStr+minute+betweenStr+second;
	return today;
}

/**
 * 년월일시분 넣어서 사이에 속한 날짜인지 체크
 * @param start
 * @param end
 * @returns {boolean}
 * ex) $.checkBetween('2015-12-07 10:00', '2018-01-01 00:00')
 */
$.checkBetween = function( start, end, callback ){
	start = $.dateStringToNumber(start);
	end = $.dateStringToNumber(end);
	
	var date = new Date();
	var yyyy = date.getFullYear();
	var mm = date.getMonth()+1;
	var dd = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	
	if( mm < 10 ) mm = '0'+mm;
	if( dd < 10 ) dd = '0'+dd;
	if( hour < 10 ) hour = '0'+hour;
	if( minute < 10 ) minute = '0'+minute;
	
	var today = $.dateStringToNumber(yyyy+mm+dd+hour+minute);
	
	if( start <= today && today <= end ){
		if( callback ) callback();
		return true;
	}else{
		return false;
	}
}

/**
 * 스트링 넘어오면 숫자로 반환해줌
 * @param dateString
 * ex) $.dateStringToNumber("2016-01-01 12:00");
 */
$.dateStringToNumber = function( dateString ){
	dateString = dateString+'';
	var num = Math.floor(dateString.replace(/-/g, '').replace(/:/g, '').replace(/ /g, ''));
	return num;
}

/**
 * 파라메터들 추출
 * @returns {Array}
 */
$.getUrlVars = function(){
	var vars = {}, hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
	for( var i = 0; i < hashes.length; i++ ){
		hash = hashes[i].split('=');
		vars[hash[0]] = hash[1];
	}
	
	return vars;
}

/**
 * 파라메터 추출
 * @param name
 * @returns {*}
 */
$.getParam = function( name ){
	var value = $.getUrlVars()[name];
	value = (typeof value!=="undefined") ? value : null;
	return value;
}

/**
 * URL에 파라메터 추가
 * @param url
 * @param param
 * @returns {string}
 */
$.setParam = function( url, param ){
	var paramStr = $.param(param);
	url = url+"?"+paramStr;
	return url;
}

/**
 * 쿠키 파기 일수 받아서 쿠키 굽기
 * @param key
 * @param value
 * @param day 제한 일수
 * $.cookieDay('ksm', 'notWatch', 1);
 */
$.cookieDay = function( key, value, day ){
	$.cookie(key, value, { expires:day });
}

/**
 * 쿠키의 key & value 를 체크해서 있으면 callback 실행
 * @param key 키값
 * @param value 벨류값
 * @param callback key & value Object
 * $.cookieCheck('ksm', 'notWatch', function( e ){});
 */
$.cookieCheck = function( key, value, callback ){
	var c_value = $.cookie(key);
	//쿠키 있는지 체크
	if( c_value ){
		//쿠키의 값 체크
		if( c_value==value ){
			var obj = {
				"key":key,
				"value":value
			};
			if( callback ) callback(obj);
		}
	}else{
		console.log(key+' : cookie undefined');
	}
}

/**
 * HTML include
 * @param url
 */
$.include = function( url ){
	if( !url ) return;
	$.ajax({
		url:url,
		method:"GET",
		dataType:"html",
		async:false,
		cache:false,
		success:function( html, status, xhr ){
			document.write('<div data-url="'+url+'" style="display:none;"></div>');
			document.write(html);
			$('.include').remove();
		},
		error:function( jqXHR, textStatus, errorThrown ){
			console.log("ERROR : jquery.extend.js > include : "+url);
			console.log(arguments);
		}
	});
}

$.trimTab = function( str ){
	var regExp = new RegExp("\t", "gi");
	str = str.replace(regExp, "");
	return str;
}

/**
 * 디버그모드 발동
 */
$(function(){
	if( $.getParam('debug')=='true' ){
		$('body').addClass('debug_mode');
	}
});

/**
 * drawLine($('#taget1'), $('#taget2'), "left bottom", "#f00");
 * @param $from
 * @param $to
 * @param direction
 * @param color
 */
function drawLine ( $from, $to, direction, color ){
	var $line = $('<div class="draw_line '+direction+'">draw_line</div>');
	var xPos = $from.position().left;
	var yPos = $from.position().top;
	var wid = Math.abs(xPos-$to.position().left);
	var hei = Math.abs(yPos-$to.position().top);
	console.log(wid);
	$line.css({
		"position":"absolute",
		"left":xPos+"px",
		"top":yPos+"px",
		"width":wid,
		"height":hei,
	});
	if( $line.hasClass('left') ) $line.css('border-left', '1px solid '+color);
	if( $line.hasClass('right') ) $line.css('border-right', '1px solid '+color);
	if( $line.hasClass('top') ) $line.css('border-top', '1px solid '+color);
	if( $line.hasClass('bottom') ) $line.css('border-bottom', '1px solid '+color);
	$from.parent().append($line);
}

/**
 * Depth Data를 UL 뎁스로 컨버팅 해줌
 * @param depth_data
 * @returns {*}
 */
function convertDepthDataToUL ( depth_data ){
	var $cover_ul = $('<ul></ul>');
	var str = '';
	
	$(depth_data).each(function( i ){
		var li_dom = '';
		li_dom += '<li>';
		li_dom += '	<a>';
		li_dom += '		<span>'+this.label+'</span>';
		li_dom += '	</a>';
		if( this.childs ){
			li_dom += convertDepthDataToUL(this.childs);
		}
		li_dom += '</li>';
		var $li = $(li_dom);
		var $a = $li.find('> a');
		if( this.href ) $a.attr('href', this.href);
		else{
			$li.addClass('has_child');
			$a.attr('href', 'javascript:void(0);');
		}
		if( this.target ) $a.attr('target', this.target);
		str += $li.outerHTML();
	});
	$cover_ul.html(str);
	
	var output = $cover_ul.outerHTML();
	return output;
}

/**
 * Depth Data를 SELECT 뎁스로 컨버팅 해줌
 * @param depth_data
 * @returns {*}
 */
function convertDepthDataToSELECT ( depth_data ){
	
	function createOption ( depth_data ){
		var str = '';
		$(depth_data).each(function( i ){
			if( this.childs ){
				str += '	<optgroup label="'+this.label+'">';
				str += '		'+createOption(this.childs);
				str += '	</optgroup>';
			}else{
				str += '	<option value="'+this.href+'" data-target="'+this.target+'">'+this.label+'</option>';
			}
			
		});
		return str;
	}
	
	var output = '<select>';
	output += createOption(depth_data);
	output += '</select>';
	
	return output;
}

/**
 * 'remember' 라는 class를 주면 input 의 value 값을 새로고침해도 기업할 수 있게끔
 * <input id="x1" class="remember" type="number" value="16"/>
 */
$(function(){
	$('input.remember').each(function( i ){
		var id = $(this).attr('id');
		if( typeof id==="undefined" ){
			console.log(this);
			console.log("id 값이 없어 value 를 기억할 수 없다.");
			return;
		}
		var rememberVal = window.localStorage.getItem('remember_'+id);
		if( rememberVal ) $(this).val(rememberVal);
		
		$(this).change(function( e ){
			var val = $.trim($(this).val());
			window.localStorage.setItem('remember_'+id, val);
		});
		
	});
});

/**
 * 스크립트 동적 로드
 * @param url
 * @param callback
 */
jQuery.loadScript = function( url, callback ){
	jQuery.ajax({
		url:url,
		dataType:"script",
		async:false,
		timeout:60*1000,
		success:callback,
		error:function( jqXHR, textStatus, errorThrown ){
			console.log("loadScript ERROR : "+url);
			console.log(arguments);
		}
	});
}



