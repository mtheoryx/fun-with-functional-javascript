/**
* Code sample and ideas lifted from Professor Risby Introduces
* Composable Functional Javascript. Presented on Egghead.io
*/

/**
* Old school function with lots of assignments and state as it goes along.
* This is very typical to find in JavaScript, but it doesn't have to
* be that way! Read further for more
*/
const nextCharForNumberString = str => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number + 1;
    return String.fromCharCode(nextNumber);
};

const result = nextCharForNumberString(' 64 ');

console.log(result); //-> A

/**
* Incremental improvement. While this does remove the assignment
* that was all over the place, it still does has buried state,
* and the logic is more confusing to understand. Imagine if
* there were 10 operations, instead of just 4!
*/
const nextCharForNumberString1 = str => 
    String.fromCharCode( ( parseInt( str.trim() ) + 1 ) );
    
const result1 = nextCharForNumberString1(' 64 ');

console.log(result1); //-> A

/**
* One trick is to put the string in a box and use array methods in a chain.
* Obviously you don't want the return to be in a box, but let's try it out.
*/
const nextCharUsingArray = str => 
    [str]
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i));
    
const result2 = nextCharUsingArray(' 64 ');

console.log(result2); //-> [ 'A' ] // We get the right result, but in a box!

/**
* We can use principles of functional programming to creat a formal Box
* type that can be reused, extended, and customized instead of the above
* method of "putting something in a box" with just a native array
* 
* First we define a map method of our own that works the same way as the
* native array map method
* 
* A convenience 'inspect' method will help the user understand the output
* when called in console.log()
* 
* To get the return out of the array, we create another convenience
* method to "fold" the box, and we use that on the very last
* part of the chain instead of the map method
*/

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
});

const nextCharUsingBox = str => 
    Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .fold(i => String.fromCharCode(i));
    
const result3 = nextCharUsingBox(' 64 ');

console.log(result3); //-> A
