import { getTweets, getUsers } from '../db/database.js';
import * as userRepository from './auth.js';
import MongoDb from 'mongodb';

export async function getAll() {
  return getTweets()
        .find()
        .sort({createdAt: -1})
        .toArray()
        .then(mapTweets);
}

export async function getAllByUsername(username) {
  const query = {username};
  return getTweets()
        .find(query)
        .toArray();
}

export async function getById(id) {
  return getTweets()
        .findOne({_id: new MongoDb.ObjectId(id)})
        .then(mapOptionalTweet)
}

export async function create(text, userId) {
  const {username, name, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  }
  return getTweets()
        .insertOne(tweet)
        .then((data) => {mapOptionalTweet({...tweet, _id: data.insertedId})});
};

export async function update(id, text) {
  return getTweets()
        .findOneAndUpdate(
          {_id: new MongoDb.ObjectId(id)}, 
          {$set: {text}},
          { returnDocument: 'after'},
        )
        .then(result => result.value)
        .then(mapOptionalTweet);
}

export async function remove(id) {
  const query = {_id: new MongoDb.ObjectId(id)};
  return getTweets()
        .deleteOne(query)
        .then((result) => {
          if (result.deletedCount === 1){
            console.log("Successfully deleted one document.");
          } else {
            console.log("No documents matched the query.");
          }
        });
}

function mapOptionalTweet(tweet){
  return tweet ? {...tweet, id: tweet._id.toString()} : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}