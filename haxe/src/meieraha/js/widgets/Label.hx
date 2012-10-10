package meieraha.js.widgets;
import JQuery;
import js.Dom;
import js.Lib;
import meieraha.js.Base;
import meieraha.js.Mouse;

enum VerticalPositioning { 
	CENTER; TOP;
}

/**
 * This is a hack around canvas's lack of proper support for "drawText" in older browser versions.
 * Instead of drawing text we just create a div with that text and try to position it appropriately.
 * @author Konstantin
 */
class Label {
	/**
	 * This method must be called before any labels can be created.
	 * The whole "label" functionality here is a huge hack, where actual labels are created as DOM elements rather than
	 * drawn on the canvas using some reasonable drawText method. To be able to support this hack, we need an additional wrapper-div
	 * around the canvas. This wrapper div will perform two roles:
	 *	 * It will receive all mouse events instead of the canvas (hence it must wrap the canvas tightly, no paddings).
	 *   * It will be the container for all label DIVs. This way they won't prevent mouse events.
	 * 
	 * The current implementation only supports one wrapper+canvas instance on the page and assumes that those elements won't
	 * move around (i.e. their offset is computed only once during initialization)
	 */
	// It is the container element to which all labels will be added, it must be directly wrapping the canvas.
	private static var containerNode: JQuery;
	// Container offset (must be same as canvas offset).
	private static var containerOffsetLeft: Float;
	private static var containerOffsetTop: Float;
	
	public static function initializeLabelFactory(containerNode: JQuery) {
		Label.containerNode = containerNode;
		Label.containerOffsetLeft = containerNode.offset().left;
		Label.containerOffsetTop  = containerNode.offset().top;
	}
	
	// Position of the element wrt the container
	public var position(getPosition, setPosition): Position;
	private var _position: Position;

	// Interpretation of the "position" element: either CENTER or TOP
	public var verticalPositioning: VerticalPositioning;
	
	// Precomputed element offsets for centered positioning or null
	private var fullOffset: Position;
	
	// Text. If you set it, you should set position again.
	public var text(getText, setText): String;
	private var _text: String;
	
	// Visibility
	public var visible(getVisible, setVisible): Bool;
	private var _visible: Bool;
	
	// The DOM element
	public var labelNode: JQuery;
	
	/**
	 * Create label. Note that the label is *invisible* by default when created.
	 * @param	text	Label text
	 */
	public function new() {
		if (containerNode == null) trace("Label.initializeLabelFactory must be called before anything is done");
		
		// Create the div representing the label
		labelNode = new JQuery(Lib.document.createElement('DIV'));
		labelNode.addClass('canvas-label');
		containerNode.append(labelNode);
		
		verticalPositioning = CENTER;
		fullOffset = null;
		_visible = false;
		_text = "";
	}
	
	// Attribute accessors
	private function getText(): String {
		return _text;
	}
	private function setText(v: String): String {
		labelNode.htmlSet(v);
		if (visible) reposition();
		else fullOffset = null;
		return (_text = v);
	}
	
	private function getPosition(): Position {
		return _position;
	}
	private function setPosition(v: Position): Position {
		if (fullOffset != null) {
			labelNode.cssSet('left', v.x + fullOffset.x  + 'px');
			labelNode.cssSet('top',  v.y + fullOffset.y  + 'px');
		}
		return (_position = v);
	}
	
	private function getVisible(): Bool {
		return _visible;
	}
	private function setVisible(v: Bool): Bool {
		labelNode.cssSet('display', v ? 'block' : 'none');
		// Element's actual width and height are only available when it becomes visible in some browsers (e.g. IE)
		if (v && (fullOffset == null)) reposition();
		return (_visible = v);
	}
	
	private function reposition() {
		fullOffset = { x: -labelNode.width() / 2, y: (verticalPositioning == CENTER) ? -labelNode.height() / 2 : 0 };
		setPosition(_position);
	}
}
