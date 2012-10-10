package meieraha.js.widgets;
import JQuery;
import js.Lib;
import meieraha.js.Base;

/**
 * A DOM element with a Raphael canvas on top with a bubble of appropriate size drawn.
 * @author Konstantin
 */

class ComparisonBubble {

	public static function make(title: String, description: String, value: Float) {
		var div = new JQuery(Lib.document.createElement('DIV'));
		var r = Bubble.valueToRadius(value, false);
		var d = 2 * r;
		var s = Bubble.valueToAmountStr(value);
		div.htmlSet('<a href="javascript:void(0);" title="' + description + '"></a><p>' + title + '</p>');
		var a = div.children().first();
		div.cssSet('width', 'auto');
		a.cssSet('display', 'inline-block');
		a.cssSet('width', '' + d + 'px');
		a.cssSet('height', '' + d + 'px');
		
		var p = untyped __js__('new Raphael(a[0], d, d)');
		var c = p.circle(r, r, r);
		c.attr("fill", "#999");
		c.attr("stroke", "#999");
		if (r > Bubble.NUMLABEL_THRESHOLD_RADIUS) {
			c = p.text(r, r, s);
			c.attr("stroke", "#fff");
		}
		div.addClass('bubble');
		
		(untyped div).draggable();
		
		// comparison bubbles mouseovers
		(untyped a).qtip({
			position: { corner: { target: 'topMiddle', tooltip: 'bottomMiddle' }},
			show: { delay: 0 },
			style: {
			  width: 230,
			  padding: 10,
			  background: '#ffffff',
			  color: '#4D4D4D',
			  textAlign: 'center',
			  border: {
				 width: 2,
				 radius: 5,
				 color: '#ffffff'
			  },
			  tip: 'bottomMiddle',
			  name: 'dark' // Inherit the rest of the attributes from the preset dark style
		   }
		});

		div.insertBefore('#compare-close');
	}
}