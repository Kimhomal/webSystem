(function($){
	
	// serialize 함수. form HTMLElement만 인자값으로 받음
	function formSerialize(form){
		var a = form instanceof HTMLElement ? form : undefined;
		
		if(!a){
			return;
		}
		
		var els = a.elements;
		var se = '';
		var el;
		for(var i = 0; i < els.length; i++){
			el = els.item(i);
			se += el.name + '=' + el.value + '&';
		}
		
		return se.replace(/\&$/, '');
	}
	
	// Namespace "git"
	window.git = window.git || {};

	// 로그인
	window.git.fn_login = function fn_login() {
		
//	    document.getElementById('searchUserId').value = 'admin';
//	    document.getElementById('searchUserPwd').value = 'qwer1234!';
	    
	    // validation check
	    if (git.fn_userInfo_checked()) {
	        document.loginForm.action = 'main/login.do';
	        document.loginForm.submit();
	    } else {
	    	document.getElementById('searchUserPwd').value = '';
	    }
	}

	// 로그인전 validation
	window.git.fn_userInfo_checked = function fn_userInfo_checked() {
	    var queryString = formSerialize(document.querySelector('.ui.form'));
	    var isChecked = true;

	    $.ajax({
            url: "main/loginChecking.json",
            type: "post",
            dataType: "json",
            data: queryString,
            async: false,
            beforeSend: function (xhs, status) {
            },
            error: function (xhs, status, error) {
            	ons.notification.alert('에러가 발생했습니다. 다시 시도하시거나 관리자에게 문의하세요.');
                console.log(xhs);
                console.log(status);
                console.log(error);
            },
            success: function (resData, textStatus) {
                if (resData.sof == "fail") {
                    isChecked = false;
                    alert(resData.msg);
                } else if (resData.sof == "failPwd") {
                    isChecked = false;
                    alert(resData.msg);
                } else {
                	console.log(resData.msg);
                    if (resData.msg01 != null && resData.msg01 != '' && resData.msg01 !== 'undefined') {
                    	console.log(resData.msg01);
                    }
                }
            }
        });
	    
	    return isChecked;
	}

	// 로그아웃
	window.git.fn_logout = function fn_logout() {
	    location.href = gp.ctxPath + '/main/logout.do';
	}
	
	/**
	 * isEmpty : 비어있는지 확인 return bool
	 * is$Empty : jquery 객체가 비어있는지 확인 return bool
	 * isEmptyAlert : jquery 객체가 비어있는지 확인 후 메시지창 return bool
	 * isLengthBetween : 최소/최대 글자 return bool
	 * isByteBetween : 최소/최대 바이트 return bool
	 * deleteSpace : 공백(space)제거 return string
	 * trimSpace : 맨 앞/뒤 공백제거 return string
	 * lpad : 왼쪽으로 글자 채우기 return string
	 * rpad : 오른쪽으로 글자 채우기 return string
	 * byteSize : 바이트 크기 return string
	 *
	 */
	$.fn.extend({
		isEmpty : function() {
			if($(this).val() == "" || $(this).val() == null) {
				return true;
			} else {
				return false;
			}
		},
		isEmptyAlert : function(names, gbn) {
			if($(this).is$Empty()){
				alert("존재하지 않은 객체:"+names);
				return true;
			}
			if($(this).prop("type") == "text" || $(this).prop("type") == "textarea") {
				if($(this).val() == null || $(this).val().replace(/ /gi,"") == "" || $(this).val() == gbn){
					alert(names + "을(를) 입력하십시오.");
					$(this).focus();
					return true;
				}
			} else if ($(this).prop("type") == "select" || $(this).prop("type") == "select-one" || $(this).prop("type") == "select-multiple"){
				if($(this).val() == null || $(this).val().replace(/ /gi,"") == "" || $(this).val() == gbn){
					alert(names + "을(를) 선택하십시오.");
					$(this).focus();
					return true;
				}
			} else if ( $(this).prop("type") == "file") {
				if($(this).val() == null || $(this).val().replace(/ /gi,"") == "" || $(this).val() == gbn) {
					alert(names + "을(를) 선택하십시오.");
					$(this).focus();
					return true;
				}
			}
			return false;
		},
		is$Empty : function() {
			if($(this).length == 0) {
				return true;
			} else {
				return false;
			}
		},
		isLengthBetween : function(min, max) {
			var length = $(this).val().length;

			if(min <= length && length <= max) {
				return true;
			} else {
				return false;
			}
		},
		isByteBetween : function(min, max) {
			var byteSize = $(this).byteSize();

			if(min <= byteSize && byteSize <= max) {
				return true;
			} else {
				return false;
			}
		},
		deleteSpace : function() {
			var val = $(this).val();
			val = val.replace(/ /g, "");	//space
			val = val.replace(/	/g, "");	//tab
			$(this).val(val);
		},
		trimSpace : function() {
			var val = $(this).val();
			val = $.trim(val);
			$(this).val(val);
		},
		lpad : function(totalLen, strRepl) {
			var strAdd = "";
			var diffLen = totalLen - $(this).val().length;

			for(var i = 0; i < diffLen; i++) {
				strAdd += strRepl;
			}

			var val = strAdd + $(this).val();

			$(this).val(val);
		},
		rpad : function(totalLen, strRepl) {
			var strAdd = "";
			var diffLen = totalLen - $(this).val().length;

			for(var i = 0; i < diffLen; i++) {
				strAdd += strRepl;
			}

			var val = $(this).val() + strAdd;

			$(this).val(val);
		},
		byteSize : function() {
			var val = $(this).val();
			var byteSize = 0;

			for(var i = 0; i < val.length; i++) {
				if(val.charCodeAt(i) > 255) {
					byteSize += 2;
				} else {
					byteSize += 1;
				}
			}
			return byteSize;
		},
		toUnderscore : function() {
			var val = $(this).val();
			return val.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
		}
	});

	$.extend({
		isEmpty : function(str) {
			if(str == "" || str == null) {
				return true;
			} else {
				return false;
			}
		},
		is$Empty : function($elem) {
			if($elem.length == 0) {
				return true;
			} else {
				return false;
			}
		},
		isLengthBetween : function(str, min, max) {
			var length = str.length;

			if(min <= length && length <= max) {
				return true;
			} else {
				return false;
			}
		},
		isByteBetween : function(str, min, max) {
			var byteSize = $.byteSize(str);

			if(min <= byteSize && byteSize <= max) {
				return true;
			} else {
				return false;
			}
		},
		deleteSpace : function(str) {
			var val = str.replace(/ /g, "");	//space
			val = val.replace(/	/g, "");	//tab

			return val;
		},
		trimSpace : function(str) {
			var val = $.trim(str);

			return val;
		},
		lpad : function(str, totalLen, strRepl) {
			var strAdd = "";
			var diffLen = totalLen - str.length;

			for(var i = 0; i < diffLen; i++) {
				strAdd += strRepl;
			}

			return strAdd + str;
		},
		rpad : function(str, totalLen, strRepl) {
			var strAdd = "";
			var diffLen = totalLen - str.length;

			for(var i = 0; i < diffLen; i++) {
				strAdd += strRepl;
			}

			return str + strAdd;
		},
		byteSize : function(str) {
			var val = str;
			var byteSize = 0;

			for(var i = 0; i < val.length; i++) {
				if(val.charCodeAt(i) > 255) {
					byteSize += 2;
				} else {
					byteSize += 1;
				}
			}

			return byteSize;
		},
		toUnderscore : function(str) {
			return str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
		}
	});
	
	//Automatically cancel unfinished ajax requests
	//when the user navigates elsewhere.
	$.xhrPool = [];
	$.xhrAbort = function() {
		$.each($.xhrPool, function(idx, jqXHR) {
			jqXHR.abort();
		});
	};

	var oldbeforeunload = window.onbeforeunload;
	window.onbeforeunload = function() {
		var r = oldbeforeunload ? oldbeforeunload() : undefined;
		if (r == undefined) {
			$.xhrAbort();
		}
		return r;
	}

	$(document).ajaxSend(function(e, jqXHR, options) {
		$.xhrPool.push(jqXHR);
	});
	$(document).ajaxComplete(function(e, jqXHR, options) {
		$.xhrPool = $.grep($.xhrPool, function(x) {
			return x != jqXHR
		});
	});


	$.xhrCheckData = function(data) {
		if (typeof data == "undefined") return false;

		if (data.hasOwnProperty("error")) {
			var errorCode = data["error"];

			switch (errorCode) {
				case "401":
					$.xhrAbort();
//					alert("로그인후 다시 시도하세요. / Ajax 요청 실패");
//					top.location.href = G.baseUrl + "user/auth/login.do";
				break;
				default:
					alert("Ajax 요청 실패 / [" + errorCode + "] " + data["message"]);

				break;
			}

			return false;

		} else {
			return true;

		}
	}
	
	$.fn.extend({
		getFormToJsonData : function() {

			var params = {};

			var arr = $(this).serializeArray();

			$.each(arr, function(){
				var name;
				$.each(this, function(key, value){
					if (key == "name") {
						name = value;
					} else if(key == "value") {
						if(!$.isEmpty(value)) {
							params[name] = $.trim(value);
						}else{
							params[name] = "";
						}
					}
				});
			});

			return params;
		},
		isEmptyAlertForm : function() {
			var bValidation = false;

			var $tr = $(this).find("table>tbody>tr");

			$tr.each(function(){
				var $th = $(this).children("th");

				if($th.children("span.necesaary").length > 0) {
					var strTh = $th.text().replace("*", "");

					var $component = $(this).children("td").find("input, select, file, textarea");

					$component.each(function(){
						if(!$(this).is("[type='hidden']") && !$(this).is(':hidden')) {
							if(!$(this).is("[type='file']")) $(this).trimSpace();

							if($(this).isEmptyAlert(strTh)) {
								bValidation = false;
								return false;
							} else {
								bValidation = true;
							}
						}
					});
				} else {
					bValidation = true;
				}

				return bValidation;
			});

			return bValidation;
		},
	});
}(jQuery));