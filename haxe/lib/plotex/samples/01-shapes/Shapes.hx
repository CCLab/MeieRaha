import haxe.Timer;
import plotex.Ploter;

class Shapes {
	
	static var black:plotex.RgbColor = {r:0,g:0,b:0};
	static var colors:Array<RgbColor> = [ {r:0x80,g:0xFF,b:0x00}, 
		{r:0x00,g:0x40,b:0x80}, {r:0xff,g:0x80,b:0x00}, {r:0x80,g:0x00,b:0x80}, 
		{r:0x80,g:0x40,b:0x00} ];
	
	public static function main():Void {
		var ploter:Ploter;
		#if js
			var canvas:js.HtmlCanvas = plotex.js.CanvasUtil.getCanvas("canvas");
			ploter = new plotex.js.CanvasPloter( canvas.getContext("2d"));
		#end
		#if flash
			ploter = new plotex.flash.FlashPloter(flash.Lib.current);
		#end
		drawShapes(ploter);
	}
	
	public static function drawShapes( ploter:Ploter ):Void	{
		var t = Timer.stamp();
		for( i in 0...10 ){
			ploter.clear();
			ploter.setColorFill({r:0,g:0,b:0},.10);
			ploter.fillRect( 50+10, 50+10, 150, 100, 10 );
			ploter.setStroke(2, {r:0x22,g:0x22,b:0x22}, 100);
			ploter.setColorFill( {r:31,g:121, b:175}, .85);
			ploter.fillRect( 50, 50, 150, 100, 10 );
			ploter.strokeRect( 50, 50, 150, 100, 10 );
			
			ploter.setColorFill( black, .10 );
			ploter.fillEllipse(210,160,80,150);
			
			var angles = [ rad(110), rad(200), rad(250), rad(340), rad(360) ];
			var i = 0;
			var start = 0.0;
			ploter.setStroke( 1, black, 100 );
			ploter.beginPath();
			while( i < angles.length ) {
				ploter.setColorFill( colors[i], 100 );
				ploter.fillPie( 200, 150, 80, start, angles[i], true);
				ploter.strokePie( 200, 150, 80, start, angles[i], true);
				start = angles[i];
				++i;
			}
			ploter.beginPath();
			ploter.moveTo(75,25);
			ploter.curveTo(25,25,25,62.5);
			ploter.curveTo(25,100,50,100);
			ploter.curveTo(50,120,30,125);
			ploter.curveTo(60,120,65,100);
			ploter.curveTo(125,100,125,62.5);
			ploter.curveTo(125,25,75,25);
			ploter.stroke();
			
			var g:Gradient = {
				type: GradientType.radial,
				transitions:[ 
					{rgb:{r:0xff,g:0,b:0}, alpha:.90, ratio:0},
					{rgb:black, alpha:.50, ratio:255} ],
				rotation:0.0,
				x:200.0,y:200.,
				width:200.0,
				height:200.0
			};
			ploter.setGradientFill(g);
			ploter.beginPath();
			ploter.setStroke(2,{r:0,g:0,b:0xff},90);
			ploter.moveTo(399,1);
			ploter.lineUp(-398);
			ploter.lineRight(-399);
			ploter.lineTo(399,1);
			ploter.closePath();
			ploter.fill();
			ploter.stroke();
			
			ploter.setStroke( 2, {r:0xff, g:0xff, b:0x00}, 1 );
			ploter.strokeRect( 100., 100., 200., 200.);
		}
		var platform = 
		#if flash 
			"flash";
		#end
		#if js 
			"java script";
		#end
		trace(platform+" draw 10 times : "+(Timer.stamp()-t));
	}
	
	private static function rad(a:Float):Float	{
		return Math.PI/180*a;
	}
}