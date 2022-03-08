import { db, sequelize } from "../db/database.js";
import SQ, { Sequelize } from 'sequelize';
import {User} from './auth.js'

const DataTypes = SQ.DataTypes;

const Tweet = sequelize.define('tweets', (
  {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    text: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
}));
Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER = {
  order: [
    ['createdAt', 'DESC']
  ]
}


const SELECT_JOIN = 
`SELECT tw.id, tw.text, tw.createdAt, tw.userId,us.username, us.name, us.url FROM tweets as tw JOIN users as us 
ON tw.userId = us.id `;

const ORDER_DESC = `ORDER BY tw.createdAt DESC`;

export async function getAll() {
  return Tweet.findAll({...INCLUDE_USER, ...ORDER})
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER, 
    ...ORDER,
    include: {
      ...INCLUDE_USER.include,
      where: {
        username,
      },    
    }
    
  })
  
  // return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0])

}

export async function getById(id) {
  return Tweet.findOne({
    ...INCLUDE_USER, 
    where: {
        id,
      },
    });
  // return db.execute(`${SELECT_JOIN} WHERE tw.id=? ${ORDER_DESC}`, [id]).then((result) => result[0][0])

}

export async function create(text, userId) {
  return Tweet.create({text, userId})
  .then((data) => this.getById(data.dataValues.id));
//  return db
//  .execute(
//    `INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)`,
//   [text, new Date(),userId]
//   ).then(result => getById(result[0].insertId));
}

export async function update(id, text) {
    return Tweet.findByPk(id, INCLUDE_USER)
    .then(tweet => {
      tweet.text = text;
      return tweet.save();
    })
  /*   return db
 .execute(
   `UPDATE tweets SET text=? WHERE id=?`,[text, id])
  .then(() => getById(id)); */
}

export async function remove(id) {
  return Tweet.destroy({where: {id}})
  // return db
  // .execute(`DELETE FROM tweets WHERE id=?`, [id]);
}
