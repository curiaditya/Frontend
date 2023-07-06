const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

// Middleware function to protect routes by verifying JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(' ')[1];

      // Decode the token using the JWT_SECRET stored in environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the decoded token's ID
      // and exclude the password field from the retrieved user document
      req.user = await User.findById(decoded.id).select('-password');

      // Call the next middleware or route handler
      next();
    } catch (error) {
      // If there's an error while decoding or verifying the token, return a 401 status and error message
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found, return a 401 status and error message
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
