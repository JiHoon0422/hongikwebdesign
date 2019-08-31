/**
 * Date :  2016-05-02 오후 10:37
 * 이 사이트에서만 쓰이는 스크립트 작성
 */

var SCROLL_TOP, DOCUMENT_HEIGHT, WINDOW_HEIGHT, SCROLL_PERCENT;
$(function(){
	$(window).resize(function(){
		setScrollInfo();
	})
	
	$(window).scroll(function( e ){
		setScrollInfo();
	});
	
	setScrollInfo();
	
	function setScrollInfo (){
		window.SCROLL_TOP = $(window).scrollTop();
		window.DOCUMENT_HEIGHT = $(document).height();
		window.WINDOW_HEIGHT = $(window).height();
		window.SCROLL_PERCENT = (SCROLL_TOP/(DOCUMENT_HEIGHT-WINDOW_HEIGHT))*100;
		
		$('body').attr('data-scroll-top', SCROLL_TOP);
		$('body').attr('data-scroll-per', SCROLL_PERCENT);
	}
	
});

/*
 * 서브페이지 컨텐츠 팝업
 */
$(function(){
	var childWindow;
	var CMS_MODE = window.localStorage.getItem('CMS_MODE');
	if( CMS_MODE=='true' ){
		//CMS 모드 이면 편집 팝업창 띄우기
		childWindow = window.open('/contents_editor.html', 'contents_editor_popup', '_blank');
	}
	$(window).keydown(function( e ){
		if( e.keyCode==13 ){
			if( e.ctrlKey && e.altKey && e.shiftKey ){
				if( CMS_MODE=='true' ){
					//해제
					childWindow.close();
					window.localStorage.removeItem('CMS_MODE');
				}else{
					//진입
					window.localStorage.setItem('CMS_MODE', 'true');
				}
				
				window.location.reload();
			}
		}
		
	});
	
});

/**
 * EX)
 * <div data-include="/include_ui/1904120141.html"></div>
 */
$(function(){
	$('[data-include]').each(function( i ){
		var $this = $(this);
		var src = $(this).attr('data-include');
		
		var url = src;
		var param = {};
		
		$.ajax({
			url:url,
			method:"GET",
			data:param,
			dataType:"html",
			cache:false,
			async:false,
			timeout:60*1000
			,
			success:function( data, status, xhr ){
				$(data).insertAfter($this);
				$this.remove();
			},
			error:function( jqXHR, textStatus, errorThrown ){
				console.log("AJAX ERROR : "+url);
				console.log(arguments);
			}
		});
		
	});
});

var UI = {};
/*
 * 텍스트 에어리어 동적 높이 변화
 */
UI.textareaResize = function(){
	$('.resize_ta').each(function( i ){
		$(this).outerHeight(0);
		$(this).outerHeight(this.scrollHeight+2);
		IFRAME.fit_size();
	});
}

/**
 * 브라우저 전체화면 전환 토클
 * IE 작동 안함
 * @param event
 */
