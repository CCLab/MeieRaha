package meieraha.js;
import JQuery;
import haxe.Timer;
import js.Lib;
import meieraha.js.Mouse;
import meieraha.js.widgets.Bubble;
import meieraha.js.widgets.ComparisonBubble;
import meieraha.js.widgets.Label;
import meieraha.widgets.App;
import plotex.Ploter;

// Rename the class for convenience
typedef GraphicsContext = Ploter;

typedef RgbColor = plotex.RgbColor;

// -- Some useful classes -------------------------
typedef Position = {
	x: Float, y: Float
}

typedef Bounds = {
	left: Float, right: Float, top: Float, bottom: Float
}

interface Drawable {
	public function draw(gc: GraphicsContext): Void;
}

/**
 * Static "framework" class, keeping all the ugly global variables and engine-specifics.
 */
class Base {
	static var containerNode: JQuery; // The container node. It receives mouse events.
	static var canvasNode: JQuery; // The canvas node
	static var rulesNode: JQuery;
	static var hintNode: JQuery;
	static var scalesNode: JQuery;
	
	static var instance: App;
	static var gc: GraphicsContext;
	static var ieVersion: Float;
	public static var isIE6: Bool;
	public static var isIE7: Bool;
	
	public static function main() {
		ieVersion = Base.getInternetExplorerVersion();
		isIE6 = (ieVersion > 0) && (ieVersion < 7);
		isIE7 = (ieVersion > 0) && (ieVersion < 8);
		var runApp = function() {
			// Initialize canvas element and js hacks
			initializeEngine("AppContainer", "AppCanvas");

			// Create application
			var app = new App(containerNode.width(), containerNode.height());
			// Allows to use closure compiler's advanced optimizations
			untyped __js__("app['mousemove'] = app.mousemove;");
			untyped __js__("app['mouseup'] = app.mouseup;");
			untyped __js__("app['mouseover'] = app.mouseover;");
			untyped __js__("app['mousedown'] = app.mousedown;");
			untyped __js__("app['click'] = app.click;");
			instance = app;
			
			// Bind mouse listeners to the container and children
			MouseUtil.addMouseListener(containerNode, instance);
			
			// Bind mouse listener to the "reset" button
			new JQuery("#ResetButton").click(function() { app.reset(); } );
			rulesNode = new JQuery("#RulesDisplay");
			hintNode = new JQuery("#HintDisplay");
			scalesNode = new JQuery("#ScaleImage");
			
			// Load data for appropriate year
			var data = Data.loadData();
			app.setData(data);
			
			// Add comparison bubbles
			for (e in data.scales)
				ComparisonBubble.make(e.title, e.description, e.value);
			
			// Start application by requesting a repaint
			Base.requestRepaint();
		}
		if (Lib.isIE) {
			// For no clear reason we have to give a small timeout for IE to initialize ExCanvas properly
			new JQuery(function() {
				Timer.delay(runApp, 1000);
			});
		}
		else new JQuery(runApp);
	}
	
	static function initializeEngine(containerId: String, canvasId: String) {
		// Initialize member variables
		containerNode = new JQuery('#' + containerId);
		canvasNode = new JQuery('#' + canvasId);
		
		// Initialize the "Label" hack
		Label.initializeLabelFactory(containerNode);
		Bubble.initializeBubbleFactory();
		
		// Initialize graphics engine for the canvas
		#if flash	// Actually, flash is not supported yet, but in principle, this might be a way to add such support
			gc = new plotex.flash.FlashPloter(flash.Lib.current);
		#elseif js
			var canvas = plotex.js.CanvasUtil.getCanvas(canvasId);
			var ctx = canvas.getContext('2d');
			gc = new plotex.js.CanvasPloter(ctx);
		#end
	}
	
	public static function requestRepaint() {
		if (instance != null) instance.draw(gc);
	}
	
	public static function drawNow(d: Drawable) {
		d.draw(Base.gc);
	}
	public static function status(s: String) {
		new JQuery("#info-box").html(s);
	}
	
	public static function setCursor(cursor: String) {
		containerNode.cssSet('cursor', cursor);
	}
	
	// http://msdn.microsoft.com/en-us/library/ms537509%28v=vs.85%29.aspx
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	private static function getInternetExplorerVersion(): Float {
	  var rv = -1; // Return value assumes failure.
	  if (Lib.window.navigator.appName == 'Microsoft Internet Explorer') {
		var ua = Lib.window.navigator.userAgent;
		var re  = untyped __js__('new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})")');
		if (re.exec(ua) != null)
		  rv = untyped __js__('parseFloat( RegExp.$1 )');
	  }
	  return cast rv;
	}

	public static function setNewBalance(balance: Float) {
		var bal = Math.round(10 * balance/ (Data.valueRoundingFactor / Data.valueScalingFactor));
		var sign = (bal == 0 ? '' : (bal > 0 ? '+' : '-'));
		bal = Math.round(Math.abs(bal));
		var s = sign + Math.round(bal / 10) + '.' + (bal % 10) + Data.valueRoundingFactorChar;
		var bv = Lib.document.getElementById("BudgetValue");
		bv.innerHTML = s;
		if (bal < 1000) {
			scalesNode.removeClass().addClass("norm");
		}
		else if (sign == '-') scalesNode.removeClass().addClass("max");
		else scalesNode.removeClass().addClass("min");
	}
	
	public static function showRules(s: String) {
		rulesNode.html(s);
		rulesNode.cssSet('display', 'block');
	}
	
	public static function hideRules() {
		rulesNode.cssSet('display', 'none');		
	}

	public static function showHint(s: String, x: Float, y: Float) {
		hintNode.html(s);
		hintNode.cssSet('left', '' + (x+4) + 'px');
		hintNode.cssSet('top', '' + (y-30) + 'px');
		hintNode.cssSet('display', 'block');
	}
	
	public static function hideHint() {
		hintNode.cssSet('display', 'none');		
	}

}