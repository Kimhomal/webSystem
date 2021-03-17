(function() {
	function ready(am) {
		if (document.readyState != 'loading') {
			am();
		} else {
			document.addEventListener('DOMContentLoaded', am);
		}
	}

	function requestData(url, param, method, dataType, contentType,
			noShowLoading, noContext) {
		// if (noShowLoading) this.showLoading(true);
		if (typeof method == "undefined" || method == "") {
			method = "POST";
		}
		if (typeof contentType == "undefined" || contentType == "") {
			contentType = "application/x-www-form-urlencoded; charset=UTF-8";
		}

		var deferred = $.Deferred();
		/*
		 * if (MapPlatform.StringUtils.startsWith(url, "http://")) { url =
		 * MapPlatform.Config.getProxy() + url; } else if (!noContext) { url =
		 * MapPlatform.Config.getContextPath() + url; }
		 */

		$.ajax({
			type : method,
			url : url,
			data : param,
			dataType : dataType,
			// global : noShowLoading,
			contentType : contentType,
		}).done(function(result) {
			// if (!noShowLoading) this.showLoading(false);
			if (typeof result === "string") {
				result = JSON.parse(result);
			}
			deferred.resolve(result);
		}.bind(this)).fail(function(result) {
			// if (!noShowLoading) this.showLoading(false);
			console.error("[Http.requestData] err.", param, result);
			deferred.reject(result);
		}.bind(this));
		return deferred.promise();
	}
	;

	var url = gp.geoUrl + '/wfs';

	function setCenter(map, code, gbn) {
		var cql = "";
		var typename = "";

		if (gbn == "sgg") {
			cql = "sig_cd LIKE '" + code + "%'";
			typename = "gj_sgg";
		} else {
			cql = "bjd_cde LIKE '" + code + "%'";
			typename = "gj_emd1";
		}

		var param = {
			SERVICE : 'WFS',
			VERSION : '1.1.0',
			REQUEST : 'GETFEATURE',
			TYPENAME : typename,
			PROPERTYNAME : 'geom',
			OUTPUTFORMAT : 'application/json',
			CQL_FILTER : cql
		};

		requestData(url, param, 'GET', 'json', "", true).done(
				function(result) {
					var features = result.features[0];
					var format = new ol.format.GeoJSON();
					var feature = format.readFeature(features);
					feature.getGeometry().transform("EPSG:5187",
							map.getView().getProjection().getCode());
					// feature.getGeometry().transform("EPSG:5185",
					// "EPSG:3857");
					var extent = feature.getGeometry();
					map.getView().fit(extent, map.getSize());
				})
	}

	window.am = window.am || {};

	// 전역변수
	window.am.statics = {
		vectorLayer : undefined, // 기기 방향 감지 아이콘 레이어
		orientation : false, // 기기 방향 감지 기능 활성화 여부
		arrowRotate : 0, // 기기 방향 각도
		geolocation : undefined, // geolocation watchPosition event 반환 id
		position : undefined, // 현재 위치 좌표
		crossSection : undefined
	// 횡단면도
	}

	window.am.crossPrompt = function() {
		am.statics.crossSection.drawFeature('LineString');
	}

	ready(function() {
		// document load가 완료되었을 때 실행되는 영역
		mapMaker1 = new MapMaker("map", {}); // 기본셋팅 및 맵 객체, 배경지도 추가

		mapMaker1.mapLayerMng.addFacilityLayers(); // 판독 레이어 추가
		// mapMaker1.mapLayerMng.setTempLayer(); // 임시 레이어 추가(중복레이어 마우스 오버 시)

		mapMaker1.map.getView().setZoom(5);

		mapMaker1.setOverlayLayerTooltip({
			overlayTooltipElement : document
					.getElementsByClassName("layer_mapInfo")[0],
			overlayTooltipAppend : "<li>",
			overlayTooltipAppendElem : "ul"
		});

		mapMaker1.mapEvtMng.onMapEvt();

		// loadSggList();
		// loadEmdList("29140"); // 초기 화면에서 읍면동 selectbox 선택되도록 고정

		mapMaker1.map.once('postcompose', function(event) {
			if ($("#itptCenterX").val() != "") {
				mapMaker1.setCenter([ $("#itptCenterX").val(),
						$("#itptCenterY").val() ], "7", "EPSG:5187",
						mapMaker1.map.getView().getProjection().getCode());
				$("#itptCenterX").val("");
				$("#itptCenterY").val("");
			}
		});

		// Map 이동 시 watchPosition event 해제
		mapMaker1.map.on('pointerdrag', function(event) {
			// if(am.statics.orientation){
			// am.toggleOrientation();
			// }

			if (navigator.geolocation) {
				navigator.geolocation.clearWatch(am.statics.geolocation);
			}
		});

		 // 레이어 on/off 기능 활성화
		 am.statics.layerSection = new git.LayerFilter({
			 map: mapMaker1.map
		 });
		 
		 am.statics.featureInfo = new git.FeatureInfo({
			 map: mapMaker1.map
		 });
		 
		 mapMaker1.mapEvtMng.setProperties({
			 featureSelectCallback: am.statics.featureInfo
		 })
				
		 // 횡단면도 기능 활성화
		 am.statics.crossSection = new am.crossSection({
			 map: mapMaker1.map
		 });
				
		 // 실시간 성과 등록 기능 활성화
		 am.statics.camera = new am.Camera({
			 map: mapMaker1.map,
		 });

		$('.ui.segment .menu .item').tab();

		$(document).on("change", "#sgg", function() {
			var sggVal = $(this).val();
			var sggText = $("#sgg option:selected").text();
			var sggValSub = sggVal.substr(0, 5);
			var map = mapMaker1.map;

			$("#sgg").siblings("label").text(sggText);
			loadEmdList(sggValSub);
			setCenter(map, sggValSub, "sgg");
		});

		$(document).on("change", "#emd", function() {
			var emdVal = $(this).val();
			var emdText = $("#emd option:selected").text();
			var map = mapMaker1.map;

			$("#emd").siblings("label").text(emdText);
			setCenter(map, emdVal, "emd");
		});
		
		$(document).on('click', '.cross-section', function() {
			am.statics.crossSection.drawFeature('LineString');
		});
	});
}());