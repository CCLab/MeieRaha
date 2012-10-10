package meieraha.widgets;
import meieraha.Data;
import meieraha.js.Base;
import meieraha.js.widgets.Bubble;
import meieraha.widgets.BubbleIndex;

/**
 * Manages and index of Bubbles
 * Helps finding a bubble at position fast.
 * Also knows the bubble hierarchy.
 * @author Konstantin
 */

class BubbleRegistry {
	public var bubbles: IntHash<Bubble>;	// ID -> Bubble
	public var children: IntHash<Array<Bubble>>; // ID -> Child bubbles
	public var parent: IntHash<Bubble>; // ID -> Parent bubble or null
	public var parentId: IntHash<Int>; // ID -> Parent bubble id or null
	public var visibleBubbles: VArray<Bubble>; // List of bubbles currently visible
	public var bubbleIndex: BubbleIndex;
	
	public function new() { 
		bubbles = new IntHash<Bubble>();
		children = new IntHash<Array<Bubble>>();		
		parentId = new IntHash<Int>();
		parent = new IntHash<Bubble>();
		visibleBubbles = new VArray<Bubble>();
		bubbleIndex = null;
	}
	
	// Clear registry. It is important to free the bubbles to avoid memory leaks in DOM.
	public function clear() {
		for (b in bubbles.keys()) {
			bubbles.get(b).free();
		}
		// Now just reset member variables (GC will do the rest)
		bubbles = new IntHash<Bubble>();
		children = new IntHash<Array<Bubble>>();		
		parentId = new IntHash<Int>();
		parent = new IntHash<Bubble>();
		visibleBubbles = new VArray<Bubble>();
		bubbleIndex = null;
	}
	
	public function addBubbles(items: Array<DataItem>, layoutEngine: BubbleLayoutEngine, ?side: Int = 1) {
		// Initialize Bubble instances, index child/parent hierarchy
		for (item in items)	{
			var b = BubbleUtil.makeBubble(item);
			b.side = side;
			bubbles.set(item.id, b);
			parentId.set(item.id, item.parentId);
			if (item.parentId != null) {
				if (children.get(item.parentId) == null) children.set(item.parentId, new Array<Bubble>());
				children.get(item.parentId).push(b);
			}
		}
		for (item in items) parent.set(item.id, parentId.get(item.id) == null ? null : bubbles.get(parentId.get(item.id)));
		
		// Now that we know the hierarchy, set up the visible/hasParent/hasChildren attributes on the newly added bubbles
		// Also set color for child bubbles as a darker version of parent's color.
		for (item in items) {
			var id = item.id;
			if (children.get(id) == null) children.set(id, new Array<Bubble>());
			var bi = bubbles.get(id);
			bi.hasChildren = (children.get(id).length != 0);
			bi.hasParent = (parent.get(id) != null);
			bi.visible = !bi.hasParent;
			if (bi.hasParent) {
				var p = parent.get(bi.id);
				bi.color = { r: Math.ceil(p.color.r * 0.8), g: Math.ceil(p.color.g * 0.8), b: Math.ceil(p.color.b * 0.8) };
			}
			if (bi.visible) {
				visibleBubbles.push(bi);
				layoutEngine.registerBubble(bi);
			}
		}
	}

	/**
	 * Given a bubble with children, "expands" it (i.e. hides and replaces with children).
	 * Also updates the layout and reindexes.
	 */
	public function expandBubble(b: Bubble) {
		if (b.hasChildren) {
			for (c in children.get(b.id)) {
				c.position = { x: b.position.x, y: b.position.y };
				c.visible = true;
				b.layoutEngine.registerBubble(c);
				visibleBubbles.push(c);
			}
			//b.visible = false;
			b.expanded = true; // Setting expanded = true makes the bubble unindexable
			b.layoutEngine.unregisterBubble(b);
			//visibleBubbles.remove(b);
			b.layoutEngine.performIncrementalLayout();
			reindex();
		}
	}
	
	/**
	 * A reverse operation to "expandBubble". Here b is any child of a previously expanded bubble.
	 */
	public function contractBubble(child: Bubble) {
		var b = parent.get(child.id);
		if (b != null) {
			for (c in children.get(b.id)) {
				c.visible = false;
				c.layoutEngine.unregisterBubble(c);
				visibleBubbles.remove(c);
			}
			//b.visible = true;
			b.expanded = false;
			b.layoutEngine.registerBubble(b);
			//visibleBubbles.push(b);
			b.layoutEngine.performIncrementalLayout();
			setTopBubble(b);
			reindex();
		}
	}
	
	public function reindex() {
		bubbleIndex = new BubbleIndex(visibleBubbles);
	}
	
	public function findVisibleBubbleAt(x: Float, y: Float): Bubble {
		return bubbleIndex.query(x, y);
	}
	
	/**
	 * Moves given bubble to the end of the "visibleBubbles" list.
	 */
	public function setTopBubble(b: Bubble) {
		if (visibleBubbles.remove(b)) visibleBubbles.push(b);
		else trace("Failure: Could not find bubble!");
	}
	
	/**
	 * Processes the change in the bubble's value
	 */
	public function bubbleValueChanged(b: Bubble, oldValue: Float, ?noMagic: Bool = false) {
		// First, apply the magic rules
		// NB: Make care to NOT invoke magic rules recursively.
		if (!noMagic) applyValueRules(b, oldValue);
		
		// If there are child bubbles, update their value appropriately
		if (b.hasChildren) {
			for (c in children.get(b.id)) {
				var newSubTotal = b.value*c.value/oldValue;
				var oldChildValue = c.value;
				c.value = newSubTotal;
				if (!noMagic) applyValueRules(c, oldChildValue);
			}
		}
		else if (b.hasParent) {
			// Increase parent's total
			var p = parent.get(b.id);
			var oldParentValue = p.value;
			p.value = p.value + b.value - oldValue;
			if (!noMagic) applyValueRules(p, oldParentValue);
		}

		// Compute budgetValue
		var balance = 0.0;
		for (bk in bubbles.keys()) {
			b = bubbles.get(bk);
			if (!b.hasParent) balance += b.side * b.value;
		}
		Base.setNewBalance(balance);
	}
	
	public var appliedRules: Array<String>; // TODO: Kinda hack
	public function applyValueRules(b: Bubble, oldValue: Float) {
		var rs: Array<ValueRule> = untyped __js__('rules');
		var delta = b.value - oldValue;
		for (r in rs) {
			if (b.id == r.target) {
				// Change destination bubble's value
				var d = bubbles.get(r.destination);
				var oldValue = d.value;
				d.value = oldValue + r.coef * delta;
				appliedRules.push(r.message);
				bubbleValueChanged(d, oldValue, true);
			}
		}
	}
}