(function(global) {
"use strict";

  
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
Is.assert = (cond) => {
	if (Is.assert._level==='disabe') return;
	
	function getStack() { return (new Error()).stack; }

	if (typeof Is.assert._parse==='undefined') {
		let stack=getStack();
		if (stack && stack[0]==='E') Is.assert._parse=(s => s.split('\n')[2].replace(/^(?:\s+at\s)(.+?)$/g, 'at $1')); // chrome
		else if (stack && stack[0]==='I') Is.assert._parse=(s => s.split('\n')[1].replace(/^(.+?)@(.+?)$/g, 'at $1 ($2)')); // firefox
		else if (stack && stack[0]==='g') Is.assert._parse=(s => s.split('\n')[0].replace(/^(.+?)@(.+?)$/g, 'at $1 ($2)')); // safari
		else Is.assert._parse=(stack => ''); // can't parse
	}

	let msg;
	if (cond==='__throw') Is.assert._level=null;
	else if (cond==='__console') Is.assert._level='console';
	else if (cond==='__disable') Is.assert._level='disable';
	else if (Is.bool(cond)) { if (!cond) msg='Assert failed '+Is.assert._parse((new Error()).stack); }
	else msg='Invalid Is.assert arguments';

	if (msg) { if (!Is.assert._level) throw msg; else if (console) console.log(msg); }
};


if (global) global.Is=Is;
}((1,eval)('this')));
