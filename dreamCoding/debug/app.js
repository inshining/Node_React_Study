function sayHello() {
    console.log('hello ~');
    console.log('hip');

}

function calculate(x, y) {
    dfconsole.log('calculating');
    const result = x + y;
    console.log('result: ', result);
    sayHello()
    return result;
}

calculate(1,2);

const stop = 4;
console.log('.... looping ...');
for (let i = 0; i < 10; i++){
    console.log('count', i);
    if (i === stop){
        break;
    }
}
