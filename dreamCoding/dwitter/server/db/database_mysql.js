import mysql from 'mysql2';
import SQ from 'sequelize';
import { DataTypes } from 'sequelize';
import { config } from '../config.js';

const { host, user, database, password, dialect } = config.db;
export const sequelize = new SQ(database, user, password, {
    host,
    dialect,
    logging:false,
})

const pool = mysql.createPool({host, user, database, password});

export const db = pool.promise();