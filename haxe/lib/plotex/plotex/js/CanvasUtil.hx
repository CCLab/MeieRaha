#if js
package plotex.js;

import haxe.Timer;
import js.HtmlCanvas;
import js.Dom;
import js.Lib;

class CanvasUtil {
	
	public static function getCanvas( canvasId:String ):HtmlCanvas {
		var element = Lib.document.getElementById(canvasId);
		if( element != null && Lib.isIE ){
			try {
				element = untyped Lib.window.G_vmlCanvasManager.initElement(element);
			}
			catch(e:Dynamic){
				Lib.alert("G_vmlCanvasManager.initElement error - excanvas might not be initialized");
			}
		}
		return cast element;
	}	
}
#end