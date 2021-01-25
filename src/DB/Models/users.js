const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer, toInputObjectType } = require('graphql-compose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');

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
  
const InputTC = schemaComposer.createObjectTC({
    name: 'UserLogin',
    fields: {
        username: 'String!',
        password: 'String!'
    }
});

const InputITC = toInputObjectType(InputTC);

UserTC.addResolver({
    kind: 'mutation',
    name: 'Auth',
    type: UserTC,
    args: {
        input: InputITC
    },
    resolve: async ({args}) => {
        const username = args.input.username;
        const password = args.input.password;
        //Get user by username
        const user = await User.findOne({username});
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const active = user.isActive;
                if (active){
                    // JWT Token
                    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                        expiresIn: '1h',
                        subject: user.id
                    });
                    const { iat, exp, sub } = jwt.decode(token);
                    console.log({iat, exp, sub, token});
                }
            }
            else {
                console.log('Authentication Failed');
            }
        });
    }    
});

module.exports = UserTC;
