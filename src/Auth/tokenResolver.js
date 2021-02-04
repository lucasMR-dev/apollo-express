const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const tokenResolver = (request) => {
    const token = request.req.headers.authorization || '';
    const isLoggedIn = false;    
    if(token !== ''){
        let verifiedToken;
        try {
            verifiedToken = jwt.verify(token, config.JWT_SECRET);
            isLoggedIn = true;
        } catch(err) {
            throw new AuthenticationError('Access Token is not Valid or Expired');
        };
    }
    return isLoggedIn
}

module.exports = tokenResolver;