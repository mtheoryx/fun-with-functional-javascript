//const Either = Right || Left;

const Right = x => 
({
    map: f => Right(f(x)),
    inspect: () => `Right(${x})`
});

const Left = x => 
({
    map: f => Left(x),
    inspect: () => `Left(${x})`
});

const resultRight = Right(3).map(x => x + 1);
console.log(resultRight); //-> Right(4)

const resultLeft = Left(3).map(x => x + 1);
console.log(resultLeft); //-> Left(3)