# **Is.js**

# Javascript assert and type recognition

<br />
**Background**

[Contract programming](https://en.wikipedia.org/wiki/Design_by_contract) is an important paradigm that creates safer code with early error recognition. It is especially useful in typeless languages like Javascript which puts no restriction on the number or type of arguments passed to functions.
<br/><br/>

**Introduction**

Is.js includes:
 - *predicates* - are functions (ie Is.bool(v) ) receiving a single argument and returning true (pass) / false (fail) / other (fail-error) depending on the type of their argument.<br/><br/>
 
 - *combinators* - are functions (ie, Is.not(p), Is.or(p1, p2) ) that create new predicates out of existing ones.<br/><br/>
 
 - *Is.assert()* - can be called in a number of ways:<br/>
     - Is.assert(...booleans) will pass if *any* of the given booleans evaluate to true, useful for combining multiple Is.match (se below) <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Is.assert(a0 > 5, Is.arr(a);`<br/><br/>
     - Is.assert(args, ...predicates) where args is the arguments object, will return true iff for each argument in args, the matching predicate evaluate to true.  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Is.assert(arguments, Is.arr, Is.str);`<br/><br/>
     - Is.assert([x, y], ...predicates) passing an array instead of the arguments object is useful in arrow functions where there is no arguments object. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Is.assert([x, y], Is.arr, Is.str);`<br/><br/>
     - Is.assert(args, ...) allows combining predicates with any boolean values,<br/>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Is.assert(arguments, Is.regexp, a1===someval, v => v>0 && v<3);`<br/><br/>
     - Is.assert(args, []) or assert(args, null) will pass if args is []<br/><br/>
     - use Is.default(predicate) to designate a predicate for an argument that may be missing from args, <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Is.assert(arguments, Is.bool, Is.default(Is.bool);`<br/><br/>
     - use Is.spread(predicate) to designate a predicate for all remaining arguments in args,
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Is.assert(arguments, Is.elem, Is.date, Is.spread(Is.func);`<br/><br/>

    If Is.assert() passes it just returns true. If it fails it will produce a detailed notification including the file, function name and location.
    
    ```
    function f(x, y=3) {
        Is.assert(arguments, Is.int, Is.default(Is.str));
    }
    
    f(3);     // returns true
    f(3, 5);  // throws: 'Is.Assert failed at f ('myfile.html':1:25)
    ```
    Arrow functions do not have an arguments object so you have to pass their arguments to assert in an array: 
    
    ```
    btn.onclick = (e => { 
        Is.assert([e], Is.event); 
        ... 
    });
    ```<br/>
 - *Is.assert(method)* - sets the notification method:

     - `Is.assert('disable');` will disable all assertions. The performance cost of an assert in this case will be one 'if'.
     
     - `Is.assert('console');` will cause failed assertions to log to the console instead of throwing exceptions
     
     - `Is.assert('silent');` will stop any notification. Is.assert will still return it's result.  
     
     - `Is.assert('throw');` will revert back to throwing exception if you called one of the above functions  
<br/>
 - *Is.match(...args)* - works the same as a 'silent' Is.assert(..). This is useful for combining asserts:
 
    ```
    // f can be called either with a single number or with a bool and an event
    function f(x, y) { 
        Is.assert(Is.match(Is.num), Is.match(Is.bool, Is.event)); 
    }
    ```<br/>
     
<br />
**Predicates**
<pre>
Is.undef(v)     true iff v is undefined
Is.void(v)      true iff v is undefined, null or NaN
Is.func(v)      true iff v is a function
Is.num(v)       true iff v is a number
Is.numstr(v)	true iff v is a number string ('5.2')
Is.int(v)       true iff v is an integer
Is.intstr(v)    true iff v is an integer string ('5')
Is.str(v)       true iff v is a string
Is.bool(v)      true iff v is a boolean
Is.nbool(v)     true iff v is not a boolean
Is.arr(v)       true iff v is an array
Is.emptyarr(v)  true iff v is an empty array
Is.regexp(v)    true iff v is a regular expression
Is.symbol(v)    true iff v is a symbol
Is.dict(v)      true iff v is a 'plain' dictionary ({x:1, y:2})
Is.emptydict(v) true iff v is a enempty dictionary ({})
Is.date(v)      true iff v is a date
Is.elem(v)      true iff v is an HTML element
Is.event(v)     true iff v is an HTML event
Is.args(v)      true iff v is the arguments object
</pre>

<br /><br />
**combinators**
<pre>
Is.inst(base) - returns a new predicate p(v) passing if v instanceof base
    Is.assert(arguments, Is.inst(baseFunc)
   
Is.arrlen(len) - returns a new predicate p(arr) passing if arr is a array of length len
    Is.assert(arguments, Is.arrlen(5)))

Is.strlen(len) - returns a new predicate p(s) passing if s is a string of length len
    Is.assert(arguments, Is.strlen(5)))

Is.not(pred) - returns a new predicate p(v) passding if !pred(v)
    Is.assert(arguments, Is.not(Is.str))

Is.or(...preds) - returns a new predicate p(v) passing if for any pred in preds, pred(v) passes
    Is.assert(arguments, Is.or(Is.str, Is.int))

Is.and(...preds) - returns a new predicate p(v) passing if for all pred in predicates, pred(v) passes
    Is.assert(arguments, Is.and(Is.str, s => s[0]==='x'))

Is.every(pred) - returns a new predicate p(arr) passing if for all elements a of arr pred(a) passes
    Is.assert(arguments, Is.every(Is.str))
</pre>

<br/><br/>

**Conclusion**

Is.assert provides an easy, useful and comprehensive way to assert function signatures.

easy as:
```
// f receives no arguments
function f() {
    Is.assert(arguments, []); 
}
```

useful as: 
```
// f receives an integer, an array of strings and an optional bool
function f(x, y, z=3) {
    Is.assert(Is.int, Is.every(Is.str), Is.default(Is.bool)); 
}
```

comprehensive as: 
```
// f receives
//   either f(a0, a1) where a0 is either an integer or a string and a1, if there, is an array with ten elements, 
//   or f(a0, ...args) where a0 is a boolean and args are all integers

function f(x, y, z=3) {
    Is.assert(
        Is.match(arguments, Is.or(Is.int, Is.str), Is.default(Is.length(10))),
        Is.match(arguments, Is.bool, Is.spread(Is.every(Is.int)));
    );
}
```

Is predicates and assert are useful anywhere in the code:

```
if (Is.undef(v)) { ... } // easy type checking
Is.assert(v>5); // assert anywhere
```

<br/><br/>
**Demo**

https://plnkr.co/edit/OVFSfEev00ZOkXD4yVDX




