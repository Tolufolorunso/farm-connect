const jwt = require('jsonwebtoken');

exports.authentication = (...roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      // console.log(7, token, process.env.JWT_SECRET);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(9, decodedToken);
      const role = decodedToken.role;
      if (!roles.includes(role)) {
        return res.status(401).json({
          error: 'Unauthorized',
          status: 'error',
        });
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: 'Unauthorized',
        status: 'error',
      });
    }
  };
};
