/**
 * Date :  2016-11-25 오후 3:48
 * 모든 HTML에 삽입 되는 JS 초기화 스크립트 모음
 */
/************************************************
 Add Console Features
 *************************************************/
if( !window.console || !console.log ){
	console = {
		log:function(){
		},
		warn:function(){
		}
	};
}

//프론트 소스 사용 여부
var IS_FRONT_SERVER = false;
// if( window.location.hostname=="frt.sogood.co.kr" ) IS_FRONT_SERVER = true;
// if( window.location.hostname=="www.dol2156.cf" ) IS_FRONT_SERVER = true;
if( window.location.hostname.indexOf('dol2156') > 0 ) IS_FRONT_SERVER = true;

if( !('getFullTime' in Date.prototype) ){
	Date.prototype.getFullTime = function( owner ){
		var that = this;
		var month = that.getMonth()+1;
		if( month < 10 ) month = "0"+month;
		var day = that.getDay();
		if( day < 10 ) day = "0"+day;
		var hours = that.getHours();
		if( hours < 10 ) hours = "0"+hours;
		var min = this.getMinutes();
		if( min < 10 ) min = "0"+min;
		var getMilliseconds = that.getMilliseconds();
		if( getMilliseconds < 100 ) getMilliseconds = "0"+getMilliseconds;
		var str = ""+that.getFullYear()+month+hours+min+getMilliseconds;
		return str;
	};
}
// Add ECMA262-5 method binding if not supported natively
if( !('bind' in Function.prototype) ){
	Function.prototype.bind = function( owner ){
		var that = this;
		if( arguments.length <= 1 ){
			return function(){
				return that.apply(owner, arguments);
			};
		}else{
			var args = Array.prototype.slice.call(arguments, 1);
			return function(){
				return that.apply(owner, arguments.length===0 ? args : args.concat(Array.prototype.slice.call(arguments)));
			};
		}
	};
}
// Add ECMA262-5 string trim if not supported natively
//
if( !('trim' in String.prototype) ){
	String.prototype.trim = function(){
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
	};
}
// Add ECMA262-5 Array methods if not supported natively
//
if( !('indexOf' in Array.prototype) ){
	Array.prototype.indexOf = function( find, i /*opt*/ ){
		if( i===undefined ) i = 0;
		if( i < 0 ) i += this.length;
		if( i < 0 ) i = 0;
		for( var n = this.length; i < n; i++ )
			if( i in this && this[i]===find )
				return i;
		return -1;
	};
}
if( !('lastIndexOf' in Array.prototype) ){
	Array.prototype.lastIndexOf = function( find, i /*opt*/ ){
		if( i===undefined ) i = this.length-1;
		if( i < 0 ) i += this.length;
		if( i > this.length-1 ) i = this.length-1;
		for( i++; i-- > 0; ) /* i++ because from-argument is sadly inclusive */
			if( i in this && this[i]===find )
				return i;
		return -1;
	};
}
if( !('forEach' in Array.prototype) ){
	Array.prototype.forEach = function( action, that /*opt*/ ){
		for( var i = 0, n = this.length; i < n; i++ )
			if( i in this )
				action.call(that, this[i], i, this);
	};
}
if( !('map' in Array.prototype) ){
	Array.prototype.map = function( mapper, that /*opt*/ ){
		var other = new Array(this.length);
		for( var i = 0, n = this.length; i < n; i++ )
			if( i in this )
				other[i] = mapper.call(that, this[i], i, this);
		return other;
	};
}
if( !('filter' in Array.prototype) ){
	Array.prototype.filter = function( filter, that /*opt*/ ){
		var other = [], v;
		for( var i = 0, n = this.length; i < n; i++ )
			if( i in this && filter.call(that, v = this[i], i, this) )
				other.push(v);
		return other;
	};
}
if( !('every' in Array.prototype) ){
	Array.prototype.every = function( tester, that /*opt*/ ){
		for( var i = 0, n = this.length; i < n; i++ )
			if( i in this && !tester.call(that, this[i], i, this) )
				return false;
		return true;
	};
}
if( !('some' in Array.prototype) ){
	Array.prototype.some = function( tester, that /*opt*/ ){
		for( var i = 0, n = this.length; i < n; i++ )
			if( i in this && tester.call(that, this[i], i, this) )
				return true;
		return false;
	};
}

