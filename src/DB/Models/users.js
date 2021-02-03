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

const RegisterTC = schemaComposer.createObjectTC({
    name: 'UserRegister',
    fields:{
        username: 'String!',
        password: "String!",
        email: "String!",
        access_type: "String",
        isActive: "Boolean"
    }
});

const RegisterITC = toInputObjectType(RegisterTC);
  
const LoginTC = schemaComposer.createObjectTC({
    name: 'UserLogin',
    fields: {
        username: 'String!',
        password: 'String!',
        email: 'String',
        iat: 'String',
        exp: 'String',
        sub: 'String',
        token: 'String'
    }
});

const LoginITC = toInputObjectType(LoginTC);


UserTC.addResolver({
    kind: 'mutation',
    name: 'register',
    type: UserTC,
    args: {
        input: RegisterITC
    },
    resolve: async ({args}) => {
        return new Promise( async (resolve, reject) => {
            const { username, password, email, access_type, isActive } = args.input;
            const user = new User({
                username,
                password,
                email,
                access_type,
                isActive
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    user.password = hash;
                    const newUser = await user.save();
                    if(!newUser) reject(err.message)
                    resolve(newUser)
                });
            });
        });
    }
});

UserTC.addResolver({
    kind: 'mutation',
    name: 'Auth',
    type: LoginTC,
    args: {
        input: LoginITC
    },
    resolve: async ({args}) => {
        return new Promise( async (resolve, reject) => {
            const { username, password } = args.input;
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
                        const data = { iat, exp, sub, token };
                        resolve({
                            // Auth Response
                            email: user.email,
                            iat: data.iat,
                            exp: data.exp,
                            sub: data.sub,
                            token: data.token
                        });
                    }
                }
                else {
                    reject('Authentication Failed');
                }
            });
        });
    }    
});

module.exports = UserTC;
