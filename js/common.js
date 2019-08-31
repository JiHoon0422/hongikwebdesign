
function gnbGoLoginLinkPage(){
	var o = document.gnbLoginLinkForm;
	o.action = "http://www.hongik.ac.kr/login.do";
	o.submit();
}
function gnbGoLogoutLinkPage(){
	top.document.location.href = "http://ap.hongik.ac.kr/site/login/logout.php";
}

var chkCmsmLogin = function(o){
	if(trim(o.loginName.value)==""){
		alert("아이디를 입력하세요.");
		o.loginName.focus();
		return false;
	}
	if(trim(o.password.value)==""){
		alert("비밀번호를 입력하세요.");
		o.password.focus();
		return false;
	}
	return;
};

var chkLogin = function(o){
	if(trim(o.userId.value)==""){
		alert("아이디를 입력하세요.");
		o.userId.focus();
		return false;
	}
	if(trim(o.userPwd.value)==""){
		alert("비밀번호를 입력하세요.");
		o.userPwd.focus();
		return false;
	}
	return;
};

var trim = function(str){
	var s = str.replace(/^ */,"");
	s = s.replace(/ *$/,"");
	return s;
};

// 비밀번호 입력 체크(보안정책 적용)
var validPwd = function(str){
	if(str.length<10){
		alert("비밀번호를 영문 대소문자와 숫자 조합 또는 영문 대소문자와 특수문자 조합으로 최소 10자리 이상 입력해 주세요.\n(특수문자 허용범위 : '!', '@', '#', '$', '%', '^', '&', '*', '?', '_', '~', ',', '.')");
		return true;
	}
	var chk_num = str.search(/[0-9]/g);
	var chk_eng = str.search(/[a-zA-Z]/g);
	var chk_etc = str.search(/[!@#$%^&*?_~,.]/g);
	if((chk_eng+chk_num)<1 && (chk_eng+chk_etc)<1){
		alert("비밀번호를 영문 대소문자와 숫자 조합 또는 영문 대소문자와 특수문자 조합으로 최소 10자리 이상 입력해 주세요.\n(특수문자 허용범위 : '!', '@', '#', '$', '%', '^', '&', '*', '?', '_', '~', ',', '.')");
		return true;
	}
	return false;
};

var validQnaPwd = function(str){
	if(str.length<4){
		alert("비밀번호를 4 ~ 10자리까지 입려가능합니다.(영문 소문자와 숫자만 가능합니다.)");
		return true;
	}
	var isID = /^[a-z0-9]{4,12}$/;
	if(!isID.test(str)){
		alert("비밀번호를 영문 소문자와 숫자만 가능합니다.(4 ~ 10자리까지 가능합니다.)");
		return true;
	}
	return false;
};

var phoneAllGubun = function(selectName, className, hvalue, etc){
	document.write("<select name=\""+selectName+"\" class=\""+className+"\" "+etc+">");
	if(hvalue=="02" || hvalue==""){
		document.write("<option value=\"02\" selected>02</option>");
	}else{
		document.write("<option value=\"02\">02</option>");
	}
	if(hvalue=="031"){
		document.write("<option value=\"031\" selected>031</option>");
	}else{
		document.write("<option value=\"031\">031</option>");
	}
	if(hvalue=="032"){
		document.write("<option value=\"032\" selected>032</option>");
	}else{
		document.write("<option value=\"032\">032</option>");
	}
	if(hvalue=="033"){
		document.write("<option value=\"033\" selected>033</option>");
	}else{
		document.write("<option value=\"033\">033</option>");
	}
	if(hvalue=="041"){
		document.write("<option value=\"041\" selected>041</option>");
	}else{
		document.write("<option value=\"041\">041</option>");
	}
	if(hvalue=="042"){
		document.write("<option value=\"042\" selected>042</option>");
	}else{
		document.write("<option value=\"042\">042</option>");
	}
	if(hvalue=="043"){
		document.write("<option value=\"043\" selected>043</option>");
	}else{
		document.write("<option value=\"043\">043</option>");
	}
	if(hvalue=="051"){
		document.write("<option value=\"051\" selected>051</option>");
	}else{
		document.write("<option value=\"051\">051</option>");
	}
	if(hvalue=="052"){
		document.write("<option value=\"052\" selected>052</option>");
	}else{
		document.write("<option value=\"052\">052</option>");
	}
	if(hvalue=="053"){
		document.write("<option value=\"053\" selected>053</option>");
	}else{
		document.write("<option value=\"053\">053</option>");
	}
	if(hvalue=="054"){
		document.write("<option value=\"054\" selected>054</option>");
	}else{
		document.write("<option value=\"054\">054</option>");
	}
	if(hvalue=="055"){
		document.write("<option value=\"055\" selected>055</option>");
	}else{
		document.write("<option value=\"055\">055</option>");
	}
	if(hvalue=="061"){
		document.write("<option value=\"061\" selected>061</option>");
	}else{
		document.write("<option value=\"061\">061</option>");
	}
	if(hvalue=="062"){
		document.write("<option value=\"062\" selected>062</option>");
	}else{
		document.write("<option value=\"062\">062</option>");
	}
	if(hvalue=="063"){
		document.write("<option value=\"063\" selected>063</option>");
	}else{
		document.write("<option value=\"063\">063</option>");
	}
	if(hvalue=="064"){
		document.write("<option value=\"064\" selected>064</option>");
	}else{
		document.write("<option value=\"064\">064</option>");
	}
	if(hvalue=="070"){
		document.write("<option value=\"070\" selected>070</option>");
	}else{
		document.write("<option value=\"070\">070</option>");
	}
	if(hvalue=="0502"){
		document.write("<option value=\"0502\" selected>0502</option>");
	}else{
		document.write("<option value=\"0502\">0502</option>");
	}
	if(hvalue=="0505"){
		document.write("<option value=\"0505\" selected>0505</option>");
	}else{
		document.write("<option value=\"0505\">0505</option>");
	}
	if(hvalue=="0506"){
		document.write("<option value=\"0506\" selected>0506</option>");
	}else{
		document.write("<option value=\"0506\">0506</option>");
	}
	if(hvalue=="010"){
		document.write("<option value=\"010\" selected>010</option>");
	}else{
		document.write("<option value=\"010\">010</option>");
	}
	document.write("</select>");
};

var mobileAllGubun = function(selectName, className, hvalue, etc) {
	
	document.write("<select name=\""+selectName+"\" class=\""+className+"\" "+etc+">");
	
	if((hvalue == "010") || (hvalue == "")) {
		document.write("<option value=\"010\" selected>010</option>");
	} else {
		document.write("<option value=\"010\">010</option>");
	}
	if((hvalue == "011")) {
		document.write("<option value=\"011\" selected>011</option>");
	} else {
		document.write("<option value=\"011\">011</option>");
	}
	if((hvalue == "016")) {
		document.write("<option value=\"016\" selected>016</option>");
	} else {
		document.write("<option value=\"016\">016</option>");
	}
	if((hvalue == "017")) {
		document.write("<option value=\"017\" selected>017</option>");
	} else {
		document.write("<option value=\"017\">017</option>");
	}
	if((hvalue == "018")) {
		document.write("<option value=\"018\" selected>018</option>");
	} else {
		document.write("<option value=\"018\">018</option>");
	}
	if((hvalue == "019")) {
		document.write("<option value=\"019\" selected>019</option>");
	} else {
		document.write("<option value=\"019\">019</option>");
	}
	document.write("</select>");
};

var emailGubun = function(selectName, className, styleContent, formnm, send, mvalue, mode, etc) {
	
	document.write("<select name=\""+selectName+"\" class=\""+className+"\" style=\""+styleContent+"\" onchange=\"EMcheck('"+selectName+"','"+formnm+"','"+send+"','"+mode+"');\" "+etc+" >");
	
	if(mvalue == "hongik.ac.kr") {
		document.write("<option value=\"hongik.ac.kr\" selected>hongik.ac.kr</option>");
	} else {
		document.write("<option value=\"hongik.ac.kr\">hongik.ac.kr</option>");
	}
	if(mvalue == "hanmail.net") {
		document.write("<option value=\"hanmail.net\" selected>hanmail.net</option>");
	} else {
		document.write("<option value=\"hanmail.net\">hanmail.net</option>");
	}
	if(mvalue == "naver.com") {
		document.write("<option value=\"naver.com\" selected>naver.com</option>");
	} else {
		document.write("<option value=\"naver.com\">naver.com</option>");
	}
	if(mvalue == "gmail.com") {
		document.write("<option value=\"gmail.com\" selected>gmail.com</option>");
	} else {
		document.write("<option value=\"gmail.com\">gmail.com</option>");
	}
	if(mvalue == "nate.com") {
		document.write("<option value=\"nate.com\" selected>nate.com</option>");
	} else {
		document.write("<option value=\"nate.com\">nate.com</option>");
	}
	if(mvalue == "hotmail.com") {
		document.write("<option value=\"hotmail.com\" selected>hotmail.com</option>");
	} else {
		document.write("<option value=\"hotmail.com\">hotmail.com</option>");
	}
	if(mvalue == "paran.com") {
		document.write("<option value=\"paran.com\" selected>paran.com</option>");
	} else {
		document.write("<option value=\"paran.com\">paran.com</option>");
	}
	if(mvalue == "yahoo.co.kr") {
		document.write("<option value=\"yahoo.co.kr\" selected>yahoo.co.kr</option>");
	} else {
		document.write("<option value=\"yahoo.co.kr\">yahoo.co.kr</option>");
	}
	if(mvalue == "lycos.co.kr") {
		document.write("<option value=\"lycos.co.kr\" selected>lycos.co.kr</option>");
	} else {
		document.write("<option value=\"lycos.co.kr\">lycos.co.kr</option>");
	}
	if(mvalue == "netian.com") {
		document.write("<option value=\"netian.com\" selected>netian.com</option>");
	} else {
		document.write("<option value=\"netian.com\">netian.com</option>");
	}
	if(mvalue == "hanmir.com") {
		document.write("<option value=\"hanmir.com\" selected>hanmir.com</option>");
	} else {
		document.write("<option value=\"hanmir.com\">hanmir.com</option>");
	}
	if(mvalue == "dreamwiz.com") {
		document.write("<option value=\"dreamwiz.com\" selected>dreamwiz.com</option>");
	} else {
		document.write("<option value=\"dreamwiz.com\">dreamwiz.com</option>");
	}
	if(mvalue == "hitel.net") {
		document.write("<option value=\"hitel.net\" selected>hitel.net</option>");
	} else {
		document.write("<option value=\"hitel.net\">hitel.net</option>");
	}
	if(mvalue == "freechal.com") {
		document.write("<option value=\"freechal.com\" selected>freechal.com</option>");
	} else {
		document.write("<option value=\"freechal.com\">freechal.com</option>");
	}
	if(mvalue == "kebi.com") {
		document.write("<option value=\"kebi.com\" selected>kebi.com</option>");
	} else {
		document.write("<option value=\"kebi.com\">kebi.com</option>");
	}
	if(mvalue == "empal.com") {
		document.write("<option value=\"empal.com\" selected>empal.com</option>");
	} else {
		document.write("<option value=\"empal.com\">empal.com</option>");
	}
	if(mvalue == "hanafos.com") {
		document.write("<option value=\"hanafos.com\" selected>hanafos.com</option>");
	} else {
		document.write("<option value=\"hanafos.com\">hanafos.com</option>");
	}
	if((mvalue == "") || ((mvalue != "hongik.ac.kr") && (mvalue != "hanmail.net") && (mvalue != "naver.com") 
			&& (mvalue != "gmail.com") && (mvalue != "nate.com") && (mvalue != "hotmail.com") && (mvalue != "paran.com") 
			&& (mvalue != "yahoo.co.kr") && (mvalue != "lycos.co.kr") && (mvalue != "netian.com") && (mvalue != "hanmir.com") 
			&& (mvalue != "dreamwiz.com") && (mvalue != "hitel.net") && (mvalue != "freechal.com") && (mvalue != "kebi.com") 
			&& (mvalue != "empal.com") && (mvalue != "hanafos.com"))) {
		document.write("<option value=\"etc\" selected>--직접입력--</option>");
	} else {
		document.write("<option value=\"etc\">--직접입력--</option>");
	}
	document.write("</select>");
};

function EMcheck(selectName, formnm, send, mode) {
	if(eval("document."+formnm+"."+selectName+".value") == "etc") {
		if(mode == "I") {
			eval("document."+formnm+"."+send+".value=\"\";");
		}
		eval("document."+formnm+".div_email.style.position = \"relative\";");
		eval("document."+formnm+".div_email.style.visibility = \"visible\";");
		eval("document."+formnm+"."+send+".focus();");
	} else {
		eval("document."+formnm+".div_email.style.position = \"absolute\";");
		eval("document."+formnm+".div_email.style.visibility = \"hidden\";");
		eval("document."+formnm+"."+send+".value = document."+formnm+"."+selectName+".value;");
	}
}



function autoEMAIL(selectName, formnm) {
	eval("document."+formnm+"."+selectName+".value = 'etc'");
}

var CheckEmail = function(invalue) {
	
	retval = true;
	
	var isID = /^[A-Za-z0-9]+$/;
	if(!isID.test(invalue)) retval = false;
	
	// 아래의 문자가 있는 경우
	if(invalue.indexOf("/") >= 0) retval = false;
	if(invalue.indexOf(",") >= 0) retval = false;
	if(invalue.indexOf(" ") >= 0) retval = false;
	if(invalue.indexOf("http:") >= 0) retval = false;
	if(invalue.indexOf("@") >= 0) retval = false;
	
	// 아래의 형식이 없는 경우
	if(invalue.indexOf(".") == -1) retval = false;
	
	// 아래의 형식이 처음에 나타나는 경우
	if(invalue.indexOf(".") == 0) retval = false;
	
	// 마지막이 .인 경우
	if(invalue.charAt(invalue.length-1) == ".") retval = false;
	
	return retval;
};

var CheckEmailNew = function(invalue) {
	retval = true;

	var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	if(!regEmail.test(invalue)) {
		retval = false;
	}	

	return retval;
};

var CheckEmail1 = function(invalue) {
	
	retval = true;
	
	var isID = /^[A-Za-z0-9]+$/;
	if(!isID.test(invalue)) retval = false;
	
	// 아래의 문자가 있는 경우
	if(invalue.indexOf("/") >= 0) retval = false;
	if(invalue.indexOf(",") >= 0) retval = false;
	if(invalue.indexOf(" ") >= 0) retval = false;
	if(invalue.indexOf("http:") >= 0) retval = false;
	if(invalue.indexOf("@") >= 0) retval = false;
	if(invalue.indexOf(".") >= 0) retval = false;
	
	return retval;
};

// 디렉터리명 체크
var validID = function(formName, str) {
	
	var retVal = checkSpace(str);
	
	if(retVal != "") {
		eval("document."+formName+".msg.value='디렉터리명은 빈 공간 없이 연속된 영문 소문자와 숫자만 사용할 수 있습니다.'");
		return true; 
	}
	if(str.indexOf("admin")==0 || str.indexOf("master")==0 || str.indexOf("superadmin")==0 || str.indexOf("webmaster")==0) {
		eval("document."+formName+".msg.value='등록할수 없는 디렉터리명입니다.'");
		return true;
	}
	for(var z=0; z<10; z++) {
		if(str.charAt(0) == z) {
			eval("document."+formName+".msg.value='디렉터리명의 첫문자는 숫자로 시작할수 없습니다.'");
			return true;
		}
	}

	var isID = /^[a-z0-9]{4,12}$/;
	if(!isID.test(str)) {
		eval("document."+formName+".msg.value='디렉터리명은 4~12자의 영문 소문자와 숫자만 사용할 수 있습니다.'");
		return true;
	}
	
	return false;
};

var checkSpace = function(str) {
	if(str.search(/\s/) != -1) {
		return 1;
	} else {
		return "";
	}
};

// 숫자만 입력
var OnlyNumber = function() {
	if((event.keyCode < 47 && event.keyCode != 8) || (event.keyCode > 57)) {
		event.returnValue = false;
	}
};

// 숫자만 입력
var OnlyNumberNew = function() {
	var objEv = event.srcElement;
	var numPattern = /[^0-9]/g;
	objEv.value = objEv.value.replace(numPattern, "");
};

//textarea 글자수 제한
var fc_chk_byte = function(aro_name, ari_max, pMsgLen) {
	var len = 0, j;
	var li_len = 0;
	var str = aro_name.value;
	var ls_str2 = "";
	for(i=0,j=str.length; i<j; i++,len++) {
		if((str.charCodeAt(i) < 0) || (str.charCodeAt(i) > 127)) {
			len = len + 2;
		}
		// 전체 크기가 li_max를 넘지않으면
		if(len <= ari_max) {
			li_len = i + 1;
		}
	}
	if(len > ari_max) {
		alert(ari_max+" 글자를 초과 입력할수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
		ls_str2 = str.substr(0, (li_len-1));
		aro_name.value = ls_str2;
		len = ari_max;
	}
	if((pMsgLen != "") && (pMsgLen != null)) {
		pMsgLen.innerHTML = '[ '+len+'/'+ari_max+' ]';
	}
};
var fc_chk_byte_eng = function(aro_name, ari_max, pMsgLen) {
	var len = 0, j;
	var li_len = 0;
	var str = aro_name.value;
	var ls_str2 = "";
	for(i=0,j=str.length; i<j; i++,len++) {
		if((str.charCodeAt(i) < 0) || (str.charCodeAt(i) > 127)) {
			len = len + 2;
		}
		// 전체 크기가 li_max를 넘지않으면
		if(len <= ari_max) {
			li_len = i + 1;
		}
	}
	if(len > ari_max) {
		alert("You can not enter more than "+ari_max+" characters. \n The excess characters are automatically deleted. ");
		ls_str2 = str.substr(0, (li_len-1));
		aro_name.value = ls_str2;
		len = ari_max;
	}
	if((pMsgLen != "") && (pMsgLen != null)) {
		pMsgLen.innerHTML = '[ '+len+'/'+ari_max+' ]';
	}
};

// 아이디 체크
var validUserID = function(formName, str) {
	var retVal = checkSpace(str);
	if(retVal != "") {
		eval("document."+formName+".msg.value='아이디는 빈 공간 없이 연속된 영문 소문자와 숫자만 사용할 수 있습니다.'");
		return true;
	}
	if(str.indexOf("admin") == 0 || str.indexOf("master") == 0 || str.indexOf("superadmin") == 0 || str.indexOf("webmaster") == 0) {
		eval("document."+formName+".msg.value='등록할수 없는 아이디입니다.'");
		return true;
	}
	for(var z=0; z<10; z++) {
		if(str.charAt(0) == z) {
			eval("document."+formName+".msg.value='아이디의 첫문자는 숫자로 시작할수 없습니다.'");
			return true;
		}
	}
	/* checkFormat  var isID = /^[a-z0-9_]{4,12}$/; */
	var isID = /^[a-z0-9]{4,20}$/;
	if(!isID.test(str)) {
		eval("document."+formName+".msg.value='아이디는 4~12자의 영문 소문자와 숫자만 사용할 수 있습니다.'");
		return true;
	}
	return false;
};

// 메일주소 체크
var chkEmailAddr = function(sEmail) 
{
	var sRegExp = /([\w|\-]+)@([\w|\-]+)\.(\w+)/;
	return sRegExp.test(sEmail);
};

String.format = function() {
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++) {
		var reg = new RegExp("\\{" + i + "\\}", "gm");
		s = s.replace(reg, arguments[i + 1]);
	}
	return s;
};

var checkExcelFormat = function(imgPath) {
	if(imgPath.indexOf(".XLS") != -1 || imgPath.indexOf(".xls") != -1 || imgPath.indexOf(".XLSX") != -1 || imgPath.indexOf(".xlsx") != -1 ) 
	{
		return true;
	} 
	else 
	{
		return false;
	}
};

var openNoteList = function() {
	window.open("/notelist.do", "쪽지리스트", "directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no, width=600, height=465");
};

var openNoteWrite = function(userId) {
	window.open("/notewrite.do?sendType=P&userId="+userId, "쪽지쓰기", "directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no, width=600, height=375");
};

var openNoteListCmsm = function() {
	window.open("/cmsm/notelist.do", "쪽지리스트", "directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no, width=600, height=465");
};

var openNoteWriteCmsm = function(userId) {
	window.open("/cmsm/notewrite.do?sendType=P&userId="+userId, "쪽지쓰기", "directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no, width=600, height=375");
};

var openNoteWriteGroup = function(type) {
	
	if(type.trim() == 'S')
	{
		var checkBoxObj = document.getElementsByName("userIds");
		var qc = 0;
		
		for(var i=0; i<checkBoxObj.length; i++)
		{
			var checkBox = checkBoxObj[i];
			if(checkBox.checked)
			{
				qc++;
				break;
			}
		}
		if(qc < 1)
		{
			alert("전송대상을 선택하세요.");
			return false;
		}	
	}
	
	var o = document.sendForm;
	o.sendType.value = type;	//S:선택전송, A:전체전송
	o.action = "/notewrite.do";
	o.target = "쪽지쓰기";
	window.open("", "쪽지쓰기", "directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no, width=600, height=375");
	o.submit();
};

var goCommonWords = function(index,targetName)
{
	window.open("/commonwordslist.do?index="+index+"&targetName="+targetName, "상용구라이브러리", "directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no, width=640, height=480");
};

var saveCommonWords = function(index,targetName,pkId)
{
	var $textarea = $("textarea[name="+targetName+"]").eq(index);
	
	if($.trim($textarea.val()) == '')
	{
		alert('상용구로 저장할 내용을 입력하세요.');
		$textarea.focus();
		return false;
	}
	
	$.ajax({
		url     : "/commonwordsopenerprocess.do",
		data    : {mode:"I",p_pkId:pkId,content:$textarea.val()},
		dataType: "text",
		type    : "post",
		beforeSend: function() {},
		success : function(data) 
		{
			if(data > 0){
				alert('저장되었습니다.');
			}
		},
		complete : function(data)
		{
			
		},
		error : function(xhr, status, error)
		{ 
			
		}
	});
};

var goEmailGuide = function()
{
	window.open("http://www.hongik.ac.kr/main/email.htm", "이메일주소무단수집거부", "directories=no, location=no, menubar=no, resizable=no, scrollbars=no, status=no, toolbar=no, width=380, height=230");
	o.submit();
};

// 숫자+"-" 입력
var OnlyNumberHyphen = function() {
	if((event.keyCode < 47 && event.keyCode != 8) || (event.keyCode > 57) || (event.keyCode == 189)) {
		event.returnValue = false;
	}
};

// 숫자+"-" 입력
var OnlyNumberHyphenNew = function() {
	var objEv = event.srcElement;
	var numPattern = /[^0-9-]/g;
	objEv.value = objEv.value.replace(numPattern, "");
};


var goLoginCheck = function() {
	if(confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
		document.location.href = "/login.do?Refer="+window.parent.location.href;
	} else {
		return;
	}
};

// 쿠키값 가져 오기
function getCookie(name) {
	var nameOfCookie = name+"=";
	var x = 0;
	while(x <= document.cookie.length) {
		var y = (x+nameOfCookie.length);
		if(document.cookie.substring(x,y) == nameOfCookie) {
			if((endOfCookie=document.cookie.indexOf(";",y)) == -1) endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y,endOfCookie));
		}
		x = document.cookie.indexOf(" ", x)+1;
		if(x == 0) break;
	}
	return "";
}

