(function($){
	
	var COLUMNS = [ {
		'data' : 'copNm',
		'name' : 'cop_nm',
		'title' : '업체명',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'copAddr',
		'name' : 'cop_addr',
		'title' : '업체주소',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'admNm',
		'name' : 'adm_nm',
		'title' : '관리자명',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'admId',
		'name' : 'adm_id',
		'title' : '관리자ID',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'regYmd',
		'name' : 'reg_ymd',
		'title' : '등록날짜',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'uptYmd',
		'name' : 'upt_ymd',
		'title' : '수정날짜',
		'type' : 'hidden',
		'searchable': true
	} ];
	
	$(document).ready(function() {
	    var dataTable = $('#example').DataTable( {
	        'processing': true,
	        'serverSide': true,
	        'pageLength': 10,
//		        'scrollY': '200px',
	        'ajax': gp.ctxPath + '/system/getCorpList.json',
	        'colLength': COLUMNS.length,
	        'columns': COLUMNS
	    } );
	    
	    // modal option setting
	    $('.ui.modal').modal({
	    	closable: false,
	    	onApprove: function(){
	    		if($('#addCorpForm').form('validate form')){
					$('#addCorpForm').ajaxSubmit( {
			            url				: gp.ctxPath + '/system/createCorp.json',
			            type			: 'post',
			            dataType		: 'json',
			            success			: function(json) {
			                if(json.respFlag == 'Y'){
			                    alert('추가 완료');
			                    dataTable.ajax.reload();
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
	    
	    $('.ui.button.add-corp').click(function(){
	    	$('.ui.modal').modal('show');
	    });
	    
	    // 업체명 중복 검사 함수 추가
	    $.fn.form.settings.rules.nameDup = function(value){
	    	var check = false;
	    	
	    	$.ajax({
	    		url: gp.ctxPath + '/system/dupCorpNameCheck.json',
	    		data: {
	    			name: value
	    		},
	    		type: 'post',
	    		async: false,
	    		dataType: 'json',
	    		success: function(res){
	    			check = res.flag;
	    		}
	    	});
	    	
	    	return check;
	    }
	    
	    // 업체 추가 입력폼 생성
	    $('#addCorpForm').form({
	    	fields: {
	    		name: {
	    			identifier: 'name',
	    			rules: [
	    				{
	    					type: 'nameDup',
	    					prompt: '이미 존재하는 업체명입니다.'
	    				},
	    				{
	    					type: 'empty',
	    					prompt: '업체명은 필수입니다.'
	    				}
	    			]
	    		}
	    	}
	    });
	} );
}(jQuery));
