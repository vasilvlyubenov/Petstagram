const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pet name is required!'],
        minLength: 2,
    },
    age: {
        type: Number,
        required: [true, 'Pet age is required!'],
        min: 1,
        max: 100
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: 5,
        maxLength: 50,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: 5,
        maxLength: 50,
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:[\/]{2}/, 'Image must start with http:// or https:// !']
    },
    commentList: [{
        userID: {
            type: mongoose.Types.ObjectId,
        },
        comment: {
            type: String,
        }
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;