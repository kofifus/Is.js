(function(g) {
"use strict";


let Is={
	// predicates

	undef(v) { return arguments.length===1 ? undefined : v ===undefined; },
	void(v) { return arguments.length===1 ? v === undefined || v===null || (typeof v==='number' && isNaN(v)) : undefined; },
	func(v) { return arguments.length===1 ? typeof v === 'function' : undefined; },
	date(v) { return arguments.length===1 ? v.constructor===Date : undefined; },
	elem(v) { return arguments.length===1 ? v instanceof Element : undefined; },
	event(v) { return arguments.length===1 ? v instanceof Event : undefined; },
	args(v) { return arguments.length===1 ? !!v && typeof v=='object' && Object.prototype.hasOwnProperty.call(v, 'callee') && !Object.prototype.propertyIsEnumerable.call(v, 'callee') : undefined; },

	str(v) { return arguments.length===1 ? typeof v==='string' : undefined; },
	json(v) { 
		if (arguments.length!==1)  return undefined;
		try { JSON.parse(str); return true; } catch (e) { return false; }    
	},
	strlen(len) {
		if (arguments.length!==1 || !Is.int(len)) return undefined;
		return str => { try { return Is.str(str) && str.length===len; } catch(e) { return undefined; }; } 
	},

	num(v) { return arguments.length===1 ? typeof v==='number'  && !isNaN(v) : undefined; },
	numstr(v) { return arguments.length===1 ? typeof v==='string'  && !isNaN(parseFloat(v,10)) : undefined; },
	int(v) { return arguments.length===1 ? Number.isInteger(v) : undefined; },
	intstr(v) { return arguments.length===1 ? typeof v==='string'  && Number.isInteger(parseFloat(v,10)) : undefined; },

	bool(v) { return arguments.length===1 ? typeof v==='boolean' : undefined; },
	vbool(v) { return arguments.length===1 ? v===undefined || typeof v==='boolean' : undefined; },

	regexp(v) { return arguments.length===1 ? v.constructor=RegExp : undefined; },
	symbol(v) { return typeof arguments.length===1 ? v==='symbol' : undefined; },

	dict(v1, v2) { 
		if (arguments.length===1) return  v1 !== undefined && v1!==null && typeof v1==='object' && v1.constructor!==Array && v1.constructor!==Date; 
		else if (arguments.length===2 && Is.func(v1) && Is.func(v2)) return dict => Is.every(v1)(Object.keys()) && Is.every(v1)(Object.values()); 
		else return undefined;
	},
	emptydict(v) { return arguments.length===1 ? Is.dict(v) && Object.keys(v).length===0 : undefined; },

	arr(v) { return arguments.length===1 ? v.constructor===Array : undefined; },
	emptyarr(v) { return arguments.length===1 ? v.constructor===Array && v.length===0 : undefined; },
	funcarr(arr) { return arguments.length===1 ? Is.every(Isfunc) : undefined; },
	numarr(arr) { return arguments.length===1 ? Is.every(Is.num) : undefined; },
	intarr(arr) { return arguments.length===1 ? Is.every(Is.int) : undefined; },
	strarr(arr) { return arguments.length===1 ? Is.every(Is.str) : undefined; },
	boolarr(arr) { return arguments.length===1 ? Is.every(Is.bool) : undefined; },
	arrarr(arr) { return arguments.length===1 ? Is.every(Is.arr) : undefined; },
	dictarr(arr) { return arguments.length===1 ? Is.every(Is.dict) : undefined; },
	datearr(arr) { return arguments.length===1 ? Is.every(Is.date) : undefined; },
	elemarr(arr) { return arguments.length===1 ? Is.every(Is.elem) : undefined; },
	length(len) {
		if (arguments.length!==1 || !Is.int(len)) return undefined;
		return v => { try { return v.length===len; } catch(e) { return undefined; }; } 
	},

	inst(base) {
		if (arguments.length!==1 || !Is.func(base)) return undefined;
		return v => v instanceof base; 
	},

	// combinators

	// returns a new predicate p so that p(v) is true v instance of if v instanceof base

	// returns a new function p so that p(v) is true if !f(v)
	not(p) {
		return v => { try { return Is.bool(v) ? !p(v) : undefined; } catch(e) { return undefined; }; } 
	},

	// returns a new function p so that p(v) is true if for all f in preds f(v) is true
	and(...preds) { 
		if (!Is.arr(preds)) return undefined;

		return v => {
			try {
				for (let i=0; i<preds.length; i++) {
					let c=preds[i];
					if (Is.bool(c)) {
						if (c===false) return false;
					} else if (Is.func(c)) {
						if (c(v)===false) return false;
					} else return undefined;
				}
				return true;
			} catch(e) { 
				return undefined; 
			} 
		};
	},

	// returns a new function p so that p(v) is true if for any f in preds f(v) is true
	or(...preds) { 
		if (!Is.arr(preds)) return undefined;

		return v => {
			try {
				for (let i=0; i<preds.length; i++) {
					let c=preds[i];
					if (Is.bool(c)) {
						if (c===true) return true;
					} else if (Is.func(c)) {
						if (c(v)===true) return true;
					} else return undefined;
				}
				return false;
			} catch(e) { 
				return undefined; 
			} 
		};
	},

	// returns a new function p so that p(arr) is true if for all a in arr f(a) is true
	every(f) {
		if (f===true) f= v => v===true ? true : (v===false ? false : undefined); 
		else if (f===false) f= v => v===false ? true : (v===true ? false : undefined); 
		if (!Is.func(f)) return undefined;

		return arr => {
			try {
				for (let i=0; i<arr.length; i++) {
					let v=f(arr[i]); if (v===false) return false; else if (v!==true) return undefined;
				}
				return true;
			} catch(e) { 
				return undefined; 
			} 
		};
	},

	// returns a new function p so that p(arr) is true if for all a in arr f(a) is true
	some(f) {
		if (f===true) f= v => v===true ? true : (v===false ? false : undefined); 
		else if (f===false) f= v => v===false ? true : (v===true ? false : undefined); 
		if (!Is.func(f)) return undefined;

		return arr => {
			try {
				for (let i=0; i<arr.length; i++) {
					let v=f(arr[i]); if (v===true) return true; else if (v!==false) return undefined;
				}
				return false;
			} catch(e) { 
				return undefined; 
			} 
		};
	},

	// return a _default object, f will be called if a default parameter  is not undefined in Assert
	default(f) {
		if (!Is._default) Is._default=function(f_) { this.f=f_; }
		return new Is._default(f);
	},

	// return a _spread object, f will be called with all trailing unmatched parameters to Assert
	spread(f) { 
		if (!Is._spread) Is._spread=function(f_) { this.f=f_; }
		return new Is._spread(f); 
	},

	// return true if for a=arr[i] ,  fa[i](arr[i])===true || fa[i]===true
	// use spread(p) as the last element in fa to test p for all remaining parameters in arr
	match(...args) { 
		// args is array of boolean, or them
		if (!Is.match._hasTrue) { // caching
			Is.match._hasTrue=Is.some(v => (v===true ? true :  (v===false ? false : undefined)));
			Is.match._everyVbool=Is.every(Is.vbool);
		}
		if (Is.arr(args) && Is.match._everyVbool(args)) return Is.match._hasTrue(args);

		if (!Is._default) Is._default=function(f_) { this.f=f_; }
		if (!Is._spread) Is._spread=function(f_) { this.f=f_; }

		// args is arguments or an array
		let arr=args[0], preds=args.slice(1);
		if (Is.args(arr)) arr=Array.from(args[0]);
		if (!Is.arr(arr)) return undefined;

		// Assert(arguments, []) , Assert(arguments, null)
		if (preds[0]===null || Is.emptyarr(preds[0])) return arr.length===0;  

		// check for defaults
		for (let i=arr.length; i<preds.length; i++) {
			if (Is.inst(Is._default)(preds[i])) arr[i]=undefined; else return undefined;
		}

		// check for spread
		let last=preds[preds.length-1], spread=Is.inst(Is._spread)(last) ? last: null;
		if (spread) preds.pop(); else if (arr.length>preds.length) return undefined;

		for (let i=0; i<preds.length; i++) { 
			let c=preds[i];
			if (Is.bool(c)) {
				if (c===false) return false;
			} else if (Is.func(c)) {
				if (c(arr[i]) ===false) return false;
			} else if (Is.inst(Is._default)(preds[i])) {
				if (arr[i]!==undefined && c.f(arr[i])===false) return false;
			} else return undefined;
		}
		if (arr.length>preds.length) return spread.f(arr.slice(preds.length));
		return true;
	}
}

// defined as arrow function to prevent extra call if assertion diabled
Is.assert = (...args) => {
	if (Is.assert._level==='__disabe') return;

	if (Is.undef(Is.assert._parse)) { // create Is.assert._parse
		let stack=(() => (new Error()).stack)();
		if (stack && stack[0]==='E') Is.assert._parse=(stack => stack.split('\n')[3].replace(/^(?:\s+at\s)(.+?)$/g, 'at $1')); // chrome
		else if (stack && stack[0]==='I') Is.assert._parse=(stack =>  stack.split('\n')[2].replace(/^(.+?)@(.+?)$/g, 'at $1 ($2)')); // firefox
		else if (stack && stack[0]==='g') Is.assert._parse=(stack =>  stack.split('\n')[1].replace(/^(.+?)@(.+?)$/g, 'at $1 ($2)')); // safari
		else Is.assert._parse=(stack => ''); // can't parse
	}

	function done(s) {
		if (!Is.undef(s) && !Is.bool(s)) s=undefined;
		if (s===true) return true;
		if (Is.assert._level==='__silent') return s;
		let msg;
		if (s===false) msg='Is.assert failed'; else if (s===undefined) msg='Invalid Assertion';
		msg=msg+ ' '+Is.assert._parse((new Error()).stack);
		if (!Is.assert._level) throw msg; else if (console) console.log(msg); 
		return false;
	}

	if (args.length===0) done(undefined);

	// Is.assert._level
	let first=args[0];
	if (args.length===1) {
		if (first==='__throw') { Is.assert._level=null; return; }
		else if (first==='__console' || first==='__disable' || first==='__silent') { Is.assert._level=first; return };
	}

	return done(Is.match(...args));
};


if (!g) g=window; g.Is=Is; 
}(this));
