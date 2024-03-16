
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req,res, next) => {
    const authHeader = req.headers['authorization'];
    if( !authHeader){
        return res.status(403)
            .json( {message : "Unauthorized"})
    }

    try {
        // check for valid jwt token
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.userInfo = decoded;
        console.log(decoded);
        if(!decoded) {
            return res.status(403)
            .json( {message : "Token is not correct or expired"})
        }


        next()

    } catch (err) {
        return res.status(403)
        .json( {message : "Token is not correct or expired"})
    }

} 

module.exports = ensureAuthenticated;