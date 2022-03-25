import fsAsyn from 'fs/promises';
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';




const app  = express();

app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.use(morgan('combined'));
// 보안에 필요한 헤더 추가 
app.use(helmet());

app.get('/', (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.cookies);
    res.send('Welcome!');
})


app.listen(8080);

//비동, 비동기 예외처리 방법
/* app.get('/file1', (req, res) => {
    // try {
    //     const data = fs.readFileSync('/file.txt');
    // } catch (err) {
    //     res.status(404).send('File not found.')
    // }

    fs.readFile('/file1.txt', (err, data) => {
        if(err) {
            res.status(404).send('File not found.')
        }
    })
})

app.get('/file2', (req, res) => {
    fsAsyn.readFile('/file.txt')
    .then((data) => {})
    .catch(next);
})

app.get('file3', async (req, res) => {
    const data = await fsAsyn.readFile('/file.txt');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
}) */