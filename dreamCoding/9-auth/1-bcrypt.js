import bcrypt from 'bcrypt';

const saltRound = 10;

const password = 'abc1234';
const hashed = bcrypt.hashSync(password, saltRound);

// console.log(bcrypt.compare(password, hashed, saltRound));
console.log(`password: ${password}, hased : ${hashed}`);

bcrypt.compare(password, hashed,  (err, result) =>{
    console.log(result);
})