var VIEWPORT;
// var DESKTOP_VIEWPORT_SIZE = 1440;
//var DESKTOP_VIEWPORT_SIZE = 1366;
var DESKTOP_VIEWPORT_SIZE = 1280;
//var DESKTOP_BREAK_POINT = 1025;//태블릿에서 무조건 768 화면을 보여줄때
var DESKTOP_BREAK_POINT = 1024;//태블릿 가로에서는 PC 화면을 보여줄때
var TABLET_BREAK_POINT = 768;

function setViewport (){
	var mvp = document.getElementById('myViewport');
	// console.log(screen.width);
	if( screen.width >= DESKTOP_BREAK_POINT ){
		//데스크탑
		// console.log('setViewport : 데스크탑');
		mvp.setAttribute('content', 'width='+DESKTOP_VIEWPORT_SIZE+',target-densitydpi=device-dpi,user-scalable=yes');
		mvp.setAttribute('data-view', 'desktop');
		VIEWPORT = 'desktop';
	}
	if( screen.width < DESKTOP_BREAK_POINT ){
		//테블릿
		// console.log('setViewport : 테블릿');
		mvp.setAttribute('content', 'width=768,target-densitydpi=device-dpi,user-scalable=yes');
		mvp.setAttribute('data-view', 'tablet');
		VIEWPORT = 'tablet';
	}
	if( screen.width < TABLET_BREAK_POINT ){
		//모바일
		// console.log('setViewport : 모바일');
		mvp.setAttribute('content', 'width=480,target-densitydpi=device-dpi,user-scalable=yes');
		mvp.setAttribute('data-view', 'mobile');
		VIEWPORT = 'mobile';
	}
}

setViewport();
window.onresize = function(){
	setViewport();
}

