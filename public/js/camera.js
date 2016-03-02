function initCamera() {
	capture($('#live-video'),
			$('#photo-canvas'),
			$('#camera-button'));
}

function capture(video, canvas, snapshotButton) {
	navigator.getUserMedia =
			navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia;
	var ctx = canvas[0].getContext('2d');

	var successCallback = function(mediaStream) {
		video.attr('src', window.URL.createObjectURL(mediaStream));
		snapshotButton.click(function(e) {
				var width = video.width();
				var height = video.height();
				canvas.attr('width', width);
				canvas.attr('height', height);
				ctx.drawImage(video[0], 0, 0, width, height);
				video.hide();
				snapshotButton.hide();
		});
	};

	var errorCallback = function() {
		console.log('Photo capture failed :(');
	};

	navigator.getUserMedia({ 'video': true },
			successCallback, errorCallback);
};
