#if js
package plotex.js;

import js.Lib;
import js.CanvasContex;
import plotex.Ploter;

class CanvasPloter implements Ploter {
	
	public var ctx: CanvasContex;
	var _x:Float;
	var _y:Float;
	
	public var x(getX, setX):Float;
	public var y(getY, setY):Float;
	
	public function new( ctx:CanvasContex ) {
		this.ctx = ctx;
		this.beginPath();
	}
	
	public function moveTo(x:Float, y:Float):Void {
		this._x = x;
		this._y = y;
		this.ctx.moveTo(x,y);
	}
	
	public function line(bx:Float, by:Float, ex:Float, ey:Float):Void {
		this.moveTo(bx,by);
		this.lineTo(ex,ey);
	}
	
	public function lineTo(x:Float, y:Float):Void {
		this.ctx.lineTo(x,y);
		this._x = x;
		this._y = y;
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
	
	public function curveTo(controlX:Float, controlY:Float, x:Float, y:Float):Void {
		this.ctx.quadraticCurveTo(controlX,controlY,x,y);
		this._x = x;
		this._y = y;
	}
	
	public function ellipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void {
		if (yRadius == null) {
			this.ctx.arc(x,y,xRadius,0,Math.PI*2,true);
		}else{
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
	}
	
	public function rect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void {
		if( round == null || round == 0 )
			this.ctx.rect(x,y,w,h);
		else
			this.roundedRectPath(x,y,w,h,round);
	}
	
	public function arc(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		if( conterClockWise == null ) conterClockWise = true;
		this.ctx.arc(x,y,radius,-startAngle,-endAngle,conterClockWise);
	}
	public function pie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.moveTo(x,y);
		arc(x,y,radius,startAngle,endAngle,conterClockWise);
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
		if( round == null || round == 0 ) {
			this.ctx.fillRect(x,y,w,h);
		}else{
			this.rect(x,y,w,h,round);
			this.fill();
		}
	}
	
	public function strokeRect(x:Float, y:Float, w:Float, h:Float, ?round:Float):Void {
		this.beginPath();
		if( round == null || round == 0 ) {
			this.ctx.strokeRect(x,y,w,h);
		}else{
			this.roundedRectPath(x,y,w,h,round);
			this.ctx.stroke();
		}
	}
	
	public function strokeEllipse(x:Float, y:Float, xRadius:Float, ?yRadius:Float):Void {
		this.beginPath();
		this.ellipse(x,y,xRadius,yRadius);
		this.stroke();
	}
	
	public function strokeArc(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.beginPath();
		if( conterClockWise == null ) conterClockWise = true;
		this.ctx.arc(x,y,radius,-startAngle,-endAngle, conterClockWise);
		this.stroke();
	}
	
	public function strokePie(x:Float, y:Float, radius:Float, startAngle:Float, endAngle:Float, ?conterClockWise:Bool):Void {
		this.beginPath();
		this.pie(x,y,radius,startAngle,endAngle,conterClockWise);
		this.stroke();
	}
	
	public function setColorFill(color:RgbColor, ?alpha:Null<Float>):Void {
		this.ctx.fillStyle = getRGBAString(color,alpha);
	}
	
	public function setGradientFill(g:Gradient):Void {
		var gs:CanvasGradient;
		switch( g.type ){
			case GradientType.linear : 
				
				gs = this.ctx.createLinearGradient(g.x, g.y, 
					g.x + Math.cos(g.rotation)*g.width, 
					g.y + Math.sin(g.rotation)*g.height );
			case GradientType.radial : 
				var dw = g.width*g.width;
				var dh = g.height*g.height;
				gs = this.ctx.createRadialGradient( g.x, g.y, 1, g.x, g.y, Math.sqrt( dw + dh )/2 );
		}
		for( i in g.transitions )
			gs.addColorStop( i.ratio/255, getRGBAString(i.rgb, i.alpha));
		this.ctx.fillStyle = gs;
	}
	public function setBitmapFill(bmp:Dynamic, ?mat:Dynamic, ?repeate:Bool, ?smoothing:Bool):Void {
		//TODO setBitmapFill
	}
	
	public function fill():Void {
		this.ctx.fill();
	}
	
	public function beginPath():Void {
		this.ctx.beginPath();
	}
	
	public function closePath():Void {
		this.ctx.closePath();
	}
	
	public function setStroke(tickness:Float, color:RgbColor, ?alpha:Null<Float> ):Void {
		this.ctx.lineWidth = tickness;
		this.ctx.strokeStyle = getRGBAString(color,alpha);
	}
	
	public function stroke():Void {
		this.ctx.stroke();
	}
	
	public function clear():Void {
		this.ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
	}
	
	public function toString():String {
		return "CanvasPloter["+this._x+","+this._y+"]";
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
	
	private function getRGBAString( c:RgbColor, ?a:Null<Float> ):String {
		var s;
		if( a == null )
			s = "rgb("+c.r+","+c.g+","+c.b+")";
		else
			s = "rgba("+c.r+ ","+c.g+","+c.b+","+a+")";
		return s;
	}
}
#end