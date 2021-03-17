<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- 사이드 메뉴 -->
<!-- Sidebar Menu -->
<div class="ui vertical inverted sidebar menu left">
	<a class="item" onclick="location.href='<c:url value='/mainPage.do'/>';">메인</a>
	<a class="item" onclick="location.href='<c:url value='/layer/map.do'/>'">지도</a>
	<a class="item" onclick="location.href='<c:url value='/project/main.do'/>'">작업관리</a>
	<a class="item" onclick="location.href='<c:url value='/loginPage.do'/>'">로그인</a>
	<a class="item">회원가입</a>
	<c:if test="${empty sessionScope.authInfo}">
	<a class="item" onclick="location.href='<c:url value='/loginPage.do'/>'">로그인</a>
	<a class="item">회원가입</a>
	</c:if>
	<c:if test="${!empty sessionScope.authInfo}">
	<a class="item"><i class="user icon"></i>${sessionScope.authInfo.usrNm}</a>
	<a class="item" onclick="git.fn_logout();">로그아웃</a>
	</c:if>
</div>
