(function($){
	'use strict';
	
	var FILEINST = null;
	var DATATABLE = null;
	var COLUMNS = [ {
		'data' : 'regDt',
		'name' : 'reg_dt',
		'title' : '등록날짜',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'rstId',
		'name' : 'rst_id',
		'title' : 'ID',
		'type' : 'hidden',
		'searchable': true
	}, /*{
		'data' : 'optVal',
		'name' : 'opt_val',
		'title' : '작업내용',
		'type' : 'hidden',
		'searchable': true
	},*/ {
		'data' : 'usrNm',
		'name' : 'usr_nm',
		'title' : '작업자',
		'type' : 'hidden',
		'searchable': true
	} ];
	
	function getProjectInfo() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getProjectInfo.json',
				type: 'POST',
				data: {
					prjId: GLOBAL.PRJID || 0
				},
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
					console.log(responseData.result);
					resolve(responseData.result);
				}
			});
		});
	}
	
	function getWorkerListByPrjId() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getWorkerListByPrjId.json',
				type: 'POST',
				data: {
					prjId: GLOBAL.PRJID || 0
				},
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
	
	function getCopListByPrjId() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getCopListByPrjId.json',
				type: 'POST',
				data: {
					prjId: GLOBAL.PRJID || 0
				},
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
	
	function updateProgress(data){
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/updateProgress.json',
				type: 'POST',
				data: data,
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
					resolve(responseData);
				}
			});
		});
	}
	
	function getProjectProgress() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getProjectProgress.json',
				type: 'POST',
				data: {
					prjId: GLOBAL.PRJID || 0
				},
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
					console.log(responseData.result);
					resolve(responseData.result);
				}
			});
		});
	}
	
	function getResultImageById(id) {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getResultImageById.json',
				type: 'POST',
				data: {
					id: id
				},
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
					resolve(responseData);
				}
			});
		});
	}
	
	function getWorkProgressByRstId(id) {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getWorkProgressByRstId.json',
				type: 'POST',
				data: {
					rstId: id
				},
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
					resolve(responseData);
				}
			});
		});
	}
	
	function getResultImagesByRstId(id) {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getResultImagesByRstId.json',
				type: 'POST',
				data: {
					rstId: id
				},
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
					resolve(responseData);
				}
			});
		});
	}
	
	function createTableRow(target, values){
		var $target = $(target);
		var tds = ['key', 'title', 'goal', 'unit'];
		
		var tr = $('<tr>');
		var input, td, icon;
		for(var i in tds){
			td = $('<td>').text(values[tds[i]] || '');
			tr.append(td);
		}
		
		$target.append(tr);
	}
	
	function dateFunc(date, settings){
		if(!date) return;
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		return year + '/' + month + '/' + day;
	}
	
