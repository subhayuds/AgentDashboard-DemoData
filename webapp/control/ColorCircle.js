sap.ui.core.Control.extend("com.hcl.AgentDashboard.control.ColorCircle", {
    metadata : {                              
        properties : {
           	"value" : {type: "string", defaultValue: "All"},
			"size" : {type: "sap.ui.core.CSSSize", defaultValue: "50px"},
			"greenHours" : {type: "string", defaultValue: "100.00"},
			"yellowHours" : {type: "string", defaultValue: "0.00"}
        },  
        events : {  
            "press" : {}  
        }  
    },
    
    onclick : function(evt) {
        this.firePress();  
    },

    renderer : function(oRm, oControl) {      
		oRm.write("<div"); 
		oRm.writeControlData(oControl);  
		oRm.addStyle("width", oControl.getSize());                                                        
		oRm.addStyle("height", oControl.getSize());
		//oRm.addStyle("cursor", "pointer");
		oRm.writeStyles();

		if(oControl.getYellowHours() > 0){
			oRm.addClass("circleyellow-text");
		}else{
			oRm.addClass("circlegreen-text");
		}
		
		oRm.writeClasses();               
		oRm.write(">");
		oRm.write("<div>"); 	  
		oRm.write(oControl.getValue());  
		oRm.write("</div>");                                                
		oRm.write("</div>");
    }
});