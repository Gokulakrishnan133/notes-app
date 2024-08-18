const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'This title already exists'],
        lowercase: true,
        required: [true, "Please provide a title"]    
    },
    body: {
        type: String,
        required: [true, "Please provide a body"],
        minlength: [10, "Length should be minimum 10 characters"]
    }
},
{
    timestamps: true
});

const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;