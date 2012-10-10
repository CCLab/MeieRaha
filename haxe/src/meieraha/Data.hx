package meieraha;
import plotex.Ploter;

typedef DataItem = {
	id: Int,
	title: String,
	description: String,
	value: Float,
	parentId: Int
}

typedef ValueRule = {
	target: Int, destination: Int, coef: Float, message: String
}

/**
 * The whole data model of the application fits easily into this one class
 * @author Konstantin
 */
class Data {
	public var incomes: Array<DataItem>;
	public var expenses: Array<DataItem>;
	public var scales: Array<DataItem>;
	
	// TODO: Those are a quick hack. In particular, the way we transport those values from the page into the application is too js-specific.
	
	public static var valueExponent: Int; // How many zeroes should be added to all numbers when they are loaded. I.e. actualValue = value*10^valueExponent
										  // As a kind of temporary hack we make this a static member. In principle it would be nicer to have 
										  // It local to the dataset.
	public static var valueScalingFactor: Int;					  
	public static var bubbleScalingFactor: Float; // The radius of a bubble is computed as:  r = Math.sqrt(v) / bubbleScalingFactor; (see js.widgets.Bubble.valueToRadius and radiusToValue)
	public static var valueRoundingFactor: Int; // If all values rounded to millions, then it must be 1000000
	public static var valueRoundingFactorChar: String; // Describes the rounding factor above: "M" for million, "B" for billion, etc.
	
	public static function loadData(): Data {
		var result = new Data();
		result.incomes = dataItemsArray(untyped tulud);
		result.expenses = dataItemsArray(untyped kulud);
		result.scales = dataItemsArray(untyped scales);
		Data.valueExponent = untyped __js__("(typeof valueExponent=='undefined') ? 0 : valueExponent");
		Data.valueScalingFactor = Math.round(Math.pow(10, Data.valueExponent));
		Data.bubbleScalingFactor = untyped __js__("(typeof bubbleScalingFactor=='undefined') ? 600 : bubbleScalingFactor");
		Data.valueRoundingFactor = untyped __js__("(typeof valueRoundingFactor=='undefined') ? 1000000 : valueRoundingFactor");
		Data.valueRoundingFactorChar = untyped __js__("(typeof valueRoundingFactorChar=='undefined') ? 'M' : valueRoundingFactorChar");		
		return result;
	}
	
	private static function dataItemsArray(a: Dynamic): Array<DataItem> {
		var r = new Array<DataItem>();
		for (i in 0...a.length) {
			r.push( { id: a[i].record_id, 
					  title: a[i].title,
					  description: a[i].description, 
					  value: a[i].value,
					  parentId: (a[i].parent_id == 0) ? null : a[i].parent_id
					} );
		}
		return r;
	}
	
	public function new() {}
}