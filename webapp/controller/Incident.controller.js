sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.hcl.AgentDashboard.controller.Incident", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.hcl.AgentDashboard.view.Incident
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(!this._oRouter) this._oRouter = oRouter;
			
			this.getView().byId("tabIncidents").setModel(this.getOwnerComponent().getModel("incidentOpenModel"));
			this.getView().byId("tabIncidentsInProgress").setModel(this.getOwnerComponent().getModel("incidentInProgressModel"));
			this.getView().byId("tabIncidentsClosed").setModel(this.getOwnerComponent().getModel("incidentClosedModel"));
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.hcl.AgentDashboard.view.Incident
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.hcl.AgentDashboard.view.Incident
		 */
		onAfterRendering: function() {
			var viewID = this.getView().getId();
			$("#" + viewID + "--inputIncidentID-inner").addClass("productProposalInput");
			$("#" + viewID + "--btnIncidentSearch-inner").addClass("ppContinueButton");
			
			$("#" + viewID + "--idIconTabIncidentStatus--header").addClass("iconTabBarHeader");
			$("#" + viewID + "--idIconTabIncidentStatus--header-head").addClass("iconTabBarHeaderMargin");
			
			$("#__data8").addClass("iconTabBarSize");
			$("#" + viewID + "--idIconTabIncidentStatus--header").addClass("ppTabBarHeader");
			$("#" + viewID + "--idIconTabIncidentStatus--header-head").addClass("ppTabBarHeaderMargin");
			
			$("#__indicator0-bar").addClass("incidentProgressBar");
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.hcl.AgentDashboard.view.Incident
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
		
		onSelectIncidentTabs: function(oEvent) {
			this.getView().byId("vbIncidentDetails").setVisible(false);
		},
		
		onPressIncidentList: function(oEvent) {
			var openIncidentsModel = this.getView().byId("tabIncidents").getModel();
			var bindingPath = oEvent.getParameters().rowBindingContext.getPath();
			var selectedDataJSON = openIncidentsModel.getProperty(bindingPath);
			var incidentDetailsModel = new sap.ui.model.json.JSONModel(selectedDataJSON);
			this.getView().byId("vbIncidentDetails").setModel(incidentDetailsModel);
			this.getView().byId("vbIncidentDetails").setVisible(true);
		},
		
		onPressIncidentInProgressList: function(oEvent) {
			var openIncidentsModel = this.getView().byId("tabIncidentsInProgress").getModel();
			var bindingPath = oEvent.getParameters().rowBindingContext.getPath();
			var selectedDataJSON = openIncidentsModel.getProperty(bindingPath);
			var incidentDetailsModel = new sap.ui.model.json.JSONModel(selectedDataJSON);
			this.getView().byId("vbIncidentDetails").setModel(incidentDetailsModel);
			this.getView().byId("vbIncidentDetails").setVisible(true);
		},
		
		onPressBack: function(oEvent) {
			this._oRouter.navTo("Workbench");
		}
	});
});