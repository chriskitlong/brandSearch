const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = process.env.DB_HOST === "localhost"
  ? new Sequelize(dbConfig.DB_URL)
  : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.brands = require("./brand.model.js")(sequelize, Sequelize);

module.exports = db;