const bcrypt = require('bcryptjs');
const {User} = require('../DB/Models/users');

exports.authenticate = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Get user by username
            const user = await User.findOne({ username });
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                //if(err) throw err;
                if (isMatch) {
                    resolve(user);
                }
                else {
                    reject('Authentication Failed');
                }
            });
        }
        catch (err) {
            reject('Authentication Failed '+err);
        }
    });
}
