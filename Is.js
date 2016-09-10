let Is={
	obj(v) { return typeof v !== 'undefined'; },
	undef(v) { return typeof v === 'undefined'; },
	void(v) { return typeof v === 'undefined' || v===null; },
	num(v) { return typeof v==='number'; },
	int(v) { return Number.isInteger(v); },
	str(v) { return typeof v==='string' },
	bool(v) { return typeof v==='boolean' },
	arr(v) { return v instanceof Array; },
	symbol(v) { return typeof v==='symbol' },
	dict(v) { return !Is.void(v) && typeof v==='object' && !Is.array(v) && !(v instanceof Date); },
	date(v) { return typeof v==='object' && v instanceof Date; },
	elem(v) { return v instanceof Element; },
	event(v) { return v instanceof Event; },
}

function Assert(...conds) {
	if (typeof Assert._hasStack==='undefined') Assert._hasStack=!!(new Error().stack);

	if (conds.length===1 && conds[0]==='__throw') { Assert._level=null; return; };
	if (conds.length===1 && conds[0]==='__console') { Assert._level='console'; return; };
	if (conds.length===1 && conds[0]==='__silent') { Assert._level='silent'; return; };
	
	if (Assert._level==='silent') return;
	let stack=(Assert._hasStack ?  (new Error()).stack.split('\n')  : []);
	let msg=(stack.length>2 ? stack[2].replace(/^\s+at\s(.+?)(?:\s.*:|:)(.*?):(.*?)\)?$/g, '$1 ($2:$3)' ) + ' ' : '') + 'Assert failed';
	for (let cond of conds) { if (!cond) { if (!Assert._level) throw msg; else if (console) console.log(msg); } };
}
