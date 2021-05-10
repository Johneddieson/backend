// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     const error = new Error('Not authenticated!');
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(' ')[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, 'secretfortoken');
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error('Not authenticated!');
//     error.statusCode = 401;
//     throw error;
//   }
//   req.isLoggedIn = true;
//   req.userId = decodedToken.userId;
//   req.email = decodedToken.email;
//   next();
// };


const jwt = require('jsonwebtoken');

module.exports = 
   (req, res, next) =>  {
    
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: 'No Authorization' });
    }
    const token = req.cookies.auth || req.headers.authorization.split(' ')[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: 'No token provided' });
    }

    return jwt.verify(token, 'secretfortoken', (err, decoded) => {
      if (err) {
        if (err.expiredAt < new Date()) {
          return res.status(500).json({
            message: 'Token has expired. Please login again',
            token: null
          });
        }
        next();
      }
      req.user = decoded.data;
   
      
      
  next();
   
      
    });
   }
  
