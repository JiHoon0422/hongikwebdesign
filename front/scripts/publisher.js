/**
 * Date :  2016-04-12 오전 9:41
 * 퍼블리셔 전용 JS 실제 개발에 쓰이지 않음
 */

$(function(){
	
	var $page = $('body > .page');
	var mc;
	
	if( typeof MENU_DATA_LIST!=="undefined" ){
		
		if( $page.attr('data-mc') ){
			//수동 페이지 코드
		}else{
			//자동 페이지 코드
			setPageCode(MENU_DATA_LIST);
			if( !mc ) mc = "999";
			$('body > .page').attr('data-mc', mc);
		}
		
		function setPageCode ( menu_data ){
			$(menu_data).each(function( i ){
				
				var menuUrl = this.menuUrl;
				if( menuUrl.indexOf("http")!==0 ){
					menuUrl = getFileName(this.menuUrl);
					this.menuUrl = menuUrl;
				}
				
				var pathname = window.location.pathname;
				var filename = getFileName(pathname);
				
				//현재 페이지 이름과 매칭되는 앵커 찾아서 mc 추출
				if( menuUrl==filename ){
					mc = this.menuCode;
				}
				
				var menuChilds = this.menuChilds;
				if( menuChilds && menuChilds.length > 0 ){
					setPageCode(menuChilds);
				}
				
				var menuLocals = this.menuLocals;
				if( menuLocals ){
					setPageCode(menuLocals);
				}
				
			});
			
		}
		
	}else{
		//IA 문서가 완전하지 않아 CMS에 디렉토리 등록이 되어있지 않을때
		//www.js의 내용을 전부 삭제하면 아래부분을 탄다.
		//즉, MENU_DATA_LIST 가 존재 하지 않는 상황
		if( $page.attr('data-mc') ){
			//수동 페이지 코드
		}else{
			//자동 페이지 코드
			mc = "999";
			$('body > .page').attr('data-mc', mc);
		}
		
		//임시 MENU_DATA_LIST 생성
		window.MENU_DATA_LIST = [];
		
		//MENU_DATA_LIST 대신 #gnb에 임시 HTML 끼워넣기
		var url = "/js/www.html";
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
				$('#gnb').prepend(data);
			},
			error:function( jqXHR, textStatus, errorThrown ){
				// console.log("AJAX ERROR : "+url);
				// console.log(arguments);
			}
		});
	}
	
	//프론트서버일때 O
	if( IS_FRONT_SERVER ){
		$('body').addClass('is_sogood');
		
		//디버그모드 발동
		if( $.getParam('debug')=='true' ){
			$('body').addClass('debug_mode');
		}
		
		//편집모드 발동
		if( $.getParam('edit')=='true' ){
			$('body').addClass('edit_mode');
		}
		
		//치트키
		$(window).keydown(function( e ){
			if( e.ctrlKey && e.shiftKey && e.keyCode==90 ){
				$('.font_padding').remove();
				
				//폰트 패딩 정보 삽입
				$('#body .main *').each(function( i ){
					if( this.children.length > 0 ) return;
					
					var fs = parseInt($(this).css('font-size'));
					var hei = parseInt($(this).css('line-height'));
					if( isNaN(hei) ){
						hei = fs/3+fs;
					}
					var fp = Math.ceil((hei-fs)/2);
					if( fp > 0 ){
						$(this).attr('font-padding', fp);
						var $output = $('<span class="font_padding">'+fp+'</span>');
						var top = $(this).offset().top;
						var left = $(this).offset().left-10;
						$output.css({
							'position':'absolute',
							'color':'red',
							'z-index':'999999',
							'top':top+'px',
							'left':left+'px'
						});
						$('body').append($output);
					}
					
				});
				
			}else if( e.ctrlKey && e.keyCode==90 ){
				var guide = $.cookie('guide');
				if( guide=='true' ){
					$.cookie('guide', 'false', { expires:365 });
				}else{
					$.cookie('guide', 'true', { expires:365 });
				}
				guideControl();
			}
		});
		
		//kQueryGuide
		makeGuide();
		guideControl();
		
		function makeGuide (){
			$('.kQueryGuide').remove();
			var guideKey = $('body').attr('data-guide');
			var guideTop = $('body').attr('data-top')+'px';
			if( !guideKey ) return;
			var $img = $('<img class="kQueryGuide" style="top:'+guideTop+'" src="/front/guide/'+guideKey+'.png" alt="마크업 가이드"/>');
			$('body').prepend($img);
			$img.load(function(){
				var wid = $(this).width();
				$(this).css('margin-left', (-1*wid/2)+'px');
			});
		}
		
		function guideControl (){
			var guide = $.cookie('guide');
			if( guide=='true' ){
				$('.kQueryGuide').show();
			}else{
				$('.kQueryGuide').hide();
			}
		}
		
		//TODO: Output Viewport
		$('.kquery_viewsize').remove();
		var $wrap = $('<div class="kquery_viewsize"><span class="wid">width</span><span> x </span><span class="hei">height</span></div>');
		$wrap.click(function( e ){
			var wid = $(window).width();
			var hei = $(window).height();
			alert(wid+' x '+hei);
		});
		$('body').append($wrap);
		
		$(window).off("resize.20150223025956").on("resize.20150223025956", function( e ){
			updateDisplay();
		});
		
		updateDisplay();
		
		function updateDisplay (){
			var wid = $(window).width();
			var hei = $(window).height();
			$('.kquery_viewsize .wid').text(wid);
			$('.kquery_viewsize .hei').text(hei);
		}
		
		//콘솔
		console.log('%c'+'Created by Kang Seok-min', 'color: #ed017c; font-size:20px; font-family:"D2Coding", "맑은 고딕";');
		
		/* 이미지맵 대신 사용하는 버튼 박스 [2019-01-05] */
		var $btn_box;
		$('.btn_box').attr('draggable', 'false');
		$('.btn_box').click(function( e ){
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		});
		$('.btn_box').mousedown(function( e ){
			
			//고정된 상태이면 움직이게 한다
			$(this).addClass('moving');
			var offsetX = e.offsetX;
			var offsetY = e.offsetY;
			$btn_box = $(this);
			$(window).off("mousemove.195704.025740").on("mousemove.195704.025740", function( e ){
				var mouseX = e.clientX;
				var mouseY = e.clientY;
				var parentX = $btn_box.parent().offset().left;
				var parentY = $btn_box.parent().offset().top;
				var x = (parseInt(mouseX-parentX-offsetX+window.scrollX))+'px';
				var y = (parseInt(mouseY-parentY-offsetY+window.scrollY))+'px';
				$btn_box.css('position', 'absolute');
				$btn_box.css('top', y);
				$btn_box.css('left', x);
			});
			
			$(window).off("keydown.195704035734");
			
		});
		
		$('.btn_box').mouseup(function( e ){
			
			//움직이는 상태이면 고정시킨다
			$(this).removeClass('moving');
			$(window).off("mousemove.195704.025740");
			
			$(window).off("keydown.195704035734").on("keydown.195704035734", function( e ){
				
				var kc = e.keyCode;
				var k = 2;
				
				if( e.shiftKey ) k = -2;
				
				if( 37 <= kc && kc <= 40 ){
					
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					
					if( kc==38 ){
						//위로
						var currentHeight = $btn_box.height();
						var currentTop = parseInt($btn_box.css('top'));
						$btn_box.css('top', (currentTop-k)+'px');
						$btn_box.height(currentHeight+k);
					}
					
					if( kc==40 ){
						//아래로
						var currentHeight = $btn_box.height();
						$btn_box.height(currentHeight+k);
					}
					
					if( kc==37 ){
						//좌
						var currentWid = $btn_box.width();
						var currentLeft = parseInt($btn_box.css('left'));
						$btn_box.css('left', (currentLeft-k)+'px');
						$btn_box.width(currentWid+k);
					}
					
					if( kc==39 ){
						//우
						var currentWid = $btn_box.width();
						console.log(currentWid, k, currentWid+k);
						$btn_box.width(currentWid+k);
					}
				}
				
			});
			
		});
		/* // 이미지맵 대신 사용하는 버튼 박스 [2019-01-05] */
		
	}
	
});
