//install required pkg
//npm install jsonwebtoken bcryptjs dotenv


//.env
// JWT_SECRET=your_jwt_secret_key
// JWT_EXPIRES_IN=1h
// REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
// REFRESH_TOKEN_EXPIRES_IN=7d


// 1) JWT Authentication Module (jwtAuth.js):
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Generate Refresh Token (optional)
const generateRefreshToken = (payload, expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn });
};


// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token to the request
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};


// Middleware to verify Refresh Token (optional)
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};