UI.toggleFullScreen = function( event ){
	var element = document.documentElement;
	
	if( event instanceof HTMLElement ){
		element = event;
	}
	
	var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
	
	element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function(){
		return false;
	};
	document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function(){
		return false;
	};
	
	isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

/*
 웹접근성 - 테이블 수정
 */
$(function(){
	//TODO: 캡션 삽입
	$('[class^="table"], .pb_normal_list_warp').find('> table').each(function( i ){
		var $table = $(this);
		var $thead = $(this).find('thead');
		if( $table.find('> caption').length < 1 ){
			var arr = [];
			var $ths = $thead.find('th');
			$ths.each(function( i ){
				var $th = $(this);
				arr.push($.trim($th.text()));
			});
			if( arr.length > 0 ) var str = '<caption>'+arr.join(',')+'(으)로 구성된 테이블</caption>';
			$table.prepend(str);
		}
	});
	
	//TODO: 데스크탑용 게시판 리스트 캡션넣기
	$('.pb_normal_list_warp > table').each(function( i ){
		var $table = $(this);
		var $thead = $(this).find('thead');
		if( $table.find('> caption').length < 1 ){
			var arr = [];
			var $ths = $thead.find('th');
			$ths.each(function( i ){
				var $th = $(this);
				arr.push($.trim($th.text()));
			});
			if( arr.length > 0 ) var str = '<caption>'+arr.join(',')+'(으)로 구성된 테이블</caption>';
			$table.prepend(str);
		}
	});
});

/*
 입력할때마다 텍스트에어리어 리사이즈
 */
$(function(){
	//TODO:
	$('.resize_ta').keyup(function( e ){
		UI.textareaResize();
	});
});

/************************************************
 Datepicker - /front/libs/pickadate
 *************************************************/
$(function(){
	if( typeof Picker==="undefined" ) return;
	
	var currentDate = new Date();
	var yyyy = currentDate.getFullYear();
	
	var k = 100;
	//http://amsul.ca/pickadate.js/
	//https://github.com/amsul/pickadate.js
	$('.datepicker').pickadate({
		min:new Date(yyyy-k, 1, 1),
		max:new Date(yyyy+k, 12, 31),
		selectYears:k*2,
		selectMonths:true,
		format:'yyyy.mm.dd',
		formatSubmit:'yyyymmdd'
	});
	
	$('.timepicker').pickatime({
		formatSubmit:'HHi'
	});
});

/************************************************
 DIM
 *************************************************/

var DIM = {}
DIM.ON = function( callback ){
	var $dim;
	if( $('.page_dim').length==0 ){
		$dim = $('<div class="page_dim"></div>');
		$('body').append($dim);
	}else{
		$dim = $('.page_dim');
		$dim.show();
	}
	
	$dim.click(function( e ){
		if( callback ) callback();
	});
	
}

DIM.OFF = function(){
	$('.page_dim').hide();
}
/*
 * 인라인 블럭 같은 높이로 맞추기
 */
$(function(){
	$(window).off("resize.20171031.32519").on("resize.20171031.32519", function( e ){
		updateDisplay();
	});
	updateDisplay();
	
	function updateDisplay (){
		$('.same_hei').each(function( i ){
			var itemList = [];
			
			$(this).find('> .cell').each(function( j ){
				var top = $(this).position().top;
				if( !itemList[top] ) itemList[top] = [];
				itemList[top].push(this);
			});
			
			for( var key in itemList ){
				var maxHei = 0;
				$(itemList[key]).each(function( i ){
					var hei = $(this).outerHeight();
					maxHei = Math.max(maxHei, hei);
				});
				$(itemList[key]).each(function( i ){
					$(this).css('min-height', maxHei);
				});
			}
		});
	}
	
});

/*
 메인페이지 레이어 팝업 컨트롤
 */
$(function(){
	
	//TODO: 쿠키 구워진 레이어 팝업 있나 체크
	$('.layer_pop').each(function( i ){
		var id = $(this).attr('id');
		var cookie = $.cookie(id);
		if( cookie=="hidden" ){
			removeLayerPop($(this));
		}else{
			$('.layer_pop_dim').show();
		}
	});
	
	//TODO: 레이어 팝업 오늘 하루 이 창을 열지 않음
	$('.layer_pop .btn_close_today').click(function( e ){
		var $layer_pop = $(this).closest('.layer_pop');
		var id = $layer_pop.attr('id');
		$.cookie(id, 'hidden', { expires:1 });
		removeLayerPop($layer_pop);
	});
	
	//TODO: 레이어 팝업 닫기
	$('.layer_pop .btn_close').click(function( e ){
		var $layer_pop = $(this).closest('.layer_pop');
		removeLayerPop($layer_pop);
	});
	
	function removeLayerPop ( $layer_popup ){
		$layer_popup.remove();
		var layer_pop_cnt = $('.layer_pop').length;
		if( layer_pop_cnt <= 0 ) $('.layer_pop_dim').remove();
	}
	
});

/*
 * 이미지 새창 팝업
 * EX)
 * <div class="zoom_pop" data-zoom="http://www.molitum.or.kr/front/data/relic_file/6811_1.JPG"></div>
 * <img class="zoom_pop" src="작은 이미지 경로" data-zoom="큰 이미지 경로">
 */
$(function(){
	$('.zoom_pop').click(function( e ){
		var url = $(this).attr('data-zoom');
		window.open(url, '_blank');
	});
});

/************************************************
 레이어 팝업 관련
 *************************************************/

var LAYER_POP = {};
/*
 * 레이어 팝업 띄우기
 * ex) LAYER_POP.OPEN(html);
 * @param data
 * @constructor
 */
LAYER_POP.OPEN = function( pop_title, html ){
	var str = '';
	str += '<div class="layerPopFrame">';
	str += '	<div>';
	str += '		<div>';
	str += '			<div class="pop_cont">';
	//
	str += '				<div class="layer_pop0">';
	str += '					<div class="pop_head">';
	str += '						<button class="btn_close pop_close" type="button"></button>';
	str += '						<div class="title0">'+pop_title+'</div>';
	str += '					</div>';
	str += '					<div class="pop_body">';
	str += '						'+html;
	str += '					</div>';
	str += '					<div class="pop_foot">';
	str += '						<div class="txtc" style="margin-top:30px;">';
	str += '							<button type="button" class="btnui btnui_666 pop_close"><span>닫기</span></button>';
	str += '						</div>';
	str += '					</div>';
	str += '				</div>';
	//
	str += '			</div>';
	str += '		</div>';
	str += '	</div>';
	str += '</div>';
	var $layerPopFrame = $(str);
	$layerPopFrame.click(function( e ){
		$layerPopFrame.remove();
	});
	
	$layerPopFrame.find('.pop_cont').click(function( e ){
		e.stopPropagation();
	});
	
	//TODO: 닫기
	$layerPopFrame.find('.pop_close').click(function( e ){
		$layerPopFrame.remove();
	});
	
	$('body').append($layerPopFrame);
};

/*
 * 레이어 팝업 띄우기 HTML AJAX
 * ex) LAYER_POP.LOAD("/front/layer_pop/001.html");
 * @param url
 * @constructor
 */
LAYER_POP.LOAD = function( url ){
	var hiddenList = $.cookie('layer_popup_hidden_list');
	if( hiddenList ) hiddenList = JSON.parse(hiddenList);
	else hiddenList = [];
	if( hiddenList.indexOf(url) > -1 ) return;
	
	var param = {};
	$.ajax({
		url:url,
		method:"GET",
		data:param,
		dataType:"html",
		cache:false,
		async:false
		,
		success:function( data, status, xhr ){
			var str = '';
			str += '<div class="layerPopFrame">';
			str += '	<div>';
			str += '		<div>';
			str += '			<div class="pop_cont">';
			str += data;
			str += '			</div>';
			str += '		</div>';
			str += '	</div>';
			str += '</div>';
			var $layerPopFrame = $(str);
			$layerPopFrame.click(function( e ){
				$layerPopFrame.remove();
			});
			
			$layerPopFrame.find('.pop_cont').click(function( e ){
				e.stopPropagation();
			});
			
			//TODO: 닫기
			$layerPopFrame.find('.pop_close').click(function( e ){
				$layerPopFrame.remove();
			});
			
			//TODO: 오늘하루 보지 않기
			$layerPopFrame.find('.pop_close_today').click(function( e ){
				var hiddenList = $.cookie('layer_popup_hidden_list');
				if( hiddenList ) hiddenList = JSON.parse(hiddenList);
				else hiddenList = [];
				if( hiddenList.indexOf(url) < 0 ) hiddenList.push(url);
				$.cookie('layer_popup_hidden_list', JSON.stringify(hiddenList), {
					path:'/',
					expires:1
				});
				$layerPopFrame.remove();
			});
			
			$('body').append($layerPopFrame);
		},
		error:function( jqXHR, textStatus, errorThrown ){
			console.log(arguments);
		}
	});
}

/**
 * 일정 달력 일정 레이어 팝업
 * @param data
 * @constructor
 */
LAYER_POP.PLAN_LIST = function( data ){
	var str = '';
	str += '<div class="layerPopFrame">';
	str += '	<div>';
	str += '		<div>';
	str += '			<div class="pop_cont">';
	str += '				<div id="eventLayerPopup">';
	str += data;
	str += '				</div>';
	str += '			</div>';
	str += '		</div>';
	str += '	</div>';
	str += '</div>';
	var $layerPopFrame = $(str);
	$layerPopFrame.click(function( e ){
		$layerPopFrame.remove();
	});
	
	$layerPopFrame.find('.pop_cont').click(function( e ){
		e.stopPropagation();
	});
	
	//TODO: 닫기
	$layerPopFrame.find('.pop_close').click(function( e ){
		$layerPopFrame.remove();
	});
	
	$('body').append($layerPopFrame);
};

/*
 * 스크롤탑
 */
$(function(){
	
	var str = '';
	str += '<button id="btnScrollTop" title="Go to top"></button>';
	$('body > .page').append(str);
	
	var $btnScrollTop = $('#btnScrollTop');
	
	window.onscroll = function(){
		scrollFunction()
	};
	
	function scrollFunction (){
		if( document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ){
			$btnScrollTop.show();
		}else{
			$btnScrollTop.hide();
		}
	}
	
	$btnScrollTop.click(function( e ){
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
});

/*
 TAB UI 자동 엑티브
 
 커스텀 활성화 싶을 경우 아래 HTML 추가
 <var data-tab="20180419090537">careersupport_3.html</var>
 */
$(function(){
	var pathname = window.location.pathname;
	var filename = pathname.replace(/^.*[\\\/]/, '');
	var compareKey;
	
	//탭 2겹 싸주기
	/*
	var i = 0;
	var len_i = 2;
	while( i < len_i ){
		var wrapStr = '';
		wrapStr += '<div class="tabui'+(i)+'_wrap">';
		wrapStr += '	<div class="inner">';
		wrapStr += '	</div>';
		wrapStr += '</div>';
		wrapStr = $.trim(wrapStr);
		wrapStr = $.trimTab(wrapStr);
		$('.tabui'+i).wrap(wrapStr);
		++i;
	}
	*/
	
	//모바일용 셀렉트박스 생성
	$('.tabui0, .tabui1').each(function( i ){
		var $a = $(this).find('> a');
		
		var str = '';
		str += '<div class="for_mobile">';
		str += '  <div class="custom_selui type0">';
		str += '  	<select class="sel_href">';
		$a.each(function( i ){
			var text = $(this).text();
			var href = $(this).attr('href');
			if( !href ) href = "#";
			var target = $(this).attr('target');
			if( !target ) target = "_self";
			if( $(this).hasClass('on') ){
				str += '<option value="'+href+'" data-target="'+target+'" selected>'+text+'</option>';
			}else{
				str += '<option value="'+href+'" data-target="'+target+'">'+text+'</option>';
			}
		});
		str += '  	</select>';
		str += '  	<label></label>';
		str += '  </div>';
		str += '	<button type="button" class="btn_go">이동</button>';
		str += '</div>';
		var $for_mobile = $(str);
		//모바일 버전 이동 버튼 클릭
		$('.btn_go', $for_mobile).click(function( e ){
			var $sel = $('.sel_href', $for_mobile);
			var val = $sel.val();
			var target = $sel.find("> option:selected").attr('data-target');
			window.open(val, target);
		});
		
		$(this).append($for_mobile);
	});
	
	//본체탭 활성화
	$('.auto_tab').each(function( i ){
		compareKey = filename;
		var $a = $(this).find('> a');
		var tab_code = $(this).attr('data-code');
		var $var = $('var[data-tab="'+tab_code+'"]');
		console.log($var);
		if( $var.length > 0 ) compareKey = $.trim($var.text());
		$a.each(function( j ){
			var href = $(this).attr('href');
			if( compareKey==href ) $(this).addClass('on');
		});
		
		var $option = $(this).find('> .for_mobile > .custom_selui > select > option');
		$option.each(function( i ){
			var href = $(this).attr('value');
			if( compareKey==href ) $(this).attr('selected', 'selected');
		});
	});
	
});

/*
 페이지이동 SELECT BOX UI 자동 엑티브
 <select class="sel1 link_sel" data-code="20180419090537">
 <option value="careersupport.html">리쿠르트 노마드 프로그램</option>
 <option value="careersupport_3.html" data-target="_blank">외국어점수 향상 지원 프로그램</option>
 <option value="careersupport_6.html">자격증 취득 지원 프로그램</option>
 </select>
 <button type="button" class="btn btn-sm btn999">이동</button>
 
 커스텀 활성화 싶을 경우 아래 HTML 추가
 <var data-sel="20180419090537">careersupport_3.html</var>
 */
$(function(){
	var pathname = window.location.pathname;
	var filename = pathname.replace(/^.*[\\\/]/, '');
	var compareKey = filename;
	
	//활성화
	$('.link_sel').each(function( i ){
		compareKey = filename;
		var $sel = $(this);
		var sel_code = $(this).attr('data-code');
		var $var = $('var[data-sel="'+sel_code+'"]');
		if( $var.length > 0 ) compareKey = $.trim($var.text());
		var $option = $sel.find('> option');
		$option.each(function( j ){
			var val = this.value;
			if( compareKey==val ){
				$sel.val(val);
			}
		});
		//이동버튼 액션
		$sel.next('button').click(function( e ){
			var href = $sel.val();
			var target = $sel.find("> option:selected").attr('data-target');
			if( !target ) target = '_self';
			window.open(href, target);
		});
	});
	
});

/*
 * inline_tabui tab_child active
 */
var active_idx = 0;
$(function(){
	$('.inline_tab').each(function( i ){
		var $a = $(this).find('a');
		var code = $(this).attr('data-code');
		var $tab_child = $('.tab_child[data-code="'+code+'"]');
		var $childs = $tab_child.find('> div');
		active();
		$a.click(function( e ){
			active_idx = $a.index(this);
			active();
		});
		
		function active (){
			$childs.hide();
			$childs.eq(active_idx).show();
		}
	});
});

/*
 반응형 이미지 1장 처리 백그라운드로 깔기
 */
$(function(){
	$('.center_img_box > img').each(function( i ){
		var src = $(this).attr('src');
		var $img_box = $(this).parent();
		$img_box.css('background-image', 'url('+src+')');
	});
});

/*
 썸네일 이미지 백그라운드로 깔기
 */
$(function(){
	$('.thumb_img_box > img').each(function( i ){
		var src = $(this).attr('src');
		var alt = $(this).attr('alt');
		var $img_box = $(this).parent();
		$img_box.css('background-image', 'url('+src+')');
		$img_box.text(alt);
		$(this).remove();
	});
});

/*
 * CUSTOM SELECT UI
 * */
$(function(){
	$('.custom_selui > select').each(function( i ){
		var $selectBox = $(this);
		var $label = $selectBox.next('label');
		$selectBox.change(updateLabel);
		
		updateLabel();
		
		function updateLabel (){
			var text = $.trim($selectBox.find(" > option:selected").text());
			$label.text(text);
		}
	});
});

/*
 * 헤더 구글 검색
 */
$(function(){
	$('#btnSearchGoogle').click(function( e ){
		var search_val = $.trim($('#inpSearchGoogle').val());
		if( search_val ) window.location.href = '/front/html/google_search.html?q='+search_val;
	});
});

/*
 * image preload
 */
$(function(){
	var arr = [];
	arr.push("/front/imgs/common/logo_header.png");
	
	var str = '';
	str += '<div class="preload" title="Collection of images that should be preloaded">';
	var i = 0;
	var len_i = arr.length;
	while( i < len_i ){
		str += '	<img src="'+arr[i]+'" alt=""/>';
		++i;
	}
	str += '</div>';
	
	$('body').append(str);
});

/**
 * PREVENT_RUN으로 기간체크 쿠키리스트 확인 후 실행여부 판단
 * EX) RUN_AFTER_PERIOD("A");
 * @param methodName 실행할 글로벌 메서드 이름
 * @constructor
 */
var RUN_PREV_WORD = "PREVENT_RUN|";

function RUN_AFTER_PERIOD ( methodName, callback ){
	var cookie_list = $.cookie();
	var isRun = true;
	for( var cookie in cookie_list ){
		if( cookie.indexOf('PREVENT_RUN|') > -1 ){
			var val = $.cookie(cookie);
			if( val==="PREVENT_CHECK_COOKIE" ){
				if( cookie===RUN_PREV_WORD+methodName ){
					//실행 차단
					isRun = false;
				}
			}
		}
	}
	
	if( isRun ){
		window[methodName]();
		if( callback ) callback();
	}
}

/**
 * 특정기간동안 글로벌 메서드 실행 막기
 * EX) <button type="button" onclick="PREVENT_RUN("A", 7);">오늘하루 A하지 않기</button>
 * @param method_name : 실행을 막고싶은 글로벌 메서드 이름
 * @param prevent_period : 실행을 막고싶은 기간(일)
 * @constructor
 */

function PREVENT_RUN ( methodName, prevent_period ){
	if( typeof prevent_period==="undefined" ) prevent_period = 1;
	//기존 쿠키 데이터 체크해서 거기에 추가 시켜주기
	$.cookie(RUN_PREV_WORD+methodName, 'PREVENT_CHECK_COOKIE', {
		path:'/',
		expires:prevent_period
	});
}

/**
 * window resize end event trigger
 */
var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function(){
	rtime = new Date();
	if( timeout===false ){
		timeout = true;
		setTimeout(resizeend, delta);
	}
});

function resizeend (){
	if( new Date()-rtime < delta ){
		setTimeout(resizeend, delta);
	}else{
		timeout = false;
		
		var event = $.Event('resize_end');
		$(window).trigger(event);//bubble true
	}
}

/**
 * 다음지도 엘리먼트 변환
 * id, data-key 필수!
 * ex) <div id="daumRoughmapContainer1546991524081" data-key="royp" class="root_daum_roughmap root_daum_roughmap_landing"></div>
 */
$(function(){
	$('.root_daum_roughmap').each(function( i ){
		var $container = $(this);
		var id = $(this).attr('id');
		var timestamp = id.split('daumRoughmapContainer')[1];
		var key = $(this).data('key');
		
		var map = new daum.roughmap.Lander({
			"timestamp":timestamp,
			"key":key,
			"mapHeight":getHeight()
		});
		
		map.render();
		$(window).off("resize_end."+timestamp).on("resize_end."+timestamp, function( e ){
			map.mapHeight = getHeight();
			$(map.root).empty();
			map.render();
		});
		
		function getHeight (){
			var wid = $container.width();
			var hei_rate = 56.25;
			return parseInt(wid*hei_rate/100);
		}
	});
});

/**
 * 반응형웹 자동 이미지 전환로직
 */
$(function(){
	updateResponsiveImage();
	$(window).off("view_type_change.updateResponsiveImage").on("view_type_change.updateResponsiveImage", function( e ){
		updateResponsiveImage();
	});
	
	function updateResponsiveImage (){
		$('.rimg').each(function( i ){
			if( typeof this.src_ori==="undefined" ) this.src_ori = $(this).attr('src');
			var src = this.src_ori;
			var fileInfo = getFileInfo(src);
			var name = fileInfo.name;
			
			//모바일 파일명 조합
			var new_name = name;
			if( VIEW_TYPE=='tablet' ) new_name = name+'_TA';
			if( VIEW_TYPE=='mobile' ) new_name = name+'_MO';
			new_name = new_name;
			
			//기존 파일명 변경
			var regExp = new RegExp(name, "gi");
			src = src.replace(regExp, new_name);
			$(this).attr('src', src);
			
		});
	}
});

/**
 * 반응형 자동 inline style 전환
 * <img data-de-style="position:absolute; top:0px; left:138px;"
 * data-ta-style="position:absolute; top:0px; left:138px;"
 * data-mo-style="position:absolute; top:0px; left:138px;"
 * src="/front/imgs/common/sign.png" alt=""/>
 */
$(function(){
	updateResponsiveInlineStyle();
	$(window).off("view_type_change.updateResponsiveInlineStyle").on("view_type_change.updateResponsiveInlineStyle", function( e ){
		updateResponsiveInlineStyle();
	});
	
	function updateResponsiveInlineStyle (){
		$('[data-de-style]').each(function( i ){
			var de_style = $(this).attr('data-de-style');
			var ta_style = $(this).attr('data-ta-style');
			var mo_style = $(this).attr('data-mo-style');
			
			var style;
			if( VIEW_TYPE=='desktop' ) style = de_style;
			if( VIEW_TYPE=='tablet' ) style = ta_style;
			if( VIEW_TYPE=='mobile' ) style = mo_style;
			
			$(this).attr('style', style);
		});
	}
});

/**
 * 반응형웹 자동 백그라운드 이미지 전환로직
 */
$(function(){
	updateResponsiveBackgroundImage();
	
	$(window).off("view_type_change.updateResponsiveBackgroundImage").on("view_type_change.updateResponsiveBackgroundImage", function( e ){
		updateResponsiveBackgroundImage();
	});
	
	function updateResponsiveBackgroundImage (){
		$('.brimg').each(function( i ){
			if( typeof this.src_ori==="undefined" ) this.src_ori = $(this).css('background-image').replace(/url\(['"]*(.*?)['"]*\)/g, '$1');
			var src = this.src_ori;
			var fileInfo = getFileInfo(src);
			var name = fileInfo.name;
			
			//모바일 파일명 조합
			var new_name = name;
			if( VIEW_TYPE=='tablet' ) new_name = name+'_TA';
			if( VIEW_TYPE=='mobile' ) new_name = name+'_MO';
			new_name = new_name;
			
			//기존 파일명 변경
			var regExp = new RegExp(name, "gi");
			src = src.replace(regExp, new_name);
			$(this).css('background-image', 'url('+src+')');
			
			//비율 재설정
			var $bri = $(this);
			var src = $(this).css('background-image').replace(/url\(['"]*(.*?)['"]*\)/g, '$1');
			var img = new Image();
			img.src = src;
			img.onload = function(){
				var wid = img.width;
				var hei = img.height;
				var paddingBottomRate = hei/wid*100;
				$bri.width(wid);
				// $bri.height(hei);
				$bri.css('padding-bottom', paddingBottomRate+'%');
			}
			
		});
	}
	
});

/**
 * 반응형웹 벡터 스케일링 박스
 * <div class="scale_box">
 <div class="target" style="width:필수; height:필수;">
 * scale_box 자식은 반드시 넓이와 높이를 가지고 있어야 비율 계산이 되어 정비례로 줄어든다.
 */
$(function(){
	
	$(window).resize(function(){
		setScale();
	});
	setScale();
	
	function setScale (){
		
		$('.scale_box').each(function( i ){
			var $scaleBox = $(this);
			var $target = $(this).children();
			var targetWid = $target.outerWidth();
			var targetHei = $target.outerHeight();
			var targetRate = (targetHei*100)/targetWid;
			var scale_boxWid = $scaleBox.outerWidth();
			var per = scale_boxWid/targetWid*100;
			var rate = per/100;
			if( VIEW_TYPE=='desktop' ){
				$scaleBox.css('padding-bottom', targetRate+'%');
				$target.css('transform', 'scale('+rate+')');
			}else{
				$scaleBox.css('padding-bottom', '');
				$target.css('transform', '');
			}
			
		});
	}
	
});

//SAME_HEIGHT_LAYOUT 같은 행의 높이 균등하게
$(function(){
	
	$(window).resize(function( e ){
		setHeight();
	});
	
	function getMaxHeight ( itemGroup ){
		var maxHei = 0;
		$(itemGroup).each(function( i ){
			var hei = $(this).outerHeight();
			maxHei = Math.max(maxHei, hei);
		});
		return maxHei;
	}
	
	setHeight();
	
	function setHeight (){
		$('.SAME_HEIGHT_LAYOUT').each(function( i ){
			var $items = $(this).find('> .item');
			$items.css('height', '');
			
			//몇열인지 알아내기
			var colCount = 0;
			var prevY = 0;
			$items.each(function( j ){
				var $item = $(this);
				var y = $item.position().top;
				if( prevY!=y ){
					return false;//break;
				}
				colCount++;
				prevY = y;
			});
			
			var itemGroupArr = _.groupBy($items, function( num, index ){
				return Math.floor(index/colCount);
			});
			
			for( var key in itemGroupArr ){
				var itemGroup = itemGroupArr[key];
				var maxHeight = getMaxHeight(itemGroup);
				$(itemGroup).outerHeight(maxHeight);
			}
			
		});
	}
});

/**
 * 페럴렉스 썸네일
 */
$(function(){
	$(window).scroll(function( e ){
		parallax_img_box();
	});
	
	$(window).resize(function( e ){
		parallax_img_box();
	});
	
	$('.parallax_img').load(function(){
		parallax_img_box();
	});
	
	parallax_img_box();
	
	function parallax_img_box (){
		
		var scrollTop = $(window).scrollTop(),
			documentHei = $(document).height(),
			windowHei = $(window).height();
		var scrollPercent = (scrollTop/(documentHei-windowHei))*100;
		$('.parallax_img').each(function( i ){
			var frameHeight = $(this).parent().outerHeight();
			var imageHeight = $(this).outerHeight();
			if( imageHeight==0 ){
				//이미지 높이가 없을때는 통과
				return true;//continue
			}
			if( frameHeight > imageHeight ){
				//이미지가 액자보다 작을때는 중앙정렬
				$(this).css({
					'top':'50%',
					'left':'50%',
					'margin-top':-(imageHeight/2)+'px',
					'margin-left':-($(this).width()/2)+'px'
				});
				return true;//continue
			}
			
			var imageTopLimit = -1*(imageHeight-frameHeight);
			
			var imgTop = $(this).offset().top;
			var startY = imgTop-windowHei;
			var endY = imgTop;
			//
			var top = Math.linearFunc(scrollTop, startY, endY, 0, imageTopLimit);
			if( top >= 0 ) top = 0;
			if( top <= imageTopLimit ) top = imageTopLimit;
			$(this).css('top', top+'px');
		});
		
	}
	
});

/**
 * 엘리먼트가 현재 스크롤 위치에서 보여지고 있는지 아닌지 체크
 * <div class="show_check"></div>
 */
$(function(){
	
	$(window).resize(function(){
		elementShowCheck();
	})
	
	$(window).scroll(function( e ){
		elementShowCheck();
	});
	
	elementShowCheck();
	
	function elementShowCheck (){
		var scrollTop = $(window).scrollTop();
		var documentHei = $(document).height();
		var windowHei = $(window).height();
		var scrollPercent = (scrollTop/(documentHei-windowHei))*100;
		var offsetY = 120;
		
		$('.show_check').each(function( i ){
			var top = $(this).offset().top;
			var thisHeight = $(this).outerHeight();
			var k = top-windowHei+thisHeight;
			if( k <= scrollTop ){
				$(this).addClass('is_show');
			}else{
				$(this).removeClass('is_show');
			}
		});
	}
	
});

/**
 * .filter_grid > .row > .col 넓이 셋팅
 */
$(function(){
	$('.filter_grid > .row').each(function( i ){
		var $row = $(this);
		var $cols = $(this).find('> .col');
		var len = $cols.length;
		var wid = (100/len)+"%";
		$cols.outerWidth(wid);
	});
});

/**
 * .layout_grid > .row > .col 넓이 셋팅
 */
$(function(){
	$('.layout_grid > .row').each(function( i ){
		var $row = $(this);
		var $cols = $(this).find('> .col');
		var len = $cols.length;
		var wid = (100/len)+"%";
		$cols.outerWidth(wid);
	});
});

/**
 * 학생작품 썸내일 리스트 클릭
 */
$(function(){
	$('.layout190530091445 > .item').click(function( e ){
		if( VIEW_TYPE!="desktop" ){
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	});
});

$(function(){
	$('.selui190625110332').each(function( i ){
		var $sel = $(this);
		var $label = $sel.find('> .head > .label');
		$label.click(function( e ){
			$sel.toggleClass('on');
		});
	});
});

//TODO: 썸네일에 마우스 올리면 분홍색 불들어오게
$(function(){
	$('.pink_hover').hover(function( e ){
		$('body > .page').addClass('pink_hover');
	}, function( e ){
		$('body > .page').removeClass('pink_hover');
	});
});

//TODO: 휠돌리면 분홍색 불들어오게
$(function(){
	var timeout;
	$(window).off("mousewheel.UI.1143").on("mousewheel.UI.1143", function( e ){
		$('body > .page').addClass('pink_hover');
		clearTimeout(timeout);
		timeout = setTimeout(function(){
			$('body > .page').removeClass('pink_hover');
		}, 500);
	});
});

//TODO: 화면 하얗게 깔리면서 팝업 띄우기
$(function(){
	$('body').append('<div id="popupopeneffectbox"></div>');
	
	/*
	$(document).on("click", '.popup_open_effect', function( e ){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		var href = $(this).attr('href');
		
		var $thumb = $(this).find('> .thumb');
		$thumb.css("transform", "scale(0.95)");
		setTimeout(function(){
			$thumb.css("transform", "scale(1)");
			$('#popupopeneffectbox').stop().animate(
				{
					"opacity":1,
					"width":$(window).width(),
					"margin-left":-1*$(window).width()/2
				}, 500, "easeOutCubic", function(){
					window.location.href = href;
				});
		}, 200);
		
	});
	*/
	
});

$(function(){
	$('.btn_close_student_pop').click(function( e ){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		
		$(this).addClass('rotate');
		setTimeout(function(){
			window.history.back();
		}, 600);
		
	});
});




