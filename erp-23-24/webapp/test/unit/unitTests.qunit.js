/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"erp-23-24/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
