const {
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
} = require('./user.service')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
  createUser: (req, res) => {
    const body = req.body
    const salt = bcrypt.genSaltSync(10)
    body.password = bcrypt.hashSync(body.password, salt)
    create(body, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Database connection error'
        })
      }
      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  getUserById: (req, res) => {
    // const body = req.body
    const id = req.params.id
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Internal server error'
        })
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Records Not Found'
        })
      }
      return res.status(200).json({
        success: 1,
        message: 'Records Found',
        data: results
      })
    })
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Internal server error'
        })
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Records Not Found'
        })
      }
      return res.status(200).json({
        success: 1,
        message: 'Records Found',
        data: results
      })
    })
  },
  updateUser: (req, res) => {
    const body = req.body
    // const id = req.params.id
    const salt = bcrypt.genSaltSync(10)
    body.password = bcrypt.hashSync(body.password, salt)
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Internal server error'
        })
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Failed to update User'
        })
      }
      return res.status(200).json({
        success: 1,
        message: 'User Updated',
        data: results
      })
    })
  },
  deleteUser: (req, res) => {
    const body = req.body
    // const id = req.params.id
    deleteUser(body, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Internal server error'
        })
      }

      return res.status(200).json({
        success: 1,
        message: `User Deleted with id ${body.id}`
      })
    })
  },
  login: (req, res) => {
    const body = req.body
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Internal server error'
        })
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Invalid Email or Password 1'
        })
      }
      const result = bcrypt.compareSync(body.password, results.password)
      if (result) {
        result.password = undefined
        const jsontoken = sign({ result }, 'secretkey', { expiresIn: '24h' })
        return res.status(200).json({
          success: 1,
          message: 'Login',
          token: jsontoken
        })
      } else {
        return res.status(404).json({
          success: 0,
          message: 'Invalid Email or Password'
        })
      }
    })
  }
}
