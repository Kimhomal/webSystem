<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="ui masthead vertical segment">
	<div class="ui fluid container">
		<h1 class="ui header">
			프로젝트 공정률
			<div class="sub header">참여중인 프로젝트 공정률보기</div>
		</h1>
	</div>
</div>
<div class="progress-main">
	<div class="ui vertical segment">
		<div class="ui grid">
			<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
				<h4 class="ui horizontal divider header">
					<i class="play circle icon"></i>
					진행 중인 프로젝트
				</h4>
				<div class="ui cards progress-project">
					<img class="ui wireframe image" src="<c:url value='/plugins/semantic/images/wireframe/square-image.png'/>">
				</div>
				<h4 class="ui horizontal divider header">
					<i class="check circle icon"></i>
					완료된 프로젝트
				</h4>
				<div class="ui cards complete-project">
					<img class="ui wireframe image" src="<c:url value='/plugins/semantic/images/wireframe/square-image.png'/>">
				</div>
			</div>
		</div>
	</div>
</div>
<div class="progress-sub" style="display: none;">
	<button class="ui button back-to-list">
		<i class="left arrow icon"></i>목록으로
	</button>
	<div class="ui vertical segment">
		<div class="ui grid">
			<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
				<h4 class="ui horizontal divider header project-name"></h4>
			</div>
			<div class="row">
				<!-- <div class="sixteen wide mobile sixteen wide tablet six wide computer column">
					<div class="ui raised segment">
					<div class="ui top attached large label">총 진행률</div>
					<div id="chartDiv" style="height: 340px;"></div>
					</div>
				</div> -->
				<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
					<div class="ui grid">
						<div class="four wide column">
							<div class="ui center aligned segment">
								<div class="ui statistic">
									<div class="value"><span class="total-work"></span><span class="ui mini text">km</span></div>
									<div class="label">총 작업 목표량</div>
								</div>
							</div>
						</div>
						<div class="four wide column">
							<div class="ui center aligned segment">
								<div class="ui statistic">
									<div class="value"><span class="current-work"></span><span class="ui mini text">km</span></div>
									<div class="label">현재 작업량</div>
								</div>
							</div>
						</div>
						<div class="four wide column">
							<div class="ui center aligned segment">
								<div class="ui tiny statistic">
									<div class="value"><i class="calendar outline icon"></i><span class="start-date"> 2020-10-15</span></div>
									<div class="label">시작날짜</div>
								</div>
							</div>
						</div>
						<div class="four wide column">
							<div class="ui center aligned segment">
								<div class="ui tiny statistic">
									<div class="value"><i class="calendar icon"></i><span class="end-date"> 2020-10-15</span></div>
									<div class="label">완료날짜</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
					<div class="ui form">
						<div class="three fields">
							<div class="field">
								<label>작업자</label>
								<select class="ui fluid search dropdown workers-filter" multiple=""></select>
							</div>
							<div class="field">
								<label>시작</label>
								<div class="ui calendar" id="startFilter">
									<div class="ui input left icon">
										<i class="calendar icon"></i>
										<input type="text" placeholder="날짜선택" autocomplete="off">
									</div>				
								</div>
							</div>
							<div class="field">
								<label>완료</label>
								<div class="ui calendar" id="endFilter">
									<div class="ui input left icon">
										<i class="calendar icon"></i>
										<input type="text" placeholder="날짜선택" autocomplete="off">
									</div>				
								</div>
							</div>
						</div>
					</div>
					<div class="ui three column grid progress-list"></div>
				</div>
			</div>
			<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
				<h4 class="ui horizontal divider header">작업 현황</h4>
			</div>
			<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
				<div class="ui form">
					<div class="three fields">
						<div class="field">
							<label>작업자</label>
							<select class="ui fluid search dropdown workers" data-validate="workers" multiple=""></select>
						</div>
						<div class="field">
							<label>시작</label>
							<div class="ui calendar" id="rangestart">
								<div class="ui input left icon">
									<i class="calendar icon"></i>
									<input type="text" placeholder="날짜선택" name="strDt" autocomplete="off">
								</div>				
							</div>
						</div>
						<div class="field">
							<label>완료</label>
							<div class="ui calendar" id="rangeend">
								<div class="ui input left icon">
									<i class="calendar icon"></i>
									<input type="text" placeholder="날짜선택" name="endDt" autocomplete="off">
								</div>				
							</div>
						</div>
					</div>
				</div>
				<div id="workMap" style="width: 100%; height: 40em;"></div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	var proj = new Proj();
</script>