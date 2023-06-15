const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],

    },
    email: {
        type: String,
        required: [true, 'E-mail is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    }
});

userSchema.virtual('rePassword').set(function(value) {
    if (this.password !== value) {
        throw new Error('Password mismatch!');
    }
});


userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});


const User = mongoose.model('User', userSchema);

module.exports = User;