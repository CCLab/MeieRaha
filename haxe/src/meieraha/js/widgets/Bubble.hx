package meieraha.js.widgets;
import js.Dom;
import meieraha.Data;
import meieraha.js.Base;
import meieraha.js.widgets.Label;
import meieraha.util.Random;
import meieraha.widgets.BubbleLayoutEngine;
import plotex.js.CanvasPloter;

/**
 * The state of a particular bubble
 */
enum BubbleState {
	DEFAULT;		// Default state
	HIGHLIGHTED;	// On mouseover
	DRAGGED;		// When dragged
	RESIZED;		// When resized
}

/**
 * Displays a bubble
 * @author Konstantin
 */
class Bubble implements Drawable {
	public static inline var NUMLABEL_THRESHOLD_RADIUS = 14.5; // Bubbles smaller than that won't have their numlabel shown.
	public static inline var EXPANDBTN_THRESHOLD_RADIUS = 16.6; // Bubbles smaller than that won't have the "expand" button shown unless mouseover
	
	// Bubble information
	public var id: Int;
	public var side: Int; // +1 / -1
	public var value(getValue, setValue): Float;
	private var _value: Float;
	public var amountString(getAmountString, null): String; // Something like "1.0M"
	
	// Bubble visual properties
	public var radius(getRadius, null): Float;
	private var _radius: Float;	// Can only be set via setting "value"
	
	public var color: RgbColor;
	public var hasChildren: Bool;
	public var hasParent: Bool;
	public var title(getTitle, setTitle): String;
	private var _title: String;
	public var position(getPosition, setPosition): Position;
	
	// State information
	public var expanded: Bool;
	public var visible(getVisible, setVisible): Bool;
	private var _visible: Bool;
	public var state: BubbleState;
	
	// Pointer to the managing layout engine
	public var layoutEngine: BubbleLayoutEngine;
	
	// Label widget
	var label: Label;
	var numLabel: Label;
	
	static var imgResize: Dynamic;
	static var imgExpand: Dynamic;
	static var imgContract: Dynamic;
	static var imagesReady: Int;
	
	// Preloads images
	public static function initializeBubbleFactory() {
		imagesReady = -2;
		if (!Base.isIE6) { // Seems that excanvas with IE6 does not support drawImage properly and sometimes crashes
			imgResize = untyped __js__('new Image()');
			untyped __js__("meieraha.js.widgets.Bubble.imgResize['onload'] = function() { meieraha.js.widgets.Bubble.imagesReady++; }");
			imgResize.src = 'static/img/drag.png';
			imgExpand = untyped __js__('new Image()');
			untyped __js__("meieraha.js.widgets.Bubble.imgExpand['onload'] = function() { meieraha.js.widgets.Bubble.imagesReady++; }");
			imgExpand.src = 'static/img/zoom.png';
			imgContract = untyped __js__('new Image()');
			untyped __js__("meieraha.js.widgets.Bubble.imgContract['onload'] = function() { meieraha.js.widgets.Bubble.imagesReady++; }");
			imgContract.src = 'static/img/unzoom.png';
		}
	}
	
	public function new(?title: String,
						?value: Float,
						?color: RgbColor,
						?position: Position) 
	{
		// Create label child element
		label = new Label();
		label.verticalPositioning = TOP;
		numLabel = new Label();
		numLabel.labelNode.css('color', 'white');
		
		this.color = color == null ? {r: 250, g: 0, b: 0}: color;
		this.position = position == null ? { x: 10.0, y: 10.0 } : position;
		this.title = title == null ? "" : title;
		this.value = value == null ? 100000000 : value;
		
		state = DEFAULT;
		expanded = false;
		visible = true;
		side = 1;
		
		layoutEngine = null;
	}
	
	// Free DOM objects
	public function free() {
		label.labelNode.remove();
		numLabel.labelNode.remove();
	}
	
	public function draw(gc: GraphicsContext) {
		if (visible) {
			if (expanded) drawExpanded(gc);
			else drawUnexpanded(gc);
		}
	}
	
	/**
	 * When setting visible to true, we won't immediately assign it to the labels (so that 
	 * the labels are only drawn on the "draw" method).
	 * When setting to false, we assign to labels because this is the only way to hide them.
	 */
	public function setVisible(v: Bool): Bool {
		_visible = v;
		if (!v) {
			label.visible = numLabel.visible = v;
		}
		return _visible;
	}
	
	public function getVisible(): Bool {
		return _visible;
	}
	
	/**
	 * Draw a lightened filled ellipse with a stroke
	 */
	private function drawExpanded(gc: GraphicsContext) {
		gc.setColorFill(color, 0.1);
		gc.setStroke(3, { r: 240, g: 240, b: 240 } );
		//gc.strokeEllipse(position.x, position.y, radius - 5);
		gc.fillEllipse(position.x, position.y, radius - 5);
		
		// Do not show the label (unfortunately we can't "cover them up" by other bubbles.
		if (label.visible) {
			label.visible = false;
			numLabel.visible = false;
		}
	}
	
