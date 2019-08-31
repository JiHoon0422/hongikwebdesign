var SUB_PAGE = {};
var MENU_LENGTH = 0;
var $GNB_CLONE;
var HOME_URL;
var HAS_MENU_CODE = false;
$(function(){
	SUB_PAGE.setHomeUrl();
	SUB_PAGE.setPageInfo();
	if( HAS_MENU_CODE ){
		// SUB_PAGE.setSubPageTitle();
		SUB_PAGE.setSubVisual();
		SUB_PAGE.setAside();
		SUB_PAGE.makeContentsTabuiByGnb();
		SUB_PAGE.setFoldBreadcrumb();
		// SUB_PAGE.setDropdownBreadcrumb();
	}
	// SUB_PAGE.setPrintUtil();
	SUB_PAGE.setMinHeight();
});

/*
 헤더는 개발에서 사이트별로 조종할 수 있다.
 개발에서 사이트의 HOME URL을 컨트롤 할 수 있게끔 헤더 로고의 url을 끌어와서 나머지 홈앵커들에게 적용해주자.
 */
SUB_PAGE.setHomeUrl = function(){
	var href = $('#btnGoHomePage').attr('href');
	console.warn("[subpage.js : 32] "+'HOME_URL : '+href);
	HOME_URL = href;
}

/*
 * 페이지 메뉴 뎁스 정보 파싱해서 전역변수에 담아두기
 */
SUB_PAGE.setPageInfo = function(){
	//페이지 메뉴코드 읽어와서
	var menuCode = $('body > .page').attr('data-mc');
	if( typeof menuCode!=="undefined" ){
		HAS_MENU_CODE = true;
		//앵커 탐색
		$('#gnb a').each(function( i ){
			var code = $(this).attr('data-mc');
			//해당 앵커의 부모메뉴들 활성화
			if( menuCode==code ){
				$(this).parentsUntil('#gnb', 'li').addClass('on');
			}
		});
		
		//페이지 정보 전역변수 셋팅
		var menuCodeList = numberWithCommas(menuCode).split(",");
		MENU_LENGTH = menuCodeList.length;
		
		var i = 0;
		var len = menuCodeList.length;
		while( i < len ){
			var selector = '#gnb > li.on';
			var j = 0;
			var len_j = i;
			while( j < len_j ){
				selector += ' > ul > li.on';
				++j;
			}
			selector += ' > a';
			var code = parseInt(menuCodeList[i]);
			window["DEPTH"+(i+1)+"_CODE"] = code;
			window["DEPTH"+(i+1)+"_IDX"] = code-1;
			window["DEPTH"+(i+1)+"_LABEL"] = $.trim($(selector).html());
			window["DEPTH"+(i+1)+"_HREF"] = $.trim($(selector).attr('href'));
			++i;
		}
	}
	
	//aside,location,sitemap 에서 사용할 GNB 복사
	$GNB_CLONE = $('#gnb').clone();
	//$GNB_CLONE.removeAttr('id class');
	$GNB_CLONE.removeAttr('id');
	
	$('body').attr('data-depth1-code', DEPTH1_CODE);
}

/*
 * 서브페이지 제목 생성 및 삽입
 */
SUB_PAGE.setSubPageTitle = function(){
	if( $('#sub_page_title').length > 0 ) return;
	
	var str = '';
	str += '<h1 id="sub_page_title"></h1>';
	$('#body > .main').prepend(str);
	
	var label = window["DEPTH"+(MENU_LENGTH)+"_LABEL"];
	if( label ) $('#sub_page_title').html(label);
}

/*
 * 서브페이지 타이틀 커스텀
 * EX)
 * SUB_PAGE.title("보이는 소리");
 */
SUB_PAGE.title = function( text ){
	$(function(){
		$('#sub_page_title > span').text(text);
	});
}

/*
 * 서브페이지 비쥬얼 셋팅
 */
SUB_PAGE.setSubVisual = function(){
	
	if( HAS_MENU_CODE && $('#sub_page_visual').length==0 ){
		var str = '';
		/* str += '<div id="sub_page_visual"></div>'; */
        /* JM 2018-08-23 상단 수정 */
        str += '<div id="sub_page_visual"><div class="sub_page_text"></div></div>';
		var $sub_page_visual = $(str);
		
		//헤더 밑에 삽입
		$sub_page_visual.insertAfter('#header');
	}
}

