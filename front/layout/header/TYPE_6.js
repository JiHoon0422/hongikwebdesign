$(function(){
	//gnb 카피해서 서브에 넣기
	var $gnbClone = $('#gnb').clone();
	$('#leftGnbClone').html($gnbClone.html());
	
	//TODO: 1뎁스 액션
	$('#leftGnbClone > li.has_child > a').click(function( e ){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		var $li = $(this).closest('li');
		$li.siblings().removeClass('on');
		$li.toggleClass('on');
	});
	
	//TODO: 2뎁스 액션
	$('#leftGnbClone > li > ul > li.has_child > a').click(function( e ){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		var $li = $(this).closest('li');
		$li.siblings().removeClass('on');
		$li.toggleClass('on');
	});
	
	setLeftGnbPadding();
	
	function setLeftGnbPadding (){
		var headHei = $('#leftGNB > .head').outerHeight();
		var footHei = $('#leftGNB > .foot').outerHeight();
		$('#leftGNB').css('padding-top', headHei+'px');
		$('#leftGNB').css('padding-bottom', footHei+'px');
	}
});