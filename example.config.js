module.exports = {
    ENV: process.env.NODE_ENV || 'your enviroment',
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb connection string //localhost or AtlasCloud',
    JWT_SECRET: process.env.JWT_SECRET || 'secret'
}