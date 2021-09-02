require('dotenv').config({ path: "./../.env" })

const params = {
  "host": process.env.DB_HOSTNAME,
  "database": process.env.DB_DATABASE,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "dialect": "postgres"
};

module.exports = {
  "development": params,
  "test": params,
  "production": params,
};
