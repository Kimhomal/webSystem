(function(window, $, Dropzone) {
	'use strict';
	
	var fileUpload = function(options){
		var that = this;
		var opt = options || {};
		var target = opt.target || '#fileupload';
		var sending = opt.sending || function(file, xhr, formData){
			console.log(formData.values())
		};
		
		Dropzone.autoDiscover = false;
		this.dropzone = new Dropzone(target, { 
			url: gp.ctxPath + '/project/uploadResultImage.json',
			uploadMultiple: true,
			maxFiles: 30,
			parallelUploads: 30,
			autoProcessQueue: false,
			paramName: 'file',
//			thumbnailWidth: 60,
//			thumbnailHeight: 60,
			dictDefaultMessage: '사진을 업로드해주세요!',
			clickable: '.add-files-btn',
			previewTemplate: document.querySelector('#dropzone-template').innerHTML,
			uploadprogress: function(file, progress, bytesSent) {
				$(file.previewElement).find('.ui.progress').progress({percent: progress});
			},
			sending: sending
		});
		
		this.dropzone.on('complete', function(file){
			that.dropzone.removeFile(file);
		});
	}
	
	window.am = window.am || {};
	window.am.FileUpload = fileUpload;
})(window, jQuery, Dropzone);
