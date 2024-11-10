const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    }
    catch (error){
        return res.status(402).json({code: 402, message: "NO AUTORIZO"});
    }
};