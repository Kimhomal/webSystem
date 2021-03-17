(function($){
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
	
	$(document).ready(function(){
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
				card.click(function(e){
					var form = document.createElement('form');
					var prjId = document.createElement('input');
					prjId.setAttribute('type', 'hidden');
					prjId.setAttribute('name', 'prjId');
					prjId.setAttribute('value', $(this).data('pid'));
					
					form.appendChild(prjId);
					form.setAttribute('method', 'post');
					form.setAttribute('action', gp.ctxPath + '/project/detail.do');
					
					document.body.appendChild(form);
					form.submit();
//					$.ajax({
//						url: gp.ctxPath + '/project/detail.do',
//						data: 'prjId=' + $(this).data('pid'),
//						type: 'POST',
//						error: function (xhs, status, error) {
//							if (xhs.status == 600) {
//								alert('세션이 만료되었습니다.');
//								location.href = gp.ctxPath + '/project/main.do';
//							} else {
//								alert('서버와의 통신에 실패했습니다.');
//							}
//						},
//					})
				})
			}
		})
	});
}(jQuery));