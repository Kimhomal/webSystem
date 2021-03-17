(function($){
	function getRoleList() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/main/getRoleList.json',
				type: 'POST',
				dataType: 'json', // 응답받을 타입
				error: function (xhs, status, error) {
					if (xhs.status == 600) {
						alert('세션이 만료되었습니다.');
						location.href = gp.ctxPath + '/mainPage.do';
					} else {
						alert('서버와의 통신에 실패했습니다.');
					}
					reject(error);
				},
				success: function (responseData, textStatus) {
					resolve(responseData.result);
				}
			});
		});
	}
	
	function getCorpList() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/main/getCorpList.json',
				type: 'POST',
				dataType: 'json', // 응답받을 타입
				error: function (xhs, status, error) {
					if (xhs.status == 600) {
						alert('세션이 만료되었습니다.');
						location.href = gp.ctxPath + '/mainPage.do';
					} else {
						alert('서버와의 통신에 실패했습니다.');
					}
					reject(error);
				},
				success: function (responseData, textStatus) {
					resolve(responseData.result);
				}
			});
		});
	}
	
	$(document).ready(function(){
		$('#loginForm').form({
			fields: {
				searchUserId: {
					identifier: 'searchUserId',
					rules : [ {
						type : 'empty',
						prompt : 'ID를 입력해주세요'
					}]
				},
				searchUserPwd : {
					identifier : 'searchUserPwd',
					rules : [ {
						type : 'empty',
						prompt : '비밀번호를 입력해주세요'
					}, {
						type : 'length[6]',
						prompt : '비밀번호는 최소 6자리입니다'
					} ]
				}
			},
			inline: true,
			keyboardShortcuts: false
		}).form('set values', {
			searchUserId: 'master',
			searchUserPwd: '123456'
		});
		
		$('#loginForm input').on('keypress', function(e){
			if(e.keyCode === 13){
				if($('.ui.form').form('validate form')){
					git.fn_login();
				}
			}
		});
		
		$('button.join').click(function(){
			$('.ui.modal.join-modal').modal('show');
		});
		
		// modal option setting
	    $('.ui.modal.join-modal').modal({
	    	closable: false,
	    	onApprove: function(){
	    		if($('#joinForm').form('validate form')){
					$('#joinForm').ajaxSubmit( {
			            url				: gp.ctxPath + '/main/insertUserInfo.do',
			            type			: 'post',
			            dataType		: 'json',
			            success			: function(json) {
			                if(json.msg){
			                    alert(json.msg);
			                } else {
			                    alert("오류발생, 다시 시도하여 주십시오");
			                }
			            },
			            error : function(response) {
			                alert("오류발생, 다시 시도하여 주십시오");
			            },
			            beforeSubmit: function(formData, jqForm, options){
							// Submit 전 작업 수행
							console.log(formData);
			            }
			        });
				} else {
					return false;
				}
	    	}
	    });
	    
	    // ID 중복 검사 함수 추가
	    $.fn.form.settings.rules.idDup = function(value){
	    	var check = false;
	    	
	    	$.ajax({
	    		url: gp.ctxPath + '/main/uniqueUserIdCheck.do',
	    		data: {
	    			usrId: value
	    		},
	    		async: false,
	    		dataType: 'json',
	    		success: function(res){
	    			check = res.rtnMap.flag;
	    		}
	    	});
	    	
	    	return check;
	    }
	    
	    // 업체 추가 입력폼 생성
	    $('#joinForm').form({
	    	inline: true,
	    	fields: {
	    		usrNm: {
	    			rules: [
	    				{
	    					type: 'empty',
	    					prompt: '이름을 입력해주세요'
	    				}
	    			]
	    		},
	    		usrId: {
	    			rules: [
	    				{
	    					type: 'empty',
	    					prompt: 'ID를 입력해주세요'
	    				},
	    				{
	    					type: 'idDup',
	    					prompt: '이미 존재하는 ID입니다'
	    				},
	    			]
	    		},
	    		usrPwd: {
	    			rules: [
	    				{
							type : 'empty',
							prompt : '비밀번호를 입력해주세요'
						}, {
							type : 'length[6]',
							prompt : '비밀번호는 최소 6자리입니다'
						}
	    			]
	    		},
	    		passwordCheck: {
	    			rules: [
	    				{
							type : 'empty',
							prompt : '비밀번호를 입력해주세요'
						}, {
							type : 'length[6]',
							prompt : '비밀번호는 최소 6자리입니다'
						}
	    			]
	    		},
	    		orgCde: {
	    			rules: [
	    				{
	    					type: 'empty',
	    					prompt: '소속을 선택해주세요'
	    				}
	    			]
	    		},
	    		roleCde: {
	    			rules: [
	    				{
	    					type: 'empty',
	    					prompt: '구분을 선택해주세요'
	    				}
	    			]
	    		}
	    	}
	    });
	    
		getCorpList().then(function(result){
			var values = [];
			
			for(var i in result){
				values.push({
					name: result[i].copNm,
					value: result[i].id
				})
			}
			
			$('.ui.dropdown.corp-list').dropdown({
				values: values
			});
		});
		
		getRoleList().then(function(result){
			var values = [];
			
			for(var i in result){
				values.push({
					name: result[i].roleNm,
					value: result[i].roleId
				})
			}
			
			$('.ui.dropdown.role-list').dropdown({
				values: values
			});
		})
	});
}(jQuery));
