# Never declare a global var in a scope. 
###   Whit "use strict " prevent to declare a global variable whit out a declaration.**
* ### Always use "use strict " mode because prevent a lot of error.
```
*
var foo = "bar";
function bar(){
    var foo = "baz";
    function baz (foo){
        foo = "bam";
        bam = "yay";
    }
    baz();
}
```
* _undefined_ : have declare but have no value // or currently no have any value.
* _Lexical Scope_ : Is fix.

Function name it:
* Handy function self-reference.
* More debug gable stack traces.
* More self-documenting code.

### Dynamics scope 

## closure _is when a function "remember" its lexical scope even when the function is executed outside that lexical scope_