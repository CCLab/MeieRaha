package meieraha.js;
import JQuery;

typedef MouseEvent = { > JQueryEvent, canvasX : Float, canvasY : Float };

interface MouseListener {
	function click(e: MouseEvent): Void;
	function mouseup(e: MouseEvent): Void;
	function mouseover(e: MouseEvent): Void;
	function mousemove(e: MouseEvent): Void;
	function mousedown(e: MouseEvent): Void;
}

class MouseUtil {
	/**
	 * Binds click, mouseup, mouseover, mousedown, mousemove events of a given DomElement to a given class.
	 */
	public static function addMouseListener(jqDomElement: JQuery, listener: MouseListener) {
		function bindMethod(eventType: String) {
			jqDomElement.bind(eventType, function(e: MouseEvent) {
				// Compute actual mouse offset
				var position = jqDomElement.offset();
				e.canvasX = Math.floor(e.pageX - position.left);
				e.canvasY = Math.floor(e.pageY - position.top);
				// Invoke listener method (e.g. listenerClass.click(e), listenerClass.mouseup(e), etc)
				untyped {
					listener[eventType](e);
				}
			});
		}
		for (m in ["click", "mouseup", "mouseover", "mousedown", "mousemove"]) bindMethod(m);
	}	
}