module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://lucasMR:Xpz1i9Kd8Z9hffoz@graphql.szcud.mongodb.net/graphql?authSource=admin&replicaSet=atlas-s9uqry-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true',
    JWT_SECRET: process.env.JWT_SECRET || 'super_secret_token'
}