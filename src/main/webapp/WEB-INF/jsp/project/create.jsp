<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="ui masthead vertical segment">
	<div class="ui fluid container">
		<h1 class="ui header">
			프로젝트 생성
			<div class="sub header">새로운 프로젝트를 생성</div>
		</h1>
	</div>
</div>
<div class="ui vertical segment">
	<div class="ui grid">
		<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
			<form class="ui form" method="post">
				<h4 class="ui left aligned horizontal divider header">프로젝트 정보</h4>
				<div class="two fields">
					<div class="field">
						<label>프로젝트명</label>
						<input type="text" name="prjNm" placeholder="프로젝트명">
					</div>
					<div class="field">
						<label>작업지역</label>
						<input type="text" name="prjAdr" placeholder="작업지역">
					</div>
				</div>
				<h4 class="ui left aligned horizontal divider header">작업기간</h4>
				<div class="two fields">
					<div class="field">
						<label>시작</label>
						<div class="ui calendar" id="rangestart">
							<div class="ui input left icon">
								<i class="calendar icon"></i>
								<input type="text" placeholder="날짜선택" name="strDt">
							</div>				
						</div>
					</div>
					<div class="field">
						<label>완료</label>
						<div class="ui calendar" id="rangeend">
							<div class="ui input left icon">
								<i class="calendar icon"></i>
								<input type="text" placeholder="날짜선택" name="endDt">
							</div>				
						</div>
					</div>
				</div>
				<h4 class="ui left aligned horizontal divider header">작업내용</h4>
				<!-- <div class="field">
					<label>총 작업량</label>
					<div class="ui right labeled disabled input">
						<input type="number" name="totWrk" placeholder="000km">
						<div class="ui basic label">km</div>
					</div>
				</div> -->
				<div class="field">
					<label>공동 업체</label>
					<select class="ui fluid search dropdown cops" data-validate="cops" multiple=""></select>
				</div>
				<div class="field">
					<label>작업자</label>
					<select class="ui fluid search dropdown workers" data-validate="workers" multiple=""></select>
				</div>
				<div class="field">
					<label>작업내용</label>
					<!-- <table class="ui celled table wrk-opt">
						<thead class="full-width">
							<tr>
								<th></th>
								<th>KEY</th>
								<th>작업명</th>
								<th>목표 작업량</th>
								<th>단위</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="collapsing"></td>
								<td><input type="text" data-val="key"></td>
								<td><input type="text" data-val="title"></td>
								<td><input type="number" data-val="goal"></td>
								<td><input type="text" data-val="unit"></td>
							</tr>
						</tbody>
						<tfoot class="full-width">
							<th></th>
							<th colspan="4">
								<div class="ui right floated small primary labeled icon button add-work">
						        	<i class="plus icon"></i>작업 추가
						        </div>
							</th>
						</tfoot>
					</table> -->
					<table class="ui celled table wrk-opt">
						<thead class="full-width">
							<tr>
								<th></th>
								<th>작업</th>
								<th>목표 작업량</th>
								<th>단위</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="collapsing"></td>
								<td><select class="ui fluid selection dropdown"></select></td>
								<td><input type="number" data-val="goal"></td>
								<td><input class="transparent" type="text" data-val="unit" readonly></td>
							</tr>
						</tbody>
						<tfoot class="full-width">
							<th></th>
							<th colspan="4">
								<div class="ui right floated small primary labeled icon button add-work">
						        	<i class="plus icon"></i>작업 추가
						        </div>
							</th>
						</tfoot>
					</table>
				</div>
				<!-- <h4 class="ui left aligned horizontal divider header">세부작업내용</h4>
				<div class="ui fluid container detail">
				</div>
				<div class="ui center aligned basic segment">
					<div id="createDetailBtn" class="ui teal labeled icon button">
						새 세부작업 생성
						<i class="add icon"></i>
					</div>
				</div> -->
			</form>
			<div class="ui center aligned basic segment">
				<button class="fluid ui primary button create-project">프로젝트 생성하기</button>
			</div>
		</div>
	</div>
</div>