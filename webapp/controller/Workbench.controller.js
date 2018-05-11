sap.ui.define([
	'com/hcl/AgentDashboard/control/ColorCircle',
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format'
], function(ColorCircle, jQuery, Controller, JSONModel, ChartFormatter, Format) {
	"use strict";

	return Controller.extend("com.hcl.AgentDashboard.controller.Workbench", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.hcl.AgentDashboard.view.Workbench
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(!this._oRouter) this._oRouter = oRouter;
			
			this.byId("iconUserMenu").attachBrowserEvent("tab keyup", function(oEvent){
				this._bKeyboard = oEvent.type == "keyup";
			}, this);
			
			this.getView().setModel(this.getOwnerComponent().getModel("newsModel"),"newsModel");
			this.getView().setModel(this.getOwnerComponent().getModel("knowledgeHubModel"),"knowledgeHubModel");
			
			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
   //         oVizFrame.setVizProperties({
   //             title: {
   //                 visible: false
   //             }
   //         });
   //         oVizFrame.setModel(this.getOwnerComponent().getModel("incidentTicketStatusModel"));
            
   //         var oVizFrame2 = this.oVizFrame = this.getView().byId("idVizFrame2");
   //         oVizFrame2.setVizProperties({
   //             title: {
   //                 visible: false
   //             }
   //         });
   //         oVizFrame2.setModel(this.getOwnerComponent().getModel("customerSatisfactionModel"));
            
   //         var oVizFrameFollowup = this.oVizFrameFollowup = this.getView().byId("idVizFrameFollowup");
   //         oVizFrameFollowup.setVizProperties({
   //             title: {
   //                 visible: false
   //             }
   //         });
   //         oVizFrameFollowup.setModel(this.getOwnerComponent().getModel("followupModel"));
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.hcl.AgentDashboard.view.Workbench
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.hcl.AgentDashboard.view.Workbench
		 */
		onAfterRendering: function() {
			var viewID = this.getView().getId();
			$("#__field0-F").addClass("customSearchBox");
			$("#__field0-I").addClass("customFontColor");
			$("#__field0-reset").addClass("customFontColor");
			$("#__field0-search").addClass("customFontColor");
			
			$("#__content0-icon-image").addClass("profileImage");

			$("#" + viewID + "--pbBillingIssue-bar").addClass("billingIssueProgressBarColor");
			$("#" + viewID + "--pbFinanceIssue-bar").addClass("financeIssueProgressBarColor");
			$("#" + viewID + "--pbProductProposal-bar").addClass("productProposalProgressBarColor");
			
			$("#" + viewID + "--listNews-listUl li").addClass("customList");
			
			$("#" + viewID + "--listKnowledgeHub-listUl li").addClass("customList");
			
			// $("#" + viewID + "--btnBPEM-inner").addClass("dashboardBottomButtons");
			// $("#" + viewID + "--btnBPEM-img").addClass("dashboardBottomButtonIcons");
			// $("#" + viewID + "--btnProductDetails-inner").addClass("dashboardBottomButtons");
			// $("#" + viewID + "--btnProductDetails-img").addClass("dashboardBottomButtonIcons");
			// $("#" + viewID + "--btnConsumption-inner").addClass("dashboardBottomButtons");
			// $("#" + viewID + "--btnConsumption-img").addClass("dashboardBottomButtonIcons");
			// $("#" + viewID + "--btnComplaints-inner").addClass("dashboardBottomButtons");
			// $("#" + viewID + "--btnComplaints-img").addClass("dashboardBottomButtonIcons");
			
			$("#__field1-F").addClass("knowledgeHubSearchBar");
			$("#__field1-F").addClass("knowledgeHubSearchBarForm");
			$("#__field1-I").addClass("knowledgeHubSearchBar");
			$("#__field1-I").addClass("knowledgeHubSearchBarInput");
			$("#__field1-reset").addClass("knowledgeHubSearchBar");
			$("#__field1-search").addClass("knowledgeHubSearchBar");
			
			/**** MAP Integration START ****/
			this.initialized = true;
	        this.geocoder = new google.maps.Geocoder();
	        var tab = this.getView().byId("hbMap");
	        tab.addStyleClass("myMap");
                           
	        this.geocoder.geocode({"address": "New York" }, function (results, status) {
		    	if (status === google.maps.GeocoderStatus.OK) {
	               var mapOptions = {
	                    center: new google.maps.LatLng(-10.397, 20.644),
	                    zoom: 8,
	                    mapTypeId: google.maps.MapTypeId.ROADMAP
	                };
	            	var map = new google.maps.Map(tab.getDomRef(),mapOptions);
	            	map.setCenter(results[0].geometry.location);
	                var marker = new google.maps.Marker({
	                  map: map,
	                  position: results[0].geometry.location
	                });
		        }
	        });
	        /**** MAP Integration END ****/
	        
	        var that = this;
			this.getView().byId("txtIncidentTileHader").attachEvent("press",function(oEvent){
				that.onPressIncident(oEvent);	
			});
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.hcl.AgentDashboard.view.Workbench
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
		
		onPressBPSearch: function(oEvent) {
			this._oRouter.navTo("BusinessPartner");
		},
		
		onPressBPEM: function(oEvent) {
			this._oRouter.navTo("BPEM");
		},

		onPressProductDetails: function(oEvent) {
			this._oRouter.navTo("ProductProposal");
		},
		
		onPressConsumption: function(oEvent) {
			this._oRouter.navTo("Consumption");
		},
		
		onPressIncident: function(oEvent) {
			this._oRouter.navTo("Incident");
		},
		
		onPressFollowup: function(oEvent) {
			this._oRouter.navTo("Activity");
		},
		
		onPressMyComplaints: function(oEvent) {
			this._oRouter.navTo("MyComplaint");
		},
		
		onSearchKnowledgeHub: function(oEvent) {
			var searchText = oEvent.getSource().getValue();
			if(searchText.toUpperCase() === "PAYMENT")
				this._oRouter.navTo("PaymentFAQ");
		},
		
		onPressKnowledgeHubLink: function(oEvent) {
			var knowledgeHubListItems = ((this.getView()).byId("listKnowledgeHub")).getItems();
			var selectedItemIndex = knowledgeHubListItems.indexOf(((oEvent.getSource()).getParent()).getParent());
			if(selectedItemIndex === 0)
				this._oRouter.navTo("BillingFAQ");
		},
		
		handleNewsTitleClick: function(oEvent) {
			var searchText = oEvent.getSource().getText();
			if(searchText.toUpperCase().indexOf("TECHNOVATION") >= 0)
				this._oRouter.navTo("Technovasion");
		}
	});

});