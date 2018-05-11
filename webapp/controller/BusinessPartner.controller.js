sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.hcl.AgentDashboard.controller.BusinessPartner", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.hcl.AgentDashboard.view.BusinessPartner
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(!this._oRouter) this._oRouter = oRouter;
			
			this.getView().byId("listBP").setModel(this.getOwnerComponent().getModel("bpListModel"));
			this.getView().byId("bpTable").setModel(this.getOwnerComponent().getModel("bpTableModel"));
			this.getView().byId("bpTable").setModel(this.getOwnerComponent().getModel("bpPrefOverviewModel"),"bpPrefOverviewModel");
			this.getView().byId("bpTable").setModel(this.getOwnerComponent().getModel("bpPrefTypesModel"),"bpPrefTypesModel");
			this.getView().byId("bpTable").setModel(this.getOwnerComponent().getModel("bpPrefChannelsModel"),"bpPrefChannelsModel");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.hcl.AgentDashboard.view.BusinessPartner
		 */
		onBeforeRendering: function() {
			
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.hcl.AgentDashboard.view.BusinessPartner
		 */
		onAfterRendering: function() {
			var viewID = this.getView().getId();
			$("#" + viewID + "--searchFieldBP-F").addClass("bpCustomSearchBox");
			$("#" + viewID + "--btnSummary-inner").addClass("bpSummaryButton");
			$("#" + viewID + "--btnSummary").addClass("bpButtonLocation");
			
			$("#" + viewID + "--idIconTabBarBusinessPartner--header").addClass("iconTabBarHeader");
			$("#" + viewID + "--idIconTabBarBusinessPartner--header-head").addClass("iconTabBarHeaderMargin");
			$("#__data126").addClass("iconTabBarSize");
			
			$("#" + viewID + "--btnAddPreference-inner").addClass("customButton");
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.hcl.AgentDashboard.view.BusinessPartner
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
		
		onSelectTab: function(oEvent) {
			var viewID = this.getView().getId();
			var selectedTab = oEvent.getSource().getSelectedKey();
			if(selectedTab.indexOf("iconTabFilterPrefOverview") >= 0) {
				$("#" + viewID + "--btnAddPreference-inner").addClass("customButton");
			}
		},
		
		onPressEditPreferenceOverview: function(oEvent) {
			var source = oEvent.getSource();
			var clickedRow = source.getParent().getParent().getParent();
			var tablePreferenceOverview = this.getView().byId("bpTabPrefOverview");
			var clickedRowIndex = tablePreferenceOverview.getRows().indexOf(clickedRow);
			tablePreferenceOverview.getRows()[clickedRowIndex].getCells()[0].setEnabled(true);
			tablePreferenceOverview.getRows()[clickedRowIndex].getCells()[1].setEnabled(true);
			tablePreferenceOverview.getRows()[clickedRowIndex].getCells()[2].setEnabled(true);
		},
		
		onPressSavePreferenceOverview: function(oEvent) {
			var source = oEvent.getSource();
			var clickedRow = source.getParent().getParent().getParent();
			var tablePreferenceOverview = this.getView().byId("bpTabPrefOverview");
			var clickedRowIndex = tablePreferenceOverview.getRows().indexOf(clickedRow);
			tablePreferenceOverview.getRows()[clickedRowIndex].getCells()[0].setEnabled(false);
			tablePreferenceOverview.getRows()[clickedRowIndex].getCells()[1].setEnabled(false);
			tablePreferenceOverview.getRows()[clickedRowIndex].getCells()[2].setEnabled(false);
		},
		
		onPressBack: function(oEvent) {
			this._oRouter.navTo("Workbench");
		}
	});
});