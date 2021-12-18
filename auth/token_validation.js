const { verify } = require('jsonwebtoken')

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('Authorization')
    if (token) {
      verify(token, 'secretkey', (err, decoded) => {
        if (err) {
          res.status(401).json({
            success: 0,
            message: 'Invalid Token'
          })
        } else {
          next()
        }
      })
    } else {
      res.status(401).json({
        success: 0,
        message: 'Access Denied! Aunauthorized User'
      })
    }
  }
}
