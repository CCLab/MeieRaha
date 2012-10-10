import haxe.Timer;
import plotex.Ploter;

class BasicAnimation {
	
	static var colors:Array<RgbColor> = [
		{r:0x22, g:0x40, b:0x57},
		{r:0x37, g:0x68, b:0x8C},
		{r:0x46, g:0x86, b:0xB5},
		{r:0x22, g:0x40, b:0x57},
		{r:0x37, g:0x68, b:0x8C}
	];
	
	static var endValues:Array<Float> = [100.0, 150, 200, 50, 300];
	static var duration:Float = 2.5;
	static var pause:Float = 1.;
	
	var values:Array<Float>;
	var ploter:Ploter;
	var timer:Timer;
	var time:Float;
	var loops:Int;
	var sum:Float;
	
	function new(p:Ploter) {
		this.sum = this.loops = 0;
		this.ploter = p;
		values = new Array<Float>();
		for( i in 0...endValues.length )
			values.push(0);
		restart();
	}
	
	function restart():Void {
		time = Timer.stamp();
		timer = new Timer(50);
		timer.run = redraw;
	}
	
	#if js
	static var canvasDivId:String;
	static function start(canvasDiv:String):Void {
		canvasDivId = canvasDiv;
		main();
	}
	#end
	
	static function main():Void {
		var p:Ploter;
		#if flash
			p = new plotex.flash.FlashPloter(flash.Lib.current);
		#elseif js
			var canvas:js.HtmlCanvas = plotex.js.CanvasUtil.getCanvas( canvasDivId );
			p = new plotex.js.CanvasPloter(canvas.getContext('2d'));
		#end
		var t:BasicAnimation = new BasicAnimation(p);
	}
	
	function redraw():Void {
		var t = Timer.stamp();
		ploter.clear();
		redrawBackground();
		var v:Float;
		var stop:Bool = true;
		var w = 400/endValues.length;
		var p = Math.min(1,(t-time)/duration);
		for( i in 0...this.values.length ){
			v = endValues[i]*p;
			redrawValue( w/8 + i*w, w/2, v, colors[i] );
			values[i] = v;
			if( v != endValues[i] )
				stop = false;
		}
		if(stop){
			timer.stop();
			//trace("Finished : "+(Timer.stamp()-time));
			//trace("Avg redraw time : "+(this.sum/this.loops));
			Timer.delay( restart, Std.int(pause*1000));
		}else
			sum += (Timer.stamp()-t);
		++loops;
	}
	
	function redrawBackground():Void {
		ploter.setColorFill({r:240,g:240,b:240});
		ploter.fillRect(0,0,400,400);
		ploter.setStroke(0.5,{r:200,g:200,b:200},70);
		for( i in 0...10){
			ploter.line(0,i*40,400,i*40);
		}
		ploter.stroke();
	}
	
	function redrawValue( x:Float, w:Float, h:Float, c:RgbColor ):Void {
		var y = 400-h-5;
		ploter.setStroke(1, {r:0,g:0,b:0},90);
		ploter.setColorFill(c);
		ploter.fillRect(x,y,w,h);
		ploter.strokeRect(x,y,w,h);
		var darker = {r:c.r-32,g:c.g-32,b:c.b-32}
		ploter.beginPath();
		ploter.setColorFill(darker);
		ploter.moveTo(x+w,y);
		ploter.lineUp(-h);
		ploter.lineTo(ploter.x + w/2, ploter.y - w/2);
		ploter.lineUp(h);
		ploter.lineRight(-w);
		ploter.lineTo(ploter.x-w/2,ploter.y+w/2);
		ploter.lineTo(x+w,y);
		ploter.closePath();
		ploter.fill();
		ploter.stroke();
		ploter.beginPath();
		ploter.lineTo(ploter.x+w/2,ploter.y-w/2);
		ploter.closePath();
		ploter.stroke();
	}
}