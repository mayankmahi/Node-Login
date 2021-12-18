var mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'user login',
  port: process.env.DB_PORT,
  connectionLimit: 10
})

module.exports = connection
