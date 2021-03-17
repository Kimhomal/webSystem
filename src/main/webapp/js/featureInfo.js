(function($, ol) {
	var featureInfo = function(options){
		var that = this;
		var opt = options || {};
		this.elementId = opt.elementId || 'featureInfoModal';

		this.map_ = opt.map;
		if (!(this.map_ instanceof ol.Map)) {
			console.error("git.featureInfo: 'map' is a required field.");
			return;
		}
		
		createInfoModal(this.elementId);
	}
	
	featureInfo.prototype.selectInfo = function selectInfo(feature) {
		if (!(feature instanceof ol.Feature)) {
			return;
		}

		var keys = feature.getKeys();
		var target = $('#' + this.elementId + ' table.ui tbody');
		target.empty();

		var featureId = feature.getId();
		var layerName = featureId.split('.')[0];
		var gid = featureId.split('.')[1];

		$.ajax({
			url : gp.ctxPath + '/layer/getFeatureInfo.json',
			type : "POST",
			data : {
				layerNm : layerName,
				id : parseInt(gid)
			},
			dataType : "json",
			beforeSend : function(xhs, status) {
			},
			error : function(xhs, status, error) {
				if (xhs.status == 600) {
					alert("세션이 만료되었습니다.");
					location.href = gp.ctxPath + "/mainPage.do";
				} else {
					alert('서버와의 통신에 실패했습니다.');
					console.log(xhs);
					console.log(status);
					console.log(error);
				}
			},
			success : function(resData) {
				console.log(resData);
				var result = resData.result;
				var fields = resData.fields;
				var html = '';
				
				for ( var i in result) {
					if (i === 'geom' || i === 'gid') {
						continue;
					}

					html = '';
					html += '<tr>';
					html += '<td>' + fields[i] + '</td>';
					html += '<td>';
					html += result[i];
					html += '</td>';
					html += '</tr>';

					target.append(html);
				}
			}
		});
		
		$('#' + this.elementId).modal('show')
	}
	
	function createInfoModal(id){
		if(document.querySelector('#' + id)){
			return;
		}
		
		var target = $('body');
		var html = '';
		html += '<div id="' + id + '" class="ui longer modal">';
		html += '<div class="header">객체정보</div>';
		html += '<div class="scrolling content">';
		html += '<div class="description">';
		html += '<table class="ui definition table">';
		html += '<tbody></tbody>';
		html += '</table>'
		html += '</div>';
		html += '</div>';
		html += '<div class="actions">';
		html += '<div class="ui primary approve button">';
		html += '닫기';
		html += '<i class="right close icon"></i>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
	  
		target.append(html);
	}
	
	window.git = window.git || {};
	window.git.FeatureInfo = featureInfo;
}(jQuery, ol));