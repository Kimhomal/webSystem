(function($){
	
	var USERCOLUMNS = [ {
		'data' : 'usrId',
		'name' : 'usr_id',
		'title' : '사용자ID',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'usrNm',
		'name' : 'usr_nm',
		'title' : '사용자명',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'orgCde',
		'name' : 'org_cde',
		'title' : '소속',
		'type' : 'hidden',
		'searchable': true
	}, {
		'data' : 'roleCde',
		'name' : 'role_cde',
		'title' : '권한',
		'type' : 'hidden',
		'searchable': true
	} ];
	
	$(document).ready(function() {
	    var userTable = $('#userTable').DataTable( {
	        'processing': true,
	        'serverSide': true,
	        'pageLength': 10,
//		        'scrollY': '200px',
	        'ajax': gp.ctxPath + '/system/getUserList.json',
	        'colLength': USERCOLUMNS.length,
	        'columns': USERCOLUMNS
	    } );
	    
	    var waitTable = $('#waitTable').DataTable( {
	        'processing': true,
	        'serverSide': true,
	        'pageLength': 10,
//		        'scrollY': '200px',
	        'ajax': gp.ctxPath + '/system/getWaitUserList.json',
	        'colLength': USERCOLUMNS.length,
	        'columns': USERCOLUMNS
	    } );
	    
	    $('#userTable tbody').on( 'click', 'tr', function () {
	    	$(this).toggleClass('selected');
	    } );
	    
	    $('#waitTable tbody').on( 'click', 'tr', function () {
	    	$(this).toggleClass('selected');
	    } );
	} );
}(jQuery));
