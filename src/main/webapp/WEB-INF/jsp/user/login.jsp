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

<script src="<c:url value="/plugins/jquery/jquery-1.12.3.min.js"/>"></script>
<script src="<c:url value="/plugins/jquery/jquery.form.min.js"/>"></script>
<script src="<c:url value="/plugins/semantic/semantic.js"/>"></script>
<script src="<c:url value="/js/common.js"/>"></script>
<script src="<c:url value="/js/user/login.js"/>"></script>

<style type="text/css">
body {
	background-color: #DADADA;
}

body>.grid {
	height: 100%;
}

.image {
	margin-top: -100px;
}

.column {
	max-width: 450px;
}
</style>
</head>
<body>
	<!-- Header -->
	<%@ include file="/WEB-INF/jsp/common/header.jsp"%>

	<div class="ui middle aligned center aligned grid">
		<div class="column">
			<h2 class="ui teal image header">
				<div class="content">로그인 해주세요.</div>
			</h2>
			<form id="loginForm" class="ui large form" name="loginForm" method="post">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui left icon input">
							<i class="user icon"></i>
							<input type="text" id="searchUserId" name="searchUserId" placeholder="ID">
						</div>
					</div>
					<div class="field">
						<div class="ui left icon input">
							<i class="lock icon"></i>
							<input type="password" id="searchUserPwd" name="searchUserPwd" placeholder="Password">
						</div>
					</div>
					<div class="ui fluid large teal submit button" onclick="git.fn_login()">로그인</div>
				</div>

				<div class="ui error message"></div>

			</form>

			<div class="ui message">
				<button class="ui primary tertiary button join">회원가입</button>
			</div>
		</div>
	</div>
	
	<div class="ui modal join-modal">
		<div class="header">회원가입</div>
		<div class="content">
			<form id="joinForm" class="ui form basic segment">
				<div class="field">
					<label>이름</label>
					<input placeholder="이름" name="usrNm" type="text" autocomplete="name">
				</div>
				<div class="field">
					<label>아이디</label>
					<input placeholder="ID" name="usrId" type="text" autocomplete="username">
				</div>
				<div class="field">
					<label>비밀번호</label>
					<input name="usrPwd" type="password" autocomplete="new-password">
				</div>
				<div class="field">
					<label>소속</label>
					<div class="ui selection search dropdown corp-list">
						<div class="default text">소속을 선택해주세요</div>
						<i class="dropdown icon"></i>
						<input type="hidden" name="orgCde">
					</div>
				</div>
				<div class="field">
					<label>구분</label>
					<div class="ui selection search dropdown role-list">
						<div class="default text">구분을 선택해주세요</div>
						<i class="dropdown icon"></i>
						<input type="hidden" name="roleCde">
					</div>
				</div>
				<div class="ui error message"></div>
			</form>
		</div>
		<div class="actions">
			<div class="ui red cancel button">
				<i class="remove icon"></i>취소
			</div>
			<div class="ui green ok button">
				<i class="checkmark icon"></i>추가
			</div>
		</div>
	</div>
</body>
</html>