/*헤더 타인 선택 : 1개만 선택해야함*/
// var HEADER_TYPE="TYPE_0";//2뎁스 없음
var HEADER_TYPE = "TYPE_1";//2뎁스 inside 꽉차고 모든 1뎁스 서브
// var HEADER_TYPE = "TYPE_2";//2뎁스 inside 내에서 가로로 쭉뻗은 서브
// var HEADER_TYPE="TYPE_3";//1뎁스가 inside 내에 꽉차고, 2뎁스가 가로로 쭉뻗은 서브
// var HEADER_TYPE="TYPE_4";//1뎁스가 inside 내에 꽉차고, 2뎁스 전체가 펼쳐짐
// var HEADER_TYPE="TYPE_5";//1뎁스가 inside 내에 꽉차고, 2뎁스 세로로 각각 보여줌
// var HEADER_TYPE="TYPE_6";//헤더가 좌측에 붙음
document.write('<link rel="stylesheet" type="text/css" href="/front/layout/header/'+HEADER_TYPE+'.css"/>');
document.write('<script type="text/javascript" src="/front/layout/header/'+HEADER_TYPE+'.js"></script>');
var HEADER_SCRIPT = {};
$(function(){
	HEADER_SCRIPT.INIT();
	HEADER_SCRIPT.MOBILE_INIT();
	HEADER_SCRIPT.MOBILE_INIT2();
	HEADER_SCRIPT.GNB_SUB_CONTROL();
});

HEADER_SCRIPT.INIT = function(){
	//gnb tabindex 삽입
	$('#gnb > li').each(function( i ){
		$(this).find('a').attr('tabindex', (10000+i+1));
	});
	
	//TODO: 데탑버젼 헤더 서치 박스 컨트롤
	$('#btnSearchGoogleButton').click(function( e ){
		$('#btnSearchGoogleButton').hide();
		$('#globalWrap > .search_form').addClass('on');
	});
	
	$(window).scroll(function( e ){
		visibleHeader();
	});
	
	visibleHeader();
	
	function visibleHeader (){
		var k = 200;
		if( SCROLL_TOP > k ){
			$('#header').addClass('hide');
		}else{
			$('#header').removeClass('hide');
		}
	}
}

HEADER_SCRIPT.GNB_SUB_CONTROL = function(){
	
	var $dim = $('<div id="desktop_gnb_dim"></div>');
	$('body').append($dim);
	$dim.click(function( e ){
		depth2Close();
		setTimeout(function(){
			$('#gnbClone > li').removeClass('hover');
		}, 300);
	});
	
	//gnb 카피해서 서브에 넣기
	var $gnbClone = $('#gnb').clone();
	$('#gnbClone').html($gnbClone.html());
	
	//TODO: 1뎁스 클릭
	$('#gnb > li').click(function( e ){
		var idx = $('#gnb > li').index(this);
		if( idx==2 ){
			//학과별 소개만 작동
			$('#gnbClone > li').removeClass('hover');
			$('#gnbClone > li').eq(idx).addClass('hover');
			depth2Open();
		}
	});
	
	//TODO: 2뎁스 오버
	$('#gnbClone > li').mouseenter(function( e ){
		var idx = $('#gnbClone > li').index(this);
		$('#gnb > li').removeClass('hover');
		$('#gnb > li').eq(idx).addClass('hover');
		depth2Open();
	});
	
	/*
	 * 2뎁스 이하 열기
	 */
	function depth2Open (){
		$('#header .gnb_clone_sec').addClass('open');
		$('#desktop_gnb_dim').show();
	}
	
	/*
	 * 2뎁스 이하 닫기
	 */
	function depth2Close (){
		$('#desktop_gnb_dim').hide();
		$('#header .gnb_clone_sec').removeClass('open');
	}
	
}

