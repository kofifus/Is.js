# **Is.js**

# Javascript assert and type recognition

<br />
**Background**

[Contract programming](https://en.wikipedia.org/wiki/Design_by_contract) is an important paradigm that creates safer code with early error recognition. It is especially useful in typeless languages like Javascript which puts no restriction on the number or type arguments passed to functions.

<br />
**Introduction**

Is.js includes a set of predicates for type detection, a few predicate combinators, and an Assert function to validate multiple condition or a function signature.

 - *predicates* - are functions (ie, Is.bool(v), Is.arr(v) ) returning true/false depending on the type of their argument.
 
 - *combinators* - are functions (ie, Is.not(p), Is.or(p1, p2) ) that create new predicates out of existing ones.
 
 - *Is.Assert()* will evaluate it's arguments to true/false and if false will give a detailed msg including the function name and location. It can be called in a number of ways:
     - Assert(string) where string is one of 'disable', 'console', 'silent' or 'throw' will change the notification method, 
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ie `Is.Assert('disable');`
       
     - Assert(...booleans) will pass if all given booleans evaluate to true, 
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ie `Is.Assert(a0>5, Is.arr(a);`
      
     - Assert(args, ...predicates) will pass if for each argument in args, the matching predicate evaluate to true. args can be either the arguments object or an array, 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ie `Is.Assert(arguments, Is.arr, Is.str);`
      
     Assert(args, ...) allows combining Is predicates with any boolean values, 
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ie `Is.Assert(arguments, Is.regexp, a1===Document.activeElement);`

     Use  Is.default(predicate) to designate a predicate for an argument that may be missing from args,
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ie `Is.Assert(arguments, Is.bool, Is.default(Is.bool);`
     
     Use Is.spread(predicate) to designate a predicate for all remaining arguments in args,
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ie `Is.Assert(arguments, Is.elem, Is.date, Is.spread(Is.func);`
     

<br />
**Predicates**


    Is.undef(v)		true iff v is undefined
    Is.void(v)		true iff v is undefined, null or NaN
    Is.func(v)      true iff v is a function
    Is.num(v)		true iff v is a number
    Is.numstr(v)	true iff v is a number string ('5.2')
    Is.int(v)		true iff v is an integer
    Is.intstr(v)	true iff v is an integer string ('5')
    Is.str(v)		true iff v is a string
    Is.bool(v)		true iff v is a boolean
    Is.nbool(v)		true iff v is not a boolean
    Is.arr(v)		true iff v is an array
    Is.emptyarr(v)	true iff v is an empty array
    Is.regexp(v)    true iff v is a regular expression
    Is.symbol(v)	true iff v is a symbol
    Is.dict(v)		true iff v is a 'plain' dictionary ({x:1, y:2})
    Is.emptydict(v)	true iff v is a enempty dictionary ({})
    Is.date(v)		true iff v is a date
    Is.elem(v)		true iff v is an HTML element
    Is.event(v)		true iff v is an HTML event
    Is.args(v)		true iff v is the arguments object
    Is.inst(v, p)	true iff v is an instanceof p

<br />
**combinators**

    Is.not(f)	    
     returns a new predicate testing iff !f(v)
       
    Is.and(...ps)	    
     returns a new predicate testing iff for all p in ps p(v) is true

    Is.or(...p)	    
     returns a new predicate testing iff for any p in ps p(v) is true

    Is.every(p)	    
     returns a new predicate testing iff for all elements a of an array p(a) is true

<br />
**Is.Assert(string)**

Sets the notification method:

 - `Is.Assert('disable');` will disable all assertions. The performance cost of an assert in this case will be one 'if'.
 
 - `Is.Assert('console');` will cause failed assertions to log to the console instead of throwing exceptions
 
 - `Is.Assert('silent');` will stop any notification. Is.Assert will still return it's result.  
 
 - `Is.Assert('throw');` will revert back to throwing exception if you called one of the above functions  

<br />
**Is.Assert(...ps)**

Tests if any of the predicates in ps evaluate to false and if yes notify according to the notification method. Returns true iff all predicates passed.

    function f() {
      let x=5, y=10;
      let res=Is.Assert(Is.or(Is.str(x), Is.func(x), y>0);
    
    will throw: Assert failed at  

  
  
<br />
**Demo**

https://plnkr.co/edit/OVFSfEev00ZOkXD4yVDX




