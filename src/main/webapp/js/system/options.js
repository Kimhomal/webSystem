(function($){
	
	var COLUMNS = [ {
		'data' : 'id',
		'name' : 'id',
		'title' : '코드명',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'name',
		'name' : 'name',
		'title' : '작업명',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'unit',
		'name' : 'unit',
		'title' : '단위',
		'type' : 'hidden',
		'searchable': true
	}];
	
	$(document).ready(function() {
	    var dataTable = $('#example').DataTable( {
	        'processing': true,
	        'serverSide': true,
	        'pageLength': 10,
//		        'scrollY': '200px',
	        'ajax': gp.ctxPath + '/system/getOptionsDatatable.json',
	        'colLength': COLUMNS.length,
	        'columns': COLUMNS,
	        'select': true
	    } );
	    
	    dataTable.on('select', function(e, dt, type, indexes){
			$('.ui.button.delete-corp').removeClass('disabled');
		});
	    
	    dataTable.on('deselect', function(e, dt, type, indexes){
			$('.ui.button.delete-corp').addClass('disabled');
		});
	    
	    // modal option setting
	    $('.ui.modal.add-modal').modal({
	    	closable: false,
	    	onApprove: function(){
	    		if($('#addOptionsForm').form('validate form')){
					$('#addOptionsForm').ajaxSubmit( {
			            url				: gp.ctxPath + '/system/createOption.json',
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
	    
	    $('.ui.modal.delete-modal').modal({
	    	closable: false,
	    	onApprove: function(){
				$.ajax( {
		            url				: gp.ctxPath + '/system/deleteOption.json',
		            type			: 'post',
		            data            : {id: dataTable.rows('.selected').data().pluck('id')[0]},
		            dataType		: 'json',
		            success			: function(json) {
		                if(json.respFlag == 'Y'){
		                    alert('삭제 완료');
		                    $('.ui.button.delete-corp').removeClass('disabled');
		                    dataTable.ajax.reload();
		                } else {
		                    alert("오류발생, 다시 시도하여 주십시오");
		                }
		            },
		            error : function(response) {
		                alert("오류발생, 다시 시도하여 주십시오");
		            }
		        });
	    	}
	    });
	    
	    $('.ui.button.add-corp').click(function(){
	    	$('.ui.modal.add-modal').modal('show');
	    });
	    
	    $('.ui.button.delete-corp').click(function(){
	    	$('.ui.modal.delete-modal').modal('show');
	    });
	    
	    // 업체명 중복 검사 함수 추가
	    $.fn.form.settings.rules.optionDup = function(value){
	    	var check = false;
	    	
	    	$.ajax({
	    		url: gp.ctxPath + '/system/dupOptionCheck.json',
	    		data: {
	    			id: value
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
	    $('#addOptionsForm').form({
	    	fields: {
	    		id: {
	    			identifier: 'id',
	    			rules: [
	    				{
	    					type: 'optionDup',
	    					prompt: '이미 존재하는 업체명입니다.'
	    				},
	    				{
	    					type: 'empty',
	    					prompt: '코드명은 필수입니다.'
	    				},
	    				{
							type : 'maxLength[6]',
							prompt : '코드명은 최대 {ruleValue}자리입니다'
						}
	    			]
	    		},
	    		name: {
	    			identifier: 'name',
	    			rules: [
	    				{
	    					type: 'empty',
	    					prompt: '작업명은 필수입니다.'
	    				}
	    			]
	    		}
	    	}
	    });
	} );
}(jQuery));
