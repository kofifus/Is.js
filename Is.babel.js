"use strict";

(function (global) {
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var Is = {
		obj: function obj(v) {
			return typeof v !== 'undefined';
		},
		undef: function undef(v) {
			return typeof v === 'undefined';
		},
		void: function _void(v) {
			return typeof v === 'undefined' || v === null;
		},
		num: function num(v) {
			return typeof v === 'number';
		},
		int: function int(v) {
			return Number.isInteger(v);
		},
		str: function str(v) {
			return typeof v === 'string';
		},
		bool: function bool(v) {
			return typeof v === 'boolean';
		},
		arr: function arr(v) {
			return v instanceof Array;
		},
		regexp: function regexp(v) {
			return v instanceof RegExp;
		},
		symbol: function symbol(v) {
			return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'symbol';
		},
		dict: function dict(v) {
			return !Is.void(v) && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && !Is.array(v) && !(v instanceof Date);
		},
		date: function date(v) {
			return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && v instanceof Date;
		},
		elem: function elem(v) {
			return v instanceof Element;
		},
		event: function event(v) {
			return v instanceof Event;
		}
	};

	// assert
	Is.assert = function () {
		for (var _len = arguments.length, conds = Array(_len), _key = 0; _key < _len; _key++) {
			conds[_key] = arguments[_key];
		}

		if (Is.assert._level === 'silent') return;

		if (typeof Is.assert._parse === 'undefined') {
			var stack = new Error().stack;
			if (stack && stack[0] === 'E') Is.assert._parse = function (s) {
				return s.split('\n')[2].replace(/^(?:\s+at\s)(.+?)$/g, 'at $1');
			}; // chrome
			else if (stack && stack[0] === 'I') Is.assert._parse = function (s) {
					return s.split('\n')[1].replace(/^(.+?)@(.+?)$/g, 'at $1 ($2)');
				}; // firefox
				else if (stack && stack[0] === 'g') Is.assert._parse = function (s) {
						return s.split('\n')[0].replace(/^(.+?)@(.+?)$/g, 'at $1 ($2)');
					}; // safari
					else Is.assert._parse = function (stack) {
							return '';
						}; // can't parse
		}

		var cond = void 0,
		    msg = void 0;
		if (conds.length !== 1 || !Is.bool(cond = conds[0])) msg = 'Assert failed - invalid arguments';else if (cond === '__throw') Is.assert._level = null;else if (cond === '__console') Is.assert._level = 'console';else if (cond === '__disable') Is.assert._level = 'silent';else if (!conds.every(function (cond) {
			return cond;
		})) msg = 'Assert failed ' + Is.assert._parse(new Error().stack);

		if (msg) {
			if (!Is.assert._level) throw msg;else if (console) console.log(msg);
		}
	};

	global.Is = Is;
})(this);
