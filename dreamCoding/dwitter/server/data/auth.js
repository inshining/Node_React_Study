import {  useVirtalId } from '../db/database.js';
import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  username:  { type: String, required: true},
  password: { type: String, required: true},
  name: { type: String, required: true},
  email: { type: String, required: true},
  url: { type: String},
})

useVirtalId(userSchema);

const User = Mongoose.model('User', userSchema);


export async function findByUsername(username) {
  return User.findOne({username});
}

export async function findById(id) {
  return User.findById(id)
}

export async function createUser(user) {
  return new User(user).save()
        .then((data) => {
          console.log(data.id);
          return data.id;
        })
}

function mapOptionalUser(user) {
  return user ? {...user, id: user._id} : user;
}