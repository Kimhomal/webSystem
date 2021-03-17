(function($){
	var COPS = {};
	var WORKERS = [];
	var FIXCOPS = {};
	var FIXWORKERS = {};
	var OPTIONS = undefined;
	
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
	
	function getWorkerListByOrg(org) {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/main/workerListByOrg.json',
				type: 'POST',
				traditional : true,
				data: {
					org: org ? org.join(',') : undefined
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
	
	function getCopList() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/system/getCorpList.json',
				type: 'GET',
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
	
	function getOptions() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/system/getOptions.json',
				type: 'GET',
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
	
	function dateFunc(date, settings){
		if(!date) return;
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		return year + '/' + month + '/' + day;
	}
	
	function createTableRow(target, values, type){
		var $target = $(target);
		var v = values || {};
		var t = type || 'default';
		
		var trash;
		if(t === 'default'){
			trash = $('<i class="trash icon">').click(function(e){
				$(this).closest('tr').remove();
			});
		} else if(t === 'fix'){
			trash = $('<i class="trash icon">').click(function(e){
				$(this).closest('tr').toggleClass('red');
			});
		}
		
		var td1 = $('<td class="collapsing">').append(trash);
		
		var options;
		if(t === 'default'){
			options = $('<select class="ui fluid selection dropdown">');
		} else if(t === 'fix'){
			options = $('<input class="transparent" type="text" readonly>').val(v.title);
		}
		var td2 = $('<td>').append(options);
		
		var goal = $('<input type="number" data-val="goal">');
		if(t === 'fix'){
			goal.val(v.goal);
		}
		var td3 = $('<td>').append(goal);
		
		var unit = $('<input class="transparent" type="text" data-val="unit" readonly>');
		if(t === 'fix'){
			unit.val(v.unit);
		}
		var td4 = $('<td>').append(unit);
		
		var tr = $('<tr>').append(td1).append(td2).append(td3).append(td4);
		$target.append(tr);
		
		if(t === 'default'){
			options.dropdown({
				placeholder: '작업 선택',
				values: OPTIONS,
				onChange: function(value, text, $selectedItem) {
					var val = value;
					var unit = '';
					OPTIONS.forEach(function(i,e){
						if(i.value === val){
							unit = i.unit;
						}
					});
					
					$selectedItem.closest('tr').find('input.transparent').val(unit);
				}
			});
		}
	}
	
//	function createDetailInfo(params){
//		var p = params || {};
//		var survey = p.survey || '';
//		var exact = p.exact || '';
//		var struct = p.struct || '';
//		var strDt = p.strDt || '';
//		var endDt = p.endDt || '';
//		var workers = p.workers || [];
//		var grpNum = p.grpNum
//		var fields = [{text:'측량',value:'survey',def:survey}, {text:'정위치',value:'exact',def:exact}, {text:'구조화',value:'struct',def:struct}];
//		
//		var target = $('.ui.container.detail');
//		var detailLength = target.find('.ui.segment').length;
//		var segment = $('<div class="ui segment">');
//		var workDiv = $('<div class="fields works">');
//		var dateDiv = $('<div class="two fields">');
//		var workersDiv = $('<div class="field">');
//		var closeIcon = $('<i class="right floated close icon">');
//		var closeDiv = $('<div class="ui right floated icon tertiary button">').append(closeIcon);
//		
//		var dimmerIcon = $('<i class="times icon">');
//		var dimmerHeader = $('<h2 class="ui inverted header">').append(dimmerIcon);
//		var dimmerBtn = $('<div class="ui button">').text('삭제 취소');
//		var dimmerContent = $('<div class="content">').append(dimmerHeader).append(dimmerBtn);
//		var dimmer = $('<div class="ui cetner aligned medium dimmer">').append(dimmerContent);
//		
//		dimmerBtn.click(function(){
//			$(this).closest('.ui.segment').dimmer('hide');
//		});
//		
//		var field, label, inputWrap, input, select, basic;
//		
//		for(var i in fields){
//			input = $('<input type="number" value="' + fields[i].def + '" data-value="' + fields[i].value + '" name="' + fields[i].value + detailLength + '">');
//			basic = $('<div class="ui basic label">').text('km');
//			inputWrap = $('<div class="ui right labeled input">').append(input).append(basic);
//			label = $('<label>').text(fields[i].text);
//			field = $('<div class="five wide field">').append(label).append(inputWrap);
//			workDiv.append(field);
//		}
//		
//		var itag = $('<i class="calendar icon">');
//		var dateInput = $('<input type="text" class="date" placeholder="날짜선택" data-value="strDt">');
//		var dateIcon = $('<div class="ui input left icon">').append(itag).append(dateInput);
//		var calendarStr = $('<div class="ui calendar rangestart">').append(dateIcon);
//		var label = $('<label>').text('시작');
//		var dateField = $('<div class="field">').append(label).append(calendarStr);
//		dateDiv.append(dateField);
//		
//		itag = $('<i class="calendar icon">');
//		dateInput = $('<input type="text" class="date" placeholder="날짜선택" data-value="endDt">');
//		dateIcon = $('<div class="ui input left icon">').append(itag).append(dateInput);
//		var calendarEnd = $('<div class="ui calendar rangeend">').append(dateIcon);
//		label = $('<label>').text('완료');
//		dateField = $('<div class="field">').append(label).append(calendarEnd);
//		dateDiv.append(dateField);
//		
//		select = $('<select class="ui fluid dropdown workers" multiple="">');
//		
//		label = $('<label>').text('작업자');
//		
//		workersDiv.append(label).append(select);
//		segment.append(dimmer).append(closeDiv).append(workDiv).append(dateDiv).append(workersDiv);
//		target.append(segment);
//		
//		select
//			.dropdown({
//				clearable: true,
//				placeholder: '작업자 선택',
//				values: WORKERS
//			})
//			.dropdown('set selected', workers);
//		
//		
//		closeDiv.click(function(){
//			$(this).closest('.ui.segment').dimmer('show');
//		});
//		
//		calendarStr.calendar({
//			type: 'date',
//			initialDate: strDt,
//			endCalendar: calendarEnd,
//			formatter: {
//				date: dateFunc
//			}
//		});
//		
//		calendarEnd.calendar({
//			type: 'date',
//			initialDate: endDt,
//			startCalendar: calendarStr,
//			formatter: {
//				date: dateFunc
//			}
//		});
//	}
	
	function updateProject(){
		if($('.ui.form').form('validate form')){
			$('.ui.form').ajaxSubmit( {
	            url				: gp.ctxPath + '/project/updateProject.json',
	            type			: 'post',
	            dataType		: 'json',
	            success			: function(json) {
	                if(json.respFlag == 'Y'){
	                    alert('정상적으로 수정되었습니다.');
	                    location.href = gp.ctxPath + '/project/list.do';
	                } else {
	                    alert("오류발생, 다시 시도하여 주십시오");
	                }
	            },
	            beforeSubmit: function(formData, jqForm, options){
					// Submit 전 작업 수행
					
					formData.push({name: 'prjId', value: GLOBAL.PRJID, type: 'text', required: false});
					
					var jsonb = [];
					$('.wrk-opt.table tbody tr').each(function(index, el){
						var select = $(this).find('.dropdown');
						var goal = $(this).find('input[type="number"]');
						var unit = $(this).find('input.transparent');
						var temp = {
							key: select.dropdown('get value')[0],
							title: select.dropdown('get text')[0],
							goal: goal.val(),
							unit: unit.val()
						};
						
						jsonb.push(temp);
					});
					
					formData.push({name: 'wrkOpt', value: JSON.stringify(jsonb), type: 'text', required: false});
					
					// ------------- 업체 목록 요청에 담기 -------------
					var selectCop = $('.ui.form').form('get field', 'cops');
					var cops = [];
					
					selectCop.each(function(i, e){
						var items = $(this).dropdown('get item');
						items.each(function(i, e){
							if(!$(e).data('fix')){
								cops.push($(e).data('value'));
							}
						})
					});
					
					formData.push({name: 'cops', value: cops, type: 'text', required: false});
					// ------------------------------------------
					
					var selectWorkers = $('.ui.form').form('get field', 'workers');
					var workers = [];
					
					selectWorkers.each(function(i, e){
						var items = $(this).dropdown('get item');
						items.each(function(i, e){
							if(!FIXWORKERS[$(e).data('value')]){
								workers.push($(e).data('value'));
							}
						});
					});
					
					formData.push({name: 'workers', value: workers, type: 'text', required: false});
				},
	            error : function(response) {
	                alert("오류발생, 다시 시도하여 주십시오");
	            }
	        });
		}
	}
	
	function updateWorker(orgs){
		var list = [];
		
		for(var i in WORKERS){
			list.push(WORKERS[i]);
		}
		
		for(var i in orgs){
			if(COPS[orgs[i]].list instanceof Array){
				list.push({
					name: COPS[orgs[i]].name,
					type: 'header',
					icon: 'tags'
				});
				
				for(var j in COPS[orgs[i]].list){
					list.push(COPS[orgs[i]].list[j]);
				}
			}
		}
		
		$('.dropdown.workers').dropdown('change values', list);
		
		for(var i in FIXWORKERS){
			$('.dropdown.workers').dropdown('set selected', i);
		}
	}
	
	$(document).ready(function(){
		$('.ui.buttons button').click(function(){
			var action = $(this).data('action');
			if(action === 'save'){
				updateProject();
			} else if(action === 'cancel'){
				var form = document.createElement('form');
				var prjId = document.createElement('input');
				prjId.setAttribute('type', 'hidden');
				prjId.setAttribute('name', 'prjId');
				prjId.setAttribute('value', GLOBAL.PRJID);
				
				form.appendChild(prjId);
				form.setAttribute('method', 'post');
				form.setAttribute('action', gp.ctxPath + '/project/detail.do');
				
				document.body.appendChild(form);
				form.submit();
			}
		});
		
		$('.ui.button.add-work').click(function(e){
			var table = $(this).closest('.ui.table');
			var tbody = table.find('tbody');
			
			createTableRow(tbody, {});
		});
		
		getOptions().then(function(result){
			var values = [];
			
			for(var i in result){
				values.push({
					name: result[i].name,
					value: result[i].id,
					unit: result[i].unit
				});
			}
			
			OPTIONS = values;
			
			return getProjectInfo();
		}).then(function(result){
			for(var i in result){
				$('.ui.form').find('input[name="' + i + '"]').attr('value', result[i]);
			}
			
			$('#rangestart').calendar({
				type: 'date',
				endCalendar: $('#rangeend'),
				formatter: {
					date: dateFunc
				}
			});
			
			$('#rangeend').calendar({
				type: 'date',
				startCalendar: $('#rangestart'),
				formatter: {
					date: dateFunc
				}
			});
			
			var wrkOpt = JSON.parse(result.wrkOpt);
			for(var i in wrkOpt){
				createTableRow('.table.wrk-opt', wrkOpt[i], 'fix');
			}
		});
		
//		getProjectInfo()
//			.then(function(result){
//				for(var i in result){
//					$('.ui.form').find('input[name="' + i + '"]').attr('value', result[i]);
//				}
//				
//				$('#rangestart').calendar({
//					type: 'date',
//					endCalendar: $('#rangeend'),
//					formatter: {
//						date: dateFunc
//					}
//				});
//				
//				$('#rangeend').calendar({
//					type: 'date',
//					startCalendar: $('#rangestart'),
//					formatter: {
//						date: dateFunc
//					}
//				});
//				
//				var wrkOpt = JSON.parse(result.wrkOpt);
//				for(var i in wrkOpt){
//					createTableRow('.table.wrk-opt', wrkOpt[i]);
//				}
//				
//				return getWorkerListByOrg();
//			})
//			.then(function(result){
//				for(var i in result){
//					WORKERS.push({
//						name: result[i].usrNm,
//						value: result[i].usrId
//					});
//				}
//				
//				$('.workers')
//					.dropdown({
//						clearable: true,
//						placeholder: '작업자 선택',
//						values: WORKERS
//					});
//				
//				return getWorkerListByPrjId();
//			})
//			.then(function(result){
//				var group = {};
//				var disableSelect = $('.ui.dropdown.workers.deselected');
//				disableSelect.dropdown('clear', true);
//				
//				for(var i in result){
//					disableSelect.dropdown('set selected', result[i].usrId);
//				}
//				
//				$('.segment.loading').removeClass('loading');
//			});
		
		getCopList()
			.then(function(result){
				var list = result.data;
				var values = [];
				
				for(var i in list){
					values.push({
						name: list[i].copNm,
						value: list[i].id
					});
					
					COPS[list[i].id] = {
						id: list[i].id,
						name: list[i].copNm
					}
				}
				
				$('.dropdown.cops').dropdown({
					clearable: false,
					placeholder: '업체 선택',
					values: values,
					onChange: function(value, text, $selectedItem) {
						var request = [];
						for(var i in value){
							if(!(COPS[value[i]].list instanceof Array)){
								request.push(value[i]);
							}
						}
						
						if(request.length){
							getWorkerListByOrg(request).then(function(result){
								for(var i in result){
									if(!COPS[result[i].orgCde].list){
										COPS[result[i].orgCde].list = [];
									}
									
									COPS[result[i].orgCde].list.push({
										name: result[i].usrNm,
										value: result[i].usrId,
										type: 'item'
									});
									
									copId = result[i].orgCde;
								}
								
								updateWorker(value);
							});
						} else {
							updateWorker(value);
						}
					},
					onLabelRemove: function(value){
						if(!$('.dropdown.cops').dropdown('get item', value).data('fix')){
							$('body').toast({
		                		title: '삭제 불가',
		    					class: 'error',
		    					message: '이미 등록된 업체 또는 작업자를 삭제할 수 없습니다'
		    				});
						}
						return !$('.dropdown.cops').dropdown('get item', value).data('fix');
					}
				});
				
				return getWorkerListByOrg();
			})
			.then(function(result){
				var copId;
				for(var i in result){
					if(!COPS[result[i].orgCde].list){
						COPS[result[i].orgCde].list = [];
					}
					
					COPS[result[i].orgCde].list.push({
						name: result[i].usrNm,
						value: result[i].usrId,
						type: 'item'
					});
					
					copId = result[i].orgCde;
				}
				
				var cops = [];
				var values = [];
				for(var i in COPS){
					if(COPS[i].list instanceof Array){
						if(COPS[i].list.length != 0){
							values.push({
								name: COPS[i].name,
								type: 'header',
								icon: 'tags'
							});
							
							WORKERS.push({
								name: COPS[i].name,
								type: 'header',
								icon: 'tags'
							});
							
							for(var j in COPS[i].list){
								values.push(COPS[i].list[j]);
								WORKERS.push(COPS[i].list[j]);
							}
						}
					}
					
					if(COPS[i].id != copId){
						cops.push({
							name: COPS[i].name,
							value: COPS[i].id
						});
					}
				}
				
				$('.dropdown.cops').dropdown('change values', cops);
				
				$('.dropdown.workers').dropdown({
					clearable: false,
					placeholder: '작업자 선택',
					values: values,
//					onChange: function(value, text, $selectedItem) {
//						console.log(value);
//					},
					onLabelSelect: function(label){
						if(FIXWORKERS[$(label).data('value')]){
							$('body').toast({
		                		title: '삭제 불가',
		    					class: 'error',
		    					message: '이미 등록된 업체 또는 작업자를 삭제할 수 없습니다'
		    				});
						}
					},
					onLabelRemove: function(value){
						return !FIXWORKERS[value];
					}
				});
				
				return getCopListByPrjId();
			})
			.then(function(result){
				var target = $('.dropdown.cops');
				
				var item;
				for(var i in result){
					item = target.dropdown('get item', result[i].id);
					item.data('fix', true);
					target.dropdown('set selected', result[i].id);
				}
				
				return getWorkerListByPrjId();
			}).then(function(result){
				var group = {};
				var target = $('.dropdown.workers');
				target.dropdown('clear', true);
				
				var item;
				for(var i in result){
					item = target.dropdown('get item', result[i].usrId);
					target.dropdown('set selected', result[i].usrId);
					
					FIXWORKERS[result[i].usrId] = result[i].usrNm;
				}
				
				$('.segment.loading').removeClass('loading');
			});
	});
}(jQuery));
