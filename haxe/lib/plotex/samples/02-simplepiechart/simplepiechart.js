$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	}
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	}
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = this.length + len - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
if(typeof plotex=='undefined') plotex = {}
plotex.Ploter = function() { }
plotex.Ploter.__name__ = ["plotex","Ploter"];
plotex.Ploter.prototype.x = null;
plotex.Ploter.prototype.y = null;
plotex.Ploter.prototype.moveTo = null;
plotex.Ploter.prototype.line = null;
plotex.Ploter.prototype.lineTo = null;
plotex.Ploter.prototype.lineUp = null;
plotex.Ploter.prototype.lineRight = null;
plotex.Ploter.prototype.curve = null;
plotex.Ploter.prototype.curveTo = null;
plotex.Ploter.prototype.ellipse = null;
plotex.Ploter.prototype.rect = null;
plotex.Ploter.prototype.arc = null;
plotex.Ploter.prototype.pie = null;
plotex.Ploter.prototype.fillEllipse = null;
plotex.Ploter.prototype.fillRect = null;
plotex.Ploter.prototype.fillPie = null;
plotex.Ploter.prototype.strokeEllipse = null;
plotex.Ploter.prototype.strokeRect = null;
plotex.Ploter.prototype.strokeArc = null;
plotex.Ploter.prototype.strokePie = null;
plotex.Ploter.prototype.setColorFill = null;
plotex.Ploter.prototype.setGradientFill = null;
plotex.Ploter.prototype.setBitmapFill = null;
plotex.Ploter.prototype.setStroke = null;
plotex.Ploter.prototype.stroke = null;
plotex.Ploter.prototype.fill = null;
plotex.Ploter.prototype.beginPath = null;
plotex.Ploter.prototype.closePath = null;
plotex.Ploter.prototype.clear = null;
plotex.Ploter.prototype.toString = null;
plotex.Ploter.prototype.__class__ = plotex.Ploter;
plotex.GradientType = { __ename__ : ["plotex","GradientType"], __constructs__ : ["linear","radial"] }
plotex.GradientType.linear = ["linear",0];
plotex.GradientType.linear.toString = $estr;
plotex.GradientType.linear.__enum__ = plotex.GradientType;
plotex.GradientType.radial = ["radial",1];
plotex.GradientType.radial.toString = $estr;
plotex.GradientType.radial.__enum__ = plotex.GradientType;
if(!plotex.js) plotex.js = {}
plotex.js.CanvasUtil = function() { }
plotex.js.CanvasUtil.__name__ = ["plotex","js","CanvasUtil"];
plotex.js.CanvasUtil.getCanvas = function(canvasId) {
	var element = js.Lib.document.getElementById(canvasId);
	if(element != null && js.Lib.isIE) {
		try {
			element = js.Lib.window.G_vmlCanvasManager.initElement(element);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					js.Lib.alert("G_vmlCanvasManager.initElement error - excanvas might not be initialized");
				}
			}
		}
	}
	return element;
}
plotex.js.CanvasUtil.prototype.__class__ = plotex.js.CanvasUtil;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
SimplePieChart = function(canvasId) { if( canvasId === $_ ) return; {
	var canvas = plotex.js.CanvasUtil.getCanvas(canvasId);
	this.init(new plotex.js.CanvasPloter(canvas.getContext("2d")));
}}
SimplePieChart.__name__ = ["SimplePieChart"];
SimplePieChart.prototype.radius = null;
SimplePieChart.prototype.x = null;
SimplePieChart.prototype.y = null;
SimplePieChart.prototype.ploter = null;
SimplePieChart.prototype.sum = null;
SimplePieChart.prototype.data = null;
SimplePieChart.prototype.init = function(p) {
	this.ploter = p;
	this.radius = 80;
	this.x = this.y = 200;
}
SimplePieChart.prototype.setData = function(d) {
	this.data = d;
	this.initSum();
}
SimplePieChart.prototype.setRadius = function(r) {
	this.radius = r;
}
SimplePieChart.prototype.setPosition = function(x,y) {
	this.x = x;
	this.y = y;
}
SimplePieChart.prototype.draw = function() {
	this.ploter.clear();
	this.ploter.setColorFill({ r : 0, g : 0, b : 0},.10);
	this.ploter.fillEllipse(this.x + 10,this.y + 10,this.radius + 3);
	var dColor = 0;
	var bColor = 0;
	this.ploter.setStroke(2,{ r : 37, g : 37, b : 37},.50);
	var start = 0;
	var end;
	{
		var _g1 = 0, _g = this.data.length;
		while(_g1 < _g) {
			var i = _g1++;
			end = start + this.getAngle(this.data[i]);
			if(i % 2 == 0) this.ploter.setColorFill(SimplePieChart.darkColors[dColor]);
			else this.ploter.setColorFill(SimplePieChart.brightColors[bColor]);
			this.ploter.fillPie(this.x,this.y,this.radius,start,end);
			this.ploter.strokePie(this.x,this.y,this.radius,start,end);
			if(i % 2 == 0) {
				++dColor;
				if(dColor >= SimplePieChart.darkColors.length) dColor = 0;
			}
			else {
				++bColor;
				if(bColor >= SimplePieChart.brightColors.length) bColor = 0;
			}
			start = end;
		}
	}
	this.ploter.setStroke(3,{ r : 251, g : 170, b : 21},.80);
	this.ploter.strokeEllipse(this.x,this.y,this.radius + 3);
}
SimplePieChart.prototype.initSum = function() {
	this.sum = 0;
	{
		var _g = 0, _g1 = this.data;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			this.sum += i;
		}
	}
}
SimplePieChart.prototype.getAngle = function(v) {
	return v / this.sum * (Math.PI * 2);
}
SimplePieChart.prototype.__class__ = SimplePieChart;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
plotex.js.CanvasPloter = function(ctx) { if( ctx === $_ ) return; {
	this.ctx = ctx;
	this.beginPath();
}}
plotex.js.CanvasPloter.__name__ = ["plotex","js","CanvasPloter"];
plotex.js.CanvasPloter.prototype.ctx = null;
plotex.js.CanvasPloter.prototype._x = null;
plotex.js.CanvasPloter.prototype._y = null;
plotex.js.CanvasPloter.prototype.x = null;
plotex.js.CanvasPloter.prototype.y = null;
plotex.js.CanvasPloter.prototype.moveTo = function(x,y) {
	this._x = x;
	this._y = y;
	this.ctx.moveTo(x,y);
}
plotex.js.CanvasPloter.prototype.line = function(bx,by,ex,ey) {
	this.moveTo(bx,by);
	this.lineTo(ex,ey);
}
plotex.js.CanvasPloter.prototype.lineTo = function(x,y) {
	this.ctx.lineTo(x,y);
	this._x = x;
	this._y = y;
}
plotex.js.CanvasPloter.prototype.lineUp = function(d) {
	this.lineTo(this._x,this._y - d);
}
plotex.js.CanvasPloter.prototype.lineRight = function(d) {
	this.lineTo(this._x + d,this._y);
}
plotex.js.CanvasPloter.prototype.curve = function(controlX,controlY,bx,by,ex,ey) {
	this.moveTo(bx,by);
	this.curveTo(ex,ey,controlX,controlY);
}
plotex.js.CanvasPloter.prototype.curveTo = function(controlX,controlY,x,y) {
	this.ctx.quadraticCurveTo(controlX,controlY,x,y);
	this._x = x;
	this._y = y;
}
plotex.js.CanvasPloter.prototype.ellipse = function(x,y,xRadius,yRadius) {
	if(yRadius == null) {
		this.ctx.arc(x,y,xRadius,0,Math.PI * 2,true);
	}
	else {
		var theta, xrCtrl, yrCtrl, angle, angleMid, px, py, cx, cy;
		theta = Math.PI / 4;
		xrCtrl = xRadius / Math.cos(theta / 2);
		yrCtrl = yRadius / Math.cos(theta / 2);
		angle = 0.0;
		this.moveTo(x + xRadius,y);
		{
			var _g = 0;
			while(_g < 8) {
				var i = _g++;
				angle += theta;
				angleMid = angle - theta / 2;
				cx = x + Math.cos(angleMid) * xrCtrl;
				cy = y + Math.sin(angleMid) * yrCtrl;
				px = x + Math.cos(angle) * xRadius;
				py = y + Math.sin(angle) * yRadius;
				this.curveTo(cx,cy,px,py);
			}
		}
	}
}
plotex.js.CanvasPloter.prototype.rect = function(x,y,w,h,round) {
	if(round == null || round == 0) this.ctx.rect(x,y,w,h);
	else this.roundedRectPath(x,y,w,h,round);
}
plotex.js.CanvasPloter.prototype.arc = function(x,y,radius,startAngle,endAngle,conterClockWise) {
	if(conterClockWise == null) conterClockWise = true;
	this.ctx.arc(x,y,radius,-startAngle,-endAngle,conterClockWise);
}
plotex.js.CanvasPloter.prototype.pie = function(x,y,radius,startAngle,endAngle,conterClockWise) {
	this.moveTo(x,y);
	this.arc(x,y,radius,startAngle,endAngle,conterClockWise);
	this.lineTo(x,y);
}
plotex.js.CanvasPloter.prototype.fillPie = function(x,y,radius,startAngle,endAngle,conterClockWise) {
	this.beginPath();
	this.pie(x,y,radius,startAngle,endAngle,conterClockWise);
	this.fill();
}
plotex.js.CanvasPloter.prototype.fillEllipse = function(x,y,xRadius,yRadius) {
	this.beginPath();
	this.ellipse(x,y,xRadius,yRadius);
	this.fill();
}
plotex.js.CanvasPloter.prototype.fillRect = function(x,y,w,h,round) {
	this.beginPath();
	if(round == null || round == 0) {
		this.ctx.fillRect(x,y,w,h);
	}
	else {
		this.rect(x,y,w,h,round);
		this.fill();
	}
}
plotex.js.CanvasPloter.prototype.strokeRect = function(x,y,w,h,round) {
	this.beginPath();
	if(round == null || round == 0) {
		this.ctx.strokeRect(x,y,w,h);
	}
	else {
		this.roundedRectPath(x,y,w,h,round);
		this.ctx.stroke();
	}
}
plotex.js.CanvasPloter.prototype.strokeEllipse = function(x,y,xRadius,yRadius) {
	this.beginPath();
	this.ellipse(x,y,xRadius,yRadius);
	this.stroke();
}
plotex.js.CanvasPloter.prototype.strokeArc = function(x,y,radius,startAngle,endAngle,conterClockWise) {
	this.beginPath();
	if(conterClockWise == null) conterClockWise = true;
	this.ctx.arc(x,y,radius,-startAngle,-endAngle,conterClockWise);
	this.stroke();
}
plotex.js.CanvasPloter.prototype.strokePie = function(x,y,radius,startAngle,endAngle,conterClockWise) {
	this.beginPath();
	this.pie(x,y,radius,startAngle,endAngle,conterClockWise);
	this.stroke();
}
plotex.js.CanvasPloter.prototype.setColorFill = function(color,alpha) {
	this.ctx.fillStyle = this.getRGBAString(color,alpha);
}
plotex.js.CanvasPloter.prototype.setGradientFill = function(g) {
	var gs;
	var $e = g.type;
	switch( $e[1] ) {
	case 0:
	{
		gs = this.ctx.createLinearGradient(g.x,g.y,g.x + Math.cos(g.rotation) * g.width,g.y + Math.sin(g.rotation) * g.height);
	}break;
	case 1:
	{
		var dw = g.width * g.width;
		var dh = g.height * g.height;
		gs = this.ctx.createRadialGradient(g.x,g.y,1,g.x,g.y,Math.sqrt(dw + dh) / 2);
	}break;
	}
	{
		var _g = 0, _g1 = g.transitions;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			gs.addColorStop(i.ratio / 255,this.getRGBAString(i.rgb,i.alpha));
		}
	}
	this.ctx.fillStyle = gs;
}
plotex.js.CanvasPloter.prototype.setBitmapFill = function(bmp,mat,repeate,smoothing) {
	null;
}
plotex.js.CanvasPloter.prototype.fill = function() {
	this.ctx.fill();
}
plotex.js.CanvasPloter.prototype.beginPath = function() {
	this.ctx.beginPath();
}
plotex.js.CanvasPloter.prototype.closePath = function() {
	this.ctx.closePath();
}
plotex.js.CanvasPloter.prototype.setStroke = function(tickness,color,alpha) {
	this.ctx.lineWidth = tickness;
	this.ctx.strokeStyle = this.getRGBAString(color,alpha);
}
plotex.js.CanvasPloter.prototype.stroke = function() {
	this.ctx.stroke();
}
plotex.js.CanvasPloter.prototype.clear = function() {
	this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
}
plotex.js.CanvasPloter.prototype.toString = function() {
	return "CanvasPloter[" + this._x + "," + this._y + "]";
}
plotex.js.CanvasPloter.prototype.getX = function() {
	return this._x;
}
plotex.js.CanvasPloter.prototype.setX = function(x) {
	this.moveTo(x,0);
	return this._x;
}
plotex.js.CanvasPloter.prototype.getY = function() {
	return this._y;
}
plotex.js.CanvasPloter.prototype.setY = function(y) {
	this.moveTo(0,y);
	return this._y;
}
plotex.js.CanvasPloter.prototype.roundedRectPath = function(x,y,w,h,round) {
	var theta, angle, cx, cy, px, py;
	var maxRadii = Math.min(w,h) / 2;
	if(round > maxRadii) round = maxRadii;
	this.moveTo(x,y + round);
	this.lineTo(x,y + h - round);
	this.curveTo(x,y + h,x + round,y + h);
	this.lineTo(x + w - round,y + h);
	this.curveTo(x + w,y + h,x + w,y + h - round);
	this.lineTo(x + w,y + round);
	this.curveTo(x + w,y,x + w - round,y);
	this.lineTo(x + round,y);
	this.curveTo(x,y,x,y + round);
}
plotex.js.CanvasPloter.prototype.getRGBAString = function(c,a) {
	var s;
	if(a == null) s = "rgb(" + c.r + "," + c.g + "," + c.b + ")";
	else s = "rgba(" + c.r + "," + c.g + "," + c.b + "," + a + ")";
	return s;
}
plotex.js.CanvasPloter.prototype.__class__ = plotex.js.CanvasPloter;
plotex.js.CanvasPloter.__interfaces__ = [plotex.Ploter];
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
}
js.Lib.onerror = null;
SimplePieChart.darkColors = [{ r : 34, g : 64, b : 87},{ r : 55, g : 104, b : 140},{ r : 70, g : 134, b : 181}];
SimplePieChart.brightColors = [{ r : 183, g : 208, b : 227},{ r : 119, g : 167, b : 202}];
