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
	var rightLimit = parseInt($('#topRightPos').offset().left);
	$('#gnb > li').not('.hide_at_gnb').each(function( i ){
		var left = parseInt($(this).offset().left);
		var $ul = $('.gnb_clone_sec #gnbClone > li > ul').eq(i);
		var wid = $ul.outerWidth();
		var k = rightLimit-left-$(this).outerWidth()/2-wid/2;
		k = Math.max(0, k);
		var $li = $ul.closest('li');
		$li.css('left', -1*k);
	});
	
	/*
	 * 2뎁스 포지션 셋팅
	 */
	function updateChildPos (){
		var $allUls = $('.gnb_clone_sec #gnbClone > li > ul');
		$allUls.hide();
		
		var $targetUl = $('.gnb_clone_sec #gnbClone > li').eq(selectIdx).find('> ul');
		if( $targetUl.length > 0 ){
			$targetUl.show();
		}
		
	}
	
});