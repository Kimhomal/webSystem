<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<%@ include file="/WEB-INF/jsp/common/shareProperties.jsp"%>
<title>공간정보기술(주) 모바일통합관리시스템</title>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/plugins/fontawesome/css/font-awesome.min.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/plugins/semantic/semantic.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/plugins/DataTables/datatables.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/project.css"/>">

<script src="<c:url value="/plugins/jquery/jquery-1.12.3.min.js"/>"></script>
<script src="<c:url value="/plugins/jquery/jquery.form.min.js"/>"></script>
<script src="<c:url value="/plugins/semantic/semantic.js"/>"></script>
<script src="<c:url value="/plugins/DataTables/datatables.js"/>"></script>

<script src="<c:url value="/js/common.js"/>"></script>
<script src="<c:url value="/js/system/${flag}.js"/>"></script>

</head>
<body>
	<div class="git container">
		<!-- Header -->
		<%@ include file="/WEB-INF/jsp/common/headerNonFixed.jsp"%>
		
		<div class="git content">
			<div class="git side full">
				<div class="ui massive vertical menu">
					<div class="item">
						<div class="header">시스템 설정</div>
						<div class="menu">
							<a class="item" href="<c:url value='/system/company.do'/>">업체 관리</a>
							<a class="item" href="<c:url value='/system/options.do'/>">세부 작업 관리</a>
							<a class="item" href="<c:url value='/system/user.do'/>">사용자 관리</a>
						</div>
					</div>
				</div>
			</div>
			<div class="git article full">
				<jsp:include page="system/${flag}.jsp"></jsp:include>
			</div>
		</div>
	</div>
</body>