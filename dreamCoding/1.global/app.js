const fs = require('fs');
const os = require('os');

console.log('log'); // 개발 
console.info('info'); // 정보
console.warn('warn'); // 경보 (그렇게 치명적이지 않음)
console.error('error'); // 에러, 사용자 에러, 시스템 에러 

//assert
console.assert( 2 === 3, 'not same!');


//print object
const student = {name: 'ellie', age: 20}
console.log(student);
console.table(student);

console.log(os.EOL == '\n');
console.log(os.cpus());