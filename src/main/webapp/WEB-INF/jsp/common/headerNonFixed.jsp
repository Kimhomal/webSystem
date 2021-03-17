<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!-- Following Menu -->
<div class="ui large top hidden menu">
	<div class="ui container fluid">
		<a class="item" onclick="location.href='<c:url value='/mainPage.do'/>'">메인</a>
		<a class="item" onclick="location.href='<c:url value='/layer/map.do'/>'">지도</a>
		<a class="item" onclick="location.href='<c:url value='/project/main.do'/>'">작업관리</a>
		<c:if test="${!empty sessionScope.authInfo}">
			<c:if test="${sessionScope.authInfo.roleCde eq 'R000'}">
				<a class="item" onclick="location.href='<c:url value='/system/main.do'/>'">시스템 설정</a>
			</c:if>
		</c:if>
		<div class="right menu">
			<c:if test="${empty sessionScope.authInfo}">
			<div class="item">
				<a class="ui button" onclick="location.href='<c:url value='/loginPage.do'/>'">로그인</a>
			</div>
			</c:if>
			<c:if test="${!empty sessionScope.authInfo}">
			<div class="item">
				<a class="ui button">
					<i class="user icon"></i>${sessionScope.authInfo.usrNm}
				</a>
			</div>
			<div class="item">
				<a class="ui button" onclick="git.fn_logout();">로그아웃</a>
			</div>
			</c:if>
		</div>
	</div>
</div>