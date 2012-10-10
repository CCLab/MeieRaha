package meieraha.widgets;
import meieraha.js.Base;
import meieraha.js.widgets.Bubble;

typedef BubbleReference = {
	position: Position,
	bubble: Bubble
}

/**
 * Lays out a given set of bubbles
 * @author Konstantin
 */
class BubbleLayoutEngine {
	private var bounds: Bounds;
	private var bubbles: Array<BubbleReference>; // Bubbles registered for layout
	
	/**
	 * Creates a new bubble pane with given coordinates.
	 */
	public function new(bounds: Bounds) {
		this.bounds = Reflect.copy(bounds);
		bubbles = new Array<BubbleReference>();
	}
	
	/**
	 * Registers bubble with the layout engine.
	 */
	public function registerBubble(b: Bubble) {
		bubbles.push( { position: null, bubble: b } );
		b.layoutEngine = this;
	}
	
	/**
	 * Removes the bubble from layout
	 */
	public function unregisterBubble(b: Bubble) {
		for (bbl in bubbles)
			if (bbl.bubble == b) {
				bubbles.remove(bbl);
				break;
			}
	}
	
	/**
	 * First step of the layout procedure - copies all registered bubbles positions
	 */
	private function prepareLayout() {
		for (b in bubbles) b.position = Reflect.copy(b.bubble.position);
	}

	/**
	 * Last step of the layout procedure - updates positions for all bubbles
	 */
	private function finishLayout() {
		for (b in bubbles) b.bubble.position = Reflect.copy(b.position);
	}
	
	/**
	 * Pushes bubbles apart a bit if any of them overlap. Returns true if at least one bubble moved.
	 * Repeat this procedure several times to move bubbles away from each other.
	 */
	private function pushBubbles(): Bool {
		var moved = false;
		
		for (i in 0...bubbles.length) {
			
			// Compute delta for bubble[i] by computing a small contribution from each overlapping bubble
			var delta = { x: 0.0, y: 0.0 };
			var pi = bubbles[i].position;
			var ri = bubbles[i].bubble.radius;
			
			for (j in 0...bubbles.length) {
				if (i != j) {
					var pj = bubbles[j].position;
					
					// Do bubbles overlap?
					var d = { x: pi.x - pj.x, y: pi.y - pj.y };
					var minR = ri + bubbles[j].bubble.radius + 5;
					if (d.x * d.x + d.y * d.y < minR * minR) {
						delta.x += d.x / 10;	// XXX: Note that this is not a normalized push
						delta.y += d.y / 10;
						if (d.x == 0 && d.y == 0) {
							delta.x += Math.random() * 2 - 1;
							delta.y += Math.random() * 2 - 1;
						}
					}
				}
			}
			
			// Now apply the new position
			if (delta.x != 0 || delta.y != 0) {
				moved = true;
				pi.x += delta.x;
				pi.y += delta.y;
				if (pi.x < (bounds.left + ri)) pi.x = bounds.left + ri;
				if (pi.x > (bounds.right - ri)) pi.x = bounds.right - ri;
				if (pi.y < (bounds.top + ri)) pi.y = bounds.top + ri;
				if (pi.y > (bounds.bottom - 30 - ri)) pi.y = bounds.bottom - ri;
			}
			else {
				// Is bubble out of bounds?
				if (pi.x < (bounds.left + ri)) { pi.x = bounds.left + ri; moved = true; }
				if (pi.x > (bounds.right - ri)) { pi.x = bounds.right - ri; moved = true; }
				if (pi.y < (bounds.top + ri)) { pi.y = bounds.top + ri; moved = true; }
				if (pi.y > (bounds.bottom - 30 - ri)) { pi.y = bounds.bottom - ri; moved = true; }
			}
		}
		return moved;
	}


	/**
	 * Pushes bubbles around to accomodate for incremental changes.
	 */
	public function performIncrementalLayout() {
		prepareLayout();
		var limiter = 100;
		while (this.pushBubbles() && (limiter-- > 0)) {}
		finishLayout();
	}
	
	
	/**
	 * Initializes bubbles in an orderly grid
	 */
	public function performOrderedLayout() {
		prepareLayout();
		
		// Layout settings
		// Estonian meieraha
/*		var TOP_MARGIN = 80;
		var RIGHT_MARGIN = 5;
		var LEFT_MARGIN = 25;
		if (bounds.left == 0) LEFT_MARGIN = 5;
		var HORIZONTAL_GUTTER = 10;
		var VERTICAL_GUTTER = 30;
		*/
		var SKIP_LINE_TOP = 255; // Middle row that is left cleared
		var SKIP_LINE_BOTTOM = 305; // 295;
		
		// EU meieraha
		var TOP_MARGIN = 5;
		var RIGHT_MARGIN = 5;
		var LEFT_MARGIN = 5;
		if (bounds.left == 0) LEFT_MARGIN = 5;
		var HORIZONTAL_GUTTER = 10;
		var VERTICAL_GUTTER = 30;		
		
		var totalWidth = bounds.right - bounds.left - RIGHT_MARGIN;
		var totalHeight = bounds.bottom - bounds.top;
		var currentRowTop = bounds.top + TOP_MARGIN;
		
		function sortBubbles(a: BubbleReference, b: BubbleReference): Int {
			return untyped (b.bubble.radius - a.bubble.radius);
		}
		
		bubbles.sort(sortBubbles);
		var arr = bubbles;

		// Now take bubbles one by one
		var currentBubble = 0;
		while (currentBubble < arr.length) {
			// Layout the whole row
			var currentRowHeight = arr[currentBubble].bubble.radius * 2;
			var currentRowMid = (currentRowTop + currentRowHeight/2);
			var currentLeft = bounds.left + LEFT_MARGIN;
			var currentWidth = 0.0;
			
			if ((currentRowTop < SKIP_LINE_BOTTOM) && (currentRowTop + currentRowHeight) > SKIP_LINE_TOP) {
				currentRowTop = SKIP_LINE_BOTTOM;
				currentRowMid = (currentRowTop + currentRowHeight/2);
			}
			
			while (currentBubble < arr.length && (currentWidth + arr[currentBubble].bubble.radius * 2) < totalWidth) {
				// Put the bubble into the row
				arr[currentBubble].position = { x: (currentLeft + arr[currentBubble].bubble.radius), y: currentRowMid };
				currentLeft += arr[currentBubble].bubble.radius*2 + HORIZONTAL_GUTTER;
				currentWidth += arr[currentBubble].bubble.radius*2 + HORIZONTAL_GUTTER;
				currentBubble++;
			}
			currentRowTop += currentRowHeight + VERTICAL_GUTTER;
		}
		
		finishLayout();
	}

}
