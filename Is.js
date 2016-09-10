let Is=function(cond) {
	if (!Is.undef) Is.undef = function(v) { return typeof v === 'undefined'; };
	if (!Is.void) Is.void = function(v) { return typeof v === 'undefined' || v===null; };
	if (!Is.num) Is.num = function(v) { return typeof v==='number'; };
	if (!Is.int) Is.int = function(v) { return Number.isInteger(v); };
	if (!Is.str) Is.str = function(v) { return typeof v==='string' };
	if (!Is.bool) Is.bool = function(v) { return typeof v==='boolean' };
	if (!Is.arr) Is.arr = function(v) { return v instanceof Array; };
	if (!Is.symbol) Is.symbol = function(v) { return typeof v==='symbol' };
	if (!Is.dict) Is.dict = function(v) { return !Is.void(v) && typeof v==='object' && !Is.array(v) && !(v instanceof Date); };
	if (!Is.date) Is.date = function(v) { return typeof v==='object' && v instanceof Date; };
	if (!Is.elem) Is.elem = function(v) { return v instanceof Element; };
	if (!Is.event) Is.event = function(v) { return v instanceof Event; };

	// assert
	if (!Is._assert) Is._assert=function(cond) {
		if (cond==='enable') { Is._noAsserts=false; return; } else if (cond==='disable') { Is._noAsserts=true; return; }
		if (Is._noAsserts || cond) return;
		if (Is.undef(Is._hasStack)) Is._hasStack=!!(new Error().stack);
  		let myFName=(Is._hasStack ? new Error().stack.split('\n')[3].replace(/^\s+at\s+(.+?)\s.+/g, '$1' ) : 0)+' ';
  		throw(myFName + 'assert failed');
	}
	return Is._assert(cond);
}
Is('enable');
