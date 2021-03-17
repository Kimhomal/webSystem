<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript">
	var GLOBAL = GLOBAL || {};
	GLOBAL.PRJID = '${prjId}';
	GLOBAL.USRROLE = '${sessionScope.authInfo.roleCde}';
</script>

<div class="ui masthead vertical segment">
	<div class="ui fluid container">
		<h1 class="ui header">
			프로젝트 정보
			<div class="sub header">프로젝트 정보보기</div>
		</h1>
	</div>
</div>
<div class="ui vertical segment loading">
	<div class="ui grid">
		<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
			<div class="work-list" style="margin-bottom: 2rem;"></div>
		</div>
		<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
			<div class="dt-buttons" style="position: absolute; z-index: 1;">
				<button class="ui button disabled rst-detail-btn">상세보기</button>
				<button class="ui button disabled rst-delete-btn">삭제하기</button>
			</div>
			<table id="workHistory" class="ui celled table" style="width:100%"></table>
		</div>
		<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
			<form class="ui form" method="post">
				<h4 class="ui left aligned horizontal divider header">프로젝트 정보</h4>
				<div class="two fields">
					<div class="field">
						<label>프로젝트명</label>
						<div class="ui transparent input">
							<input type="text" name="prjNm" readonly="" value="">
						</div>
					</div>
					<div class="field">
						<label>작업지역</label>
						<div class="ui transparent input">
							<input type="text" name="prjAdr" readonly="" value="">
						</div>
					</div>
				</div>
				<h4 class="ui left aligned horizontal divider header">작업기간</h4>
				<div class="two fields">
					<div class="field">
						<label>시작</label>
						<div class="ui transparent input">
							<input class="date" type="text" name="strDt" readonly="" value="">
						</div>
					</div>
					<div class="field">
						<label>완료</label>
						<div class="ui transparent input">
							<input class="date" type="text" name="endDt" readonly="" value="">
						</div>
					</div>
				</div>
				<h4 class="ui left aligned horizontal divider header">작업내용</h4>
				<div class="field cops">
					<label>공동 작업 업체</label>
					<!-- <select class="ui fluid dropdown workers deselected" data-validate="workers" multiple=""></select> -->
				</div>
				<div class="field workers">
					<label>작업자</label>
					<!-- <select class="ui fluid dropdown workers deselected" data-validate="workers" multiple=""></select> -->
				</div>
				<div class="field">
					<label>작업내용</label>
					<table class="ui celled table wrk-opt">
						<thead class="full-width">
							<tr>
								<th>KEY</th>
								<th>작업명</th>
								<th>목표 작업량</th>
								<th>단위</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</form>
			<c:if test="${sessionScope.authInfo.roleCde eq 'R001'}">
			<div class="ui vertical segment">
				<div class="two ui buttons">
					<button class="ui primary button modify">수정하기</button>
					<button class="ui red button delete">삭제하기</button>
				</div>
			</div>
			</c:if>
		</div>
	</div>
</div>

<div class="ui modal rst-detail-modal">
	<i class="close icon"></i>
	<div class="header">
		성과 입력 상세정보
	</div>
	<div class="scrolling content">
		<div class="ui two column stackable grid">
			<div class="column">
				<h4 class="ui header">작업자</h4>
				<p>김호철</p>
			</div>
			<div class="column">
				<h4 class="ui header">등록일시</h4>
				<p>2020-11-15 13:45:23</p>
			</div>
			<div class="one column row">
				<div class="column">
					<h4 class="ui header">작업내용</h4>
					<div class="ui label">
						측량
						<a class="detail">12</a>
						<a class="detail">km</a>
					</div>
				</div>
			</div>
			<div class="one column row">
				<div class="column">
					<h4 class="ui header">업로드 이미지</h4>
					<div class="ui medium images">
						<%-- <img src="${pageContext.request.contextPath}/plugins/semantic/images/wireframe/image-square.png" data-src="${pageContext.request.contextPath}/plugins/semantic/images/wireframe/image-text.png"> --%>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="ui basic modal delete-project-modal">
	<div class="ui icon header">
		<i class="archive icon"></i>
		정말로 삭제하시겠습니까?
	</div>
	<div class="content">
		<p>프로젝트의 모든 작업내용이 삭제됩니다</p>
	</div>
	<div class="actions">
		<div class="ui red basic cancel inverted button">
			<i class="remove icon"></i>취소
		</div>
		<div class="ui green ok inverted button">
			<i class="checkmark icon"></i>삭제
		</div>
	</div>
</div>

<div class="ui basic modal delete-modal">
	<div class="ui icon header">
		<i class="archive icon"></i>
		정말로 삭제하시겠습니까?
	</div>
	<div class="content">
		<p>업로드된 이미지 파일도 함께 삭제되며 삭제된 작업은 되돌릴 수 없습니다.</p>
	</div>
	<div class="actions">
		<div class="ui red basic cancel inverted button">
			<i class="remove icon"></i>취소
		</div>
		<div class="ui green ok inverted button">
			<i class="checkmark icon"></i>삭제
		</div>
	</div>
</div>

<div id="dropzone-template" style="display:none;">
	<div class="card">
		<div class="content">
			<i class="right floated trash icon" data-dz-remove></i>
			<div class="meta">
				<span data-dz-name></span>
			</div>
		</div>
		<div class="image">
			<img data-dz-thumbnail />
		</div>
	</div>
</div>