"use strict";
function Edimax() {
}

Edimax.prototype.playVideoSDK = function (url, options) {
	options = options || {};
	var handleSuccessCallback = function(playbackInfo) {
		DevExpress.ui.notify("Döndü", "info", 1000);
	}
	cordova.exec(handleSuccessCallback, options.errorCallback || null, "Edimax", "playVideo", [url, options]);
};

Edimax.prototype.playAudio = function (url, options) {
	options = options || {};
	var handleSuccessCallback = function(playbackInfo) {
		if (options.successCallback && playbackInfo.isDone) {
			options.successCallback(playbackInfo);
		} else if (options.progressCallback && !playbackInfo.isDone) {
			options.progressCallback(playbackInfo);
		}
	}
	cordova.exec(handleSuccessCallback, options.errorCallback || null, "Edimax", "playVideo", [url, options]);
};

Edimax.install = function () {
	if (!window.plugins) {
		window.plugins = {};
	}
	window.plugins.edimax = new Edimax();
	return window.plugins.edimax;
};

cordova.addConstructor(Edimax.install);