const connection = require('../../config/database')

module.exports = {
  create: (data, callback) => {
    connection.query(
      `insert into registration(firstName, lastName, gender, email, password, number)
    values(?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }
        return callback(null, results)
      }
    )
  },
  getUsers: callback => {
    sqlQuery = `select id, firstName, lastName, gender, email, number from registration`
    connection.query(sqlQuery, [], (error, results, fields) => {
      if (error) {
        return callback(error)
      }
      return callback(null, results)
    })
  },
  getUserById: (id, callback) => {
    sqlQuery = `select id, firstName, lastName, gender, email, number from registration where id = ?`
    connection.query(sqlQuery, [id], (error, results, fields) => {
      if (error) {
        return callback(error)
      }
      return callback(null, results[0])
    })
  },
  updateUser: (data, callback) => {
    sqlQuery = `update registration set firstName=?, lastName=?, gender=?, email=?, number=? where id = ?`
    connection.query(
      sqlQuery,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }
        return callback(null, results)
      }
    )
  },
  deleteUser: (data, callback) => {
    sqlQuery = `delete from registration where id = ?`
    connection.query(sqlQuery, [data.id], (error, results, fields) => {
      if (error) {
        return callback(error)
      }
      return callback(null, results[0])
    })
  },
  getUserByEmail: (email, callback) => {
    sqlQuery = `select * from registration where email = ?`
    connection.query(sqlQuery, [email], (error, results, fields) => {
      if (error) {
        return error
      }
      return callback(null, results[0])
    })
  }
}
