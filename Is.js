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

	if (typeof Is.assert._parse==='undefined') {
		let stack=(new Error()).stack;
		if (stack && stack[0]==='E') Is.assert._parse=(s => s.split('\n')[2].replace(/^(?:\s+at\s)(.+?)$/g, 'at $1')); // chrome
		else if (stack && stack[0]==='I') Is.assert._parse=(s => s.split('\n')[1].replace(/^(.+?)@(.+?)$/g, 'at $1 ($2)')); // firefox
		else Is.assert._parse=(stack => ''); // can't parse
	}

	let cond, msg;
	if (conds.length!==1 || !Is.bool(cond=conds[0])) msg='Assert failed - invalid arguments';
	else if (cond==='__throw') Is.assert._level=null;
	else if (cond==='__console') Is.assert._level='console';
	else if (cond==='__disable') Is.assert._level='silent';
	else if (! conds.every(cond => { return cond; })) msg='Assert failed '+Is.assert._parse((new Error()).stack);
	
	if (msg) { if (!Is.assert._level) throw msg; else if (console) console.log(msg); }
}
