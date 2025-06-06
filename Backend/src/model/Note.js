const mongoose = require('mongoose');

// Define the Schema for Notes

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content :{
        type: String,
        required: true,
    }
    // createdAt: {
    //     type: Date,
    // }

}, {timestamps: true});

// Create a model for the Notes using above schema

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;