function checkFileFormat(fileName) {
	if(fileName.indexOf(".PNG") != -1 || fileName.indexOf(".png") != -1
			|| fileName.indexOf(".PDF") != -1 || fileName.indexOf(".pdf") != -1 
			|| fileName.indexOf(".DOC") != -1 || fileName.indexOf(".doc") != -1 
			|| fileName.indexOf(".DOCX") != -1 || fileName.indexOf(".docx") != -1 
			|| fileName.indexOf(".XLS") != -1 || fileName.indexOf(".xls") != -1 
			|| fileName.indexOf(".XLSX") != -1 || fileName.indexOf(".xlsx") != -1 
			|| fileName.indexOf(".PPT") != -1 || fileName.indexOf(".ppt") != -1 
			|| fileName.indexOf(".JPG") != -1 || fileName.indexOf(".jpg") != -1 
			|| fileName.indexOf(".JPEG") != -1 || fileName.indexOf(".jpeg") != -1 
			|| fileName.indexOf(".BMP") != -1 || fileName.indexOf(".bmp") != -1 
			|| fileName.indexOf(".TIFF") != -1 || fileName.indexOf(".tiff") != -1 
			|| fileName.indexOf(".GIF") != -1 || fileName.indexOf(".gif") != -1 
			|| fileName.indexOf(".JPX") != -1 || fileName.indexOf(".jpx") != -1
			) {
		return true;
	} else {
		if(fileName != "" ) {
			alert("지원하지 않는 파일 형식이므로 첨부하실 수 없습니다.");
			return false;
		} else {
			return false;
		}
	}
}

