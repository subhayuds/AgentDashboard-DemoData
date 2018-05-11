sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.hcl.AgentDashboard.controller.Login", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(!this._oRouter) this._oRouter = oRouter;
		},
		
		onAfterRendering: function() {
			var viewID = this.getView().getId();
			$("#" + viewID + "--txtUsername-inner").addClass("customInputBox");
			$("#" + viewID + "--txtPassword-inner").addClass("customInputBox");
			$("#" + viewID + "--btnLogin-inner").addClass("customButton");
			$("#" + viewID + "--linkForgotPassword").addClass("customLink");
		},
		
		onPressLogin: function() {
			var userName = this.getView().byId("txtUsername").getValue();
			var password = this.getView().byId("txtPassword").getValue();
			if((userName === "10002784") && (password === "Shawn")) {
				this._oRouter.navTo("Workbench");
			}
		}
	});
});