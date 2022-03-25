import fsAsyn from 'fs/promises';
import express from 'express';
import fs from 'fs';
import postRouter from './router/post';
import userRouter from './router/user';


const app  = express();

app.use(express.json()) // REST API -> Body
app.use(express.urlencoded({ extended: false})) // HTML Form -> Body로 파싱 
app.use(express.static('public')); //public foler 에 리소스에 접근 가능
app.use('/posts', postRouter);
app.use('/users', userRouter);


app.listen(8080);

