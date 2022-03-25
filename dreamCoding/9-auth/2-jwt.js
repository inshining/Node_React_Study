import jwt from 'jsonwebtoken';

const token = jwt.sign({
    id: 'userId', 
    isAdmin: true, 
}, 'qg}"CA:=-8F&GJfxX?a9(KDSM[!KWL^6',
{
    expiresIn: 2
});

console.log(token);
