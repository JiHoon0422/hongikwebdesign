//유투브 삽입
var ytplayerSub;
function onYouTubeIframeAPIReady (){
	
	ytplayerSub=new YT.Player('ytplayerSub', {
		width:'560px',
		height:'315px',
		videoId:$('#ytplayerSub').text(),
		playerVars:{
			autoplay:"1",
			enablejsapi:"1",
			//list:"PLOA20Mx5IQ10ReHCQBN4AtaF2zWKtObyU",
			//listType:"playlist",
			loop:"1",
			rel:"0",
			showinfo:"0",
			controls:"0",
		},
		events:{
			'onReady':onPlayerReady,
			'onStateChange':onPlayerStateChange
		}
	});
}

// 3. The API will call this function when the video player is ready.
function onPlayerReady ( event ){
	ytplayerSub.playVideo();
	ytplayerSub.mute();
}

function playYoutube (){
	// 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
	ytplayerSub.playVideo();
}
function pauseYoutube (){
	ytplayerSub.pauseVideo();
}
function stopYoutube (){
	ytplayerSub.seekTo(0, true);// 영상의 시간을 0초로 이동시킨다.
	ytplayerSub.stopVideo();
}

var playerState;
function onPlayerStateChange ( event ){
	playerState=event.data==YT.PlayerState.ENDED ? '종료됨' :
		event.data==YT.PlayerState.PLAYING ? '재생중' :
			event.data==YT.PlayerState.PAUSED ? '일시중지' :
				event.data==YT.PlayerState.BUFFERING ? '버퍼링중' :
					event.data==YT.PlayerState.CUED ? '재생준비완료' :
						event.data== -1 ? '시작되지 않음' : '예외';
	
	//console.log('onPlayerStateChange 실행: '+playerState);
	//반복재생
	if( playerState=="종료됨" ){
		ytplayerSub.playVideo();
	}
}

