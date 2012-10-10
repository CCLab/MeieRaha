/**
 * Initializes the comparison bubbles using JQuery-UI library (draggable support)
 */
$(document).ready(function() {
	
	// show/hide comparison bubbles
	$("#compare-link").click(function () {
    	$("#compare-bubbles").show("slow");
    	$("#compare-link").hide(0);
    });
	
	$("#compare-close").click(function () {
    	$("#compare-bubbles").hide("slow", function() { 
			$("#compare-link").show(0); 
		});    	
    });		
});
