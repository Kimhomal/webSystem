(function($){
	var COPS = {};
	var WORKERS = [];
	var OPTIONS = undefined;
	
	function getWorkerList(org) {
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
					icon: 'tags',
					divider: 'divider'
				});
				
				for(var j in COPS[orgs[i]].list){
					list.push(COPS[orgs[i]].list[j]);
				}
			}
		}
		
		$('.dropdown.workers').dropdown('change values', list);
	}
//	function createDetail(){
//		var fields = [{text:'측량',value:'survey'}, {text:'정위치',value:'exact'}, {text:'구조화',value:'struct'}];
//		var workers = ['김호철', '이재호', '김주영', '김한봄', '윤병석'];
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
//		var field, label, inputWrap, basic, input, select;
//		
//		for(var i in fields){
//			input = $('<input type="number" data-value="' + fields[i].value + '" name="' + fields[i].value + detailLength + '" placeholder="000km">');
//			basic = $('<div class="ui basic label">').text('km');
//			inputWrap = $('<div class="ui right labeled input">').append(input).append(basic);
//			label = $('<label>').text(fields[i].text);
//			field = $('<div class="five wide field">').append(label).append(inputWrap);
//			workDiv.append(field);
//		}
//		
//		var itag = $('<i class="calendar icon">');
//		var dateInput = $('<input type="text" placeholder="날짜선택" data-value="strDt">');
//		var dateIcon = $('<div class="ui input left icon">').append(itag).append(dateInput);
//		var calendarStr = $('<div class="ui calendar rangestart">').append(dateIcon);
//		var label = $('<label>').text('시작');
//		var dateField = $('<div class="field">').append(label).append(calendarStr);
//		dateDiv.append(dateField);
//		
//		itag = $('<i class="calendar icon">');
//		dateInput = $('<input type="text" placeholder="날짜선택" data-value="endDt">');
//		dateIcon = $('<div class="ui input left icon">').append(itag).append(dateInput);
//		var calendarEnd = $('<div class="ui calendar rangeend">').append(dateIcon);
//		label = $('<label>').text('완료');
//		dateField = $('<div class="field">').append(label).append(calendarEnd);
//		dateDiv.append(dateField);
//		
//		
//		select = $('<select class="ui fluid dropdown workers" multiple="">');
//		
//		label = $('<label>').text('작업자');
//		
//		workersDiv.append(label).append(select);
//		segment.append(closeDiv).append(workDiv).append(dateDiv).append(workersDiv);
//		target.append(segment);
//		
//		select.dropdown({
//			clearable: true,
//			placeholder: '작업자 선택',
//			values: WORKERS
//		});
//		
//		closeDiv.click(function(){
//			$(this).parent().remove();
//		});
//		
//		calendarStr.calendar({
//			type: 'date',
//			endCalendar: calendarEnd,
//			formatter: {
//				date: dateFunc
//			}
//		});
//		
//		calendarEnd.calendar({
//			type: 'date',
//			startCalendar: calendarStr,
//			formatter: {
//				date: dateFunc
//			}
//		});
//	}
	
	$(document).ready(function(){
		getCopList().then(function(result){
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
				clearable: true,
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
						getWorkerList(request).then(function(result){
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
				}
			});
			
			return getWorkerList();
		}).then(function(result){
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
							icon: 'tags',
							divider: 'divider'
						});
						
						WORKERS.push({
							name: COPS[i].name,
							type: 'header',
							icon: 'tags',
							divider: 'divider'
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
				clearable: true,
				placeholder: '작업자 선택',
				values: values
			});
		});
		
		$('.ui.form').form({
			fields: {
				prjNm: {
					identifier: 'prjNm',
					rules : [ {
						type : 'empty',
						prompt : '프로젝트명을 입력해주세요'
					}]
				},
				prjAdr : {
					identifier : 'prjAdr',
					rules : [ {
						type : 'empty',
						prompt : '작업지역을 입력해주세요'
					}]
				},
				strDt : {
					identifier : 'strDt',
					rules : [ {
						type : 'empty',
						prompt : '프로젝트 시작날짜를 입력해주세요'
					}]
				},
				endDt : {
					identifier : 'endDt',
					rules : [ {
						type : 'empty',
						prompt : '프로젝트 완료날짜를 입력해주세요'
					}]
				},
				/*totWrk : {
					identifier : 'totWrk',
					rules : [ {
						type : 'empty',
						prompt : '총 작업량을 입력해주세요'
					}, {
						type : 'integer',
						prompt : '정수 형식으로 입력해주세요 (ex. 102)'
					}]
				},*/
				cops: {
					identifier : 'cops'
				},
				workers : {
					identifier : 'workers',
					rules : [ {
						type : 'empty',
						prompt : '작업자를 지정해주세요'
					}]
				}
			},
			inline: true,
			keyboardShortcuts: false
		}).form('set values', {
			prjNm: 'test',
			prjAdr: '분당',
			strDt: '2020/10/3',
			endDt: '2020/10/30',
			//totWrk: '123',
			workers: ['0']
		});
		
		$('.ui.button.add-work').click(function(e){
			var table = $(this).closest('.ui.table');
			var tbody = table.find('tbody');
			
			var trash = $('<i class="trash icon">').click(function(e){
				$(this).closest('tr').remove();
			});
			var td1 = $('<td class="collapsing">').append(trash);
			
			var options = $('<select class="ui fluid selection dropdown">');
			var td2 = $('<td>').append(options);
			
			var goal = $('<input type="number" data-val="goal">');
			var td3 = $('<td>').append(goal);
			
			var unit = $('<input class="transparent" type="text" data-val="unit" readonly>');
			var td4 = $('<td>').append(unit);
			
			var tr = $('<tr>').append(td1).append(td2).append(td3).append(td4);
			tbody.append(tr);
			
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
		});
		
		$('.ui.button.create-project').click(function(e){
			if($('.ui.form').form('validate form')){
				$('.ui.form').ajaxSubmit( {
		            url				: gp.ctxPath + '/project/create.json',
		            type			: 'post',
		            dataType		: 'json',
		            success			: function(json) {
		                if(json.respFlag == 'Y'){
		                    alert('정상적으로 생성되었습니다.');
		                    location.href = gp.ctxPath + '/project/list.do';
		                } else {
		                    alert("오류발생, 다시 시도하여 주십시오");
		                }
		            },
		            beforeSubmit: function(formData, jqForm, options){
						// Submit 전 작업 수행
						console.log(formData);
						
						// ------------- 업체 목록 요청에 담기 -------------
						var selectCop = $('.ui.form').form('get field', 'cops');
						var cops = [];
						
						selectCop.each(function(i, e){
							cops = $(this).dropdown('get value');
						});
						
						formData.push({name: 'cops', value: cops, type: 'text', required: false});
						// ------------------------------------------
						
						// ------------- 작업자 목록 요청에 담기 -------------
						var selectWorkers = $('.ui.form').form('get field', 'workers');
						var workers = [];
						
						selectWorkers.each(function(i, e){
							workers = $(this).dropdown('get value');
						});
						
						formData.push({name: 'workers', value: workers, type: 'text', required: false});
						// -------------------------------------------
						
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
							
							
//							inputs.each(function(i, e){
//								var input = $(this);
//								var key = input.data('val');
//								var value = input.val();
//								
//								temp[key] = value;
//							});
							
							jsonb.push(temp);
							
							
						});
						
						formData.push({name: 'wrkOpt', value: JSON.stringify(jsonb), type: 'text', required: false});
						
//						var details = [];
//						$('.container.detail > .segment').each(function(i, e){
//							var inputs  = $(e).find('input');
//							var select = $(e).find('select');
//							var detail = {};
//							var workers = [];
//							
//							select.each(function(i, e){
//								var options = e.selectedOptions;
//								options.forEach(function(item){
//									workers.push(item.value);
//								});
//							});
//							
//							inputs.each(function(i, e){
//								var input = $(e);
//								detail[input.data('value')] = input.val() || '0';
//							});
//							
//							detail.workers = workers;
//							details.push(detail);
//						});
//						
// 						formData.push({name: 'detail', value: JSON.stringify(details), type: 'text', required: false});
					},
		            error : function(response) {
		                alert("오류발생, 다시 시도하여 주십시오");
		            }
		        });
			}
		});
		
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
		
		getOptions().then(function(res){
			var values = [];
			
			for(var i in res){
				values.push({
					name: res[i].name,
					value: res[i].id,
					unit: res[i].unit
				});
			}
			
			OPTIONS = values;
			
			$('.wrk-opt .dropdown').dropdown({
				placeholder: '작업 선택',
				values: values,
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
		})
//		$(document).on('change', '.ui.dropdown.workers:not(.disabled)', function(){
//			var disableSelect = $('.ui.disabled.dropdown.workers');
//			disableSelect.dropdown('clear', true);
//			
//			var arr = $('.ui.dropdown.workers:not(.disabled)').dropdown('get value');
//			for(var i in arr){
//				disableSelect.dropdown('set selected', arr[i]);
//			}
//		});
//		
//		$(document).on('change keyup', '.ui.detail .ui.segment .works input',function(){
//			var works = $('.ui.detail .ui.segment .works input');
//			var v, total = 0;
//			works.each(function(i, e){
//				v = $(e).val();
//				total += parseFloat(v || 0);
//			});
//			
//			$('.ui.form').form('set values', {
//				totWrk: total
//			});
//		});
	});
}(jQuery));