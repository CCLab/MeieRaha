package plotex;

interface Ploter {
	
	public var x(getX, setX):Float;
	public var y(getY, setY):Float;
	public function moveTo(x:Float, y:Float):Void;
	
	public function line(bx:Float, by:Float, ex:Float, ey:Float):Void;
	public function lineTo(x:Float, y:Float):Void;
	public function lineUp(d:Float):Void;
	public function lineRight(d:Float):Void;
	
	public function curve(controlX:Float, controlY:Float, x:Float, by:Float, ex:Float, ey:Float):Void;
	public function curveTo(controlX:Float, controlY:Float, x:Float, y:Float):Void;
	
	public function ellipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void;
	public function rect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void;
	public function arc(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void;
	public function pie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void;
	
	public function fillEllipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void;
	public function fillRect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void;
	public function fillPie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void;
	
	public function strokeEllipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void;
	public function strokeRect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void;
	public function strokeArc(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void;
	public function strokePie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void;	
	
	public function setColorFill(color:RgbColor, ?alpha:Null<Float>):Void;
	public function setGradientFill(g:Gradient):Void;
	public function setBitmapFill(bmp:Dynamic, ?mat:Dynamic, ?repeat:Bool, ?smoothing:Bool):Void;
	
	public function setStroke(tickness:Float, color:RgbColor, ?alpha:Null<Float> ):Void;
	
	public function stroke():Void;
	public function fill():Void;
	
	public function beginPath():Void;
	public function closePath():Void;
	public function clear():Void;
	public function toString():String;
}

typedef RgbColor = {
	var r:Int;
	var g:Int;
	var b:Int;
}

typedef GradientTransition = {
	var rgb:RgbColor;
	var alpha:Float;
	var ratio:Int;
}

typedef Gradient = {
	var type:GradientType;
	var transitions:Array<GradientTransition>;
	var rotation:Float;
	var x:Float;
	var y:Float;
	var width:Float;
	var height:Float;
}

enum GradientType{
	linear;
	radial;
}