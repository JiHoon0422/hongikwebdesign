/*
 * 일반게시판 첨부파일 레이어 컨트롤
 */
$(function(){
	
	//TODO: 첨부파일 레이어 열기
	$('.rbbs_list_normal_sec > ul > li > .btn_show_attach_file').click(function( e ){
		var $layer=$(this).next('.attach_file_layer');
		$layer.toggle();
	});
	
	//TODO: 첨부파일 레이어 닫기
	$('.rbbs_list_normal_sec > ul > li > .attach_file_layer > .head_area .btn_close_layer').click(function( e ){
		var $layer=$(this).closest('.attach_file_layer');
		$layer.hide();
	});
});

/*
 * FAQ게시판
 */
$(function(){
	//TODO: FAQ Q 클릭
	$('.rbbs_faq_list_sec > ul > li > .boxQ > button').click(function( e ){
		var $boxA=$(this).closest('li').find('> .boxA');
		$boxA.toggle();
	});
});