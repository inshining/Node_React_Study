import MongoDb from 'mongodb';
import { config } from '../config.js';
import Mongoose from 'mongoose';

export async function connectDB() {
    return  Mongoose.connect(config.db.host);
}

export function useVirtalId(schema){
    schema.set('toJSON', {virtuals: true});
    schema.set('toObject', {virtuals:true});
}

// TODO(Ineyob): Delete below

/* export const User = function getUsers(){
    const userSchema = new Mongoose.Schema({
        username: String,
        password: String,
        name: String,
        email: String,
        url: String,
    })

    return Mongoose.model('User', userSchema);
}

export const Tweet =  function getTweets() {
    const tweetSchema = new Mongoose.Schema({
        text: String,
        userId: String,
        name: String,
        url: String,
    })

    return Mongoose.model('Tweet', tweetSchema);
}
 */
let db;
export function getUsers(){
    return db.collection('users');
}

export function getTweets() {
    return db.collection('tweets');
}