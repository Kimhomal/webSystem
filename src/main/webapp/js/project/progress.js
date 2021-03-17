(function($){
	var VECTORLAYER, SOURCE;
	var FEATURETEMP = {};
	var PRJID = undefined;
	
	function getProjectList() {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getProjectList.json',
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
	
	function getProjectProgress(data) {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getProjectProgress.json',
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
					var result = responseData.result;
					var opt = responseData.info.wrkOpt;
					var parseOpt = JSON.parse(opt);
					
					for(var i in parseOpt){
						for(var j in result){
							if(result[j].optKey === parseOpt[i].key){
								result[j].unit = parseOpt[i].unit;
								result[j].title = parseOpt[i].title;
								result[j].goal = parseOpt[i].goal;
							}
						}
					}
					
					resolve(result);
				}
			});
		});
	}
	
	function getWorkProgressByPid(pid) {
		var prjId = pid || 0;
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getWorkProgressByPid.json',
				type: 'POST',
				data: {
					prjId: prjId
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
					var result = responseData.result;
					resolve(result);
				}
			});
		});
	}
	
	function getWorkerListByPrjId(pid) {
		return new Promise(function(resolve, reject){
			$.ajax({
				url: gp.ctxPath + '/project/getWorkerListByPrjId.json',
				type: 'POST',
				data: {
					prjId: pid || 0
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
	
	function dateFunc(date, settings){
		if(!date) return;
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		return year + '/' + month + '/' + day;
	}
	
	function createProjectCard(params){
		var a = params || {};
		
		var card = $('<div class="ui raised link card">');
		var html = '';
		html += '<div class="content">';
		html += '<div class="header">' + a.prjNm + '</div>';
		html += '</div>';
		
		html += '<div class="content">';
		html += '<table class="ui very basic celled table">';
		html += '<tbody>';
		
		html += '<tr>';
		html += '<td>작업지역</td>';
		html += '<td>' + a.prjAdr + '</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td>시작날짜</td>';
		html += '<td>' + a.strDt + '</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td>완료날짜</td>';
		html += '<td>' + a.endDt + '</td>';
		html += '</tr>';
		
		html += '</tbody>';
		html += '</table>';
		html += '</div>';
		
		card.append(html);
		return card;
	}
	
	function activeSubDiv(bool){
		var main = $('.progress-main');
		var sub = $('.progress-sub');
		
		if(bool){
			main.hide();
			sub.show();
		} else {
			sub.hide();
			main.show();
		}
	}
	
	function createProgressDiv(params){
		var p = params || {};
		var chartId = p.chartId || '';
		var chart = $('<div id="chart-' + chartId + '">').css('height', '300px');
		var label = $('<div class="ui top attached large label">').text(p.title);
		var segment = $('<div class="ui raised segment">').append(label).append(chart);
		var div = $('<div class="column">').append(segment);
		
		$('.progress-list').append(div);
		
		params.target = 'chart-' + chartId;
		createProgressChart(params);
	}
	
	function createProgressChart(params){
		var p = params || {};
		var title = p.title || '진행률';
		var target = p.target || 'chartDiv';
		var unit = p.unit || 'km';
		var full = p.totWrk ? parseInt(p.totWrk) : 100;
		var value = p.prgWrk ? parseInt(p.prgWrk) : 0;
		var percent = value/full*100;
		
		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end

		// Create chart instance
		var chart = am4core.create(target, am4charts.RadarChart);

		// Add data
		chart.data = [{
		  'category': '현재작업량',
		  'value': value,
		  'full': full
		}];

		// Make chart not full circle
		chart.startAngle = -90;
		chart.endAngle = 180;
		chart.innerRadius = am4core.percent(20);

		// Set number format
		chart.numberFormatter.numberFormat = '#' + unit;

		// Create axes
		var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = 'category';
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.grid.template.strokeOpacity = 0;
		categoryAxis.renderer.labels.template.disabled = true;
//		categoryAxis.renderer.labels.template.horizontalCenter = 'right';
//		categoryAxis.renderer.labels.template.fontWeight = 500;
//		categoryAxis.renderer.labels.template.adapter.add('fill', function(fill, target) {
//		  return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
//		});
		categoryAxis.renderer.minGridDistance = 10;

		var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
		valueAxis.renderer.grid.template.strokeOpacity = 0;
		valueAxis.min = 0;
		valueAxis.max = full;
		valueAxis.strictMinMax = true;

		// Create series
		var series1 = chart.series.push(new am4charts.RadarColumnSeries());
		series1.dataFields.valueX = 'full';
		series1.dataFields.categoryY = 'category';
		series1.clustered = false;
		series1.columns.template.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground');
		series1.columns.template.fillOpacity = 0.08;
		series1.columns.template.cornerRadiusTopLeft = 20;
		series1.columns.template.strokeWidth = 0;
		series1.columns.template.tooltipText = '총작업량: [bold]{full}[/]';

		var series2 = chart.series.push(new am4charts.RadarColumnSeries());
		series2.dataFields.valueX = 'value';
		series2.dataFields.categoryY = 'category';
		series2.clustered = false;
		series2.columns.template.strokeWidth = 0;
		series2.columns.template.tooltipText = '{category}: [bold]{value}[/]';

		series2.columns.template.adapter.add('fill', function(fill, target) {
		  return chart.colors.getIndex(target.dataItem.index);
		});

		var yearLabel = chart.radarContainer.createChild(am4core.Label);
		yearLabel.text = Math.floor(percent) + '%';
		yearLabel.fontSize = 15;
		yearLabel.horizontalCenter = 'middle';
		yearLabel.verticalCenter = 'middle';
		
//		var popTitle = chart.titles.create();
//		popTitle.text = title;
//		popTitle.fontSize = 15;
	}
	
	function createWorkMap(list){
		$('#workMap').empty();
		
		var workMap = new MapMaker('workMap', {
			interactions: {mouseWheelZoom: false}
		}); // 기본셋팅 및 맵 객체, 배경지도 추가
		
		var fill = new ol.style.Fill({
			color: 'rgba(0, 0, 255, 0.8)',
		});
		
		var stroke = new ol.style.Stroke({
			color: 'rgba(255, 204, 0, 0.2)',
			width: 1,
		});
		
		var textFill = new ol.style.Fill({
			color: '#fff',
		});
		
		var textStroke = new ol.style.Stroke({
			color: 'rgba(0, 0, 0, 0.6)',
			width: 3,
		});
		
		var invisibleFill = new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.01)',
		});
		
		function featureStyle(feature) {
			return new ol.style.Style({
				geometry: feature.getGeometry(),
				image: new ol.style.RegularShape({
					radius1: 15,
					radius2: 5,
					points: 5,
					angle: Math.PI,
					fill: fill,
					stroke: stroke,
				})
			});
		}
		
		var maxFeatureCount;
		var vector = null;
		var calculateClusterInfo = function (resolution) {
			maxFeatureCount = 0;
			var features = vector.getSource().getFeatures();
			var feature, radius;
			for (var i = features.length - 1; i >= 0; --i) {
				feature = features[i];
				var originalFeatures = feature.get('features');
				var extent = ol.extent.createEmpty();
				var j = (void 0), jj = (void 0);
				for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
					ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
				}
				maxFeatureCount = Math.max(maxFeatureCount, jj);
				radius = (0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent))) / resolution;
				feature.set('radius', radius);
			}
		}
		
		var currentResolution;
		function styleFunction(feature, resolution) {
			if (resolution != currentResolution) {
				calculateClusterInfo(resolution);
				currentResolution = resolution;
			}
			
			var style;
			var size = feature.get('features').length;
			if (size > 1) {
				style = new ol.style.Style({
					image: new ol.style.Circle({
						radius: feature.get('radius'),
						fill: new ol.style.Fill({
							color: [0, 0, 255, Math.min(0.8, 0.4 + size / maxFeatureCount)],
						}),
					}),
					text: new ol.style.Text({
						text: size.toString(),
						fill: textFill,
						stroke: textStroke,
						scale: 2
					}),
				})
			} else {
				var originalFeature = feature.get('features')[0];
				style = featureStyle(originalFeature);
			}
			
			return style;
		}
		
		function selectStyleFunction(feature) {
			var styles = [
				new ol.style.Style({
					image: new ol.style.Circle({
						radius: feature.get('radius'),
						fill: invisibleFill,
					}),
				})
			];
			
			var originalFeatures = feature.get('features');
			var originalFeature;
			for (var i = originalFeatures.length - 1; i >= 0; --i) {
				originalFeature = originalFeatures[i];
				styles.push(featureStyle(originalFeature));
			}
			
			return styles;
		}
		
		var vectorSource = SOURCE = new ol.source.Vector();
		
		vector = VECTORLAYER = new ol.layer.Vector({
			source: new ol.source.Cluster({
				distance: 40,
				source: vectorSource,
			}),
			style: styleFunction,
		});
		
		var format = new ol.format.WKT();
		var feature, geom;
		for(var i in list){
			if(!list[i].geom){
				continue;
			}
			geom = format.readGeometryFromText(list[i].geometry);
			if(geom instanceof ol.geom.Point){
				feature = new ol.Feature({
					geometry: geom,
					wrkId: list[i].wrkId,
//					optKey: list[i].optKey,
//					optVal: list[i].optVal,
					rstId: list[i].rstId,
					regDt: list[i].regDt,
					uptDt: list[i].uptDt
				});
				
				vectorSource.addFeature(feature);
			}
		}
		
		vector.setMap(workMap.map);
		workMap.map.getView().fit(vectorSource.getExtent(), workMap.map.getSize());
		workMap.map.addInteraction(new ol.interaction.Select({
			condition: function(evt){
				return evt.type == 'pointermove' || evt.type == 'singleclick'; 
			},
			style: selectStyleFunction,
		}));
	}
	
	function getProjectProgressPromise(result){
		console.log(result);
		var total = 0;
		var prgTotal = 0;
		
		am4core.disposeAllCharts();
		$('.progress-list').empty();
		
		for(var i in result){
			prgTotal += result[i].sum;
			
			total += parseInt(result[i].goal);
			createProgressDiv({
				chartId: result[i].optKey,
				unit: result[i].unit,
				title: result[i].title,
				totWrk: result[i].goal,
				prgWrk: result[i].sum
			});
		}
		
		$('.total-work').text(total);
		$('.current-work').text(prgTotal);
		
//		createProgressChart({
//			totWrk: total,
//			prgWrk: prgTotal,
//			title: '총 진행률'
//		});
		
		$('.progress-sub .ui.segment').removeClass('loading');
	}
	
	function progressFilterUpdate(){
		var workers = $('.dropdown.workers-filter').dropdown('get value');
		var str = $('#startFilter').calendar('get date');
		var end = $('#endFilter').calendar('get date');
		var data = {};
		
		if(workers instanceof Array){
			data.workers = workers.join(',');
		}
		
		if(str){
			data.strDt = moment(str).format('YYYY-MM-DD');
		}
		
		if(end){
			data.endDt = moment(end).format('YYYY-MM-DD');
		}
		
		data.prjId = PRJID;
		
		console.log(data);
		
		getProjectProgress(data)
			.then(getProjectProgressPromise);
	}
	
	$(document).ready(function(){
		
		// 프로젝트 목록 불러오기
		getProjectList().then(function(result){
			var target, card;
			for(var i in result){
				if(result[i].prjSta === 'STA01'){
					target = $('.progress-project');
					target.find('.ui.wireframe.image').remove();
				} else if(result[i].prjSta === 'STA02'){
					target = $('.complete-project');
					target.find('.ui.wireframe.image').remove();
				}
				
				card = createProjectCard(result[i]);
				target.append(card);
				
				card.data('pid', result[i].prjId);
				card.data('str', result[i].strDt);
				card.data('end', result[i].endDt);
				card.data('title', result[i].prjNm);
				card.data('opt', result[i].wrkOpt);
				
				// 프로젝트별 카드 형식 DIV 생성(클릭 시 상세 페이지 이동)
				card.click(function(e){
					$('.progress-sub .ui.segment').addClass('loading');
					activeSubDiv(true);
					var pid  = PRJID = $(this).data('pid');
					var str = $(this).data('str');
					var end = $(this).data('end');
					var title = $(this).data('title');
					var opt = $(this).data('opt');
					
					getProjectProgress({prjId: pid}).then(function(result){
						var obj = JSON.parse(opt);
						var total = 0;
						var prgTotal = 0;
						
						am4core.disposeAllCharts();
						$('.progress-list').empty();
						
						for(var i in result){
							prgTotal += result[i].sum;
							
							for(var j in obj){
								if(obj[j].key === result[i].optKey){
									total += parseInt(obj[j].goal);
									createProgressDiv({
										chartId: result[i].optKey,
										unit: result[i].unit,
										title: obj[j].title,
										totWrk: obj[j].goal,
										prgWrk: result[i].sum
									});
								}
							}
						}
						
						$('.total-work').text(total);
						$('.current-work').text(prgTotal);
						
//						createProgressChart({
//							totWrk: total,
//							prgWrk: prgTotal,
//							title: '총 진행률'
//						});
						
						$('.progress-sub .ui.segment').removeClass('loading');
						
						return getWorkProgressByPid(pid);
					}).then(function(result){
						console.log(result);
						createWorkMap(result);
					})
					
					$('.start-date').text(str);
					$('.end-date').text(end);
					$('.project-name').text(title);
					
					// 프로젝트 참여 인력 불러오기
					getWorkerListByPrjId(pid).then(function(result){
						var values = [];
						for(var i in result){
							values.push({
								name: result[i].usrNm,
								value: result[i].wrkId
							});
						}
						
						// 작업자 필터 생성
						$('.dropdown.workers').dropdown({
							clearable: true,
							placeholder: '작업자 선택',
							values: values,
							onChange: function(value, text, $selectedItem) {
								console.log(value + '/' + text + '/' + $selectedItem);
								
								for(var i in FEATURETEMP){
									if(FEATURETEMP[i].length){
										if(!value.length || value.includes(i)){
											SOURCE.addFeatures(FEATURETEMP[i]);
											FEATURETEMP[i] = [];
										}
									}
								}
								
								if(value.length){
									SOURCE.forEachFeature(function(item){
										var wrkId = item.get('wrkId') ? item.get('wrkId').toString() : '';
										if(!value.includes(wrkId)){
											if(!FEATURETEMP[wrkId]){
												FEATURETEMP[wrkId] = [];
											}
											
											FEATURETEMP[wrkId].push(item);
											SOURCE.removeFeature(item);
										}
									});
								}
							}
						});
						
						// 작업자 필터 생성
						$('.dropdown.workers-filter').dropdown('change values', values);
					});
				});
			}
		});
		
		// 업무 지도 시작 날짜 필터 생성
		$('#rangestart').calendar({
			type: 'date',
			endCalendar: $('#rangeend'),
			formatter: {
				date: dateFunc
			},
			onChange: function(value, text, $selectedItem){
				var endDate = $('#rangeend').calendar('get date');
				
				for(var i in FEATURETEMP){
					// 날짜 형식 체크
					if(moment(i, 'YYYY-MM-DD HH:mm:ss', true).isValid()){
						if(FEATURETEMP[i].length && value){
							var before = moment(value).isBefore(i); // 
							var same = moment(moment(value).format('YYYY-MM-DD')).isSame(i);
							var after, afterSame;
							
							if(before || same){
								if(endDate){
									after = moment(endDate).isAfter(i);
									afterSame = moment(moment(endDate).format('YYYY-MM-DD')).isSame(i);
									if(after || afterSame){
										SOURCE.addFeatures(FEATURETEMP[i]);
										FEATURETEMP[i] = [];
									}
								} else {
									SOURCE.addFeatures(FEATURETEMP[i]);
									FEATURETEMP[i] = [];
								}
							}
						}
					}
				}
				
				if(value){
					SOURCE.forEachFeature(function(item){
						var regDt = item.get('regDt') ? item.get('regDt').toString() : '';
						var isRemove = false;
						
						var before = moment(value).isBefore(regDt);
						var same = moment(moment(value).format('YYYY-MM-DD')).isSame(regDt)
						var after, afterSame;
						
						if(!before && !same){
							isRemove = true;
						} else {
							if(endDate){
								after = moment(endDate).isAfter(regDt);
								afterSame = moment(moment(endDate).format('YYYY-MM-DD')).isSame(regDt);
								if(!after && !afterSame){
									isRemove = true;
								}
							}
						}
						
						if(isRemove){
							if(!FEATURETEMP[regDt]){
								FEATURETEMP[regDt] = [];
							}
							
							FEATURETEMP[regDt].push(item);
							SOURCE.removeFeature(item);
						}
					});
				}
			}
		});
		
		// 업무 지도 완료 날짜 필터 생성
		$('#rangeend').calendar({
			type: 'date',
			startCalendar: $('#rangestart'),
			formatter: {
				date: dateFunc
			},
			onChange: function(value, text, $selectedItem){
				var startDate = $('#rangestart').calendar('get date');
				
				for(var i in FEATURETEMP){
					// 날짜 형식 체크
					if(moment(i, 'YYYY-MM-DD HH:mm:ss', true).isValid()){
						if(FEATURETEMP[i].length && value){
							var after = moment(value).isAfter(i);
							var same = moment(moment(value).format('YYYY-MM-DD')).isSame(i);
							var before, beforeSame;
							
							if(after || same){
								if(startDate){
									before = moment(startDate).isBefore(i);
									beforeSame = moment(moment(startDate).format('YYYY-MM-DD')).isSame(i);
									if(before || beforeSame){
										SOURCE.addFeatures(FEATURETEMP[i]);
										FEATURETEMP[i] = [];
									}
								} else {
									SOURCE.addFeatures(FEATURETEMP[i]);
									FEATURETEMP[i] = [];
								}
							}
						}
					}
				}
				
				if(value){
					SOURCE.forEachFeature(function(item){
						var regDt = item.get('regDt') ? item.get('regDt').toString() : '';
						var isRemove = false;
						
						var after = moment(value).isAfter(regDt); // 설정한 날짜가 작업 날짜보다 뒤인가?
						var same = moment(moment(value).format('YYYY-MM-DD')).isSame(regDt); // 설정한 날짜와 작업 날짜가 같은가?
						var before, beforeSame;
						
						if(!after && !same){
							// 작업 날짜가 설정한 날짜보다 클 때 데이터 삭제
							isRemove = true;
						} else {
							if(startDate){
								before = moment(startDate).isBefore(regDt);
								beforeSame = moment(moment(startDate).format('YYYY-MM-DD')).isSame(regDt);
								if(!before && !beforeSame){
									isRemove = true;
								}
							}
						}
						
						if(isRemove){
							if(!FEATURETEMP[regDt]){
								FEATURETEMP[regDt] = [];
							}
							
							FEATURETEMP[regDt].push(item);
							SOURCE.removeFeature(item);
						}
					});
				}
			}
		});
		
		// 작업자 필터 생성
		$('.dropdown.workers-filter').dropdown({
			clearable: true,
			placeholder: '작업자 선택',
			values: [],
			onChange: function(value, text, $selectedItem) {
				progressFilterUpdate();
			}
		});
		
		// 업무 지도 시작 날짜 필터 생성
		$('#startFilter').calendar({
			type: 'date',
			endCalendar: $('#endFilter'),
			formatter: {
				date: dateFunc
			},
			onChange: function(value, text, $selectedItem){
				progressFilterUpdate();
			}
		});
		
		// 업무 지도 완료 날짜 필터 생성
		$('#endFilter').calendar({
			type: 'date',
			startCalendar: $('#startFilter'),
			formatter: {
				date: dateFunc
			},
			onChange: function(value, text, $selectedItem){
				progressFilterUpdate();
			}
		});
		
		$('.back-to-list').click(function(){
			activeSubDiv(false);
		});
	});
}(jQuery));