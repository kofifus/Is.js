let Is={
	undef(v) { return typeof v === 'undefined'; },
	void(v) { return typeof v === 'undefined' || v===null; },
	number(v) { return typeof v==='number' },
	string(v) { return typeof v==='string' },
	bool(v) { return typeof v==='boolean' },
	symbol(v) { return typeof v==='symbol' },
	dict(v) { return !Is.void(v) && typeof v==='object' !Is.array(v) && !(v instanceof Date); },
	array(v) { return v instanceof Array; },
	date(v) { return typeof v==='object' && v instanceof Date; },
	elem(v) { return v instanceof Element; },
}
