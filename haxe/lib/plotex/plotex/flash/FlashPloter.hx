#if flash
package plotex.flash;

//import plotex.Gradient;
//import plotex.GradientType;
//import plotex.GradientTransition;
import plotex.Ploter;

class FlashPloter implements Ploter {
	var gf:
		#if flash9
			flash.display.Graphics;
		#elseif true
			flash.MovieClip;
		#end
	
	var _x:Null<Float>;
	var _y:Null<Float>;
	
	var lineTickness:Float;
	var lineColor:Int;
	var lineAlpha:Null<Float>;
	
	var colorFill:Bool;
	var gradientFill:Bool;
	var gradient:FlashGradient;
	var fillColor:Int;
	var fillAlpha:Null<Float>;
	
	var path:Array<Float>;
	var pathOps:Array<PathOperation>;
	
	public var x(getX, setX):Float;
	public var y(getY, setY):Float;
	
	#if flash9
	public function new( target:flash.display.Sprite ) {
		this.gf = target.graphics;
		this.init();
	}
	#else
	public function new( target:flash.MovieClip ) {
		this.gf = target;
		this.init();
	}
	#end
	
	private function init():Void {
		this.lineAlpha = .5;
		this.lineColor = 0;
		this.lineTickness = 2;
		this._x = this._y = null;
		this.beginPath();
	}
	
	public function moveTo(x:Float, y:Float):Void {
		this.path.push(x);
		this.path.push(y);
		this.pathOps.push( PathOperation.moveTo );
		this._x = x;
		this._y = y;
	}
	
	public function lineTo(x:Float, y:Float):Void {
		this.path.push(x);
		this.path.push(y);
		this.pathOps.push( PathOperation.lineTo );
		this._x = x;
		this._y = y;
	}
	
	public function curveTo(controlX:Float, controlY:Float, x:Float, y:Float):Void {
		this.path.push(controlX);
		this.path.push(controlY);
		this.path.push(x);
		this.path.push(y);
		this.pathOps.push( PathOperation.curveTo );
		this._x = x;
		this._y = y;
	}
	
	public function line(bx:Float, by:Float, ex:Float, ey:Float):Void {
		this.moveTo(bx,by);
		this.lineTo(ex,ey);
	}
	
	public function lineUp(d:Float):Void {
		this.lineTo(_x,_y-d);
	}
	
	public function lineRight(d:Float):Void {
		this.lineTo(_x+d,_y);
	}
	
	public function curve(controlX:Float, controlY:Float, bx:Float, by:Float, ex:Float, ey:Float):Void {
		this.moveTo(bx,by);
		this.curveTo(ex,ey,controlX,controlY);
	}
	
	public function ellipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void {
		if (yRadius == null) yRadius = xRadius;
		var theta, xrCtrl, yrCtrl, angle, angleMid, px, py, cx, cy;
		theta = Math.PI/4;
		xrCtrl = xRadius/Math.cos(theta/2);
		yrCtrl = yRadius/Math.cos(theta/2);
		angle = 0.0;
		this.moveTo(x+xRadius, y);
		for ( i in 0...8 ) {
			angle += theta;
			angleMid = angle-(theta/2);
			cx = x+Math.cos(angleMid)*xrCtrl;
			cy = y+Math.sin(angleMid)*yrCtrl;
			px = x+Math.cos(angle)*xRadius;
			py = y+Math.sin(angle)*yRadius;
			this.curveTo(cx, cy, px, py);
		}
	}
	
	public function rect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void {
		if( round == null || round == 0 )
			this.rectPath(x,y,w,h);
		else
			this.roundedRectPath(x,y,w,h,round);
	}
	
	public function arc(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.arcPath(x,y,radius,startAngle,endAngle,conterClockWise);
	}
	
