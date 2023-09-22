const asyncHandler = require('express-async-handler')

const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  
  let token;
  console.log('here to get the token')

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
   try {
  token = req.headers.authorization.split(" ")[1];

  // Decodes token id
  const decoded = jwt.verify(token,process.env.JWT_SECERT);
 
  req.user = await User.findById(decoded.id).select("-password");

  next();
} catch (error) {
   res.status(401);
  throw new Error("Not authorized, token failed");
}
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
})
module.exports = protect