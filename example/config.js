module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/apirest',
    JWT_SECRET: process.env.JWT_SECRET || 'super_secret_token'
}