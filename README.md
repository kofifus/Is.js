# Is.js

Javascript assert and type recognition

Type recognition:

    Is.obj(v)		returns true iff v is not undefined and not null
    Is.undef(v)		returns true iff v is undefined
    Is.void(v)		returns true iff v is undefined or null
    Is.num(v)		returns true iff v is a number
    Is.int(v)		returns true iff v is an integer
    Is.str(v)		returns true iff v is a string
    Is.bool(v)		returns true iff v is a boolean
    Is.arr(v)		returns true iff v is an array
    Is.regexp(v)    returns true iff v is a regular expression
    Is.symbol(v)	returns true iff v is a symbol
    Is.dict(v)		returns true iff v is a dictionary {x:1, y:2}
    Is.date(v)		returns true iff v is a date
    Is.elem(v)		returns true iff v is an HTML element
    Is.event(v)		returns true iff v is an HTML event

Assert:

    //Is.assert('__disable'); // disable asserts 
    //Is.assert('__console'); // log to console instead of throwing
    //Is.assert('__thorow');  // go back to throwing
    
    function f(x, y) {
      Is.assert(arguments.length===2 && Is.int(x) && Is.str(y));
      console.log('f ok');
    }
    //f(100, 'str'); // logs: 'f ok'
    f(100, 200); // throws: 'Assert failed at f (Assert failed at f (https://run.plnkr.co/aaFFrVzDe6dD0vYV/script.js:6:6)'
    f(100); // throws: 'Assert failed at f (Assert failed at f (https://run.plnkr.co/aaFFrVzDe6dD0vYV/script.js:6:6)'

Demo: 

https://plnkr.co/edit/OVFSfEev00ZOkXD4yVDX

