const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envConfig');

class Authorization {
    authorized(req, res, next) {
        const headerToken = req.headers.authorization;
        if(headerToken) {
          const token = headerToken.split('Bearer ')[1];
          const verified = jwt.verify(token, JWT_SECRET);
          if(verified) {
              next()
          } else {
              return res.status(401).json({errors: [{msg: 'Es necesario un token válido'}]})
          }
        } else {
           res.status(401).json({ errors: [{ msg: 'Acceso denegado, no autorizado⛔'}]})
        }
    }
}

module.exports = new Authorization();