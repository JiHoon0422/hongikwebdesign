var WINDOW_POPUP={
	open:function( popup_key, pathname, wid, hei ){
		var popup_key_value=WINDOW_POPUP.getKey(popup_key);
		if( popup_key_value=='hidden' ){
		}else{
			pathname=updateQueryStringParameter(pathname, 'popup_key', popup_key);
			window.open(pathname, popup_key, 'width='+wid+',height='+hei+',top=0,left=0');
		}
		/**
		 * 파라메터 추가
		 * @param uri
		 * @param key
		 * @param value
		 * @returns {*}
		 */
		function updateQueryStringParameter ( uri, key, value ){
			var re=new RegExp("([?&])"+key+"=.*?(&|$)", "i");
			var separator=uri.indexOf('?')!== -1 ? "&" : "?";
			if( uri.match(re) ){
				return uri.replace(re, '$1'+key+"="+value+'$2');
			}
			else{
				return uri+separator+key+"="+value;
			}
		}
	},
	/**
	 * 오늘 exdays일 보지않기
	 * @param exdays
	 */
	close_by_day:function( exdays ){
		var QueryString=function(){
			// This function is anonymous, is executed immediately and
			// the return value is assigned to QueryString!
			var query_string={};
			var query=window.location.search.substring(1);
			var vars=query.split("&");
			for( var i=0; i < vars.length; i++ ){
				var pair=vars[i].split("=");
				// If first entry with this name
				if( typeof query_string[pair[0]]==="undefined" ){
					query_string[pair[0]]=decodeURIComponent(pair[1]);
					// If second entry with this name
				}else if( typeof query_string[pair[0]]==="string" ){
					var arr=[query_string[pair[0]], decodeURIComponent(pair[1])];
					query_string[pair[0]]=arr;
					// If third or later entry with this name
				}else{
					query_string[pair[0]].push(decodeURIComponent(pair[1]));
				}
			}
			return query_string;
		}();
		var popup_key=QueryString.popup_key;
		WINDOW_POPUP.setKey(popup_key, 'hidden');
		window.close();
	},
	/**
	 * 쿠기 가져오기
	 * @param cname
	 * @returns {*}
	 */
	getKey:function( cname ){
		var name=cname+"=";
		var ca=document.cookie.split(';');
		for( var i=0; i < ca.length; i++ ){
			var c=ca[i];
			while( c.charAt(0)==' ' ){
				c=c.substring(1);
			}
			if( c.indexOf(name)==0 ){
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	/**
	 * 쿠키 굽기
	 * @param cname
	 * @param cvalue
	 * @param exdays
	 */
	setKey:function( cname, cvalue, exdays ){
		var d=new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires="expires="+d.toUTCString();
		document.cookie=cname+"="+cvalue+";"+expires+";path=/";
	}
}

$(function(){
	$('.btn_close_today').click(function(e) {
		WINDOW_POPUP.close_by_day();
	});
});