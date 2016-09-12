# **Is.js**

# Javascript assert and type recognition

<br />
**Background**

[Contract programming](https://en.wikipedia.org/wiki/Design_by_contract) is an important paradigm that creates safer code with early error recognition. It is especially useful in typeless languages like Javascript which puts no restriction on the arguments passed to functions.

<br />
**Usage**

Assert(cond) can be called as follows:

 - `Assert(true);` do nothing - assetion passed
 
 - `Assert(false);`throw an exception string containing the name and position of the assertion that failed
 
 - `Assert(__disable);` will disable all assertions. The performance cost of an assert in this case will be one 'if'.
 
 - `Assert('__console');` will cause failed assertions to log to the console instead of throwing exceptions
 
 - `Assert('__throw');` will revert back to throwing exception if you called one of the above functions  
<br />
  
  
'Is' provides sugar for JS type checking. It  has the following methods:


    Is.obj(v)		true iff v is not undefined and not null
    Is.undef(v)		true iff v is undefined
    Is.void(v)		true iff v is undefined or null
    Is.num(v)		true iff v is a number
    Is.int(v)		true iff v is an integer
    Is.str(v)		true iff v is a string
    Is.func(v)      true iff v is a function
    Is.bool(v)		true iff v is a boolean
    Is.arr(v)		true iff v is an array
    Is.regexp(v)    true iff v is a regular expression
    Is.symbol(v)	true iff v is a symbol
    Is.dict(v)		true iff v is a dictionary {x:1, y:2}
    Is.date(v)		true iff v is a date
    Is.elem(v)		true iff v is an HTML element
    Is.event(v)		true iff v is an HTML event

    Is.all(arr, f)  true iff f returns true for all of arr elements
    Is.all(f, arr)  true iff f returns true for all of arr elements

<br />
**Eample**

    <script src="https://rawgit.com/kofifus/contract.js/master/contract.js"></script>
        
    // Assert('__disable'); // disable asserts 
    // Assert('__console'); // log to console instead of throwing
    // Assert('__throw');  // go back to throwing
    
    // toggleClasses receives either an element or an element plus an array of class name strings
    function toggleClasses(elem, classes) {
    	Assert(Is.elem(elem) && (arguments.length===1 || (arguments.length===2 && Is.all(classes, Is.str))));
    	alert('toggleClasses ok');
    }
    
    let div = document.createElement('div');
    
    try {
    	// correct invocations - alerts 'toggleClass ok'
    	toggleClasses(div, ['c1', 'c2']);
    	toggleClasses(div);
    
    	// incorrect invocations - throws 'Assert failed at toggleClass (https://run.plnkr.co/XLpMfSUyfkmB9Wuf/:19:6)'
    	toggleClasses(div, ['c1', 5]);
    	// toggleClasses(10, ['c1', 'c2']);
    	// toggleClasses(div, ['c1', 'c2'], 5);
    	// toggleClasses();
    	
    } catch(e) {
    	alert(e);
    }
    
    
    // function defined with arrow notation
    let f= (x => {
    	Assert(Is.int(x)); // you _cannot_ use arguments or arguments.length here !
    	alert('f ok');
    });
    
    
    try {
    	// incorrect invocation - throws 'Assert failed at f (https://run.plnkr.co/XLpMfSUyfkmB9Wuf/:43:6)'			  
    	f(5.2);
    
    } catch(e) {
    	alert(e);
    }

<br />
**Demo**

https://plnkr.co/edit/OVFSfEev00ZOkXD4yVDX



