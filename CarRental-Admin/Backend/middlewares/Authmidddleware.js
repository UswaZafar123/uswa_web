const jwt = require('jsonwebtoken');
const User = require('../Models/Car');

// Protect routes
// const protect = async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             req.user = await User.findById(decoded.id);
//             next();
//         } catch (err) {
//             console.error(err);
//             res.status(401).json({ message: 'Not authorized' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging
      req.user = await User.findById(decoded.id).select("-password");
      if(!req.user){
        console.log("war gya gee");
      }
      next();
    } catch (error) {
      console.error("Token verification failed:", error); // Logs token errors
      return res.status(401).json({ message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin check
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { protect, admin };
