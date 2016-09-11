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
}

// assert
Is.assert = (...conds) => {
	if (Is.assert._level==='silent') return;
	if (typeof Is.assert._regExp==='undefined') Is.assert._regExp=((new Error()).stack ? /^(?:\s+at\s)(.+?)$/g : null);

	let cond, msg;
	if (conds.length!==1 || !Is.bool(cond=conds[0])) msg='Assert failed - invalid arguments';
	else if (cond==='__throw') Is.assert._level=null;
	else if (cond==='__console') Is.assert._level='console';
	else if (cond==='__silent') Is.assert._level='silent';
	else {
		let stack=(Is.assert._regExp ?  (new Error()).stack.split('\n')  : []), stackMsg=(stack.length>2 ? (new Error()).stack.split('\n')[2].replace(Is.assert._regExp, 'at $1' ) :  '');
		if (! conds.every(cond => { return cond; })) msg='Assert failed '+stackMsg;
	}

	if (msg) { if (!Is.assert._level) throw msg; else if (console) console.log(msg); }
}
