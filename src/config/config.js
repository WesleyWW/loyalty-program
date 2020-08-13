require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    PORT: process.env.PORT || 3000,
    ATLAS_URI: process.env.ATLAS_URI,
    jwtSecret: 'jwt_please_change',
    jwtExpiration: '12h'
  },
  "test": {
    PORT: process.env.PORT || 3000,
    ATLAS_URI: process.env.ATLAS_URI
  },
  "production": {
    PORT: process.env.PORT || 3000,
    ATLAS_URI: process.env.ATLAS_URI,
    jwtSecret: process.env.jwtSecret,
    jwtExpiration: process.env.jwtExpiration
  }
};