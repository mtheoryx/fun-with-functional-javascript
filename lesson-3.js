//const Either = Right || Left;

const Right = x => 
({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
});

const Left = x => 
({
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
});

const resultRight = 
    Right(2)
    .map(x => x + 1)
    .map(x => x / 2)
    .fold(x => 'error', x => x);
    
console.log(resultRight); //-> 1.5

const resultLeft = 
    Left(2)
    .map(x => x + 1)
    .map(x => x / 2)
    .fold(x => 'error', x => x);

console.log(resultLeft); //-> error