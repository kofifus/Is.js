let Is={
	obj(v) { return typeof v !== 'undefined'; },
	undef(v) { return typeof v === 'undefined'; },
	void(v) { return typeof v === 'undefined' || v===null; },
	num(v) { return typeof v==='number'; },
	int(v) { return Number.isInteger(v); },
	str(v) { return typeof v==='string' },
	bool(v) { return typeof v==='boolean' },
	arr(v) { return v instanceof Array; },
	regexp(v) { return v instanceof RegExp; },
	symbol(v) { return typeof v==='symbol' },
	dict(v) { return !Is.void(v) && typeof v==='object' && !Is.array(v) && !(v instanceof Date); },
	date(v) { return typeof v==='object' && v instanceof Date; },
	elem(v) { return v instanceof Element; },
	event(v) { return v instanceof Event; },

	// assert
	assert(...conds) {
		if (typeof Is.assert._regExp==='undefined') Is.assert._regExp=((new Error()).stack ? /^(?:\s+at\s)(.+?)$/g : null);
		if (Is.assert._level==='silent') return;

		let msg;
		if (conds.length===0) msg='Assert failed - no arguments';
		else if (conds.length===1 && conds[0]==='__throw') Is.assert._level=null;
		else if (conds.length===1 && conds[0]==='__console') Is.assert._level='console';
		else if (conds.length===1 && conds[0]==='__silent') Is.assert._level='silent';
		else {
			if (Is.int(conds[0])) {
				if (conds.length=1 !== conds[0]) msg='Assert failed - wrong number of arguments';
				conds.shift();
			} else if (Is.arr(conds[0])) {
				if (! conds[0].every(argNum => Is.int(argNum))) msg='Assert failed - invalid arguments array';
				else if (conds[0].indexOf(conds.length-1)===-1) msg='Assert failed - wrong number of arguments'; 
				conds.shift();
			}
			if (!msg) for (let cond of conds) { 
				if (!Is.bool(cond)) { msg='Assert failed - invalid arguments'; break; }
				else {
					let stack=(Is.assert._regExp ?  (new Error()).stack.split('\n')  : []);
					if (!cond) { msg='Assert failed at '+(stack.length>2 ? (new Error()).stack.split('\n')[2].replace(Is.assert._regExp, '$1' ) :  ''); break; }
				}
			}
		}
		if (msg) { if (!Is.assert._level) throw msg; else if (console) console.log(msg); };
	}
}
