package meieraha.widgets;
import meieraha.Data;
import meieraha.js.Base;
import meieraha.js.Mouse;
import meieraha.widgets.BubbleDisplay;

/**
 * Main application class. Implements the controller functionality.
 * It is bound to the mouse events in the Base class.
 * @author Konstantin
 */
class App implements MouseListener, implements Drawable {
	var width: Float;
	var height: Float;
	var data: Data;
	
	// Child widgets
	var bubbleDisplay: BubbleDisplay;
	
	/**
	 * Initialize application
	 * @param	selector	The ID of the canvas element (e.g. appcanvas)
	 */
	public function new(width: Float, height: Float) {
		this.width = width;
		this.height = height;
		bubbleDisplay = new BubbleDisplay();
	}
	
	/**
	 * Set new data
	 */
	public function setData(data: Data) {
		this.data = data;
		var mid = width / 2;
		bubbleDisplay.clearBubbles();
		bubbleDisplay.addBubbles(data.incomes, { left: 0.0, top: 0.0, right: mid-40, bottom: height } );
		bubbleDisplay.addBubbles(data.expenses, { left: mid + 40, top: 0.0, right: mid * 2, bottom: height }, -1 );

		// Compute budgetValue
		var balance = 0.0;
		for (b in data.incomes) if (b.parentId == null) balance += b.value;
		for (b in data.expenses) if (b.parentId == null) balance -= b.value;
		Base.setNewBalance(balance);
	}
	
	/**
	 * Click on the "reset" button
	 */
	public function reset() {
		setData(this.data);
		Base.requestRepaint();
	}
	
	public function click(e: MouseEvent): Void {
		bubbleDisplay.click(e);
	}
	
	public function mouseup(e: MouseEvent): Void {
		bubbleDisplay.mouseup(e);
	}
	
	public function mouseover(e: MouseEvent): Void {
		bubbleDisplay.mouseover(e);
	}
	
	public function mousemove(e: MouseEvent): Void {
		bubbleDisplay.mousemove(e);
	}
	
	public function mousedown(e: MouseEvent): Void {
		bubbleDisplay.mousedown(e);
	}
	
	public function draw(gc: GraphicsContext): Void {
		gc.clear();
		bubbleDisplay.draw(gc);
	}
}
