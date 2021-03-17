<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>

<spring:eval expression="@sysProps['geoserver.url']" var="geoUrl"/>
<spring:eval expression="@sysProps['base.map.url']" var="basemapUrl"/>


<script type="text/javascript">
	
	var gp = {
		ctxPath : "${pageContext.request.contextPath}",
        proxyPath : "${pageContext.request.contextPath}/proxy/proxy.jsp?url=",
		geoUrl :  "${pageContext.request.contextPath}/proxy/proxy.jsp?url=${geoUrl}",
		baseUrl : "${basemapUrl}",
	}
</script>