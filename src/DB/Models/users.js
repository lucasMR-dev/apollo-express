const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    access_type: {
        type: String,
        default: 'user'
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(User);

module.exports = UserTC;
