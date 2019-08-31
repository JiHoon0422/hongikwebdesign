/**
 * Date :  2016-05-02 오후 10:34
 * 모든 페이지에 공통으로 들어가는 JS
 * 이 사이트뿐아니라 다른곳에서도 전부 쓰이는 스크립트 작성
 */
var LANG_CODE = 'ko';
var DEFAULT = {};
var VIEW_TYPE;
var PREV_VIEW_TYPE;

function setViewType (){
	//var wid = $('html').prop('scrollWidth');
	var wid = window.innerWidth;
	
	if( wid >= DESKTOP_BREAK_POINT ){
		//데스크탑
		VIEW_TYPE = 'desktop';
	}
	if( wid < DESKTOP_BREAK_POINT ){
		//테블릿
		VIEW_TYPE = 'tablet';
	}
	if( wid < 768 ){
		//모바일
		VIEW_TYPE = 'mobile';
	}
	
	$('body').attr('data-view-type', VIEW_TYPE);
	
	if( PREV_VIEW_TYPE!=VIEW_TYPE ){
		var event = $.Event('view_type_change');
		$(window).trigger(event);//bubble true
	}
	
	PREV_VIEW_TYPE = VIEW_TYPE;
}

setViewType();
window.onresize = function(){
	setViewType();
}

/*
 * DOM 로딩 완료
 */
$(function(){
	DEFAULT.getLangCode();
	DEFAULT.browserInfo();
	DEFAULT.checkMobile();
	DEFAULT.createGNB();
	DEFAULT.setTargetBlankTitle();
	DEFAULT.addImgAlt();
	//화면이 한번에 뙇 뜨게끔 처리
	$('body > .page').addClass('visible');
});

/*
 * 페이지 랭기지 코드 담아두기
 */
DEFAULT.getLangCode = function(){
	LANG_CODE = $('html').attr('lang');
}

/*
 * 브라우저 찾아서 body 클래스 추가
 */
DEFAULT.browserInfo = function(){
	if( $.browser.msie==true ){
		var ver = parseInt($.browser.version);
		$('body').addClass('ie'+ver);
	}else{
		for( var key in $.browser ){
			$('body').addClass(key);
		}
	}
}

/*
 * 모바일인지 체크
 */
var DEVICE_IS_MOBILE = false;
DEFAULT.checkMobile = function(){
	/*모바일 기종 체크*/
	var mobileArr = new Array("iPhone", "iPad", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson");
	for( var txt in mobileArr ){
		if( navigator.userAgent.indexOf(mobileArr[txt]) > -1 ){
			DEVICE_IS_MOBILE = true;
			break;
		}
	}
	
	if( DEVICE_IS_MOBILE ){
		//모바일이면
		$('body').addClass('device_is_mobile');
	}else{
		//데스크탑이면
		$('body').addClass('device_is_desktop');
	}
}

/*
 * GNB DOM 생성
 */
DEFAULT.createGNB = function(){
	if( typeof MENU_DATA_LIST!=="undefined" ){
		/*
		"menuCode":"003",
		"menuUrl":"/m/intro0101.html",
		"menuTargetName":"",
		"menuUrlName":"대학안내",
		"menuVisiblePC":"Y",
		"menuVisibleMobile":"Y",
		"menuChilds":[]
		* */
		var menuHtml = makeGnb(MENU_DATA_LIST);
		$('#gnb').prepend(menuHtml);
		//자식 있으면 has_child 클래스 추가
		$('#gnb li').each(function( i ){
			var $ul = $(this).find('> ul');
			if( $ul.length > 0 ){
				$(this).addClass('has_child');
			}
		});
		
		//DESKTOP 화면에서 2뎁스에 보여지는게 아무것도 없다면
		//DESKTOP GNB CLONE 영역 삭제
		if( $('#gnb > li').not('.hide_at_gnb').find('> ul').length==0 ){
			$('#header .gnb_clone_sec').remove();
		}
		
		function makeGnb ( menuData ){
			var str_li = '';
			$(menuData).each(function( i ){
				var str = '';
				str += '<li>';
				str += '	<a>';
				str += '		<span>'+this.menuUrlName+'</span>';
				str += '	</a>';
				var menuChilds = this.menuChilds;
				if( typeof menuChilds!=="undefined" && menuChilds.length > 0 ){
					str += '<ul>';
					str += makeGnb(menuChilds);
					str += '</ul>';
				}
				str += '</li>';
				var $cover = $('<ul>'+str+'</ul>');
				var $li = $cover.find('> li');
				var $a = $li.find('> a');
				if( this.menuUrl ) $a.attr('href', this.menuUrl);
				if( this.menuCode ) $a.attr('data-mc', this.menuCode);
				if( this.menuTargetName ) $a.attr('target', this.menuTargetName);
				if( this.menuVisiblePC=="N" ) $li.addClass('hide_at_gnb');
				if( this.menuVisibleMobile=="N" ) $li.addClass('hide_at_mobile_gnb');
				str_li += $cover.html();
			});
			return str_li;
		}
	}
	
}

/*
 * GNB에서 target 이 _blank인 녀석들에게 '바로가기' title 속성 부여
 */
DEFAULT.setTargetBlankTitle = function(){
	$('#gnb a[target="_blank"]').each(function( i ){
		var text = $.trim($(this).text());
		$(this).attr('title', text+' 바로가기');
	});
}

/*
 * 이미지에 alt 속성이 없으면 공백 alt 추가
 */
DEFAULT.addImgAlt = function(){
	$('img, area').each(function( i ){
		var alt = $(this).attr('alt');
		if( typeof alt==="undefined" ){
			$(this).attr('alt', "");
		}
	});
}

/*
 하이브리드앱 웹뷰에서 target="_blank"를 인지 할 수 없기때문에 아래 꼼수를 작성함.
 a의 target이 _blank이면 href에 system_browser_oepn=1 이라는 매개변수를 추가하면,
 네이티브쪽에서 URL을 읽어서 매개변수 체크해서 디바이스 시스템 브라우저를 호출할 수있다.
$(function(){
	$('a.app_button[target="_blank"]').each(function( i ){
		var href=$(this).attr('href');
		href=updateQueryStringParameter(href, 'system_browser_oepn', '1');
		$(this).attr('href', href);
	});
});
 */

/*
 * 시연용 뷰어에서 스크롤바를 가릴 필요가 있을때 매개변수를 받아 처리함
 * 2018-11-08
 */
function checkScrollBar (){
	var scrollBar = QueryString.scrollBar;
	if( scrollBar==="false" ){
		$('html').addClass('hidden_scroll_bar');
	}
}

checkScrollBar();



