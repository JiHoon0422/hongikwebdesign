/**
 * ifame 높이 자동조절 - 부모편
 */
$(window).off("message.parent").on("message.parent", function( e ){
	var event=e.originalEvent;
	if( typeof event.data!=="string" ) return;
	if( event.data.indexOf("iframe_msg") < 0 ) return;
	var data=JSON.parse(event.data);
	var iframe_msg=data.iframe_msg;
	var className=data.className;
	
	//자식에게서 높이 값이 날아오면
	if( iframe_msg=="set_iframe_height" ){
		var hei=parseInt(data.height);
		//console.log(className, hei);
		$('iframe.'+className).outerHeight(hei);
	}
	
	//자식에게서 높이 조정 요청이 날아오면
	if( iframe_msg=="IFRAME_AUTO_FIT" ){
		IFRAME_AUTO_FIT();
	}
	
});

var IFRAME_AUTO_FIT=function(){
	var $auto_fit_iframes=$('iframe.auto_fit');
	
	autoFitLoadComplete();
	function autoFitLoadComplete (){
		//인덱스 부여
		$auto_fit_iframes.each(function( i ){
			var _iframe=this;
			var $iframe=$(_iframe);
			var className='auto_fit'+i;
			$iframe.addClass(className);
			
			var obj={
				"className":className,
				"iframe_msg":"get_child_height"
			};
			var child_window=_iframe.contentWindow;
			child_window.postMessage(JSON.stringify(obj), "*");
		});
	}
}

$(function(){
	/*
	 GET으로 넘어온 iframe 내부주소를 적용시켜줌
	 앵커의 target parent를 이용하면 이동시에 주소를 기억할 수 있다.
	 <a href="/front/html/test.html?frame180608213833=/include_ui/180608214026.html" target="_parent" class="btn btn0">
	 */
	$('iframe.auto_fit').each(function( i ){
		var id=$(this).attr('id');
		var getValue=QueryString[id];
		if( getValue ){
			this.src=getValue;
		}
	});
});