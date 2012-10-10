package meieraha.util;

/**
 * // ---- http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the-s
 */

class Random {
	var seed: Int;
	var A: Int;
	var M: Int;
	var Q: Int;
	var R: Int;
	var oneOverM: Float;
	public function new(seed: Int) {
		this.seed = seed;
		this.A = 48271;
		this.M = 2147483647;
		this.Q = Math.floor(this.M / this.A);
		this.R = this.M % this.A;
		this.oneOverM = 1.0 / this.M;
	}
	
	public function next(): Float {
	  var hi: Int = Math.floor(this.seed / this.Q);
	  var lo: Int = this.seed % this.Q;
	  var test: Int = this.A * lo - this.R * hi;
	  if(test > 0){
		this.seed = test;
	  } 
	  else {
		this.seed = test + this.M;
	  }
	  return (this.seed * this.oneOverM);
	}

	public function nextInt(min: Int, max: Int): Int {
		return Math.round((max-min) * this.next() + min);
	}
}