if( !('remove' in Array.prototype) ){
	Array.prototype.remove = function(){
		var what, a = arguments, L = a.length, ax;
		while( L && this.length ){
			what = a[--L];
			while( (ax = this.indexOf(what))!== -1 ){
				this.splice(ax, 1);
			}
		}
		return this;
	};
}

/************************************************
 UTIL
 *************************************************/
/**
 * 3자리마다 쉼표찍어서 반환
 * @param x
 * @returns {string}
 */
function numberWithCommas ( x ){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 디지털 숫자 문자열로 반환
 * @param num
 * @param width
 * @returns {*}
 */
function getDigit ( num, width ){
	width = width || 2;
	var len = (num+'').length;
	var zero = '';
	var i = 0;
	var k = 20;
	while( i < width-len ){
		zero += '0';
		++i;
	}
	if( len < width ) num = zero+num;
	else num = num+'';
	return num;
}

/**
 * Date :  2017-03-06
 * Write : Seok-Min Kang
 * newWindowPop.open('/front_system/libs/newWindowPop/pop.html','new_pop',500,400);
 * newWindowPop.open('/front_system/libs/newWindowPop/pop.html','new_pop',500,400, 0, 0);
 * newWindowPop.open('/front_system/libs/newWindowPop/pop.html','new_pop',500,400, 0, 0,'top','center');
 * newWindowPop.open('/front_system/libs/newWindowPop/pop.html','new_pop',500,400, 0, 0,'middle','left');
 * newWindowPop.open('/front_system/libs/newWindowPop/pop.html','new_pop',500,400, 0, 0,'bottom','right');
 * newWindowPop.open('/front_system/libs/newWindowPop/pop.html','new_pop',500,400, 0, 0, 100,100);
 */
var newWindowPop = {
	open:function _popup ( vurl, vwiname, wid, hei, scrollbars, resizable, top, left ){
		
		if( !top ){
			//top=screen.availHeight/2-hei/2;
			top = 0;
		}else{
			if( typeof top=='string' ){
				switch( top ){
					case 'middle':
						top = screen.availHeight/2-hei/2;
						break;
					case 'top':
						top = 0;
						break;
					case 'bottom':
						top = screen.availHeight;
						break;
				}
			}else{
				top = top;
			}
		}
		
		if( !left ){
			//left=$(window).width()/2+screenLeft-wid/2;
			left = 0;
		}else{
			if( typeof left=='string' ){
				switch( left ){
					case 'center':
						left = $(window).width()/2+screenLeft-wid/2;
						break;
					case 'left':
						left = screenLeft+0;
						break;
					case 'right':
						left = screenLeft+$(window).width();
						break;
				}
			}else{
				left = screenLeft+left;
			}
		}
		
		if( !vwiname ){
			d = new Date();
			vwiname = "_"+d.getFullYear()+d.getMonth()+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds();
		}
		
		var option = {
			width:wid,
			height:hei,
			top:top,
			left:left,
			toolbar:0,
			location:0,
			directories:0,
			status:0,
			menubar:0,
			scrollbars:(scrollbars) ? scrollbars : 1,
			resizable:(resizable) ? resizable : 1,
			copyhistory:0
		}
		
		var arr = [];
		for( var key in option ){
			arr.push(key+'='+option[key]);
		}
		var winprops = arr.join(',');
		
		var popupwin = window.open(vurl, vwiname, winprops, true);
		if( popupwin!=null ) popupwin.focus();
		return popupwin;
	}
}

/**
 * px을 number로 변환
 * @param px
 * @returns {*}
 */
function convertPxToNumber ( px ){
	var regExp = new RegExp("px", "g");
	px = parseInt(px.replace(regExp, ""));
	return px;
}

/**
 * URL에서 파라메터 뽑기
 */
var QueryString = function(){
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for( var i = 0; i < vars.length; i++ ){
		var pair = vars[i].split("=");
		// If first entry with this name
		if( typeof query_string[pair[0]]==="undefined" ){
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		}else if( typeof query_string[pair[0]]==="string" ){
			var arr = [
				query_string[pair[0]],
				decodeURIComponent(pair[1])
			];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		}else{
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}();

/**
 * uri에 파라메터 추가
 * @param uri
 * @param key
 * @param value
 * @returns {*}
 */
function updateQueryStringParameter ( uri, key, value ){
	if( typeof uri==="undefined" ) return;
	var re = new RegExp("([?&])"+key+"=.*?(&|$)", "i");
	var separator = uri.indexOf('?')!== -1 ? "&" : "?";
	if( uri.match(re) ){
		return uri.replace(re, '$1'+key+"="+value+'$2');
	}else{
		return uri+separator+key+"="+value;
	}
}

/**
 * @param id
 * @param dayCnt
 */
function setDayCookie ( id, dayCnt ){
	dayCnt = dayCnt || 1;
	//https://github.com/carhartl/jquery-cookie
	$.cookie(id, true, { expires:dayCnt });
}

/**
 * @param id
 */
function getDayCookie ( id, callback ){
	var is_cookie = $.cookie(id);
	if( is_cookie ){
		if( callback ) callback();
	}
}

/**
 * nodeName 변경 td 를 th로 변경할때 만듬
 * EX) changeNodeName(this, 'th');
 * @param target
 * @param nodeName
 */
function changeNodeName ( target, nodeName ){
	// Grab the original element
	var original = target;
	// Create a replacement tag of the desired type
	var replacement = document.createElement(nodeName);
	
	// Grab all of the original's attributes, and pass them to the replacement
	for( var i = 0, l = original.attributes.length; i < l; ++i ){
		var nodeName = original.attributes.item(i).nodeName;
		var nodeValue = original.attributes.item(i).nodeValue;
		
		replacement.setAttribute(nodeName, nodeValue);
	}
	
	// Persist contents
	replacement.innerHTML = original.innerHTML;
	
	// Switch!
	original.parentNode.replaceChild(replacement, original);
}

/**
 현재 페이지 파일명 추출
 */
function getFileName ( path ){
	//this gets the full url
	var url = path;
	//this removes the anchor at the end, if there is one
	url = url.substring(0, (url.indexOf("#")== -1) ? url.length : url.indexOf("#"));
	//this removes the query after the file name, if there is one
	url = url.substring(0, (url.indexOf("?")== -1) ? url.length : url.indexOf("?"));
	//this removes everything before the last slash in the path
	url = url.substring(url.lastIndexOf("/")+1, url.length);
	//return
	return url;
}

/**
 현재 페이지 파일명 추출
 */
function getFileInfo ( path ){
	var fileStr = getFileName(path);
	
	var re = /(?:\.([^.]+))?$/;
	var ext = re.exec(fileStr)[1];
	
	var obj = {};
	obj.full_name = fileStr;
	obj.name = fileStr.split('.').slice(0, -1).join('.');
	obj.ext = ext;
	
	//return
	return obj;
}

/**
 * 소수점 버림
 * @param num
 * @param cut_dot : 버려야하는 소수점 자릿 수
 * @returns {*}
 */
Math.toFloor = function( num, cut_dot ){
	if( typeof cut_dot==="undefined" ) cut_dot = 2;
	var k = Math.pow(10, cut_dot);
	num = Math.floor(num*k)/k;
	return num;
}

/**
 * 소수점 반올림
 * @param num
 * @param cut_dot : 버려야하는 소수점 자릿 수
 * @returns {*}
 */
Math.toRound = function( num, cut_dot ){
	if( typeof cut_dot==="undefined" ) cut_dot = 2;
	var k = Math.pow(10, cut_dot);
	num = Math.round(num*k)/k;
	return num;
}

/**
 * 소수점 올림
 * @param num
 * @param cut_dot : 버려야하는 소수점 자릿 수
 * @returns {*}
 */
Math.toCeil = function( num, cut_dot ){
	if( typeof cut_dot==="undefined" ) cut_dot = 2;
	var k = Math.pow(10, cut_dot);
	num = Math.ceil(num*k)/k;
	return num;
}

/**
 *  1차 함수
 *  @param x, a, b, c, d - x가 a에서 b까지 변할 때 타겟은 c부터 d까지 변한다.
 *  @return y 타겟 값
 */
Math.linearFunc = function( x, a, b, c, d ){
	var y = (d-c)/(b-a)*(x-a)+c;
	return y;
}

/**
 * Null Check
 * @param value
 * @returns {*}
 */
function isNull ( value ){
	if( value=="" || value==null || value==undefined || (value!=null && typeof value=="object" && !Object.keys(value).length) ){
		return true;
	}else{
		return false;
	}
}