/*
 * 서브페이지 LNB 생성 및 삽입
 */
SUB_PAGE.setAside = function(){
	if( !HAS_MENU_CODE ) return;
	if( $('#body > .aside').length > 0 ) return;
	//option
	var isCollapse = true;
	
	//make lnb
	var $aside = $('<div id="lnb" class="aside"></div>');
	$aside.html($GNB_CLONE.outerHTML());
	$('#body').prepend($aside);
	
	//add action
	if( isCollapse ){
		//TODO: 2뎁스 자식 있으면 속성 삭제
		$('#lnb li.has_child > a').each(function( i ){
			$(this).attr('href', 'javascript:void(0);');
			$(this).removeAttr('target');
			$(this).removeAttr('title');
		});
		
		//TODO: 2뎁스 자식 있으면 링크이동 방지
		$('#lnb > ul > li > ul > li.has_child > a').off("click").on("click", function( e ){
			e.preventDefault();
			var $li = $(this).closest('li');
			$li.toggleClass('on');
		});
	}
	
}

/*
 * 메뉴 데이터 기반 tabui 생성
 */
SUB_PAGE.makeContentsTabuiByGnb = function(){
	if( !HAS_MENU_CODE ) return;
	
	var tab_depth_number = 4;//내가 탭으로 보여주길 원하는 메뉴 뎁스 번호
	
	var selectorText = '';
	var j = 0;
	var len_j = tab_depth_number-1;
	while( j < len_j ){
		selectorText += ' > ul > li.on';
		++j;
	}
	selectorText = '#lnb'+selectorText+' > ul > li';
	
	var $targetUlDataObj = $(selectorText);
	if( $targetUlDataObj.length==0 ) return;
	
	var str = '';
	str += '<div id="mainTabui" class="tabui0_wrap">';
	str += '	<div class="inner">';
	str += '		<div id="tabuiByGnb" class="tabui0">';
	//
	$targetUlDataObj.each(function( i ){
		var $li = $(this);
		var isOn = false;
		var $a = $li.find('> a');
		if( $li.hasClass('on') ) $a.addClass('on');
		var label = $.trim($a.outerHTML());
		str += label;
	});
	//
	str += '		</div>';
	str += '	</div>';
	str += '</div>';
	
	var $tabuiByGnbSection = $(str);
	$tabuiByGnbSection.insertBefore($('#contents'));
	
}

/*
 * 접히는 로케이션 생성
 */
SUB_PAGE.setFoldBreadcrumb = function(){
	if( $('#fold_breadcrumb').length > 0 ) return;
	var str = '';
	str += '<div id="loactionSection">';
	str += '	<div class="inner">';
	str += '		<ul id="fold_breadcrumb">';
	
	var i = 0;
	var len_i = MENU_LENGTH;
	while( i < len_i ){
		if( window["DEPTH"+(i+1)+"_LABEL"] ) str += '	<li><a href="'+window["DEPTH"+(i+1)+"_HREF"]+'">'+window["DEPTH"+(i+1)+"_LABEL"]+'</a></li>';
		++i;
	}
	
	str += '		</ul>';
	str += '		<button id="btnHideVisual"></button>';
	str += '	</div>';
	str += '</div>';
	var $location = $(str);
	var $last = $location.find('#fold_breadcrumb li').last();
	$last.find('a').removeAttr('href');
	changeNodeName($last.find('a')[0], 'span');
	$last.addClass('last');
	$location.find('> li > a').each(function( i ){
		var href = $(this).attr('href')+'';
		if( href=="undefined" ){
			$(this).removeAttr('href');
		}
	});
	$('#body > .main').prepend($location);
	
	$('#btnHideVisual').click(function( e ){
		var coo_sub_vi = $.cookie('sub_vi');
		if( coo_sub_vi=='close' ){
			$.removeCookie('sub_vi');
		}else{
			$.cookie('sub_vi', 'close', { expires:1 });
		}
		updateSubVi();
	});
	
	updateSubVi();
	
	function updateSubVi (){
		var coo_sub_vi = $.cookie('sub_vi');
		if( coo_sub_vi=='close' ){
			$('#sub_page_visual').hide();
			$('#loactionSection').addClass('close');
		}else{
			$('#sub_page_visual').show();
			$('#loactionSection').removeClass('close');
		}
	}
}

