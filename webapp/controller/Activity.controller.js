sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.hcl.AgentDashboard.controller.Activity", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.hcl.AgentDashboard.view.Activity
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(!this._oRouter) this._oRouter = oRouter;
			
			this.getView().byId("idIconTabBarActivity").setModel(this.getOwnerComponent().getModel("activityModel"));
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.hcl.AgentDashboard.view.Activity
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.hcl.AgentDashboard.view.Activity
		 */
		onAfterRendering: function() {
			var viewID = this.getView().getId();
			$("#__data6").addClass("iconTabBarSize");
			$("#" + viewID + "--idIconTabBarActivity--header").addClass("ppTabBarHeader");
			$("#" + viewID + "--idIconTabBarActivity--header-head").addClass("ppTabBarHeaderMargin");
			
			var tableFollowupActivity = this.getView().byId("tabFollowupActivity");
			for(var i=0;i<tableFollowupActivity.getRows().length;i++) {
				if(i%2 !== 0) {
					tableFollowupActivity.getRows()[i].$().addClass("tableRowBackgroundDark");
					// $("#" + viewID + "--tabFollowupActivity-rows-row3").addClass("tableRowBackgroundDark");
				}
			}
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.hcl.AgentDashboard.view.Activity
		 */
		//	onExit: function() {
		//
		//	}
		
		onPressUserMenu: function(oEvent) {
			var oButton = oEvent.getSource();
			// create menu only once
			if (!this._menu) {
				this._menu = sap.ui.xmlfragment(
					"com.hcl.AgentDashboard.fragment.UserMenu",
					this
				);
				this.getView().addDependent(this._menu);
			}

			var eDock = sap.ui.core.Popup.Dock;
			this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
		},
		
		handleLogoffMenuPress: function(oEvent) {
			this._oRouter.navTo("Login");
		},
		
		onPressBack: function(oEvent) {
			this._oRouter.navTo("Workbench");
		}
	});
});