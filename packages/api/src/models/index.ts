import Sequelize from 'sequelize'

const host = process.env.DB_HOSTNAME
const database = process.env.DB_DATABASE
const user = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  timezone: '-05:00',
})

sequelize.authenticate()

export default {
  sequelize,
  Sequelize,
}
