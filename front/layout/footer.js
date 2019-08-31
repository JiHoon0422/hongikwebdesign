/*
 * 관련사이트 이동
 */
$(function(){
	$('#familySelBtn').click(function( e ){
		var url=$('#familySel').val();
		if( url ) window.open(url, '_blank');
	});
});