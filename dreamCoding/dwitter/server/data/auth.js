import { db, sequelize } from "../db/database.js";
import SQ from 'sequelize';

const DataTypes = SQ.DataTypes;


export const User = sequelize.define('user', (
  {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    url: {
        type:DataTypes.TEXT,
    }}
));

export async function findByUsername(username) {
  return User.findOne({where: {username}});
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((result) => {console.log(result); return result.dataValues.id;});
}
