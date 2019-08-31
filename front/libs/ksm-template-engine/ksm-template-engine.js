$(function(){
	$('.ksm_tpl').each(function( i ){
		var $tpl=$(this);
		var src=$tpl.attr('src');
		
		if( src ){
			createHTML(window[src]);
		}else{
			console.log("ksm-template-engine.js : not enough data");
			return;
		}
		
		function createHTML ( dataList ){
			var dom=$tpl.html();
			var html='';
			$(dataList).each(function( i ){
				var domCopy=dom.slice(0);
				for( var key in this ){
					var val=this[key];
					var regExp=new RegExp("{{"+key+"}}", "gi");
					domCopy=domCopy.replace(regExp, val);
				}
				html+=domCopy;
			});
			$(html).insertAfter($tpl);
			//$tpl.remove();
		}
		
	});
});