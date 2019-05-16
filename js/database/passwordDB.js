const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordSchema = new Schema({
    user: {
        type: String,
        required: [true, "Username should be specified!"]
    },
    password: {
        type: String,
        required: [true, "Password should be specified!"]
    }
})

const PasswordDB = mongoose.model('password', PasswordSchema);

module.exports = PasswordDB;