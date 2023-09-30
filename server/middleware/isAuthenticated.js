require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') //making headerToken a function that requests authorization from

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401) //if not header token send error 401 error with authentication
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET) //checking if the token is valid to secret authentication
        } catch (err) {
            err.statusCode = 500
            throw err //Generic catch all response where the server encountered an unexpected condition that prevented from fullfilling the request
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        } // if token is not valid/authenticated then send back an error 401 which is invalid authentication

        next()
    }
}