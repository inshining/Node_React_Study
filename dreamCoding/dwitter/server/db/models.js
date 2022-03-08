import { DataTypes, Model } from "sequelize";
import { db } from "./database.js";


class Users extends Model {}
class Tweets extends Model {}

Users.init({
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
        type:DataTypes.STRING,
    }},
    {
        db,
        modelName:'users',
})

Tweets.init({
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
},
{
    db,
    modelName:'tweets',
})