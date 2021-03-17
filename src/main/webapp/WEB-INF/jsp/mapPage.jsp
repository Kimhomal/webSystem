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
	href="<c:url value='/css/map/facilMap.css'/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value='/css/map/ol-new.css'/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/plugins/semantic/semantic.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/plugins/jstree/themes/proton/style.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/project.css"/>">

<script src="<c:url value="/plugins/jquery/jquery-1.12.3.min.js"/>"></script>
<script src="<c:url value="/plugins/jquery/jquery.form.min.js"/>"></script>
<script src="<c:url value="/plugins/semantic/semantic.js"/>"></script>
<script src="<c:url value="/plugins/amcharts4/core.js"/>"></script>
<script src="<c:url value="/plugins/amcharts4/charts.js"/>"></script>
<script src="<c:url value="/plugins/amcharts4/themes/animated.js"/>"></script>
<script src="<c:url value="/plugins/html2canvas/html2canvas.min.js"/>"></script>
<script src="<c:url value="/plugins/jstree/jstree.js"/>"></script>
<script src="<c:url value="/js/layerFilter.js"/>"></script>
<script src="<c:url value="/js/cross.js"/>"></script>
<script src="<c:url value="/js/camera.js"/>"></script>
<script src="<c:url value="/js/imageFeatures.js"/>"></script>
<script src="<c:url value="/js/common.js"/>"></script>
<script src="<c:url value="/js/mapPage.js"/>"></script>

<!-- map 관련 script -->
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

<!-- 위치 추적 기능(openlayers, onsenUI 필수) -->
<script src="<c:url value="/js/orientation.js"/>"></script>
<script src="<c:url value="/js/featureInfo.js"/>"></script>
</head>
<body>
	<!-- Header -->
	<%-- <%@ include file="/WEB-INF/jsp/common/header.jsp"%> --%>

	<form:form commandname="searchOpt" id="searchFrm" name="searchFrm"
		method="POST">
		<input type="hidden" id="method" name="method" value="select">
		<input type="hidden" id="itptId" name="itptId" value="">
		<input type="hidden" id="idx1No" name="idx1No" value="">
		<input type="hidden" id="flag" name="flag" value="">
		<input type="hidden" id="itptCenterX" name="itptCenterX"
			value="${itptCenterX}">
		<input type="hidden" id="itptCenterY" name="itptCenterY"
			value="${itptCenterY}">
	</form:form>
	
	<!-- <div style="position: fixed; width: 25%; height: 100%; z-index: 1; background: white; padding-top: 3.7em; overflow: auto;">
		<div class="ui segment">
			<button class="ui green button cross-section">
				<i class="stream icon"></i>횡단면도
			</button>
		</div>
		<div class="ui segment">
			<div class="ui top attached tabular pointing secondary menu">
				<a class="item active" data-tab="first">레이어 관리</a>
				<a class="item" data-tab="second">실시간 성과 등록</a>
			</div>
			<div class="ui bottom attached tab segment" data-tab="first">
				<div id="layerTree" style="height: 25em; overflow: auto;"></div>
			</div>
			<div class="ui bottom attached tab segment" data-tab="second">ch</div>
		</div>
	</div>


	<div id="map" style="width: 100%; height: 100%;"></div> -->
	
	<div class="git container">
		<%@ include file="/WEB-INF/jsp/common/headerNonFixed.jsp"%>
		
		<div class="git content">
			<div class="git side full">
				<div class="ui segment">
					<button class="ui green button cross-section">
						<i class="stream icon"></i>횡단면도
					</button>
				</div>
				<div class="ui segment">
					<div class="ui top attached tabular pointing secondary menu">
						<a class="item active" data-tab="first">레이어 관리</a>
						<a class="item" data-tab="second">실시간 성과 등록</a>
					</div>
					<div class="ui bottom attached tab segment" data-tab="first">
						<div id="layerTree" style="height: 25em; overflow: auto;"></div>
					</div>
					<div class="ui bottom attached tab segment" data-tab="second">ch</div>
				</div>
			</div>
			<div class="git article full">
				<div id="map" style="width: 100%; height: 100%;"></div>
			</div>
		</div>
	</div>
	
	<!-- 레이어 선택 팝업 -->
	<div class="layer_wrap layer_mapInfo" style="display: none;">
		<!-- layer_inner -->
		<div class="layer_inner">
			<div class="layer_header">
				<h3>레이어 정보</h3>
			</div>
			<!-- layer_body -->
			<div class="layer_body">
				<div class="layer_box">
					<ul class="mapInfo_list">
					</ul>
				</div>
			</div>
			<!-- //layer_body -->
		</div>
		<!-- //layer_inner -->
	</div>
	
	<script type="text/javascript">
		var proj = new Proj();
	</script>
</body>