// 이미지 width 만 줄이기
function resizeImage(o, pWidth) {
	var MAX_WIDTH = pWidth;
	if(o.width > MAX_WIDTH) {
		o.width = MAX_WIDTH;
	}
}

// 이미지 width, height 줄이기
function resizeImageWH(o, pWidth, pHeight) {
	var MAX_WIDTH = pWidth;
	var MAX_HEIGHT = pHeight;
	if(o.width > MAX_WIDTH) {
		o.width = MAX_WIDTH;
	}
	if(o.height > MAX_HEIGHT) {
		o.height = MAX_HEIGHT;
	}
}

function bbsFileMessage() {
	
}

var SITE_HOME_URL=[];

function goPortalSearchSubmit(){
	var o = document.portalSearchForm;
	if(trim(o.searchTerm.value)!=""){
		o.submit();
	}
}

//파일 부분에 텍스트 입력 못하게 하기 위해서
function fileWriteNot(){
  event.returnValue=false;
}

function checkImgFileFormat(fileName) {
	if(fileName.indexOf(".PNG") != -1 || fileName.indexOf(".png") != -1 
			|| fileName.indexOf(".JPG") != -1 || fileName.indexOf(".jpg") != -1 
			|| fileName.indexOf(".JPEG") != -1 || fileName.indexOf(".jpeg") != -1 
			|| fileName.indexOf(".GIF") != -1 || fileName.indexOf(".gif") != -1 
			) {
		return true;
	} else {
		if(fileName != "" ) {
			alert("지원하지 않는 파일 형식이므로 첨부하실 수 없습니다.");
			return false;
		} else {
			return false;
		}
	}
}

function checkPngFileFormat(fileName) {
	if(fileName.indexOf(".PNG") != -1 || fileName.indexOf(".png") != -1) {
		return true;
	} else {
		if(fileName != "" ) {
			alert("지원하지 않는 파일 형식이므로 첨부하실 수 없습니다.");
			return false;
		} else {
			return false;
		}
	}
}

function linkPage(url){
	if(url.length>0){
		if(url == "R"){
			alert('준비중입니다.');
		}else{
			window.open(url,"","");
		}
	}
}