	public function pie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.moveTo(x, y);
		this.arc(x,y,radius,startAngle,endAngle,conterClockWise);
		this.lineTo(x,y);
	}
	
	public function fillPie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.beginPath();
		this.pie(x,y,radius,startAngle,endAngle,conterClockWise);
		this.fill();
	}
	
	public function fillEllipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void {
		this.beginPath();
		this.ellipse(x,y,xRadius,yRadius);
		this.fill();
	}
	
	public function fillRect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void {
		this.beginPath();
		this.rect(x,y,w,h,round);
		this.fill();
	}
	
	public function strokeRect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void {
		this.beginPath();
		this.rect(x,y,w,h,round);
		this.stroke();
	}
	
	public function strokeEllipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void {
		this.beginPath();
		this.ellipse(x,y,xRadius,yRadius);
		this.stroke();
	}
	
	public function strokeArc(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.beginPath();
		this.arcPath(x,y,radius,startAngle,endAngle, conterClockWise);
		this.stroke();
	}
	
	public function strokePie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.beginPath();
		this.pie(x,y,radius,startAngle,endAngle,conterClockWise);
		this.stroke();
	}
	
	public function setColorFill(color:RgbColor, ?alpha:Null<Float>):Void {
		if( alpha==null ) alpha = 1.;
		this.fillColor = rgbToInt(color);
		#if flash9
			this.fillAlpha = alpha;
		#else
			this.fillAlpha = Std.int(alpha*100);
		#end
		this.colorFill = !(this.gradientFill = false);
	}
	
	public function setGradientFill(g:Gradient):Void {
		this.gradient = getFlashGradient(g);
		this.gradientFill = !(this.colorFill = false);
	}
	
	public function setBitmapFill(bmp:Dynamic, ?mat:Dynamic, ?repeate:Bool, ?smoothing:Bool):Void {
		//TODO setBitmapFill
	}
	
	public function setStroke(tickness:Float, color:RgbColor, ?alpha:Null<Float> ):Void {
		if( alpha == null ) alpha = 1.;
		var c = rgbToInt(color);
		this.lineTickness = tickness;
		this.lineColor = c;
		#if flash9
			this.lineAlpha = alpha;
		#else
			this.lineAlpha = Std.int(alpha*100);
		#end
	}
	
	public function fill():Void {
		this.restoreFillStyle();
		this.gf.lineStyle(0,0,0);
		this.drawPath();
		this.gf.endFill();
	}
	
	public function stroke():Void {
		this.gf.beginFill(0,0);
		this.restoreLineStyle();
		this.drawPath();
		this.gf.endFill();
	}
	
	public function clear():Void {
		this.gf.clear();
	}
	
	public function beginPath():Void {
		this.path = new Array<Float>();
		this.pathOps = new Array<PathOperation>();
	}
	
	public function closePath():Void {
		this.lineTo( this.path[0], this.path[1] );
	}
	
	public function toString():String {
		return "FlashPloter["+this._x+","+this._y+"]";
	}
	
	private function drawPath():Void {
		var i = 0;
		var j = 0;
		var p = this.path;
		while( i < this.pathOps.length ) {
			switch( this.pathOps[i] ) {
				case PathOperation.moveTo :
					this.gf.moveTo( p[j], p[j+1] );
					j += 2;
				case PathOperation.lineTo :
					this.gf.lineTo( p[j], p[j+1] );
					j += 2;
				case PathOperation.curveTo :
					this.gf.curveTo( p[j], p[j+1], p[j+2], p[j+3] );
					j += 4;
			}
			++i;
		}
	}
	
	private function getX():Float {
		return this._x;
	}
	
	private function setX(x:Float):Float {
		this.moveTo(x,0);
		return this._x;
	}
	
	private function getY():Float {
		return this._y;
	}
	
	private function setY(y:Float):Float {
		this.moveTo(0,y);
		return this._y;
	}
	
	private function rectPath(x:Float, y:Float, w:Float, h:Float):Void {
		this.moveTo(x,y);
		this.lineRight(w);
		this.lineUp(-h);
		this.lineRight(-w);
		this.lineUp(h);
	}
	
	private function roundedRectPath(x:Float, y:Float, w:Float, h:Float, round:Float):Void {
		var theta, angle, cx, cy, px, py;
		var maxRadii = Math.min(w, h)/2;
		if(round > maxRadii) round = maxRadii;
		this.moveTo(x,y+round);
		this.lineTo(x,y+h-round);
		this.curveTo(x,y+h,x+round,y+h);
		this.lineTo(x+w-round,y+h);
		this.curveTo(x+w,y+h,x+w,y+h-round);
		this.lineTo(x+w,y+round);
		this.curveTo(x+w,y,x+w-round,y);
		this.lineTo(x+round,y);
		this.curveTo(x,y,x,y+round);
	}
	
	private function arcPath(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		if( conterClockWise == null ) conterClockWise = true;
		var segAngle, theta, angle, angleMid, segs, ax, ay, bx, by, cx, cy;
		//TODO canonize angles
		if( Math.abs(startAngle) > Math.PI*2 ) startAngle = Math.PI*2;
		if( Math.abs(endAngle) > Math.PI*2 ) endAngle = Math.PI*2;
		var arc = Math.abs(endAngle - startAngle);
		if (Math.abs(arc) > Math.PI*2) arc = Math.PI*2;
		segs = Math.ceil(Math.abs(arc)/(Math.PI/4));
		segAngle = arc/segs;
		theta = -segAngle;
		angle = -startAngle;
		
		if (segs>0) {
			ax = x+Math.cos(startAngle)*radius;
			ay = y+Math.sin(-startAngle)*radius;
			if( _x != null && _y != null )
				this.lineTo(x+Math.cos(angle)*radius,y+Math.sin(angle)*radius);
			else
				this.moveTo(x+Math.cos(angle)*radius,y+Math.sin(angle)*radius);
			var i = 0;
			while(i++ < segs) {
				angle += theta;
				angleMid = angle-(theta/2);
				bx = x+Math.cos(angle)*radius;
				by = y+Math.sin(angle)*radius;
				cx = x+Math.cos(angleMid)*(radius/Math.cos(theta/2));
				cy = y+Math.sin(angleMid)*(radius/Math.cos(theta/2));
				this.curveTo(cx, cy, bx, by);
			}
			this.moveTo(x, y);
		}
	}
	
	private function restoreLineStyle():Void {
		this.gf.lineStyle(this.lineTickness, this.lineColor, this.lineAlpha);
	}
	
	private function restoreFillStyle():Void {
		if( gradientFill ) {
			var fg:FlashGradient = this.gradient;
			this.gf.beginGradientFill(fg.fillType,fg.colors,fg.alphas,fg.ratios,fg.mat);
		}else if( colorFill ) {
			this.gf.beginFill( this.fillColor, this.fillAlpha );
		}else {
			//TODO restore bitmap fill
		}
	}
	
	private function rgbToInt( c:RgbColor ):Int {
		return ( (c.r<<16) | (c.g<<8) | c.b );
	}
	
	private function getFlashGradient( g:Gradient ):FlashGradient {
		var fillType = getFlashGradientType(g);
		var mat:Dynamic = getGradientMatrix(g);
		var colors:Array<Int> = new Array<Int>();
		#if flash9
			var alphas:Array<Null<Float>> = new Array<Null<Float>>();
		#else
			var alphas:Array<Int> =  new Array<Int>();
		#end
		var ratios:Array<Int> = new Array<Int>();
		var v:GradientTransition;
		var i = 0;
		while( i < g.transitions.length ) {
			v = g.transitions[i];
			colors.push( rgbToInt(v.rgb) );
			alphas.push( getAlpha(v.alpha) );
			ratios.push( v.ratio );
			++i;
		}
		return {
			fillType:fillType,
			mat:mat,
			colors:colors,
			alphas:alphas,
			ratios:ratios
		};
	}
	
	private function getFlashGradientType(g:Gradient):FlashGradientType {
		var fillType:FlashGradientType;
		switch( g.type ){
			case GradientType.linear : 
				fillType = 
					#if flash9
						flash.display.GradientType.LINEAR;	
					#else
						"linear";
					#end
			case GradientType.radial :
				fillType = 
					#if flash9
						flash.display.GradientType.RADIAL;	
					#else
						"radial";
					#end
				g.x -= g.width/2;
				g.y -= g.height/2;
		}
		return fillType;
	}
	
	private function getGradientMatrix(g:Gradient):Dynamic {
		#if flash9
			var mat:flash.geom.Matrix = new flash.geom.Matrix();
			mat.createGradientBox( g.width, g.height, g.rotation, g.x, g.y );
			return mat;
		#else
			return { matrixType:"box", x:g.x, y:g.y, w:g.width, h:g.height, r:g.rotation };
		#end
	}
	
	#if flash9
	private inline function getAlpha( alpha:Null<Float> ):Null<Float> {
		return alpha;
	}
	#else
	private inline function getAlpha( alpha:Null<Float> ):Int {
		return Std.int(alpha*100);
	}
	#end
	
}

typedef FlashGradient = {
	var fillType:FlashGradientType;
	var colors:Array<Int>;
	var alphas:
		#if flash9
			Array<Null<Float>>;
		#else
			Array<Int>;
		#end
	var ratios:Array<Int>;
	var mat:Dynamic;
}

typedef FlashGradientType = 
#if flash9
	flash.display.GradientType;
#else
	String;
#end

enum PathOperation{
	moveTo;
	lineTo;
	curveTo;
}

#end