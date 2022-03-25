import  express  from "express";
import {body, validationResult, param} from 'express-validator';

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({message: errors.array()[0].msg})};

app.post('/users',
    [
        body('name').trim().isLength({min:2}).withMessage('이름은 두 글자 이상'),
        body('age').notEmpty().isInt().withMessage('숫자를 입력하세요'),
        body('email').isEmail().withMessage('이메일을 입력해요').normalizeEmail(),
        body('job.name').notEmpty(),
        validate,
    ],
    (req, res, next) => {    
    validate()
    console.log(req.body);
    res.sendStatus(201);

})

app.get('/:email', 
    [
        param('email').isEmail().withMessage('이메일을 입력하세요'),
        validate,
    ],
    (req, res, next) => {

    res.send('email');
})

app.listen(8080);