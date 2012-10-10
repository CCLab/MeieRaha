#if js
package js;
import js.Dom;
import js.CanvasContex;

typedef HtmlCanvas = {> HtmlDom,

	var width : Int;
	var height : Int;
	
	function getContext(contextId:String):CanvasContex;
}

#end