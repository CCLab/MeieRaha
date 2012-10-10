package meieraha.widgets;
import meieraha.Data;
import meieraha.js.Base;
import meieraha.js.Mouse;
import meieraha.js.widgets.Bubble;
import meieraha.widgets.BubbleRegistry;
import meieraha.widgets.BubbleLayoutEngine;

enum MouseAction {
	NONE; MOVE; RESIZE; ACT;
}

/**
 * A pane containing a number of bubbles.
 * Manages bubble drawing, layout and interaction.
 * @author Konstantin
 */
class BubbleDisplay implements Drawable, implements MouseListener {
	private var layoutEngines: Array<BubbleLayoutEngine>;
	private var bubbleRegistry: BubbleRegistry;
	private var highlightedBubble: Bubble;
	
	private var action: MouseAction;
	private var mouseDown: Bool;
	private var dragOffset: Position;

	/**
	 * Creates a new bubble pane with given coordinates.
	 */
	public function new() {
		layoutEngines = new Array<BubbleLayoutEngine>();
		bubbleRegistry = new BubbleRegistry();
		highlightedBubble = null;
		action = NONE;
		mouseDown = false;
	}
	
	/**
	 * Clears all bubbles
	 */
	public function clearBubbles() {
		bubbleRegistry.clear(); // Free all bubbles
		highlightedBubble = null;
		action = NONE;
		layoutEngines = new Array<BubbleLayoutEngine>();
	}
	
	/**
	 * Adds bubbles that will be laid out at a given region of the canvas. Bubbles are laid out immediately.
	 */
	public function addBubbles(items: Array<DataItem>, bounds: Bounds, ?side: Int = 1) {
		var le = new BubbleLayoutEngine(bounds);
		layoutEngines.push(le);
		
		// Create new bubbles and register them
		bubbleRegistry.addBubbles(items, le, side);

		// Perform layout
		le.performOrderedLayout();
		
		// Reindex
		bubbleRegistry.reindex();
	}
	
	public function draw(gc: GraphicsContext): Void {
		for (b in bubbleRegistry.visibleBubbles) {
			b.draw(gc);
		}
		//bubbleRegistry.bubbleIndex.draw(gc);
	}

	
	public function click(e: MouseEvent): Void {
		if (highlightedBubble != null && action == ACT) {
			if (highlightedBubble.hasChildren) bubbleRegistry.expandBubble(highlightedBubble);
			else if (highlightedBubble.hasParent) bubbleRegistry.contractBubble(highlightedBubble);
			Base.requestRepaint();
		}
	}
	public function mouseover(e: MouseEvent): Void {
	}
	public function mousedown(e: MouseEvent): Void {
		if (highlightedBubble != null) {
			Base.hideHint();
			if (action == MOVE) {
				dragOffset = { x: highlightedBubble.position.x - e.canvasX, y: highlightedBubble.position.y - e.canvasY };
				highlightedBubble.state = DRAGGED;
				
				// Make bubble top visual bubble
				bubbleRegistry.setTopBubble(highlightedBubble);
				
				// Redraw
				Base.requestRepaint();
			}
			else if (action == RESIZE) {
				highlightedBubble.state = RESIZED;
				
				// Make bubble top visual bubble
				bubbleRegistry.setTopBubble(highlightedBubble);

				// Redraw
				Base.requestRepaint();
			}
		}
		mouseDown = true;
	}
	public function mouseup(e: MouseEvent): Void {
		// Were we dragging anything?
		if (highlightedBubble != null) {
			if ((action == MOVE) || (action == RESIZE)) {
				// Finished dragging or resizing. Relayout and reindex bubbles
				highlightedBubble.state = HIGHLIGHTED;
				highlightedBubble.layoutEngine.performIncrementalLayout();
				
				// Reindex
				bubbleRegistry.reindex();
				
				// Hide rules tooltip
				Base.hideRules();
				Base.requestRepaint();
			}
		}
		mouseDown = false;
	}
	public function mousedrag(e: MouseEvent): Void {
		if (highlightedBubble != null) {
			if (action == MOVE) {
				highlightedBubble.position = { x: e.canvasX + dragOffset.x, y: e.canvasY + dragOffset.y };
				Base.requestRepaint();
			}
			else if (action == RESIZE) {
				var dx = e.canvasX - highlightedBubble.position.x;
				var dy = e.canvasY - highlightedBubble.position.y;
				var r = Math.sqrt(dx * dx + dy * dy);
				var v = Bubble.radiusToValue(r);
				var oldValue = highlightedBubble.value;
				highlightedBubble.value = v;
				bubbleRegistry.appliedRules = new Array<String>();
				bubbleRegistry.bubbleValueChanged(highlightedBubble, oldValue);
				
				if (bubbleRegistry.appliedRules.length > 0) {
					// Rules were applied, update message
					var s = bubbleRegistry.appliedRules.join('<br/>');
					Base.showRules(s);
				}
				Base.showHint(highlightedBubble.amountString, e.pageX, e.pageY);
				
				Base.requestRepaint();
			}
		}
	}
	public function mousemove(e: MouseEvent): Void {
		if (mouseDown) {
			mousedrag(e);
			return;
		}
		if (highlightedBubble != null) highlightedBubble.state = DEFAULT;
		
		var b = bubbleRegistry.findVisibleBubbleAt(e.canvasX, e.canvasY);
		if (b != null) {
			Base.showHint(b.title + ': ' + b.amountString, e.pageX, e.pageY);
			b.state = HIGHLIGHTED;
			// See where exactly over the bubble we are
			// Are we on the border?
			var dx: Float = e.canvasX - b.position.x;
			var dy: Float = e.canvasY - b.position.y;
			var r2 = (b.radius - 10) * (b.radius - 10);
			var distToCenter2 = dx * dx + dy * dy;
			if (distToCenter2 > r2) {
				action = RESIZE;
				// See where exactly are we on the border
				if (dx == 0) Base.setCursor('n-resize');
				else {
					var tanA: Float = dy / dx;
					if (tanA > Math.sqrt(3)) Base.setCursor('n-resize');
					else if (tanA > Math.sqrt(3) / 3) {
						Base.setCursor('nw-resize');
						// Are we actually on the "expand" button?
						if (b.hasChildren || b.hasParent) {
							var dbtn = b.radius * Math.sqrt(2) / 2 - 3;
							var btnX = b.position.x + dbtn;
							var btnY = b.position.y + dbtn;
							var dist = Math.max(Math.abs(e.canvasX - btnX), Math.abs(e.canvasY - btnY));
							if (dist < 15) {
								Base.setCursor('pointer');
								action = ACT;
							}
						}
					}
					else if (tanA > -Math.sqrt(3) / 3) Base.setCursor('w-resize');
					else if (tanA > -Math.sqrt(3)) Base.setCursor('sw-resize');
					else Base.setCursor('s-resize');
				}
			}
			else {
				action = MOVE;
				Base.setCursor('move'); // Move mode
			}
		}
		else {
			action = NONE;
			Base.hideHint();
			Base.setCursor('auto'); // No selected bubble
		}
		if (b != highlightedBubble) {
			highlightedBubble = b;
			Base.requestRepaint();
		}
	}
}