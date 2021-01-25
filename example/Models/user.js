const mongoose = require('mongoose');
const timestamps =  require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true,
        },
    },
    {
        collection: 'users',
    }
);

UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1});

const User = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(User);

module.exports = UserTC;