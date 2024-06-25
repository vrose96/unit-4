require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
   isAuthenticated: (req, res, next) => {
      // Extract the token from the Authorization header
      const headerToken = req.get('Authorization')

      // Check if the token exists in the header
      if (!headerToken) {
         console.log('ERROR IN auth middleware')
         res.sendStatus(401) // Send Unauthorized status if token is missing
      }

      let token

      try {
         // Verify the token using the JWT library and the secret key
         token = jwt.verify(headerToken, SECRET)
      } catch (err) {
         err.statusCode = 500 // Set status code for internal server error
         throw err // Throw error to be handled by error handling middleware
      }

      // If token verification fails, handle the error
      if (!token) {
         const error = new Error('Not authenticated.')
         error.statusCode = 401
         throw error
      }

      next() // Call next() to proceed to the next middleware or route handler
   }
}
