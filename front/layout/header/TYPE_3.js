$(function(){
	var selectIdx = null;
	
	//TODO: 1뎁스 오버
	$('#gnb > li').mouseenter(function( e ){
		var idx = $('#gnb > li').index(this);
		selectIdx = idx;
		updateChildPos();
	});
	
	//TODO: 1뎁스 포커스 인
	$('#gnb > li >  a').focus(function(){
		var idx = $('#gnb > li').index($(this).closest('li'));
		selectIdx = idx;
		updateChildPos();
	});
	
	//2뎁스 포지션 셋팅
	var rightLimit = parseInt($('#topRightPos').position().left);
	$('#gnb > li').not('.hide_at_gnb').each(function( i ){
		var left = parseInt($(this).position().left);
		var $ul = $('.gnb_clone_sec #gnbClone > li').eq(i).find('> ul');
		var wid = $ul.outerWidth();
		var k = left+$(this).outerWidth()/2-wid/2;
		if( k+wid >= rightLimit ){
			k = rightLimit-wid;
		}
		k = Math.max(0, k);
		$ul.css('left', k);
	});
	
	updateChildPos();
	
	/*
	 * 2뎁스 포지션 셋팅
	 */
	function updateChildPos (){
		$('.gnb_clone_sec #gnbClone > li > ul').hide();
		var $ul = $('.gnb_clone_sec #gnbClone > li').eq(selectIdx).find('> ul');
		$ul.show();
	}
	
});