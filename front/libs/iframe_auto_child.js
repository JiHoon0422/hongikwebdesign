/**
 * ifame 높이 자동조절 - 자식편
 */
$(window).off("message.child").on("message.child", function( e ){
	var event=e.originalEvent;
	if( typeof event.data!=="string" ) return;
	if( event.data.indexOf("iframe_msg") < 0 ) return;
	var data=JSON.parse(event.data);
	var iframe_msg=data.iframe_msg;
	var className=data.className;
	
	//부모에게서 높이값 요청이 날아오면
	if( iframe_msg=="get_child_height" ){
		//부모한테 내 높이 알려주기
		$('html').css('overflow', 'hidden');
		$('body').css('overflow', 'hidden');
		var hei=$('body').outerHeight();
		var obj={
			"className":className,
			"iframe_msg":"set_iframe_height",
			"height":hei
		};
		window.parent.postMessage(JSON.stringify(obj), "*");
	}
});

//FAQ 같이 높이 값이 변한 후 호출해주면 부모한테 높이 재조정을 요청한다.
var CHANGE_MY_HEIGHT=function(){
	var obj={
		"iframe_msg":"IFRAME_AUTO_FIT"
	};
	window.parent.postMessage(JSON.stringify(obj), "*");
}

$(window).resize(function( e ){
	CHANGE_MY_HEIGHT();
});
$(window).load(function(){
	CHANGE_MY_HEIGHT();
});

/*
setInterval(function(){
	CHANGE_MY_HEIGHT();
}, 500);
*/