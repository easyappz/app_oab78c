const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using JWT token from Authorization header.
 * Expects token in the format 'Bearer <token>'.
 * If token is missing or invalid, returns a 401 error with a detailed message.
 * If valid, attaches the decoded user data to the request object.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Authorization header is missing', 
        error: 'No token provided' 
      });
    }

    // Check if header starts with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Invalid Authorization header format', 
        error: 'Token must be in Bearer format' 
      });
    }

    // Extract token from 'Bearer <token>' format
    const token = authHeader.split(' ')[1];
    if (!token || token.trim() === '') {
      return res.status(401).json({ 
        message: 'Token is empty or not provided', 
        error: 'No token provided in Bearer header' 
      });
    }

    // Verify token with the secret key
    const decoded = jwt.verify(token, 'SECRET_KEY');
    if (!decoded) {
      return res.status(401).json({ 
        message: 'Token verification failed', 
        error: 'Invalid token data' 
      });
    }

    // Check if decoded token contains user ID
    if (!decoded.id) {
      return res.status(401).json({ 
        message: 'Token does not contain user ID', 
        error: 'Invalid token payload' 
      });
    }

    // Attach user data to request for further use in controllers
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.name, error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token has expired', 
        error: 'Expired token' 
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Token is invalid', 
        error: 'Invalid token' 
      });
    } else {
      return res.status(401).json({ 
        message: 'Authentication error', 
        error: error.message || 'Unknown authentication error' 
      });
    }
  }
};
