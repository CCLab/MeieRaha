package meieraha.widgets;
import meieraha.js.Base;
import meieraha.js.widgets.Bubble;

import js.Lib;

typedef VArray<T> = Array<T>; // Easy way to switch between "List" and "Array". 
							  // Note that "List" is in theory faster, but has no indexed access, not js-native and list.push() pushes to the *beginning*.

/**
 * Indexes a set of bubbles for fast "findBubbleAt" access.
 * Not sure this provides any real benefit (fast browsers are fast enough anyway,
 * and slow browsers like IE may actually leak to much memory on index recomputations to offset any benefits),
 * but its kinda fun anyway.
 * 
 * Note: this indexing assumes no two bubbles are intersecting too much.
 * @author Konstantin
 */
class IndexTreeNode implements Drawable {
	var x: Float;
	var y: Float;
	var gg: IndexTreeNode; // query_x GreaterThan and query_y GreaterThan y
	var gl: IndexTreeNode;
	var lg: IndexTreeNode;
	var ll: IndexTreeNode;
	
	var leaf: Bool;
	var elems: VArray<Bubble>;	// For a leaf node this is not null
	
	public function new(bubbles: VArray<Bubble>, ?bounds: Bounds, ?maxLevel: Int = 5) {
		if (maxLevel == 0 || bubbles == null || bubbles.length <= 1) {
			// Just store the bubbles as is
			leaf = true;
			elems = bubbles;
			
			// This is not necessary for indexing, but good for debugging
			if (bounds != null) {
				x = (bounds.left + bounds.right) / 2;
				y = (bounds.top + bounds.bottom) / 2;
			}
		}
		else {
			// Recurse downwards
			leaf = false;
			if (bounds == null) {
				// Compute bounds from data
				bounds = { left: 1000.0, right: -1000.0, top: 1000.0, bottom: -1000.0 };
				for (bbl in bubbles) {
					bounds.left = Math.min(bounds.left, bbl.position.x - bbl.radius);
					bounds.right = Math.max(bounds.right, bbl.position.x + bbl.radius);
					bounds.top = Math.min(bounds.top, bbl.position.y - bbl.radius);
					bounds.bottom = Math.max(bounds.bottom, bbl.position.y + bbl.radius);
				}
			}
			x = (bounds.left + bounds.right) / 2;
			y = (bounds.top + bounds.bottom) / 2;

			// Now split bubbles into four sets according to the middle of the region			
			gg = new IndexTreeNode(filter(bubbles, 1, 1), { left: x, right: bounds.right, top: y, bottom: bounds.bottom }, maxLevel - 1);
			gl = new IndexTreeNode(filter(bubbles, 1, -1), { left: x, right: bounds.right, top: bounds.top, bottom: y }, maxLevel - 1);
			lg = new IndexTreeNode(filter(bubbles, -1, 1), { left: bounds.left, right: x, top: y, bottom: bounds.bottom }, maxLevel - 1);
			ll = new IndexTreeNode(filter(bubbles, -1, -1), { left: bounds.left, right: x, top: bounds.top, bottom: y }, maxLevel - 1);			
		}
	}
	
	/**
	 * This is invoked during indexing and uses a hack inside.
	 * Namely, it filters out all "expanded" bubbles so that those are never indexed.
	 */
	private function filter(bubbles: VArray<Bubble>, dx: Int, dy: Int): VArray<Bubble> {
		var result = new VArray<Bubble>();
		for (b in bubbles) {
			var bdx = dx * (b.position.x - x) + b.radius;
			var bdy = dy * (b.position.y - y) + b.radius;
			if (bdx > 0 && bdy > 0 && !b.expanded) result.push(b); // Note the third condition
		}
		return result;
	}

	public function query(qx: Float, qy: Float): Bubble {
		if (leaf) {
			if (elems != null) 
				for (b in elems) 
					if (b.hitTest(qx, qy)) 
						return b;
			return null;
		}
		else {
			if (qx >= x) {
				if (qy >= y) return gg.query(qx, qy);
				else return gl.query(qx, qy);
			}
			else {
				if (qy >= y) return lg.query(qx, qy);
				else return ll.query(qx, qy);
			}
		}
	}
	
	private function indented(indent: Int, str: String) {
		var s = new StringBuf();
		for (i in 0...indent) s.add('_');
		s.add(str);
		trace(s.toString());
	}
	
	/*public function dump(?indent: Int) {
		if (indent == null) indent = 0;
		if (leaf) indented(indent, "LEAF: " + elem);
		else {
			indented(indent, "NODE (" + x + "," + y + ")");
			indented(indent + 4, "GG:");
			gg.dump(indent + 4);
			indented(indent + 4, "GL:");
			gl.dump(indent + 4);
			indented(indent + 4, "LG:");
			lg.dump(indent + 4);
			indented(indent + 4, "LL:");
			ll.dump(indent + 4);
		}
	}*/
	
	public function draw(gc: GraphicsContext) {
		if (leaf) {
			var col = (elems == null) ? 0 : elems.length;
			gc.setColorFill( { r: 0, g: Math.floor(Math.min(255, 50*col)), b: 0 }, 0.8);
			gc.fillEllipse(x, y, 5);
		}
		else {
			gc.setColorFill( { r: 200, g: 0, b: 0 }, 0.8);
			gc.fillEllipse(x, y, 5);
			for (c in [gg, gl, lg, ll]) {
				gc.beginPath();
				gc.setStroke(2, { r: 0, g: 0, b: 0 }, 0.8);
				gc.line(x, y, c.x, c.y);
				gc.stroke();
				c.draw(gc);
			}
		}
	}
}

typedef BubbleIndex = IndexTreeNode;

