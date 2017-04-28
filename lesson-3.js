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

const findColor = name => 
    ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name];
    
const resultFindColor = findColor('red').slice(1).toUpperCase();

console.log(resultFindColor); //-> FF4444

// const resultFindColorError = findColor('green').slice(1).toUpperCase();

// console.log(resultFindColorError); //-> ERROR, script dies

const fromNullable = x => 
    x != null ? Right(x) : Left(null);

const findColorEither = name => 
    fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name]);

const resultFindColorRed = findColorEither('red')
                                .map(c => c.slice(1))
                                .fold(e => 'no color found', 
                                      c => c.toUpperCase());
                            
console.log(resultFindColorRed); //-> FF444

const resultFindColorGreen = findColorEither('green')
                                .map(c => c.slice(1))
                                .fold(e => 'no color found', c => c.toUpperCase());;

console.log(resultFindColorGreen); //-> no color found
