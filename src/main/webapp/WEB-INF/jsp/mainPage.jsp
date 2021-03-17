<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="profiletag" uri="/WEB-INF/taglib/profile.tld"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>공간정보기술(주) 통합관리시스템</title>
<%@ include file="/WEB-INF/jsp/common/shareProperties.jsp"%>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/plugins/semantic/semantic.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/main.css"/>">

<script src="<c:url value="/plugins/jquery/jquery-1.12.3.min.js"/>"></script>
<script src="<c:url value="/plugins/semantic/semantic.js"/>"></script>
<script src="<c:url value="/js/common.js"/>"></script>
<script src="<c:url value="/js/mainPage.js"/>"></script>
</head>
<body class="pushable">

	<!-- Header -->
	<%@ include file="/WEB-INF/jsp/common/header.jsp"%>

	<!-- Side -->
	<%@ include file="/WEB-INF/jsp/common/side.jsp"%>

	<!-- Page Contents -->
	<div class="pusher">
		<div class="ui inverted vertical masthead center aligned segment">

			<div class="ui container">
				<div class="ui large secondary inverted pointing menu">
					<a class="toc item">
						<i class="sidebar icon"></i>
					</a>
					<a class="active item">메인</a>
					<a class="item" onclick="location.href='<c:url value='/layer/map.do'/>'">지도</a>
					<a class="item" onclick="location.href='<c:url value='/project/main.do'/>'">작업관리</a>
					<c:if test="${!empty sessionScope.authInfo}">
						<c:if test="${sessionScope.authInfo.roleCde eq 'R000'}">
							<a class="item" onclick="location.href='<c:url value='/system/main.do'/>'">시스템 설정</a>
						</c:if>
					</c:if>
					
					<div class="right item">
						<c:if test="${empty sessionScope.authInfo}">
						<a class="ui inverted button" href="'<c:url value='/loginPage.do'/>'">로그인</a>
						</c:if>
						<c:if test="${!empty sessionScope.authInfo}">
						<a class="ui inverted button">
							<i class="user icon"></i>${sessionScope.authInfo.usrNm}
						</a>
						<a class="ui inverted button" onclick="git.fn_logout();")>로그아웃</a>
						</c:if>
					</div>
				</div>
			</div>

			<div class="ui text container">
				<h1 class="ui inverted header">통합관리시스템</h1>
				<h2>공간정보기술㈜</h2>
				<div class="ui huge primary button" onclick="location.href='<c:url value='/layer/map.do'/>'">
					지도로 가기 <i class="right arrow icon"></i>
				</div>
			</div>

		</div>

		<div class="ui vertical stripe segment">
			<div class="ui middle aligned stackable grid container">
				<div class="row">
					<div class="eight wide column">
						<h3 class="ui header">작업관리</h3>
						<p>작업 관리자는 프로젝트를 생성하고 작업 일정 및 참여자를 설정할 수 있습니다.</p>
						<h3 class="ui header">공정관리</h3>
						<p>작업관리자, 작업참여자, 용역관리자 등 모든 프로젝트 참여자들은 공정률을 확인하고 작업을 수행할 수
							있습니다.</p>
					</div>
					<div class="six wide right floated column">
						<img
							src="<c:url value="/plugins/semantic/images/wireframe/white-image.png"/>"
							class="ui large bordered rounded image">
					</div>
				</div>
				<div class="row">
					<div class="center aligned column">
						<a class="ui huge button">프로젝트 생성하기</a>
					</div>
				</div>
			</div>
		</div>

		<div class="ui inverted vertical footer segment">
			<div class="ui container">
				<div
					class="ui stackable inverted divided equal height stackable grid">
					<div class="three wide column">
						<h4 class="ui inverted header">회사소개</h4>
						<div class="ui inverted link list">
							<a href="#" class="item">개요</a> <a href="#" class="item">인사말</a>
							<a href="#" class="item">오시는길</a>
						</div>
					</div>
					<div class="three wide column">
						<h4 class="ui inverted header">고객센터</h4>
						<div class="ui inverted link list">
							<a href="#" class="item">뉴스&공지</a>
							<a href="#" class="item">자료실</a>
							<a href="#" class="item">Q&A</a>
						</div>
					</div>
					<div class="seven wide column">
						<h4 class="ui inverted header">공간정보기술㈜</h4>
						<p>13487 경기도 성남시 분당구 판교로 228번길 15 판교세븐벤처밸리 1단지 3동 6층</p>
						<p>TEL 031.622.3800 FAX 031.622.3811</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>