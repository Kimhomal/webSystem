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
<script src="<c:url value="/plugins/moment/moment.js"/>"></script>


<c:if test="${flag eq 'progress'}">
<script src="<c:url value="/plugins/amcharts4/core.js"/>"></script>
<script src="<c:url value="/plugins/amcharts4/charts.js"/>"></script>
<script src="<c:url value="/plugins/amcharts4/themes/animated.js"/>"></script>

<link rel="stylesheet" type="text/css" href="<c:url value='/css/map/ol-new.css'/>">
<script src="<c:url value='/js/map/ol6/ol-6_3.js'/>"></script>
<script src="<c:url value="/js/map/proj/proj4.js"/>"></script>
<script src="<c:url value="/js/map/proj/projection.js"/>"></script>
<script src="<c:url value="/js/map/BaseMapConfig.js"/>"></script>
<script src="<c:url value="/js/map/MapFacilityMng.js"/>"></script>
<script src="<c:url value="/js/map/MapMaker.js"/>"></script>
<script src="<c:url value="/js/map/MapLayerMng.js"/>"></script>
<script src="<c:url value="/js/map/MapAction.js"/>"></script>
<script src="<c:url value="/js/map/MapEvtMng.js"/>"></script>
<script src="<c:url value='/js/map/ol-layerswitcher.js'/>"></script>
</c:if>

<link rel="stylesheet" href="<c:url value="/plugins/dropzone/dropzone.css"/>">
<script src="<c:url value="/plugins/dropzone/dropzone.js"/>"></script>
<script src="<c:url value="/js/fileUpload.js"/>"></script>

<script src="<c:url value="/js/common.js"/>"></script>
<script src="<c:url value="/js/project/${flag}.js"/>"></script>

</head>
<body>
	<div class="git container">
		<!-- Header -->
		<%@ include file="/WEB-INF/jsp/common/headerNonFixed.jsp"%>
		
		<div class="git content">
			<div class="git side full">
				<div class="ui massive vertical menu">
					<div class="item">
						<div class="header">공정률</div>
						<div class="menu">
							<a class="item" onclick="location.href='<c:url value='/project/progress.do'/>'">프로젝트 공정률</a>
							<c:if test="${sessionScope.authInfo.roleCde eq 'R001'}">
							<a class="item">작업자별 공정률</a>
							</c:if>
						</div>
					</div>
					<div class="item">
						<div class="header">프로젝트</div>
						<div class="menu">
							<c:if test="${sessionScope.authInfo.roleCde eq 'R001'}">
							<a class="item" onclick="location.href='<c:url value='/project/create.do'/>'">프로젝트 생성</a>
							</c:if>
							<a class="item" onclick="location.href='<c:url value='/project/list.do'/>'">프로젝트 목록</a>
						</div>
					</div>
				</div>
			</div>
			<div class="git article full">
				<jsp:include page="project/${flag}.jsp"></jsp:include>
			</div>
		</div>
	</div>
</body>