HEADER_SCRIPT.MOBILE_INIT = function(){
	//gnb 카피
	var $gnbMobile = $('#gnb').clone();
	$('#gnbMobileTab').html($gnbMobile.html());
	$('#gnbMobile').html($gnbMobile.html());
	
	//메뉴코드가 없을경우 디폴트 표시
	if( typeof DEPTH1_IDX==="undefined" ){
		$('#gnbMobileTab > li').eq(0).addClass('on');
		$('#gnbMobile > li').eq(0).addClass('on');
		$('#gnbMobile > li').eq(0).find('> ul > li').eq(0).addClass('on');
	}
	
	//TODO: 1뎁스 터치
	$('#gnbMobileTab > li.has_child > a').off("click").on("click", function( e ){
		var $li = $(this).closest('li');
		if( $li.hasClass('on')==false ){
			//첫 활성화 상태
			e.preventDefault();
			var idx = $('#gnbMobileTab > li > a').index(this);
			$('#gnbMobileTab > li').removeClass('on');
			$('#gnbMobileTab > li').eq(idx).addClass('on');
			$('#gnbMobile > li').removeClass('on');
			$('#gnbMobile > li').eq(idx).addClass('on');
		}
	});
	
	//TODO: OPEN MOBILE GNB
	$('#btnMobileGnb').click(function( e ){
		$('#mobileGnbWrap').addClass('open');
	});
	
	//TODO: CLOSE MOBILE GNB
	$('#btnMobileGnbClose, #mobileGnbDim').click(function( e ){
		$('#mobileGnbWrap').removeClass('open');
	});
	
	//TODO: OPEN MOBILE UTIL
	$('#btnMobileUtil').click(function( e ){
		$('#mobileUtilWrap').addClass('open');
	});
	
	//TODO: CLOSE MOBILE UTIL
	$('#btnMobileUtilClose, #mobileUtilDim').click(function( e ){
		$('#mobileUtilWrap').removeClass('open');
	});
	
	//TODO: 메뉴 토글
	$('#gnbMobile > li > ul > li.has_child > a').click(function( e ){
		var $li = $(this).closest('li');
		if( $li.hasClass('on')==false ){
			e.preventDefault();
			$li.siblings().removeClass('on');
			$li.addClass('on');
		}
	});
	
	//TODO: 모바일 구글 검색 버튼
	$('#btnMobileSearch').click(function( e ){
		$('#mobileSearchBox').show();
	});
	
	//TODO: 모바일 구글 검색 닫기 버튼
	$('#mobileSearchBox > form > div > .btn_mobile_google_search_close').click(function( e ){
		$('#mobileSearchBox').hide();
	});
}

HEADER_SCRIPT.MOBILE_INIT2 = function(){
	//gnb 카피
	var $gnbMobile = $('#gnb').clone();
	$('#mobileGnbType2').html($gnbMobile.html());
	
	//메뉴코드가 없을경우 디폴트 표시
	if( typeof DEPTH1_IDX==="undefined" ){
		// $('#mobileGnbType2 > li').eq(0).addClass('on');
		// $('#mobileGnbType2 > li').eq(0).find('> ul > li').eq(0).addClass('on');
	}
	
	//TODO: gnb_area 가 아닌 영역의 높이 합산해서 padding-bottom 셋팅
	var mobileGnbType2WrapPaddingBottom = 0;
	$('#mobileGnbType2Wrap > div').each(function( i ){
		if( $('#mobileGnbType2Wrap > .gnb_area')[0]==this ) return true; //continue;
		var hei = $(this).outerHeight();
		mobileGnbType2WrapPaddingBottom += hei;
	});
	$('#mobileGnbType2Wrap').css('padding-bottom', mobileGnbType2WrapPaddingBottom);
	
	//TODO: 메뉴 터치
	$('#mobileGnbType2 li.has_child > a').off("click").on("click", function( e ){
		var $li = $(this).closest('li');
		$li.toggleClass('on');
		
		/*
		if( $li.hasClass('on')==false ){
			//첫 활성화 상태
			e.preventDefault();
			// $li.siblings().removeClass('on');
			$li.addClass('on');
		}
		*/
	});
	
	//TODO: 메뉴 오픈
	$('#btnOpenMobileGnb').click(function( e ){
		$('#mobileGnbType2Wrap').addClass('open');
	});
	
	//TODO: 메뉴 닫기
	$('#btnMobileGnbType2Close, #mobileGnbType2Dim').click(function( e ){
		$('#mobileGnbType2Wrap').removeClass('open');
	});
}
