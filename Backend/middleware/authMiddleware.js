require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware for token validation
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user info to request
    next(); // Proceed to next handler
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token. Please provide a valid token.' });
    }
    res.status(500).json({ message: 'An error occurred while verifying the token.' });
  }
};

module.exports = authMiddleware;
