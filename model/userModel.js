const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: { type: String, require }
})

module.exports = model('User', UserSchema)
