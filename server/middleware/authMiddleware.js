const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using JWT token from Authorization header.
 * Expects token in the format 'Bearer <token>'.
 * If token is missing or invalid, returns a 401 error.
 * If valid, attaches the decoded user ID to the request object.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Токен не предоставлен или неверный формат' });
    }

    // Extract token from 'Bearer <token>' format
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Токен не предоставлен' });
    }

    // Verify token with the secret key
    const decoded = jwt.verify(token, 'SECRET_KEY');
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Неверный токен: данные отсутствуют' });
    }

    // Attach user ID to request for further use in controllers
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({ message: 'Неверный или истекший токен' });
  }
};
