<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="ui masthead vertical segment">
	<div class="ui fluid container">
		<h1 class="ui header">
			프로젝트 목록
			<div class="sub header">참여중인 프로젝트 목록보기</div>
		</h1>
	</div>
</div>
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