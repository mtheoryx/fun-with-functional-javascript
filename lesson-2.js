const Box = x => 
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
});

/**
* Some new examples
* Consider the following commented methods containing a lot of assignment 
* and state.
* 
* They seem relatively simple at first, but the applyDiscount is worrisome.
* If this were written, correctly, as utility methods that are just reused
* and imported from other files, you would have to go visit them to understand
* them, and the next thing you know, you just lost track of what applyDiscount
* did in the first place.
* 
* It doesn't have to be this way! The uncommemnted methods work perfectly!
*/

// const moneyToFloat = str => 
//     parseFloat(str.replace(/\$/g, ''));

const moneyToFloat = str => 
    Box(str)
    .map(s => s.replace(/\$/g, ''))
    .fold(r => parseFloat(r));

const percentToFloat = str => {
    const replaced = str.replace(/\%/g, '');
    const number = parseFloat(replaced);
    return number * 0.01;
};

const applyDiscount = (price, discount) => {
    const cost = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cost - cost * savings;
};

const result = applyDiscount('$5.00', '20%');

console.log(result); //-> 4