//	function createDetailInfo(params){
//		var p = params || {};
//		var survey = p.survey || '';
//		var exact = p.exact || '';
//		var struct = p.struct || '';
//		var strDt = p.strDt || '';
//		var endDt = p.endDt || '';
//		var workers = p.workers || [];
//		var fields = [{text:'측량',value:'survey',def:survey}, {text:'정위치',value:'exact',def:exact}, {text:'구조화',value:'struct',def:struct}];
//		
//		var target = $('.ui.container.detail');
//		var detailLength = target.find('.ui.segment').length;
//		var segment = $('<div class="ui segment">');
//		var workDiv = $('<div class="fields works">');
//		var dateDiv = $('<div class="two fields">');
//		var workersDiv = $('<div class="field">');
//		
//		var field, label, inputWrap, input, select;
//		
//		for(var i in fields){
//			input = $('<input type="number" value="' + fields[i].def + '" data-value="' + fields[i].value + '" name="' + fields[i].value + detailLength + '" readonly="">');
//			inputWrap = $('<div class="ui transparent input">').append(input);
//			label = $('<label>').text(fields[i].text);
//			field = $('<div class="five wide field">').append(label).append(inputWrap);
//			workDiv.append(field);
//		}
//		
//		var dateInput = $('<input type="text" class="date" value="' + strDt + '" placeholder="날짜선택" data-value="strDt" readonly="">');
//		var dateIcon = $('<div class="ui transparent input">').append(dateInput);
//		var label = $('<label>').text('시작');
//		var dateField = $('<div class="field">').append(label).append(dateIcon);
//		dateDiv.append(dateField);
//		
//		dateInput = $('<input type="text" class="date" value="' + endDt + '" placeholder="날짜선택" data-value="endDt" readonly="">');
//		dateIcon = $('<div class="ui transparent input">').append(dateInput);
//		label = $('<label>').text('완료');
//		dateField = $('<div class="field">').append(label).append(dateIcon);
//		dateDiv.append(dateField);
//		
//		label = $('<label>').text('작업자');
//		workersDiv.append(label)
//		for(var i in workers){
//			select = $('<div class="ui label">').text(workers[i]);
//			workersDiv.append(select);
//		}
//		
//		segment.append(workDiv).append(dateDiv).append(workersDiv);
//		target.append(segment);
//	}
	
	function updateProgressDiv(){
		getProjectProgress().then(function(result){
			var progress;
			for(var i in result){
				$('#td-' + result[i].optKey).text(result[i].sum)
				progress = $('#prg-' + result[i].optKey);
				progress.progress('set progress', result[i].sum);
			}
		})
	}
	
	function createWorkInput(params){
		var p = params || {};
		var data = p.data || [];
		
		var target = $('.work-list');
		var segment = $('<div class="ui clearing segment">');
		
		var segmentLabel = $('<div class="ui ribbon label">').text('오늘 작업량 입력');
		
		var button = $('<div class="ui right floated primary labeled icon button">').data('id', GLOBAL.PRJID).append('<i class="right arrow icon"></i>저장');
		var fileButton = $('<button class="ui button add-files-btn">').text('사진추가');
		var fileDiv = $('<div id="fileupload" class="ui six cards">');
		
		var fields;
		var form = $('<div class="ui form">')
		
		var field, label, input, inputWrap, unit;
		for(var i in data){
			if(!(i%4)){
				fields = $('<div class="four fields">');
				form.append(fields);
			}
			
			label = $('<label>').text(data[i].title);
			input = $('<input>').data('name', data[i].key);
			unit = $('<div class="ui basic label">').text(data[i].unit);
			inputWrap = $('<div class="ui right labeled input">').append(input).append(unit);
			field = $('<div class="field">').append(label).append(inputWrap);
			fields.append(field);
		}
		
		form.append(fileButton).append(fileDiv).append(button);
		segment.append(segmentLabel).append(form);
		target.append(segment);
		
		button.click(function(){
			var id = $(this).data('id');
			var segment = $(this).closest('.ui.segment');
			var inputs = segment.find('input');
			
			segment.addClass('loading');
			var data = {};
			data.prjId = id;
			
			var jsonb = [];
			var empty = true;
			inputs.each(function(i, e){
				var value = $(this).val() || 0;
				var name = $(this).data('name');
				
				if(!value){
					return;
				}
				
				jsonb.push({
					key: name,
					value: value
				});
				
				$(this).val('');
				empty = false;
			});
			
			if(empty){
				$('body').toast({
					class: 'error',
					message: '입력된 작업이 없습니다. 작업을 입력해주세요.'
				});
				segment.removeClass('loading');
				return;
			}
			
			data.prgOpt = JSON.stringify(jsonb);
			
			updateProgress(data).then(function(result){
				if(result.respFlag === 'Y'){
					updateProgressDiv();
					if(FILEINST){
						if(FILEINST.dropzone.getQueuedFiles().length){
							var sendingFunc = function(file, xhr, formData){
								formData.append('rstId', result.rstId);
								FILEINST.dropzone.off('sending', sendingFunc);
							}
							
							FILEINST.dropzone.on('sending', sendingFunc);
							
							FILEINST.dropzone.processQueue();
						}
					}
					DATATABLE.ajax.reload();
				} else {
					alert('서버와의 통신에 실패했습니다.');
				}
				segment.removeClass('loading');
			});
		});
	}
	
	function createProgressTable(params){
		var p = params || {};
		var data = p.data || [];
		
		var target = $('.work-list');
		var segment = $('<div class="ui segment">');
		
		var segmentLabel = $('<div class="ui ribbon label">').text('프로젝트 진행도');
		
		var fields = $('<div class="two fields">');
		var form = $('<div class="ui form">').append(fields);
		
		var thead = $('<thead>').append('<tr><th></th><th class="collapsing">현재 작업량</th><th>진행도</th><th class="collapsing">목표 작업량</th></tr>');
		var tbody = $('<tbody>');
		var table = $('<table class="ui celled definition table">').append(thead).append(tbody);
		
		var tr, td1, td2, td3, td4, progress;
		for(var i in data){
			td1 = $('<td class="collapsing">').text(data[i].title);
			td2 = $('<td>').append('<div class="ui mini horizontal statistic"><div class="value">' + data[i].goal + '</div><div class="label">' + data[i].unit + '</div></div>');
			
			progress = $('<div class="ui progress">').attr('id', 'prg-' + data[i].key).append('<div class="bar"><div class="progress"></div></div><div class="label">loading</div>');
			progress.progress({
				duration: 200,
				precision: 1,
				total: data[i].goal,
				value: data[i].value,
				text: {
					active: '{value}' + data[i].unit + ' / {total}' + data[i].unit
				}
			});
			td3 = $('<td>').append(progress);
			td4 = $('<td>').append('<div class="ui mini horizontal statistic"><div class="value" id="td-' + data[i].key + '">' + data[i].value + '</div><div class="label">' + data[i].unit + '</div></div>');
			tr = $('<tr>').append(td1).append(td4).append(td3).append(td2);
			tbody.append(tr);
		}
		
		segment.append(segmentLabel).append(table);
		target.append(segment);
	}
	
	function resultDetailDiv(){
		var content = $('.rst-detail-modal .content');
		content.empty(); // 모달 초기화
		
		// 현재 선택된 작업 성과 노드의 업로드 이미지 목록 불러오기
		// 정보만 불러옴. 이미지는 불러오지않음.
		var data = DATATABLE.rows('.selected').data();
		data.each(function(item){
			
			var wrap = $('<div class="ui two column stackable grid">');
			
			var value = $('<p>').text(item.usrNm);
			var header = $('<h4 class="ui header">').text('작업자');
			var col = $('<div class="column">').append(header).append(value);
			wrap.append(col);
			
			value = $('<p>').text(item.regDt);
			header = $('<h4 class="ui header">').text('등록일시');
			col = $('<div class="column">').append(header).append(value);
			wrap.append(col);
			
			content.append(wrap);
			
			getWorkProgressByRstId(item.rstId).then(function(result){
				header = $('<h4 class="ui header">').text('작업내용');
				col = $('<div class="column">').append(header);
				for(var i in result){
					value = $('<a class="detail">').text(result[i].optVal);
					var unit = $('<a class="detail">').text(result[i].unit);
					var label = $('<div class="ui label">').text(result[i].name).append(value).append(unit);
					col.append(label);
				}
				
				var row = $('<div class="one column row">').append(col);
				wrap.append(row);
				
				return getResultImagesByRstId(item.rstId);
			}).then(function(result){
				console.log(result);
				
				header = $('<h4 class="ui header">').text('업로드 이미지');
				var imageWrap = $('<div class="ui medium images">');
				col = $('<div class="column">').append(header).append(imageWrap);
				
				var imgTag;
				for(var i in result){
					imgTag = $('<img data-id="' + result[i].fileNo + '" src="' + gp.ctxPath + '/plugins/semantic/images/wireframe/image-square.png">');
					imageWrap.append(imgTag);
				}
				
				var row = $('<div class="one column row">').append(col);
				wrap.append(row);
			});
			
			
		});
	}
	
	
	$(document).ready(function(){
		DATATABLE = $('#workHistory').DataTable( {
			'processing': true,
			'serverSide': true,
			'pageLength': 10,
			'lengthChange': false,
			'ajax': {
				'url': gp.ctxPath + '/project/getWorkHistory.json',
				'data': function(d){
					if(!d){
						return false;
					}
					d.prjId = GLOBAL.PRJID;
					console.log(d);
				}
			},
			'colLength': COLUMNS.length,
			'columns': COLUMNS,
			'select': true,
			'order': [[0, 'desc']]
		} );
		
		DATATABLE.on('select', function(e, dt, type, indexes){
			var select = $(this).DataTable().rows( indexes ).data().pluck('rstId');
			$('.dt-buttons .ui.button').removeClass('disabled');
		});
		
		DATATABLE.on('deselect', function(e, dt, type, indexes){
			var deselect = $(this).DataTable().rows( indexes ).data().pluck('rstId');
			$('.dt-buttons .ui.button').addClass('disabled');
		});
		
		getProjectInfo().then(function(result){
			for(var i in result){
				$('.ui.form').find('input[name="' + i + '"]').attr('value', result[i]);
			}
			
			var wrkOpt = JSON.parse(result.wrkOpt);
			var workList = [];
			
			for(var i in wrkOpt){
				createTableRow('.table.wrk-opt', wrkOpt[i]);
				
				workList.push({
					key: wrkOpt[i].key,
					goal: wrkOpt[i].goal,
					title: wrkOpt[i].title,
					value: 0,
					unit: wrkOpt[i].unit
				});
			}
			
			if(GLOBAL.USRROLE === 'R002'){
				createWorkInput({
					data: workList
				});
				
				// dropzone 파일 업로드 생성
				if(document.querySelector('#fileupload')){
					FILEINST = new am.FileUpload();
				}
			}
			
			createProgressTable({
				data: workList
			});
			
			getProjectProgress().then(function(result){
				var progress;
				for(var i in result){
					$('#td-' + result[i].optKey).text(result[i].sum)
					progress = $('#prg-' + result[i].optKey);
					progress.progress('set progress', result[i].sum);
				}
				
			});
		});
		
		getCopListByPrjId().then(function(result){
			var target = $('.cops');
			var label;
			
			for(var i in result){
				label = $('<div class="ui label">').text(result[i].copNm);
				target.append(label);
			}
		});
		
		getWorkerListByPrjId().then(function(result){
			var target = $('.workers');
			var label;
			
			for(var i in result){
				label = $('<div class="ui label">').text(result[i].usrNm);
				target.append(label);
			}
			
			$('.segment.loading').removeClass('loading');
		});
		
		$('.button.modify').click(function(){
			var form = document.createElement('form');
			var prjId = document.createElement('input');
			prjId.setAttribute('type', 'hidden');
			prjId.setAttribute('name', 'prjId');
			prjId.setAttribute('value', GLOBAL.PRJID);
			
			form.appendChild(prjId);
			form.setAttribute('method', 'post');
			form.setAttribute('action', gp.ctxPath + '/project/modify.do');
			
			document.body.appendChild(form);
			form.submit();
		});
		
		$('.button.delete').click(function(){
			$('.delete-project-modal').modal('show');;
		})
		
		$('.rst-detail-btn').click(function(){
			$('.ui.modal.rst-detail-modal')
				.modal({
					onShow: function(){
						// show 호출 시 실행되는 함수
						resultDetailDiv();
					},
					onVisible: function(){
						// modal 로드 완료 시 실행되는 함수
						
						// image lazy loading 함수
						$('.rst-detail-modal img').visibility({
							context: $('.rst-detail-modal .content'),
							type: 'image',
							transition: 'fade in',
							duration: 1000,
							onTopVisible: function(context){
								var img = $(this);
								var fileNo = img.data('id');
								
								getResultImageById(fileNo).then(function(result){
									img.attr('src', result.base64);
									$('.rst-detail-modal img').visibility('refresh');
								});
							}
						});
					}
				})
				.modal('show');
		});
		
		$('.delete-project-modal').modal({
	    	closable: false,
	    	onApprove: function(){
				$.ajax( {
		            url				: gp.ctxPath + '/project/deleteProject.json',
		            type			: 'post',
		            data            : {prjId: GLOBAL.PRJID},
		            dataType		: 'json',
		            success			: function(json) {
		                if(json.respFlag == 'Y'){
		                	alert('삭제가 완료되었습니다');
		                	location.href = gp.ctxPath + '/project/list.do';
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
	    
		$('.ui.modal.delete-modal').modal({
	    	closable: false,
	    	onApprove: function(){
				$.ajax( {
		            url				: gp.ctxPath + '/project/deleteWorkHistory.json',
		            type			: 'post',
		            data            : {rstId: DATATABLE.rows('.selected').data().pluck('rstId')[0]},
		            dataType		: 'json',
		            success			: function(json) {
		                if(json.respFlag == 'Y'){
		                	$('body').toast({
		                		title: '삭제 완료',
		    					class: 'success',
		    					message: '삭제가 완료되었습니다'
		    				});
		                	
		                    $('.dt-buttons .ui.button').addClass('disabled');
		                    DATATABLE.ajax.reload();
		                    updateProgressDiv();
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
		
		$('.rst-delete-btn').click(function(){
			$('.ui.modal.delete-modal').modal('show');
		});
	});
}(jQuery));