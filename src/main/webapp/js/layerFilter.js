(function(window, $) {
	'use strict';

	var DATABASE = 'gb';
	var GEOSERVERURL = gp.proxyPath + 'http://175.116.181.151:8062/geoserver';
	// var WFSURL = GEOSERVERURL + '/' + DATABASE + '/wfs';
	var WFSURL = gp.proxyPath + "http://175.116.181.151:8062/geoserver/gb/wfs";
	var GETLEGENDGRAPHIC = '/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=';
	var GETCAPABILITIES = '/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
	var layerFilter = function(options) {
		var that = this;
		var opt = options || {};
		var elementId = opt.elementId || 'layerTree';

		this.map_ = opt.map;
		if (!(this.map_ instanceof ol.Map)) {
			console
					.error("git.LayerFilter: 'map' is a required field.");
			return;
		}

		// 레이어 라벨 이력 관리
		this.labelHistory_ = {};
		
		// setEventTree(this.map_);

		this.jstree_ = undefined;
		
		setTree().then(function(result) {
			$('#' + elementId)
				.jstree({
					"core" : {
						"animation" : 0,
						"check_callback" : true,
						"themes" : {
							"name" : "proton",
							"responsive": true
						},
						"dblclick_toggle" : false,
						"data": result
					},
					"checkbox": {
						"keep_selected_style": false,
						"whole_node" : false,
						"tie_selection" : false
					},
					"types" : {
						"#" : {
							"max_depth" : 4,
							"valid_children" : ["root"]
						},
						"root" : {
							"valid_children" : ["default", "node"]
						},
						"default" : {
							"valid_children" : ["default", "node"]
						},
						"node" : {
							"valid_children" : []
						}
					},
					"plugins" : ["types", "checkbox"]
				})
				/*.bind("ready.jstree", function(e, data){
				 * console.log(e);
				})*/
				.on("after_open.jstree", function(e, data){
					// 레이어 노드 로드 완료 시 실행 함수
					// 라벨 선택자 생성, 라벨 이력 적용, 썸네일 생성
					var inst = data.instance;
					var type = data.node.type;
					var children = data.node.children;
					var node;
					if(type === 'root'){
						for(var i in children){
							if(!($('#' + children[i] + '_selectbox').length)){
								node = inst.get_node(children[i]);
								
								setLabelList(children[i]).then(function(result){
									var html = '';
									var select = $('#' + result.id);
									var features = result.features;
									var items = [{
										name: '라벨없음',
										value: 'none'
									}];
									var props;
									
									html += '<div id="' + result.id + '_selectbox" class="ui scrolling dropdown" style="margin-left:2em;">';
									html += '<div class="text"></div>';
									html += '<i class="dropdown icon"></i>';
									html += '</div>';
									select.append(html);
									
									for(var i in features){
										props = features[i].properties;
										for(var j in props){
											items.push({
												name: j,
												value: j,
												selected: j === that.labelHistory_[result.id] ? true : false
											});
										}
									}
									
									$('#' + result.id + '_selectbox').dropdown({placeholder: '라벨선택', values: items, onChange: function(value, text, $selectedItem){
										var map = that.map_;
										var id = $(this).attr('id').replace(/_selectbox$/i, '');
										var layers = map.getLayers().getArray();
										var layer = null;
										
										$.each(layers, function(idx, lyr){
											if(lyr.get("id") == id) {
												layer = lyr;
												return false;
											}
										});
										
										if(layer){
											var type;
											if(id.match(/_ps$/i) !== null){
												type = 'point';
											} else if(id.match(/_ls|_lm$/i) !== null){
												type = 'line';
											} else if(id.match(/as$/i) !== null){
												type = 'polygon';
											} else {
												type = 'point';
											}
											
											
											var sld = createSLD({
												layer: id,
												label: value,
												type: type
											});
											
											var source = layer.getSource();
											source.updateParams({
												VERSION : '1.1.0',
//												QUERY_LAYERS: lyrName,
												FORMAT : "image/png",
												SLD_BODY: value === 'none' ? undefined : sld});
											
											that.labelHistory_[id] = value;
										}
									}});
								});
							}
						}
					}
				})
				.on("select_node.jstree", function(e, data){
					var node = data.node;
					var id = node.id;
					
					var map = that.map_;
					var view = map.getView();
					var layers = map.getLayers().getArray();
					var layer = null;
					
					$.each(layers, function(idx, lyr){
						if(lyr.get("id") == id) {
							layer = lyr;
							return false;
						}
					});
					
					var extent;
					
					if(layer instanceof ol.layer.Tile){
						extent = layer.getExtent();
						if(extent instanceof Array){
							view.fit(extent);
						} else {
							fetch(GEOSERVERURL + GETCAPABILITIES)
								.then(function(response) {
									return response.text();
								}).then(function(text) {
									var parser = new ol.format.WMSCapabilities();
						            var result = parser.read(text);
						            result.Capability.Layer.Layer.forEach(function(item, index){
										if(id == item.Title) {
							            	var extent = item.EX_GeographicBoundingBox;
							            	var trans_extent = ol.proj.transformExtent(extent, 'EPSG:4326', layer.getSource().getProjection().getCode());
								            view.fit(trans_extent);
											return false;
										}
//						            	$.each(layers, function(idx, lyr){
//											if(lyr.get("id") == item.Title) {
//												lyr.setExtent(trans_extent);
//												return false;
//											}
//										});
						            });
						            
//						            view.fit(layer.getExtent());
								});
						}
					}
				})
				.on("check_node.jstree uncheck_node.jstree", function(e, data){
					var id = data.node.id;
					var children = data.node.children;
					var layers = that.map_.getLayers().getArray();
					var layer = layers.find(function(item){
						return item.get('id') === id;
					});
					var tempNode = undefined;
					
					if(layer instanceof ol.layer.Layer){
						layer.setVisible(data.node.state.checked);
					}
					
					for(var i in children){
						layer = layers.find(function(item){
							return item.get('id') === children[i];
						});
						
						if(layer instanceof ol.layer.Layer){
							layer.setVisible(data.node.state.checked);
						}
					}
				});
			
			that.jstree_ = $('#' + elementId).jstree(true);
		});
		
		// document.querySelectorAll('#searchModalPage
		// ons-switch').forEach(function(item){
		// item.addEventListener('change', function(e){
		// console.log(e);
		// e.stopImmediatePropagation();
		// e.stopPropagation();
		// e.preventDefault();
		// var checked = this.checked;
		//				
		// var boxes;
		// if(this.className.includes('layer-swl')){
		// boxes = document.querySelectorAll('.swl-checkbox');
		// } else if(this.className.includes('layer-wtl')){
		// boxes = document.querySelectorAll('.wtl-checkbox');
		// } else if(this.className.includes('layer-rdl')){
		// boxes = document.querySelectorAll('.rdl-checkbox');
		// } else if(this.className.includes('layer-etc')){
		// boxes = document.querySelectorAll('.etc-checkbox');
		// } else {
		// boxes = document.querySelectorAll('.swl-checkbox');
		// }
		//				
		// boxes.forEach(function(i){
		// i.checked = checked;
		// });
		// });
		// });
		
//		$(document).on('change', '', function(e){
//			var sld = createSLD({
//				layer: id,
//				label: val,
//				type: type
//			});
//			
//			source = layers[i].getSource();
//			source.updateParams({
//				VERSION : '1.1.0',
//				FORMAT : "image/png",
//				SLD_BODY: val === 'none' ? undefined : sld});
//		})
	}

	function createSLD(options) {
		var type = options.type || 'point';
		var stroke = options.stroke || '#ff00ff';
		var strokeWidth = options.strokeWidth || '1';
		var fill = options.fill || '#FF00FF';
		var fillOpacity = options.fillOpacity || '0.2';
		var label = options.label || '';

		var sld = '';
		sld += '<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
		sld += '<NamedLayer>';
		sld += '<Name>gb:' + options.layer + '</Name>';
		sld += '<UserStyle>';
		sld += '<Title>Default Point</Title>';
		sld += '<Abstract>A sample style that draws a point</Abstract>';
		sld += '<FeatureTypeStyle>';
		sld += '<Rule>';
		// sld += '<Name>wtl_pipe_ps</Name>';
		// sld += '<Title>wtl_pipe_ps</Title>';

		if (type === 'point') {
			sld += '<PointSymbolizer>';
			sld += '<Graphic>';
			sld += '<Mark>';
			sld += '<WellKnownName>circle</WellKnownName>';
			sld += '<Fill><CssParameter name="fill">#FF0000</CssParameter></Fill>';
			sld += '</Mark>';
			sld += '<Size>6</Size>';
			sld += '</Graphic>';
			sld += '</PointSymbolizer>';
		} else if (type === 'line') {
			sld += '<LineSymbolizer>';
			sld += '<Stroke>';
			sld += '<CssParameter name="stroke">#ff00ff</CssParameter>';
			sld += '<CssParameter name="stroke-width">2</CssParameter>';
			sld += '</Stroke>';
			sld += '</LineSymbolizer>';
		} else if (type === 'polygon') {
			sld += '<PolygonSymbolizer>';
			sld += '<Fill>';
			sld += '<CssParameter name="fill">#FF00FF</CssParameter>';
			sld += '<CssParameter name="fill-opacity">0.2</CssParameter>';
			sld += '</Fill>';
			sld += '<Stroke>';
			sld += '<CssParameter name="stroke">#FF00FF</CssParameter>';
			sld += '<CssParameter name="stroke-width">1</CssParameter>';
			sld += '</Stroke>';
			sld += '</PolygonSymbolizer>';
		}

		if (label) {
			sld += '<TextSymbolizer>';
			sld += '<Label>';
			sld += '<ogc:PropertyName>' + label + '</ogc:PropertyName>';
			sld += '</Label>';
			sld += '<Font>';
			sld += '<CssParameter name="font-family">Arial</CssParameter>';
			sld += '<CssParameter name="font-size">14</CssParameter>';
			// sld += '<CssParameter name="font-style">normal</CssParameter>';
			sld += '<CssParameter name="font-weight">bold</CssParameter>';
			sld += '</Font>';

			if (type === 'point') {
				sld += '<LabelPlacement>';
				sld += '<PointPlacement>';
				sld += '<AnchorPoint>';
				sld += '<AnchorPointX>0.5</AnchorPointX>';
				sld += '<AnchorPointY>0.0</AnchorPointY>';
				sld += '</AnchorPoint>';
				// sld += '<Displacement>';
				// sld += '<DisplacementX>0</DisplacementX>';
				// sld += '<DisplacementY>25</DisplacementY>';
				// sld += '</Displacement>';
				sld += '<Rotation>-45</Rotation>';
				sld += '</PointPlacement>';
				sld += '</LabelPlacement>';
				sld += '<VendorOption name="maxDisplacement">10</VendorOption>';
				sld += '<VendorOption name="spaceAround">-1</VendorOption>';
			} else if (type === 'line') {
				sld += '<LabelPlacement><LinePlacement></LinePlacement></LabelPlacement>';
				sld += '<VendorOption name="followLine">true</VendorOption>';
				sld += '<VendorOption name="maxAngleDelta">90</VendorOption>';
				sld += '<VendorOption name="maxDisplacement">10</VendorOption>';
				sld += '<VendorOption name="repeat">150</VendorOption>';
			} else if (type === 'polygon') {
				sld += '<VendorOption name="maxDisplacement">100</VendorOption>';
				sld += '<VendorOption name="repeat">300</VendorOption>';
			}
			
			sld += '</TextSymbolizer>';
		}

		sld += '</Rule>';
		sld += '</FeatureTypeStyle>';
		sld += '</UserStyle>';
		sld += '</NamedLayer>';
		sld += '</StyledLayerDescriptor>';

		return sld;
	}

	function setLabelList(layerId) {
		var id = layerId;

		return new Promise(function(resolve, reject) {
			$.ajax({
				url : WFSURL,
				dataType : 'json',
				data : {
					srs : 'EPSG:5187',
					request : 'GetFeature',
					version : '1.0.0',
					typename : DATABASE + ':' + id,
					outputFormat : 'application/json',
					maxFeatures : 1
				},
				success : function(response) {
					resolve(Object.assign(response, {
						id : id
					}));
				},
				error : function(a, b, c) {
					console.log("error");
				}
			});
		});
	}

	function setTree() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url : gp.ctxPath + '/layer/getLayerList.json',
				type : "POST",
				dataType : "json", // 응답받을 타입
				error : function(xhs, status, error) {
					if (xhs.status == 600) {
						alert("세션이 만료되었습니다.");
						location.href = gp.ctxPath + "/mainPage.do";
					} else {
						alert('서버와의 통신에 실패했습니다.');
					}
					reject(error);
				},
				success : function(responseData, textStatus) {

					var treeData = [];
					
					$.each(responseData.layers, function(key, val) {

						var id = val.tableNm ? val.tableNm.toLowerCase() : '';
						var name = val.layerNm;
						var visible = val.visible;
						var layerId = val.layerId;

						var html = '';
						var parent = undefined;
						var parentName = undefined;

						if (layerId.includes('WTL')) {
							// 상수시설물
							parent = 'wtl';
							parentName = '상수';
						} else if (layerId.includes('SWL')) {
							// 하수시설물
							parent = 'swl';
							parentName = '하수';
						} else if (layerId.includes('RDL')) {
							// 도로시설물
							parent = 'rdl';
							parentName = '도로';
						} else {
							// 기타시설물
							parent = 'etc';
							parentName = '기타';
						}

						if(!treeData.find(function(e){return e.id === parent;})){
							treeData.push({
								parent: '#',
								id: parent,
								type: 'root',
								text: parentName,
								state: {
									opened: false
								}
							});
						}
						
						treeData.push({
							parent: parent,
							id: id,
							text: name,
							type: 'node',
							icon: GEOSERVERURL + GETLEGENDGRAPHIC + DATABASE + ':' +id.toLowerCase(),
							state: {
								checked : visible === 'true' ? true : false
							}
						})
					});

					resolve(treeData);
				}
			});
		});
	}

	function setEventTree(map) {
		var map = map;
		var wmsLayerGroup = map.getLayerGroup();
		var wmsLayerArray = wmsLayerGroup.getLayers().getArray();

		// set default checked for 정예R, 정예Y (판독완료) layers
		$(document).on("change", "input[type=checkbox]", function() {
			var lyrId = $(this).attr("id");
			var layers = map.getLayers().getArray();
			var layer = null;
			$.each(layers, function(idx, lyr) {
				if (lyr.get("id") == lyrId.toLowerCase()) {
					layer = lyr;
					return false;
				}
			});

			if (layer) {
				layer.setVisible($(this).is(":checked"));
			}

			map.render();
		});
	}

	window.git = window.git || {};
	window.git.LayerFilter = layerFilter;
	window.git.setLabelList = setLabelList;
})(window, jQuery);