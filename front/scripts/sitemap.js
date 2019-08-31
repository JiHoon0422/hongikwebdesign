/**
 * Date :  2016-07-12 오전 11:50
 */

var SITEMAP = {
	init:function(){
		$('#siteMap').append($GNB_CLONE.outerHTML());
	}
}


$(window).load(function(){
	SITEMAP.init();
});