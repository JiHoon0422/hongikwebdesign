/**
 * Date :  2016-06-01 오후 4:22
 */

/*
 * 스플래시 필요시 주석해제
 */
/*
 $(function(){
 insertSplash();
 setTimeout(function(){
 $('#splashLayer').fadeOut();
 }, 2000);
 });
 function insertSplash (){
 var str='';
 str+='<div id="splashLayer">';
 str+='	<div>';
 str+='		<div>';
 str+='			<img src="/front/imgs/common/splash_image.png" alt=""/>';
 str+='		</div>';
 str+='	</div>';
 str+='</div>';
 $('body').prepend(str);
 }
 */



/*
 * 레이어팝업 포커스 제일 먼저 가게끔 조정
 */
$(function(){
	$('.layer_pop').each(function( i ){
		var $targets=$(this).find('a, button, label, input');
		$targets.attr('tabindex', 1);
	});
});

$(function(){
	
	$('#mainVisual3Slide').on('init', function( event, slick ){
		// console.log('init');
		checkHasDots();
		setButtonsCenter();
		$('#mainVisual3Slide').addClass('zoom_able');
	});
	
	$('#mainVisual3Slide').on('beforeChange', function( event, slick ){
	});
	
	$('#mainVisual3Slide').on('afterChange', function( event, slick ){
	});
	
	$('#mainVisual3Slide').on('breakpoint', function( event, slick ){
		checkHasDots();
	});
	
	function checkHasDots (){
		var $dots = $('#mainVisual3SlideDots').has('.slick-dots');
		if( $dots.length > 0 ) $('#mainVisual3SlideButtons').show();
		else $('#mainVisual3SlideButtons').hide();
	}
	
	function setButtonsCenter (){
		var btnsWid = $('#mainVisual3SlideButtons').outerWidth();
		$('#mainVisual3SlideButtons').css('margin-left', (-1*btnsWid/2)+'px');
	}
	
	//TODO: 일시정지
	$('#mainVisual3SlidePlay').click(function( e ){
		$('#mainVisual3Slide').slick('slickPlay');
		$('#mainVisual3SlidePlay').hide();
		$('#mainVisual3SlidePause').show();
	});
	//TODO: 재생
	$('#mainVisual3SlidePause').click(function( e ){
		$('#mainVisual3Slide').slick('slickPause');
		$('#mainVisual3SlidePause').hide();
		$('#mainVisual3SlidePlay').show();
	});
	//http://kenwheeler.github.io/slick/
	$('#mainVisual3Slide').slick({
		//slidesToShow:3,
		//slidesToScroll:1,
		speed:1000,
		appendDots:"#mainVisual3SlideDots",
		appendArrows:"#mainVisual3SlideArrows",
		variableWidth:false,
		swipe:false,
		fade:true,
		dots:true,
		arrows:true,
		pauseOnFocus:false,
		pauseOnHover:false,
		pauseOnDotsHover:false,
		autoplay:true,
		autoplaySpeed:8*1000,
		adaptiveHeight:false,
		/*
		responsive:[
			{
				breakpoint:1025,
				settings:{
					swipe:true,
				}
			},
			{
				breakpoint:768,
				settings:{
					swipe:true,
				}
			}
		]
		*/
	});
});

