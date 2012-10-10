$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof meieraha=='undefined') meieraha = {}
if(!meieraha.js) meieraha.js = {}
meieraha.js.MouseListener = function() { }
meieraha.js.MouseListener.__name__ = ["meieraha","js","MouseListener"];
meieraha.js.MouseListener.prototype.click = null;
meieraha.js.MouseListener.prototype.mouseup = null;
meieraha.js.MouseListener.prototype.mouseover = null;
meieraha.js.MouseListener.prototype.mousemove = null;
meieraha.js.MouseListener.prototype.mousedown = null;
meieraha.js.MouseListener.prototype.__class__ = meieraha.js.MouseListener;
meieraha.js.MouseUtil = function() { }
meieraha.js.MouseUtil.__name__ = ["meieraha","js","MouseUtil"];
meieraha.js.MouseUtil.addMouseListener = function(jqDomElement,listener) {
	var bindMethod = function(eventType) {
		jqDomElement.bind(eventType,function(e) {
			var position = jqDomElement.offset();
			e.canvasX = Math.floor(e.pageX - position.left);
			e.canvasY = Math.floor(e.pageY - position.top);
			{
				listener[eventType](e);
			}
		});
	}
	{
		var _g = 0, _g1 = ["click","mouseup","mouseover","mousedown","mousemove"];
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			bindMethod(m);
		}
	}
}
meieraha.js.MouseUtil.prototype.__class__ = meieraha.js.MouseUtil;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		
				for(var i in o)
					if( o.hasOwnProperty(i) )
						a.push(i);
			;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
				for(var i in o)
					if( i != "__proto__" )
						a.push(i);
			;
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
}
Reflect.prototype.__class__ = Reflect;
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
if(!meieraha.widgets) meieraha.widgets = {}
meieraha.widgets.MouseAction = { __ename__ : ["meieraha","widgets","MouseAction"], __constructs__ : ["NONE","MOVE","RESIZE","ACT"] }
meieraha.widgets.MouseAction.NONE = ["NONE",0];
meieraha.widgets.MouseAction.NONE.toString = $estr;
meieraha.widgets.MouseAction.NONE.__enum__ = meieraha.widgets.MouseAction;
meieraha.widgets.MouseAction.MOVE = ["MOVE",1];
meieraha.widgets.MouseAction.MOVE.toString = $estr;
meieraha.widgets.MouseAction.MOVE.__enum__ = meieraha.widgets.MouseAction;
meieraha.widgets.MouseAction.RESIZE = ["RESIZE",2];
meieraha.widgets.MouseAction.RESIZE.toString = $estr;
meieraha.widgets.MouseAction.RESIZE.__enum__ = meieraha.widgets.MouseAction;
meieraha.widgets.MouseAction.ACT = ["ACT",3];
meieraha.widgets.MouseAction.ACT.toString = $estr;
meieraha.widgets.MouseAction.ACT.__enum__ = meieraha.widgets.MouseAction;
meieraha.js.Drawable = function() { }
meieraha.js.Drawable.__name__ = ["meieraha","js","Drawable"];
meieraha.js.Drawable.prototype.draw = null;
meieraha.js.Drawable.prototype.__class__ = meieraha.js.Drawable;
meieraha.widgets.BubbleDisplay = function(p) { if( p === $_ ) return; {
	this.layoutEngines = new Array();
	this.bubbleRegistry = new meieraha.widgets.BubbleRegistry();
	this.highlightedBubble = null;
	this.action = meieraha.widgets.MouseAction.NONE;
	this.mouseDown = false;
}}
meieraha.widgets.BubbleDisplay.__name__ = ["meieraha","widgets","BubbleDisplay"];
meieraha.widgets.BubbleDisplay.prototype.layoutEngines = null;
meieraha.widgets.BubbleDisplay.prototype.bubbleRegistry = null;
meieraha.widgets.BubbleDisplay.prototype.highlightedBubble = null;
meieraha.widgets.BubbleDisplay.prototype.action = null;
meieraha.widgets.BubbleDisplay.prototype.mouseDown = null;
meieraha.widgets.BubbleDisplay.prototype.dragOffset = null;
meieraha.widgets.BubbleDisplay.prototype.clearBubbles = function() {
	this.bubbleRegistry.clear();
	this.highlightedBubble = null;
	this.action = meieraha.widgets.MouseAction.NONE;
	this.layoutEngines = new Array();
}
meieraha.widgets.BubbleDisplay.prototype.addBubbles = function(items,bounds,side) {
	if(side == null) side = 1;
	var le = new meieraha.widgets.BubbleLayoutEngine(bounds);
	this.layoutEngines.push(le);
	this.bubbleRegistry.addBubbles(items,le,side);
	le.performOrderedLayout();
	this.bubbleRegistry.reindex();
}
meieraha.widgets.BubbleDisplay.prototype.draw = function(gc) {
	var _g = 0, _g1 = this.bubbleRegistry.visibleBubbles;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		b.draw(gc);
	}
}
meieraha.widgets.BubbleDisplay.prototype.click = function(e) {
	if(this.highlightedBubble != null && this.action == meieraha.widgets.MouseAction.ACT) {
		if(this.highlightedBubble.hasChildren) this.bubbleRegistry.expandBubble(this.highlightedBubble);
		else if(this.highlightedBubble.hasParent) this.bubbleRegistry.contractBubble(this.highlightedBubble);
		meieraha.js.Base.requestRepaint();
	}
}
meieraha.widgets.BubbleDisplay.prototype.mouseover = function(e) {
	null;
}
meieraha.widgets.BubbleDisplay.prototype.mousedown = function(e) {
	if(this.highlightedBubble != null) {
		meieraha.js.Base.hideHint();
		if(this.action == meieraha.widgets.MouseAction.MOVE) {
			this.dragOffset = { x : this.highlightedBubble.getPosition().x - e.canvasX, y : this.highlightedBubble.getPosition().y - e.canvasY};
			this.highlightedBubble.state = meieraha.js.widgets.BubbleState.DRAGGED;
			this.bubbleRegistry.setTopBubble(this.highlightedBubble);
			meieraha.js.Base.requestRepaint();
		}
		else if(this.action == meieraha.widgets.MouseAction.RESIZE) {
			this.highlightedBubble.state = meieraha.js.widgets.BubbleState.RESIZED;
			this.bubbleRegistry.setTopBubble(this.highlightedBubble);
			meieraha.js.Base.requestRepaint();
		}
	}
	this.mouseDown = true;
}
meieraha.widgets.BubbleDisplay.prototype.mouseup = function(e) {
	if(this.highlightedBubble != null) {
		if(this.action == meieraha.widgets.MouseAction.MOVE || this.action == meieraha.widgets.MouseAction.RESIZE) {
			this.highlightedBubble.state = meieraha.js.widgets.BubbleState.HIGHLIGHTED;
			this.highlightedBubble.layoutEngine.performIncrementalLayout();
			this.bubbleRegistry.reindex();
			meieraha.js.Base.hideRules();
			meieraha.js.Base.requestRepaint();
		}
	}
	this.mouseDown = false;
}
meieraha.widgets.BubbleDisplay.prototype.mousedrag = function(e) {
	if(this.highlightedBubble != null) {
		if(this.action == meieraha.widgets.MouseAction.MOVE) {
			this.highlightedBubble.setPosition({ x : e.canvasX + this.dragOffset.x, y : e.canvasY + this.dragOffset.y});
			meieraha.js.Base.requestRepaint();
		}
		else if(this.action == meieraha.widgets.MouseAction.RESIZE) {
			var dx = e.canvasX - this.highlightedBubble.getPosition().x;
			var dy = e.canvasY - this.highlightedBubble.getPosition().y;
			var r = Math.sqrt(dx * dx + dy * dy);
			var v = meieraha.js.widgets.Bubble.radiusToValue(r);
			var oldValue = this.highlightedBubble.getValue();
			this.highlightedBubble.setValue(v);
			this.bubbleRegistry.appliedRules = new Array();
			this.bubbleRegistry.bubbleValueChanged(this.highlightedBubble,oldValue);
			if(this.bubbleRegistry.appliedRules.length > 0) {
				var s = this.bubbleRegistry.appliedRules.join("<br/>");
				meieraha.js.Base.showRules(s);
			}
			meieraha.js.Base.showHint(this.highlightedBubble.getAmountString(),e.pageX,e.pageY);
			meieraha.js.Base.requestRepaint();
		}
	}
}
meieraha.widgets.BubbleDisplay.prototype.mousemove = function(e) {
	if(this.mouseDown) {
		this.mousedrag(e);
		return;
	}
	if(this.highlightedBubble != null) this.highlightedBubble.state = meieraha.js.widgets.BubbleState.DEFAULT;
	var b = this.bubbleRegistry.findVisibleBubbleAt(e.canvasX,e.canvasY);
	if(b != null) {
		meieraha.js.Base.showHint(b.getTitle() + ": " + b.getAmountString(),e.pageX,e.pageY);
		b.state = meieraha.js.widgets.BubbleState.HIGHLIGHTED;
		var dx = e.canvasX - b.getPosition().x;
		var dy = e.canvasY - b.getPosition().y;
		var r2 = (b.getRadius() - 10) * (b.getRadius() - 10);
		var distToCenter2 = dx * dx + dy * dy;
		if(distToCenter2 > r2) {
			this.action = meieraha.widgets.MouseAction.RESIZE;
			if(dx == 0) meieraha.js.Base.setCursor("n-resize");
			else {
				var tanA = dy / dx;
				if(tanA > Math.sqrt(3)) meieraha.js.Base.setCursor("n-resize");
				else if(tanA > Math.sqrt(3) / 3) {
					meieraha.js.Base.setCursor("nw-resize");
					if(b.hasChildren || b.hasParent) {
						var dbtn = b.getRadius() * Math.sqrt(2) / 2 - 3;
						var btnX = b.getPosition().x + dbtn;
						var btnY = b.getPosition().y + dbtn;
						var dist = Math.max(Math.abs(e.canvasX - btnX),Math.abs(e.canvasY - btnY));
						if(dist < 15) {
							meieraha.js.Base.setCursor("pointer");
							this.action = meieraha.widgets.MouseAction.ACT;
						}
					}
				}
				else if(tanA > -Math.sqrt(3) / 3) meieraha.js.Base.setCursor("w-resize");
				else if(tanA > -Math.sqrt(3)) meieraha.js.Base.setCursor("sw-resize");
				else meieraha.js.Base.setCursor("s-resize");
			}
		}
		else {
			this.action = meieraha.widgets.MouseAction.MOVE;
			meieraha.js.Base.setCursor("move");
		}
	}
	else {
		this.action = meieraha.widgets.MouseAction.NONE;
		meieraha.js.Base.hideHint();
		meieraha.js.Base.setCursor("auto");
	}
	if(b != this.highlightedBubble) {
		this.highlightedBubble = b;
		meieraha.js.Base.requestRepaint();
	}
}
meieraha.widgets.BubbleDisplay.prototype.__class__ = meieraha.widgets.BubbleDisplay;
meieraha.widgets.BubbleDisplay.__interfaces__ = [meieraha.js.MouseListener,meieraha.js.Drawable];
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
meieraha.widgets.BubbleRegistry = function(p) { if( p === $_ ) return; {
	this.bubbles = new IntHash();
	this.children = new IntHash();
	this.parentId = new IntHash();
	this.parent = new IntHash();
	this.visibleBubbles = new Array();
	this.bubbleIndex = null;
}}
meieraha.widgets.BubbleRegistry.__name__ = ["meieraha","widgets","BubbleRegistry"];
meieraha.widgets.BubbleRegistry.prototype.bubbles = null;
meieraha.widgets.BubbleRegistry.prototype.children = null;
meieraha.widgets.BubbleRegistry.prototype.parent = null;
meieraha.widgets.BubbleRegistry.prototype.parentId = null;
meieraha.widgets.BubbleRegistry.prototype.visibleBubbles = null;
meieraha.widgets.BubbleRegistry.prototype.bubbleIndex = null;
meieraha.widgets.BubbleRegistry.prototype.clear = function() {
	{ var $it0 = this.bubbles.keys();
	while( $it0.hasNext() ) { var b = $it0.next();
	{
		this.bubbles.get(b).free();
	}
	}}
	this.bubbles = new IntHash();
	this.children = new IntHash();
	this.parentId = new IntHash();
	this.parent = new IntHash();
	this.visibleBubbles = new Array();
	this.bubbleIndex = null;
}
meieraha.widgets.BubbleRegistry.prototype.addBubbles = function(items,layoutEngine,side) {
	if(side == null) side = 1;
	{
		var _g = 0;
		while(_g < items.length) {
			var item = items[_g];
			++_g;
			var b = meieraha.js.widgets.BubbleUtil.makeBubble(item);
			b.side = side;
			this.bubbles.set(item.id,b);
			this.parentId.set(item.id,item.parentId);
			if(item.parentId != null) {
				if(this.children.get(item.parentId) == null) this.children.set(item.parentId,new Array());
				this.children.get(item.parentId).push(b);
			}
		}
	}
	{
		var _g = 0;
		while(_g < items.length) {
			var item = items[_g];
			++_g;
			this.parent.set(item.id,this.parentId.get(item.id) == null?null:this.bubbles.get(this.parentId.get(item.id)));
		}
	}
	{
		var _g = 0;
		while(_g < items.length) {
			var item = items[_g];
			++_g;
			var id = item.id;
			if(this.children.get(id) == null) this.children.set(id,new Array());
			var bi = this.bubbles.get(id);
			bi.hasChildren = this.children.get(id).length != 0;
			bi.hasParent = this.parent.get(id) != null;
			bi.setVisible(!bi.hasParent);
			if(bi.hasParent) {
				var p = this.parent.get(bi.id);
				bi.color = { r : Math.ceil(p.color.r * 0.8), g : Math.ceil(p.color.g * 0.8), b : Math.ceil(p.color.b * 0.8)};
			}
			if(bi.getVisible()) {
				this.visibleBubbles.push(bi);
				layoutEngine.registerBubble(bi);
			}
		}
	}
}
meieraha.widgets.BubbleRegistry.prototype.expandBubble = function(b) {
	if(b.hasChildren) {
		{
			var _g = 0, _g1 = this.children.get(b.id);
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.setPosition({ x : b.getPosition().x, y : b.getPosition().y});
				c.setVisible(true);
				b.layoutEngine.registerBubble(c);
				this.visibleBubbles.push(c);
			}
		}
		b.expanded = true;
		b.layoutEngine.unregisterBubble(b);
		b.layoutEngine.performIncrementalLayout();
		this.reindex();
	}
}
meieraha.widgets.BubbleRegistry.prototype.contractBubble = function(child) {
	var b = this.parent.get(child.id);
	if(b != null) {
		{
			var _g = 0, _g1 = this.children.get(b.id);
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.setVisible(false);
				c.layoutEngine.unregisterBubble(c);
				this.visibleBubbles.remove(c);
			}
		}
		b.expanded = false;
		b.layoutEngine.registerBubble(b);
		b.layoutEngine.performIncrementalLayout();
		this.setTopBubble(b);
		this.reindex();
	}
}
meieraha.widgets.BubbleRegistry.prototype.reindex = function() {
	this.bubbleIndex = new meieraha.widgets.IndexTreeNode(this.visibleBubbles);
}
meieraha.widgets.BubbleRegistry.prototype.findVisibleBubbleAt = function(x,y) {
	return this.bubbleIndex.query(x,y);
}
meieraha.widgets.BubbleRegistry.prototype.setTopBubble = function(b) {
	if(this.visibleBubbles.remove(b)) this.visibleBubbles.push(b);
	else haxe.Log.trace("Failure: Could not find bubble!",{ fileName : "BubbleRegistry.hx", lineNumber : 134, className : "meieraha.widgets.BubbleRegistry", methodName : "setTopBubble"});
}
meieraha.widgets.BubbleRegistry.prototype.bubbleValueChanged = function(b,oldValue,noMagic) {
	if(noMagic == null) noMagic = false;
	if(!noMagic) this.applyValueRules(b,oldValue);
	if(b.hasChildren) {
		{
			var _g = 0, _g1 = this.children.get(b.id);
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				var newSubTotal = b.getValue() * c.getValue() / oldValue;
				var oldChildValue = c.getValue();
				c.setValue(newSubTotal);
				if(!noMagic) this.applyValueRules(c,oldChildValue);
			}
		}
	}
	else if(b.hasParent) {
		var p = this.parent.get(b.id);
		var oldParentValue = p.getValue();
		p.setValue(p.getValue() + b.getValue() - oldValue);
		if(!noMagic) this.applyValueRules(p,oldParentValue);
	}
	var balance = 0.0;
	{ var $it0 = this.bubbles.keys();
	while( $it0.hasNext() ) { var bk = $it0.next();
	{
		b = this.bubbles.get(bk);
		if(!b.hasParent) balance += b.side * b.getValue();
	}
	}}
	meieraha.js.Base.setNewBalance(balance);
}
meieraha.widgets.BubbleRegistry.prototype.appliedRules = null;
meieraha.widgets.BubbleRegistry.prototype.applyValueRules = function(b,oldValue) {
	var rs = rules;
	var delta = b.getValue() - oldValue;
	{
		var _g = 0;
		while(_g < rs.length) {
			var r = rs[_g];
			++_g;
			if(b.id == r.target) {
				var d = this.bubbles.get(r.destination);
				var oldValue1 = d.getValue();
				d.setValue(oldValue1 + r.coef * delta);
				this.appliedRules.push(r.message);
				this.bubbleValueChanged(d,oldValue1,true);
			}
		}
	}
}
meieraha.widgets.BubbleRegistry.prototype.__class__ = meieraha.widgets.BubbleRegistry;
meieraha.js.Base = function() { }
meieraha.js.Base.__name__ = ["meieraha","js","Base"];
meieraha.js.Base.containerNode = null;
meieraha.js.Base.canvasNode = null;
meieraha.js.Base.rulesNode = null;
meieraha.js.Base.hintNode = null;
meieraha.js.Base.scalesNode = null;
meieraha.js.Base.instance = null;
meieraha.js.Base.gc = null;
meieraha.js.Base.ieVersion = null;
meieraha.js.Base.isIE6 = null;
meieraha.js.Base.isIE7 = null;
meieraha.js.Base.main = function() {
	meieraha.js.Base.ieVersion = meieraha.js.Base.getInternetExplorerVersion();
	meieraha.js.Base.isIE6 = meieraha.js.Base.ieVersion > 0 && meieraha.js.Base.ieVersion < 7;
	meieraha.js.Base.isIE7 = meieraha.js.Base.ieVersion > 0 && meieraha.js.Base.ieVersion < 8;
	var runApp = function() {
		meieraha.js.Base.initializeEngine("AppContainer","AppCanvas");
		var app = new meieraha.widgets.App(meieraha.js.Base.containerNode.width(),meieraha.js.Base.containerNode.height());
		app['mousemove'] = app.mousemove;;
		app['mouseup'] = app.mouseup;;
		app['mouseover'] = app.mouseover;;
		app['mousedown'] = app.mousedown;;
		app['click'] = app.click;;
		meieraha.js.Base.instance = app;
		meieraha.js.MouseUtil.addMouseListener(meieraha.js.Base.containerNode,meieraha.js.Base.instance);
		new $("#ResetButton").click(function() {
			app.reset();
		});
		meieraha.js.Base.rulesNode = new $("#RulesDisplay");
		meieraha.js.Base.hintNode = new $("#HintDisplay");
		meieraha.js.Base.scalesNode = new $("#ScaleImage");
		var data = meieraha.Data.loadData();
		app.setData(data);
		{
			var _g = 0, _g1 = data.scales;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				meieraha.js.widgets.ComparisonBubble.make(e.title,e.description,e.value);
			}
		}
		meieraha.js.Base.requestRepaint();
	}
	if(js.Lib.isIE) {
		new $(function() {
			haxe.Timer.delay(runApp,1000);
		});
	}
	else new $(runApp);
}
meieraha.js.Base.initializeEngine = function(containerId,canvasId) {
	meieraha.js.Base.containerNode = new $("#" + containerId);
	meieraha.js.Base.canvasNode = new $("#" + canvasId);
	meieraha.js.widgets.Label.initializeLabelFactory(meieraha.js.Base.containerNode);
	meieraha.js.widgets.Bubble.initializeBubbleFactory();
	var canvas = plotex.js.CanvasUtil.getCanvas(canvasId);
	var ctx = canvas.getContext("2d");
	meieraha.js.Base.gc = new plotex.js.CanvasPloter(ctx);
}
meieraha.js.Base.requestRepaint = function() {
	if(meieraha.js.Base.instance != null) meieraha.js.Base.instance.draw(meieraha.js.Base.gc);
}
meieraha.js.Base.drawNow = function(d) {
	d.draw(meieraha.js.Base.gc);
}
meieraha.js.Base.status = function(s) {
	new $("#info-box").html(s);
}
meieraha.js.Base.setCursor = function(cursor) {
	meieraha.js.Base.containerNode.css("cursor",cursor);
}
meieraha.js.Base.getInternetExplorerVersion = function() {
	var rv = -1;
	if(js.Lib.window.navigator.appName == "Microsoft Internet Explorer") {
		var ua = js.Lib.window.navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
	}
	return rv;
}
meieraha.js.Base.setNewBalance = function(balance) {
	var bal = Math.round(10 * balance / (meieraha.Data.valueRoundingFactor / meieraha.Data.valueScalingFactor));
	var sign = bal == 0?"":bal > 0?"+":"-";
	bal = Math.round(Math.abs(bal));
	var s = sign + Math.round(bal / 10) + "." + bal % 10 + meieraha.Data.valueRoundingFactorChar;
	var bv = js.Lib.document.getElementById("BudgetValue");
	bv.innerHTML = s;
	if(bal < 1000) {
		meieraha.js.Base.scalesNode.removeClass().addClass("norm");
	}
	else if(sign == "-") meieraha.js.Base.scalesNode.removeClass().addClass("max");
	else meieraha.js.Base.scalesNode.removeClass().addClass("min");
}
meieraha.js.Base.showRules = function(s) {
	meieraha.js.Base.rulesNode.html(s);
	meieraha.js.Base.rulesNode.css("display","block");
}
meieraha.js.Base.hideRules = function() {
	meieraha.js.Base.rulesNode.css("display","none");
}
meieraha.js.Base.showHint = function(s,x,y) {
	meieraha.js.Base.hintNode.html(s);
	meieraha.js.Base.hintNode.css("left","" + (x + 4) + "px");
	meieraha.js.Base.hintNode.css("top","" + (y - 30) + "px");
	meieraha.js.Base.hintNode.css("display","block");
}
meieraha.js.Base.hideHint = function() {
	meieraha.js.Base.hintNode.css("display","none");
}
meieraha.js.Base.prototype.__class__ = meieraha.js.Base;
meieraha.widgets.BubbleLayoutEngine = function(bounds) { if( bounds === $_ ) return; {
	this.bounds = Reflect.copy(bounds);
	this.bubbles = new Array();
}}
meieraha.widgets.BubbleLayoutEngine.__name__ = ["meieraha","widgets","BubbleLayoutEngine"];
meieraha.widgets.BubbleLayoutEngine.prototype.bounds = null;
meieraha.widgets.BubbleLayoutEngine.prototype.bubbles = null;
meieraha.widgets.BubbleLayoutEngine.prototype.registerBubble = function(b) {
	this.bubbles.push({ position : null, bubble : b});
	b.layoutEngine = this;
}
meieraha.widgets.BubbleLayoutEngine.prototype.unregisterBubble = function(b) {
	var _g = 0, _g1 = this.bubbles;
	while(_g < _g1.length) {
		var bbl = _g1[_g];
		++_g;
		if(bbl.bubble == b) {
			this.bubbles.remove(bbl);
			break;
		}
	}
}
meieraha.widgets.BubbleLayoutEngine.prototype.prepareLayout = function() {
	var _g = 0, _g1 = this.bubbles;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		b.position = Reflect.copy(b.bubble.getPosition());
	}
}
meieraha.widgets.BubbleLayoutEngine.prototype.finishLayout = function() {
	var _g = 0, _g1 = this.bubbles;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		b.bubble.setPosition(Reflect.copy(b.position));
	}
}
meieraha.widgets.BubbleLayoutEngine.prototype.pushBubbles = function() {
	var moved = false;
	{
		var _g1 = 0, _g = this.bubbles.length;
		while(_g1 < _g) {
			var i = _g1++;
			var delta = { x : 0.0, y : 0.0};
			var pi = this.bubbles[i].position;
			var ri = this.bubbles[i].bubble.getRadius();
			{
				var _g3 = 0, _g2 = this.bubbles.length;
				while(_g3 < _g2) {
					var j = _g3++;
					if(i != j) {
						var pj = this.bubbles[j].position;
						var d = { x : pi.x - pj.x, y : pi.y - pj.y};
						var minR = ri + this.bubbles[j].bubble.getRadius() + 5;
						if(d.x * d.x + d.y * d.y < minR * minR) {
							delta.x += d.x / 10;
							delta.y += d.y / 10;
							if(d.x == 0 && d.y == 0) {
								delta.x += Math.random() * 2 - 1;
								delta.y += Math.random() * 2 - 1;
							}
						}
					}
				}
			}
			if(delta.x != 0 || delta.y != 0) {
				moved = true;
				pi.x += delta.x;
				pi.y += delta.y;
				if(pi.x < this.bounds.left + ri) pi.x = this.bounds.left + ri;
				if(pi.x > this.bounds.right - ri) pi.x = this.bounds.right - ri;
				if(pi.y < this.bounds.top + ri) pi.y = this.bounds.top + ri;
				if(pi.y > this.bounds.bottom - 30 - ri) pi.y = this.bounds.bottom - ri;
			}
			else {
				if(pi.x < this.bounds.left + ri) {
					pi.x = this.bounds.left + ri;
					moved = true;
				}
				if(pi.x > this.bounds.right - ri) {
					pi.x = this.bounds.right - ri;
					moved = true;
				}
				if(pi.y < this.bounds.top + ri) {
					pi.y = this.bounds.top + ri;
					moved = true;
				}
				if(pi.y > this.bounds.bottom - 30 - ri) {
					pi.y = this.bounds.bottom - ri;
					moved = true;
				}
			}
		}
	}
	return moved;
}
meieraha.widgets.BubbleLayoutEngine.prototype.performIncrementalLayout = function() {
	this.prepareLayout();
	var limiter = 100;
	while(this.pushBubbles() && limiter-- > 0) null;
	this.finishLayout();
}
meieraha.widgets.BubbleLayoutEngine.prototype.performOrderedLayout = function() {
	this.prepareLayout();
	var SKIP_LINE_TOP = 255;
	var SKIP_LINE_BOTTOM = 305;
	var TOP_MARGIN = 5;
	var RIGHT_MARGIN = 5;
	var LEFT_MARGIN = 5;
	if(this.bounds.left == 0) LEFT_MARGIN = 5;
	var HORIZONTAL_GUTTER = 10;
	var VERTICAL_GUTTER = 30;
	var totalWidth = this.bounds.right - this.bounds.left - RIGHT_MARGIN;
	var totalHeight = this.bounds.bottom - this.bounds.top;
	var currentRowTop = this.bounds.top + TOP_MARGIN;
	var sortBubbles = function(a,b) {
		return b.bubble.getRadius() - a.bubble.getRadius();
	}
	this.bubbles.sort(sortBubbles);
	var arr = this.bubbles;
	var currentBubble = 0;
	while(currentBubble < arr.length) {
		var currentRowHeight = arr[currentBubble].bubble.getRadius() * 2;
		var currentRowMid = currentRowTop + currentRowHeight / 2;
		var currentLeft = this.bounds.left + LEFT_MARGIN;
		var currentWidth = 0.0;
		if(currentRowTop < SKIP_LINE_BOTTOM && currentRowTop + currentRowHeight > SKIP_LINE_TOP) {
			currentRowTop = SKIP_LINE_BOTTOM;
			currentRowMid = currentRowTop + currentRowHeight / 2;
		}
		while(currentBubble < arr.length && currentWidth + arr[currentBubble].bubble.getRadius() * 2 < totalWidth) {
			arr[currentBubble].position = { x : currentLeft + arr[currentBubble].bubble.getRadius(), y : currentRowMid};
			currentLeft += arr[currentBubble].bubble.getRadius() * 2 + HORIZONTAL_GUTTER;
			currentWidth += arr[currentBubble].bubble.getRadius() * 2 + HORIZONTAL_GUTTER;
			currentBubble++;
		}
		currentRowTop += currentRowHeight + VERTICAL_GUTTER;
	}
	this.finishLayout();
}
meieraha.widgets.BubbleLayoutEngine.prototype.__class__ = meieraha.widgets.BubbleLayoutEngine;
meieraha.Main = function() { }
meieraha.Main.__name__ = ["meieraha","Main"];
meieraha.Main.main = function() {
	meieraha.js.Base.main();
}
meieraha.Main.prototype.__class__ = meieraha.Main;
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
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	}
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.__class__ = haxe.Timer;
if(typeof plotex=='undefined') plotex = {}
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
if(!meieraha.js.widgets) meieraha.js.widgets = {}
meieraha.js.widgets.ComparisonBubble = function() { }
meieraha.js.widgets.ComparisonBubble.__name__ = ["meieraha","js","widgets","ComparisonBubble"];
meieraha.js.widgets.ComparisonBubble.make = function(title,description,value) {
	var div = new $(js.Lib.document.createElement("DIV"));
	var r = meieraha.js.widgets.Bubble.valueToRadius(value,false);
	var d = 2 * r;
	var s = meieraha.js.widgets.Bubble.valueToAmountStr(value);
	div.html("<a href=\"javascript:void(0);\" title=\"" + description + "\"></a><p>" + title + "</p>");
	var a = div.children().first();
	div.css("width","auto");
	a.css("display","inline-block");
	a.css("width","" + d + "px");
	a.css("height","" + d + "px");
	var p = new Raphael(a[0], d, d);
	var c = p.circle(r,r,r);
	c.attr("fill","#999");
	c.attr("stroke","#999");
	if(r > 14.5) {
		c = p.text(r,r,s);
		c.attr("stroke","#fff");
	}
	div.addClass("bubble");
	div.draggable();
	a.qtip({ position : { corner : { target : "topMiddle", tooltip : "bottomMiddle"}}, show : { delay : 0}, style : { width : 230, padding : 10, background : "#ffffff", color : "#4D4D4D", textAlign : "center", border : { width : 2, radius : 5, color : "#ffffff"}, tip : "bottomMiddle", name : "dark"}});
	div.insertBefore("#compare-close");
}
meieraha.js.widgets.ComparisonBubble.prototype.__class__ = meieraha.js.widgets.ComparisonBubble;
meieraha.Data = function(p) { if( p === $_ ) return; {
	null;
}}
meieraha.Data.__name__ = ["meieraha","Data"];
meieraha.Data.valueExponent = null;
meieraha.Data.valueScalingFactor = null;
meieraha.Data.bubbleScalingFactor = null;
meieraha.Data.valueRoundingFactor = null;
meieraha.Data.valueRoundingFactorChar = null;
meieraha.Data.loadData = function() {
	var result = new meieraha.Data();
	result.incomes = meieraha.Data.dataItemsArray(tulud);
	result.expenses = meieraha.Data.dataItemsArray(kulud);
	result.scales = meieraha.Data.dataItemsArray(scales);
	meieraha.Data.valueExponent = (typeof valueExponent=='undefined') ? 0 : valueExponent;
	meieraha.Data.valueScalingFactor = Math.round(Math.pow(10,meieraha.Data.valueExponent));
	meieraha.Data.bubbleScalingFactor = (typeof bubbleScalingFactor=='undefined') ? 600 : bubbleScalingFactor;
	meieraha.Data.valueRoundingFactor = (typeof valueRoundingFactor=='undefined') ? 1000000 : valueRoundingFactor;
	meieraha.Data.valueRoundingFactorChar = (typeof valueRoundingFactorChar=='undefined') ? 'M' : valueRoundingFactorChar;
	return result;
}
meieraha.Data.dataItemsArray = function(a) {
	var r = new Array();
	{
		var _g1 = 0, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			r.push({ id : a[i].record_id, title : a[i].title, description : a[i].description, value : a[i].value, parentId : a[i].parent_id == 0?null:a[i].parent_id});
		}
	}
	return r;
}
meieraha.Data.prototype.incomes = null;
meieraha.Data.prototype.expenses = null;
meieraha.Data.prototype.scales = null;
meieraha.Data.prototype.__class__ = meieraha.Data;
if(!meieraha.util) meieraha.util = {}
meieraha.util.Random = function(seed) { if( seed === $_ ) return; {
	this.seed = seed;
	this.A = 48271;
	this.M = 2147483647;
	this.Q = Math.floor(this.M / this.A);
	this.R = this.M % this.A;
	this.oneOverM = 1.0 / this.M;
}}
meieraha.util.Random.__name__ = ["meieraha","util","Random"];
meieraha.util.Random.prototype.seed = null;
meieraha.util.Random.prototype.A = null;
meieraha.util.Random.prototype.M = null;
meieraha.util.Random.prototype.Q = null;
meieraha.util.Random.prototype.R = null;
meieraha.util.Random.prototype.oneOverM = null;
meieraha.util.Random.prototype.next = function() {
	var hi = Math.floor(this.seed / this.Q);
	var lo = this.seed % this.Q;
	var test = this.A * lo - this.R * hi;
	if(test > 0) {
		this.seed = test;
	}
	else {
		this.seed = test + this.M;
	}
	return this.seed * this.oneOverM;
}
meieraha.util.Random.prototype.nextInt = function(min,max) {
	return Math.round((max - min) * this.next() + min);
}
meieraha.util.Random.prototype.__class__ = meieraha.util.Random;
meieraha.js.widgets.BubbleState = { __ename__ : ["meieraha","js","widgets","BubbleState"], __constructs__ : ["DEFAULT","HIGHLIGHTED","DRAGGED","RESIZED"] }
meieraha.js.widgets.BubbleState.DEFAULT = ["DEFAULT",0];
meieraha.js.widgets.BubbleState.DEFAULT.toString = $estr;
meieraha.js.widgets.BubbleState.DEFAULT.__enum__ = meieraha.js.widgets.BubbleState;
meieraha.js.widgets.BubbleState.HIGHLIGHTED = ["HIGHLIGHTED",1];
meieraha.js.widgets.BubbleState.HIGHLIGHTED.toString = $estr;
meieraha.js.widgets.BubbleState.HIGHLIGHTED.__enum__ = meieraha.js.widgets.BubbleState;
meieraha.js.widgets.BubbleState.DRAGGED = ["DRAGGED",2];
meieraha.js.widgets.BubbleState.DRAGGED.toString = $estr;
meieraha.js.widgets.BubbleState.DRAGGED.__enum__ = meieraha.js.widgets.BubbleState;
meieraha.js.widgets.BubbleState.RESIZED = ["RESIZED",3];
meieraha.js.widgets.BubbleState.RESIZED.toString = $estr;
meieraha.js.widgets.BubbleState.RESIZED.__enum__ = meieraha.js.widgets.BubbleState;
meieraha.js.widgets.Bubble = function(title,value,color,position) { if( title === $_ ) return; {
	this.label = new meieraha.js.widgets.Label();
	this.label.verticalPositioning = meieraha.js.widgets.VerticalPositioning.TOP;
	this.numLabel = new meieraha.js.widgets.Label();
	this.numLabel.labelNode.css("color","white");
	this.color = color == null?{ r : 250, g : 0, b : 0}:color;
	this.setPosition(position == null?{ x : 10.0, y : 10.0}:position);
	this.setTitle(title == null?"":title);
	this.setValue(value == null?100000000:value);
	this.state = meieraha.js.widgets.BubbleState.DEFAULT;
	this.expanded = false;
	this.setVisible(true);
	this.side = 1;
	this.layoutEngine = null;
}}
meieraha.js.widgets.Bubble.__name__ = ["meieraha","js","widgets","Bubble"];
meieraha.js.widgets.Bubble.imgResize = null;
meieraha.js.widgets.Bubble.imgExpand = null;
meieraha.js.widgets.Bubble.imgContract = null;
meieraha.js.widgets.Bubble.imagesReady = null;
meieraha.js.widgets.Bubble.initializeBubbleFactory = function() {
	meieraha.js.widgets.Bubble.imagesReady = -2;
	if(!meieraha.js.Base.isIE6) {
		meieraha.js.widgets.Bubble.imgResize = new Image();
		meieraha.js.widgets.Bubble.imgResize['onload'] = function() { meieraha.js.widgets.Bubble.imagesReady++; }
		meieraha.js.widgets.Bubble.imgResize.src = "static/img/drag.png";
		meieraha.js.widgets.Bubble.imgExpand = new Image();
		meieraha.js.widgets.Bubble.imgExpand['onload'] = function() { meieraha.js.widgets.Bubble.imagesReady++; }
		meieraha.js.widgets.Bubble.imgExpand.src = "static/img/zoom.png";
		meieraha.js.widgets.Bubble.imgContract = new Image();
		meieraha.js.widgets.Bubble.imgContract['onload'] = function() { meieraha.js.widgets.Bubble.imagesReady++; }
		meieraha.js.widgets.Bubble.imgContract.src = "static/img/unzoom.png";
	}
}
meieraha.js.widgets.Bubble.radiusToValue = function(r) {
	if(r <= 6) r = 6;
	var v = meieraha.Data.bubbleScalingFactor * (r - 5);
	return v * v;
}
meieraha.js.widgets.Bubble.valueToRadius = function(v,withMargin) {
	var r = Math.sqrt(v) / meieraha.Data.bubbleScalingFactor;
	if(withMargin) r += 5;
	return r;
}
meieraha.js.widgets.Bubble.valueToAmountStr = function(v) {
	var amount = Math.round(10 * v / (meieraha.Data.valueRoundingFactor / meieraha.Data.valueScalingFactor));
	var amountStr = amount % 10 == 0?Std.string(Math.floor(amount / 10)) + " " + meieraha.Data.valueRoundingFactorChar:Std.string(Math.floor(amount / 10)) + "." + Std.string(amount % 10) + meieraha.Data.valueRoundingFactorChar;
	return amountStr;
}
meieraha.js.widgets.Bubble.prototype.id = null;
meieraha.js.widgets.Bubble.prototype.side = null;
meieraha.js.widgets.Bubble.prototype.value = null;
meieraha.js.widgets.Bubble.prototype._value = null;
meieraha.js.widgets.Bubble.prototype.amountString = null;
meieraha.js.widgets.Bubble.prototype.radius = null;
meieraha.js.widgets.Bubble.prototype._radius = null;
meieraha.js.widgets.Bubble.prototype.color = null;
meieraha.js.widgets.Bubble.prototype.hasChildren = null;
meieraha.js.widgets.Bubble.prototype.hasParent = null;
meieraha.js.widgets.Bubble.prototype.title = null;
meieraha.js.widgets.Bubble.prototype._title = null;
meieraha.js.widgets.Bubble.prototype.position = null;
meieraha.js.widgets.Bubble.prototype.expanded = null;
meieraha.js.widgets.Bubble.prototype.visible = null;
meieraha.js.widgets.Bubble.prototype._visible = null;
meieraha.js.widgets.Bubble.prototype.state = null;
meieraha.js.widgets.Bubble.prototype.layoutEngine = null;
meieraha.js.widgets.Bubble.prototype.label = null;
meieraha.js.widgets.Bubble.prototype.numLabel = null;
meieraha.js.widgets.Bubble.prototype.free = function() {
	this.label.labelNode.remove();
	this.numLabel.labelNode.remove();
}
meieraha.js.widgets.Bubble.prototype.draw = function(gc) {
	if(this.getVisible()) {
		if(this.expanded) this.drawExpanded(gc);
		else this.drawUnexpanded(gc);
	}
}
meieraha.js.widgets.Bubble.prototype.setVisible = function(v) {
	this._visible = v;
	if(!v) {
		this.label.setVisible(this.numLabel.setVisible(v));
	}
	return this._visible;
}
meieraha.js.widgets.Bubble.prototype.getVisible = function() {
	return this._visible;
}
meieraha.js.widgets.Bubble.prototype.drawExpanded = function(gc) {
	gc.setColorFill(this.color,0.1);
	gc.setStroke(3,{ r : 240, g : 240, b : 240});
	gc.fillEllipse(this.getPosition().x,this.getPosition().y,this.getRadius() - 5);
	if(this.label.getVisible()) {
		this.label.setVisible(false);
		this.numLabel.setVisible(false);
	}
}
meieraha.js.widgets.Bubble.prototype.drawUnexpanded = function(gc) {
	var ctx = ((function($this) {
		var $r;
		var $t = gc;
		if(Std["is"]($t,plotex.js.CanvasPloter)) $t;
		else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).ctx;
	if(this.state == meieraha.js.widgets.BubbleState.DRAGGED || this.state == meieraha.js.widgets.BubbleState.RESIZED) gc.setColorFill(this.color,150.0 / 255);
	else gc.setColorFill(this.color);
	gc.fillEllipse(this.getPosition().x,this.getPosition().y,this.getRadius() - 5);
	var rcos45 = this.getRadius() * Math.sqrt(2) / 2;
	if(this.state == meieraha.js.widgets.BubbleState.HIGHLIGHTED) {
		gc.setStroke(4,{ r : 100, g : 100, b : 100},0.5);
		gc.strokeEllipse(this.getPosition().x,this.getPosition().y,this.getRadius());
		if(meieraha.js.widgets.Bubble.imagesReady == 1) ctx.drawImage(meieraha.js.widgets.Bubble.imgResize,this.getPosition().x - rcos45 - 8,this.getPosition().y - rcos45 - 8);
	}
	if(this.hasChildren || this.hasParent) {
		if(this.state != meieraha.js.widgets.BubbleState.RESIZED && this.state != meieraha.js.widgets.BubbleState.DRAGGED) {
			var t = rcos45 - 11 - 3;
			var img = this.hasChildren?meieraha.js.widgets.Bubble.imgExpand:meieraha.js.widgets.Bubble.imgContract;
			if(this.getRadius() > 16.6 || this.state == meieraha.js.widgets.BubbleState.HIGHLIGHTED) {
				if(meieraha.js.widgets.Bubble.imagesReady == 1) ctx.drawImage(img,this.getPosition().x + t,this.getPosition().y + t);
			}
		}
	}
	if(!this.numLabel.getVisible()) {
		this.label.setVisible(true);
		this.numLabel.setVisible(this.getRadius() > 14.5);
	}
}
meieraha.js.widgets.Bubble.prototype.getTitle = function() {
	return this._title;
}
meieraha.js.widgets.Bubble.prototype.setTitle = function(v) {
	this._title = v;
	this.label.setText(this.formatTitle());
	return this._title;
}
meieraha.js.widgets.Bubble.prototype.formatTitle = function() {
	var maxLetters = Math.floor(this._radius / 4) + 5;
	var s = this._title.toUpperCase();
	if(s.length > maxLetters) {
		s = s.substr(0,maxLetters - 2) + "&hellip;";
	}
	return s;
}
meieraha.js.widgets.Bubble.prototype.getPosition = function() {
	return this.numLabel.getPosition();
}
meieraha.js.widgets.Bubble.prototype.setPosition = function(v) {
	this.numLabel.setPosition(v);
	this.label.setPosition({ x : v.x, y : v.y + this.getRadius()});
	return v;
}
meieraha.js.widgets.Bubble.prototype.getRadius = function() {
	return this._radius;
}
meieraha.js.widgets.Bubble.prototype.getValue = function() {
	return this._value;
}
meieraha.js.widgets.Bubble.prototype.setValue = function(v) {
	this._radius = meieraha.js.widgets.Bubble.valueToRadius(v,true);
	this._value = v;
	this.numLabel.setText(meieraha.js.widgets.Bubble.valueToAmountStr(v));
	if(this.getRadius() <= 14.5) this.numLabel.setVisible(false);
	this.label.setText(this.formatTitle());
	this.setPosition(this.getPosition());
	return v;
}
meieraha.js.widgets.Bubble.prototype.getAmountString = function() {
	return this.numLabel.getText();
}
meieraha.js.widgets.Bubble.prototype.hitTest = function(x,y) {
	var dx = x - this.getPosition().x;
	var dy = y - this.getPosition().y;
	var d2 = dx * dx + dy * dy;
	var r = this.getRadius() + 2;
	return d2 < r * r;
}
meieraha.js.widgets.Bubble.prototype.__class__ = meieraha.js.widgets.Bubble;
meieraha.js.widgets.Bubble.__interfaces__ = [meieraha.js.Drawable];
meieraha.js.widgets.BubbleUtil = function() { }
meieraha.js.widgets.BubbleUtil.__name__ = ["meieraha","js","widgets","BubbleUtil"];
meieraha.js.widgets.BubbleUtil.makeBubble = function(item) {
	var b = new meieraha.js.widgets.Bubble(item.title,item.value,meieraha.js.widgets.BubbleUtil.makeColor(item),{ x : 100.0, y : 100.0});
	b.id = item.id;
	return b;
}
meieraha.js.widgets.BubbleUtil.makeColor = function(item) {
	var r = new meieraha.util.Random(23167 * (item.id % 34123));
	var a, b, c;
	do {
		a = r.nextInt(0,5);
		b = r.nextInt(0,5);
		c = r.nextInt(0,5);
	} while(a + b + c < 7 || a + b + c > 13);
	return { r : 50 * a, g : 50 * b, b : 50 * c};
}
meieraha.js.widgets.BubbleUtil.prototype.__class__ = meieraha.js.widgets.BubbleUtil;
meieraha.widgets.App = function(width,height) { if( width === $_ ) return; {
	this.width = width;
	this.height = height;
	this.bubbleDisplay = new meieraha.widgets.BubbleDisplay();
}}
meieraha.widgets.App.__name__ = ["meieraha","widgets","App"];
meieraha.widgets.App.prototype.width = null;
meieraha.widgets.App.prototype.height = null;
meieraha.widgets.App.prototype.data = null;
meieraha.widgets.App.prototype.bubbleDisplay = null;
meieraha.widgets.App.prototype.setData = function(data) {
	this.data = data;
	var mid = this.width / 2;
	this.bubbleDisplay.clearBubbles();
	this.bubbleDisplay.addBubbles(data.incomes,{ left : 0.0, top : 0.0, right : mid - 40, bottom : this.height});
	this.bubbleDisplay.addBubbles(data.expenses,{ left : mid + 40, top : 0.0, right : mid * 2, bottom : this.height},-1);
	var balance = 0.0;
	{
		var _g = 0, _g1 = data.incomes;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			if(b.parentId == null) balance += b.value;
		}
	}
	{
		var _g = 0, _g1 = data.expenses;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			if(b.parentId == null) balance -= b.value;
		}
	}
	meieraha.js.Base.setNewBalance(balance);
}
meieraha.widgets.App.prototype.reset = function() {
	this.setData(this.data);
	meieraha.js.Base.requestRepaint();
}
meieraha.widgets.App.prototype.click = function(e) {
	this.bubbleDisplay.click(e);
}
meieraha.widgets.App.prototype.mouseup = function(e) {
	this.bubbleDisplay.mouseup(e);
}
meieraha.widgets.App.prototype.mouseover = function(e) {
	this.bubbleDisplay.mouseover(e);
}
meieraha.widgets.App.prototype.mousemove = function(e) {
	this.bubbleDisplay.mousemove(e);
}
meieraha.widgets.App.prototype.mousedown = function(e) {
	this.bubbleDisplay.mousedown(e);
}
meieraha.widgets.App.prototype.draw = function(gc) {
	gc.clear();
	this.bubbleDisplay.draw(gc);
}
meieraha.widgets.App.prototype.__class__ = meieraha.widgets.App;
meieraha.widgets.App.__interfaces__ = [meieraha.js.Drawable,meieraha.js.MouseListener];
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
if(typeof js=='undefined') js = {}
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
plotex.GradientType = { __ename__ : ["plotex","GradientType"], __constructs__ : ["linear","radial"] }
plotex.GradientType.linear = ["linear",0];
plotex.GradientType.linear.toString = $estr;
plotex.GradientType.linear.__enum__ = plotex.GradientType;
plotex.GradientType.radial = ["radial",1];
plotex.GradientType.radial.toString = $estr;
plotex.GradientType.radial.__enum__ = plotex.GradientType;
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
meieraha.widgets.IndexTreeNode = function(bubbles,bounds,maxLevel) { if( bubbles === $_ ) return; {
	if(maxLevel == null) maxLevel = 5;
	if(maxLevel == 0 || bubbles == null || bubbles.length <= 1) {
		this.leaf = true;
		this.elems = bubbles;
		if(bounds != null) {
			this.x = (bounds.left + bounds.right) / 2;
			this.y = (bounds.top + bounds.bottom) / 2;
		}
	}
	else {
		this.leaf = false;
		if(bounds == null) {
			bounds = { left : 1000.0, right : -1000.0, top : 1000.0, bottom : -1000.0};
			{
				var _g = 0;
				while(_g < bubbles.length) {
					var bbl = bubbles[_g];
					++_g;
					bounds.left = Math.min(bounds.left,bbl.getPosition().x - bbl.getRadius());
					bounds.right = Math.max(bounds.right,bbl.getPosition().x + bbl.getRadius());
					bounds.top = Math.min(bounds.top,bbl.getPosition().y - bbl.getRadius());
					bounds.bottom = Math.max(bounds.bottom,bbl.getPosition().y + bbl.getRadius());
				}
			}
		}
		this.x = (bounds.left + bounds.right) / 2;
		this.y = (bounds.top + bounds.bottom) / 2;
		this.gg = new meieraha.widgets.IndexTreeNode(this.filter(bubbles,1,1),{ left : this.x, right : bounds.right, top : this.y, bottom : bounds.bottom},maxLevel - 1);
		this.gl = new meieraha.widgets.IndexTreeNode(this.filter(bubbles,1,-1),{ left : this.x, right : bounds.right, top : bounds.top, bottom : this.y},maxLevel - 1);
		this.lg = new meieraha.widgets.IndexTreeNode(this.filter(bubbles,-1,1),{ left : bounds.left, right : this.x, top : this.y, bottom : bounds.bottom},maxLevel - 1);
		this.ll = new meieraha.widgets.IndexTreeNode(this.filter(bubbles,-1,-1),{ left : bounds.left, right : this.x, top : bounds.top, bottom : this.y},maxLevel - 1);
	}
}}
meieraha.widgets.IndexTreeNode.__name__ = ["meieraha","widgets","IndexTreeNode"];
meieraha.widgets.IndexTreeNode.prototype.x = null;
meieraha.widgets.IndexTreeNode.prototype.y = null;
meieraha.widgets.IndexTreeNode.prototype.gg = null;
meieraha.widgets.IndexTreeNode.prototype.gl = null;
meieraha.widgets.IndexTreeNode.prototype.lg = null;
meieraha.widgets.IndexTreeNode.prototype.ll = null;
meieraha.widgets.IndexTreeNode.prototype.leaf = null;
meieraha.widgets.IndexTreeNode.prototype.elems = null;
meieraha.widgets.IndexTreeNode.prototype.filter = function(bubbles,dx,dy) {
	var result = new Array();
	{
		var _g = 0;
		while(_g < bubbles.length) {
			var b = bubbles[_g];
			++_g;
			var bdx = dx * (b.getPosition().x - this.x) + b.getRadius();
			var bdy = dy * (b.getPosition().y - this.y) + b.getRadius();
			if(bdx > 0 && bdy > 0 && !b.expanded) result.push(b);
		}
	}
	return result;
}
meieraha.widgets.IndexTreeNode.prototype.query = function(qx,qy) {
	if(this.leaf) {
		if(this.elems != null) {
			var _g = 0, _g1 = this.elems;
			while(_g < _g1.length) {
				var b = _g1[_g];
				++_g;
				if(b.hitTest(qx,qy)) return b;
			}
		}
		return null;
	}
	else {
		if(qx >= this.x) {
			if(qy >= this.y) return this.gg.query(qx,qy);
			else return this.gl.query(qx,qy);
		}
		else {
			if(qy >= this.y) return this.lg.query(qx,qy);
			else return this.ll.query(qx,qy);
		}
	}
}
meieraha.widgets.IndexTreeNode.prototype.indented = function(indent,str) {
	var s = new StringBuf();
	{
		var _g = 0;
		while(_g < indent) {
			var i = _g++;
			s.b[s.b.length] = "_";
		}
	}
	s.b[s.b.length] = str;
	haxe.Log.trace(s.b.join(""),{ fileName : "BubbleIndex.hx", lineNumber : 104, className : "meieraha.widgets.IndexTreeNode", methodName : "indented"});
}
meieraha.widgets.IndexTreeNode.prototype.draw = function(gc) {
	if(this.leaf) {
		var col = this.elems == null?0:this.elems.length;
		gc.setColorFill({ r : 0, g : Math.floor(Math.min(255,50 * col)), b : 0},0.8);
		gc.fillEllipse(this.x,this.y,5);
	}
	else {
		gc.setColorFill({ r : 200, g : 0, b : 0},0.8);
		gc.fillEllipse(this.x,this.y,5);
		{
			var _g = 0, _g1 = [this.gg,this.gl,this.lg,this.ll];
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				gc.beginPath();
				gc.setStroke(2,{ r : 0, g : 0, b : 0},0.8);
				gc.line(this.x,this.y,c.x,c.y);
				gc.stroke();
				c.draw(gc);
			}
		}
	}
}
meieraha.widgets.IndexTreeNode.prototype.__class__ = meieraha.widgets.IndexTreeNode;
meieraha.widgets.IndexTreeNode.__interfaces__ = [meieraha.js.Drawable];
IntHash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	
			for( x in this.h )
				a.push(x);
		;
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
meieraha.js.widgets.VerticalPositioning = { __ename__ : ["meieraha","js","widgets","VerticalPositioning"], __constructs__ : ["CENTER","TOP"] }
meieraha.js.widgets.VerticalPositioning.CENTER = ["CENTER",0];
meieraha.js.widgets.VerticalPositioning.CENTER.toString = $estr;
meieraha.js.widgets.VerticalPositioning.CENTER.__enum__ = meieraha.js.widgets.VerticalPositioning;
meieraha.js.widgets.VerticalPositioning.TOP = ["TOP",1];
meieraha.js.widgets.VerticalPositioning.TOP.toString = $estr;
meieraha.js.widgets.VerticalPositioning.TOP.__enum__ = meieraha.js.widgets.VerticalPositioning;
meieraha.js.widgets.Label = function(p) { if( p === $_ ) return; {
	if(meieraha.js.widgets.Label.containerNode == null) haxe.Log.trace("Label.initializeLabelFactory must be called before anything is done",{ fileName : "Label.hx", lineNumber : 67, className : "meieraha.js.widgets.Label", methodName : "new"});
	this.labelNode = new $(js.Lib.document.createElement("DIV"));
	this.labelNode.addClass("canvas-label");
	meieraha.js.widgets.Label.containerNode.append(this.labelNode);
	this.verticalPositioning = meieraha.js.widgets.VerticalPositioning.CENTER;
	this.fullOffset = null;
	this._visible = false;
	this._text = "";
}}
meieraha.js.widgets.Label.__name__ = ["meieraha","js","widgets","Label"];
meieraha.js.widgets.Label.containerNode = null;
meieraha.js.widgets.Label.containerOffsetLeft = null;
meieraha.js.widgets.Label.containerOffsetTop = null;
meieraha.js.widgets.Label.initializeLabelFactory = function(containerNode) {
	meieraha.js.widgets.Label.containerNode = containerNode;
	meieraha.js.widgets.Label.containerOffsetLeft = containerNode.offset().left;
	meieraha.js.widgets.Label.containerOffsetTop = containerNode.offset().top;
}
meieraha.js.widgets.Label.prototype.position = null;
meieraha.js.widgets.Label.prototype._position = null;
meieraha.js.widgets.Label.prototype.verticalPositioning = null;
meieraha.js.widgets.Label.prototype.fullOffset = null;
meieraha.js.widgets.Label.prototype.text = null;
meieraha.js.widgets.Label.prototype._text = null;
meieraha.js.widgets.Label.prototype.visible = null;
meieraha.js.widgets.Label.prototype._visible = null;
meieraha.js.widgets.Label.prototype.labelNode = null;
meieraha.js.widgets.Label.prototype.getText = function() {
	return this._text;
}
meieraha.js.widgets.Label.prototype.setText = function(v) {
	this.labelNode.html(v);
	if(this.getVisible()) this.reposition();
	else this.fullOffset = null;
	return this._text = v;
}
meieraha.js.widgets.Label.prototype.getPosition = function() {
	return this._position;
}
meieraha.js.widgets.Label.prototype.setPosition = function(v) {
	if(this.fullOffset != null) {
		this.labelNode.css("left",v.x + this.fullOffset.x + "px");
		this.labelNode.css("top",v.y + this.fullOffset.y + "px");
	}
	return this._position = v;
}
meieraha.js.widgets.Label.prototype.getVisible = function() {
	return this._visible;
}
meieraha.js.widgets.Label.prototype.setVisible = function(v) {
	this.labelNode.css("display",v?"block":"none");
	if(v && this.fullOffset == null) this.reposition();
	return this._visible = v;
}
meieraha.js.widgets.Label.prototype.reposition = function() {
	this.fullOffset = { x : -this.labelNode.width() / 2, y : this.verticalPositioning == meieraha.js.widgets.VerticalPositioning.CENTER?-this.labelNode.height() / 2:0};
	this.setPosition(this._position);
}
meieraha.js.widgets.Label.prototype.__class__ = meieraha.js.widgets.Label;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e1 ) {
						{
							var e1 = $e1;
							{
								throw "Unable to create XMLHttpRequest object.";
							}
						}
					}
				}
			}
		}
	}:(function($this) {
		var $r;
		throw "Unable to create XMLHttpRequest object.";
		return $r;
	}(this));
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	}
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	}
	d.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	}
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
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
haxe.Timer.arr = new Array();
meieraha.js.widgets.Bubble.NUMLABEL_THRESHOLD_RADIUS = 14.5;
meieraha.js.widgets.Bubble.EXPANDBTN_THRESHOLD_RADIUS = 16.6;
js.Lib.onerror = null;
meieraha.Main.main()