	/**
	 * Draw a filled ellipse with a separate border around
	 */
	private function drawUnexpanded(gc: GraphicsContext) {
		var ctx = cast(gc, CanvasPloter).ctx;
		
		// Inside ellipse
		if ((state == DRAGGED) || (state == RESIZED)) gc.setColorFill(color, 150.0 / 255);
		else gc.setColorFill(color);
		gc.fillEllipse(position.x, position.y, radius - 5);
		
		var rcos45 = radius * Math.sqrt(2) / 2;
		
		// Outside stroke border
		if (state == HIGHLIGHTED) {
			gc.setStroke(4, { r: 100, g: 100, b: 100 }, 0.5);
			gc.strokeEllipse(position.x, position.y, radius);
			if (imagesReady == 1) ctx.drawImage(imgResize, position.x - rcos45 - 8, position.y - rcos45 - 8);
		}
		
		if (hasChildren || hasParent) {
			if ((state != RESIZED) && (state != DRAGGED)) {
				var t = rcos45 - 11 - 3;
				var img = hasChildren ? Bubble.imgExpand : Bubble.imgContract;
				if ((radius > EXPANDBTN_THRESHOLD_RADIUS) || (state == HIGHLIGHTED)) {
					// For large OR highlighted bubbles draw the "expand" button
					if (imagesReady == 1) ctx.drawImage(img, position.x + t, position.y + t);
				}
			}
		}
		
		// Label
		if (!numLabel.visible) {
			label.visible = true;
			numLabel.visible = (radius > NUMLABEL_THRESHOLD_RADIUS); // Do not show numlabel for smaller bubbles
		}
	}
	
	private function getTitle(): String {
		return _title;
	}
	
	private function setTitle(v: String): String {
		_title = v;
		label.text = formatTitle();
		return _title;
	}
	
	private inline function formatTitle(): String {
		// Each letter is about 8px wide. We allow 5 letter slack
		// maxLetters = _radius * 2 / 8
		var maxLetters: Int = Math.floor(_radius / 4) + 5;
		var s = _title.toUpperCase();
		if (s.length > maxLetters) {
			s = s.substr(0, maxLetters - 2) + '&hellip;';
		}
		return s;
	}
	
	private function getPosition(): Position {
		return numLabel.position;
	}
	
	private function setPosition(v: Position): Position {
		numLabel.position = v;
		label.position = { x: v.x, y: v.y + radius};
		return v;
	}
	
	private function getRadius(): Float {
		return _radius;
	}
	
	private function getValue(): Float {
		return _value;
	}
	private function setValue(v: Float): Float {
		_radius = valueToRadius(v, true);
		_value = v;
		numLabel.text = valueToAmountStr(v);
		if (radius <= NUMLABEL_THRESHOLD_RADIUS) numLabel.visible = false; // Do not show numlabel for smaller bubbles
		label.text = formatTitle();
		setPosition(getPosition()); // Repositions the label
		return v;
	}
	private function getAmountString(): String {
		return numLabel.text;
	}
	
	public function hitTest(x: Float, y: Float): Bool {
		var dx = x - position.x;
		var dy = y - position.y;
		var d2 = dx * dx + dy * dy;
		var r = radius + 2;
		return (d2 < r * r);
	}
	
	/**
	 * Converts bubble's "radius" (which includes margin!) to the corresponding value
	 */
	public static function radiusToValue(r: Float): Float {
		if (r <= 6) r = 6;
		var v = Data.bubbleScalingFactor * (r - 5);
		return v * v;
	}
	
	
	public inline static function valueToRadius(v: Float, withMargin: Bool): Float {
		var r = Math.sqrt(v) / Data.bubbleScalingFactor;
		if (withMargin) r += 5;
		return r;
	}
	
	public inline static function valueToAmountStr(v: Float): String {
		var amount = Math.round(10 * v / (Data.valueRoundingFactor / Data.valueScalingFactor));
		// XXX: For estonian meieraha there was no this check
		var amountStr = (amount % 10 == 0) ? Std.string(Math.floor(amount/10)) + ' ' + Data.valueRoundingFactorChar : Std.string(Math.floor(amount / 10)) + '.' + Std.string(amount % 10) + Data.valueRoundingFactorChar;
		return amountStr;
	}
}

/**
 * Utility functions which feel better out of the widget class
 */
class BubbleUtil {
	public static function makeBubble(item: DataItem): Bubble {
		var b = new Bubble(item.title, item.value, makeColor(item), { x: 100.0, y: 100.0 } );
		b.id = item.id;
		return b;
	}
	
	public static function makeColor(item: DataItem): RgbColor {
		// Generate a random number based on item id
		var r = new Random(23167*item.id % 34123);
		
		// We generate the color as 50*(x,y,z), and ensure that the sum of x,y,z is at least 7.
		var a, b, c;
		do {
			a = r.nextInt(0, 5);
			b = r.nextInt(0, 5);
			c = r.nextInt(0, 5);
		} while (a + b + c < 7 || a+b+c > 13);
		
		return { r: 50 * a, g: 50 * b, b: 50 * c };
	}

	/*public static function stringHash(s: String, ?modulo: Int = 0x1000000): Int {
		var r = 0;
		for (i in 0...s.length) {
			r = (r * 7 + s.charCodeAt(i)) % modulo;
		}
		return r;
	}*/
	

}