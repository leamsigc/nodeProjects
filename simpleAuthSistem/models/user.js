const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

// mongoose.connect('mongodb://localhost/loginapp');

// let bd = mongoose.connection;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: String,
    email: String,
    name: String
});

let User = mongoose.model('User', userSchema);


module.exports = User;

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
module.exports.getUserByUsername = (username, callback) => {
    let query = {
        username: username
    };

    User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    });
};

module.exports.getUserById = (userId, callback) => {
    User.findById(userId, callback);
};