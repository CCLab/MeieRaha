import plotex.Ploter;

class SimplePieChart {
	
	static var darkColors:Array<RgbColor> = [
		{r:0x22, g:0x40, b:0x57},
		{r:0x37, g:0x68, b:0x8C},
		{r:0x46, g:0x86, b:0xB5} 
	];
	
	static var brightColors:Array<RgbColor> = [
		{r:0xB7, g:0xD0, b:0xE3},
		{r:0x77, g:0xA7, b:0xCA}
	];
		
	var radius:Float;
	var x:Float;
	var y:Float;
	var ploter:Ploter;
	var sum:Float;
	var data:Array<Float>;
	
	#if js
		public function new( canvasId:String ) {
			var canvas:js.HtmlCanvas = plotex.js.CanvasUtil.getCanvas(canvasId);
			init( new plotex.js.CanvasPloter(canvas.getContext('2d')) );
		}
		
	#elseif flash
		#if flash9
			function new( mc:flash.display.Sprite ) {
				init( new plotex.flash.FlashPloter(mc) );
			}
		#else
			function new( mc:flash.MovieClip ) {
				init( new plotex.flash.FlashPloter(mc) );
			}
		#end
		
		static function main():Void {
			var root = flash.Lib.current;
			var params:Dynamic = 
			#if flash9
				root.loaderInfo.parameters;
			#else
				root;
			#end
			var chart = new SimplePieChart(root);
			var tmp:Array<String> = params.data.split(",");
			var d:Array<Float> = new Array<Float>();
			for( i in 0...tmp.length )
				d.push(Std.parseFloat(tmp[i]));
			chart.setData(d);
			chart.setPosition(Std.parseFloat(params.x),Std.parseFloat(params.y));
			chart.setRadius(Std.parseFloat(params.radius));
			chart.draw();
		}
	#end
	
	private function init( p:Ploter ):Void {
		this.ploter = p;
		this.radius = 80;
		this.x = this.y = 200;
	}
	
	public function setData(d:Array<Float>):Void {
		this.data = d;
		initSum();
	}
	
	public function setRadius(r:Float):Void {
		this.radius = r;
	}
	
	public function setPosition( x:Float, y:Float):Void {
		this.x = x;
		this.y = y;
	}
	
	public function draw():Void {
		ploter.clear();
		
		ploter.setColorFill({r:0,g:0,b:0},.10);
		ploter.fillEllipse(x+10,y+10,radius+3);
		
		var dColor = 0;
		var bColor = 0;
		ploter.setStroke(2, {r:0x25,g:0x25,b:0x25}, .50);
		var start:Float = 0;
		var end:Float;
		for( i in 0...data.length ){
			end = start + getAngle(data[i]);
			if( i % 2 == 0 )
				ploter.setColorFill( darkColors[dColor] );
			else
				ploter.setColorFill( brightColors[bColor] );
			ploter.fillPie( x, y, radius, start, end );
			ploter.strokePie( x, y, radius, start, end );
			
			if( i % 2 == 0 ){
				++dColor;
				if( dColor >= darkColors.length )
					dColor = 0;
			}else{
				++bColor;
				if( bColor >= brightColors.length )
					bColor = 0;
			}
			start = end;
		}
		ploter.setStroke(3,{r:0xFB,g:0xaa,b:0x15},.80);
		ploter.strokeEllipse(x,y,radius+3);
	}
	
	function initSum():Void {
		this.sum = 0;
		for( i in data) this.sum += i;
	}
	
	function getAngle( v:Float ):Float {
		return (v/this.sum)*(Math.PI*2);
	}
	
}