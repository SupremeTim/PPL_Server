const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/confing')[env];
const db = {};

const sequelize = new Sequelize(
  confing.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);

module.exports = db;