/*
 * 서브페이지 아래로 펼쳐지는 드롭다운 브레드크럼 생성
 * LNB가 없는 풀페이지에서 쓸모있다.
 */
SUB_PAGE.setDropdownBreadcrumb = function(){
	
	var visible_depth = MENU_LENGTH;//보여주고자 하는 뎁스의 갯수
	if( visible_depth > 3 ) visible_depth = 3;//3뎁스 까지만 보여지게 제한
	var dropdownWidPer = 100/visible_depth;
	
	var str = '';
	str += '<div id="dropdownBreadcrumb">';
	str += '	<div class="section">';
	str += '		<div class="inside">';
	str += '			<ul class="dropdown_menu">';
	str += '				<li class="home">';
	str += '					<a href="'+HOME_URL+'"><span>HOME</span></a>';
	str += '				</li>';
	//MENU CREATE ->>
	var i = 0;
	var len = visible_depth;
	while( i < len ){
		var label = window["DEPTH"+(i+1)+"_LABEL"];
		if( typeof label==="undefined" ) break;
		var selector = '#gnb';
		var j = 0;
		var lenj = i;
		while( j < lenj ){
			selector += ' > li.on > ul';
			++j;
		}
		selector += ' > li';
		str += '<li style="width:'+dropdownWidPer+'%;">';
		str += '	<div><span>'+label+'</span></div>';
		str += '	<ul>';
		$(selector).each(function( k ){
			if( $(this).hasClass('hide_at_gnb') ) return true;
			str += $(this).outerHTML();
			
		});
		str += '	</ul>';
		str += '</li>';
		++i;
	}
	//<<- MENU CREATE
	str += '			</ul>';
	str += '		</div>';
	str += '	</div>';
	str += '</div>';
	var $location = $(str);
	$location.insertAfter('#sub_page_visual');
	
	if( DEVICE_IS_MOBILE ){
		$('#dropdownBreadcrumb .dropdown_menu > li > div > span').click(function( e ){
			var $li = $(this).closest('li');
			$li.toggleClass('open');
		});
	}
	
}

/*
 * 서브페이지 Print & Zoom Util 생성
 */
SUB_PAGE.setPrintUtil = function(){
	if( $.getParam('print')=='true' ){
		$('html').addClass('print_view');
		setTimeout(function(){
			window.print();
		}, 100);
	}
	
	var str = '';
	str = '<div id="printUtil">';
	str += '  <button class="btn_print_contents">화면 인쇄</button>';
	str += '  <button class="btn_zoom_in">화면 확대</button>';
	//str+='  <span class="zoom_text"></span>';
	str += '  <button class="btn_zoom_ori">화면 원래 크기</button>';
	str += '  <button class="btn_zoom_out">화면 축소</button>';
	str += '</div>';
	var $target = $(str);
	$target.find('.btn_print_contents').click(function( e ){
		newWindowPop.open('?print=true', 'print_pop', 1240, 768);
	});
	
	var per = 100;
	var gap = 10;
	$target.find('.btn_zoom_in').click(function( e ){
		per = per+gap;
		zoom();
	});
	
	$target.find('.btn_zoom_ori').click(function( e ){
		per = 100;
		zoom();
	});
	
	$target.find('.btn_zoom_out').click(function( e ){
		per = per-gap;
		zoom();
	});
	
	function zoom (){
		$('body').css('zoom', per+'%');
	}
	
	$('#body > .main').prepend($target);
}

/**
 * 페이지내의 컨텐츠 높이가 너무 작을 경우 컨텐츠 높이 최소값을 키워 주어 푸터가 올라오는것 방지
 */
SUB_PAGE.setMinHeight = function(){
	setMainHeight();
	
	$(window).resize(function( e ){
		setMainHeight();
	});
	
	function setMainHeight (){
		$('#main').css('height', '');
		var windowHei = $(window).outerHeight();
		var bodyHei = $('body').outerHeight();
		var mainHei = $('#main').outerHeight();
		
		if( windowHei > bodyHei ){
			var k = mainHei+(windowHei-bodyHei);
			$('#main').css('height', k+'px');
		}
	}
	
}
