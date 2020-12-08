const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userModel = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    is_active: Boolean
})
module.exports = mongoose.model('users', userModel);