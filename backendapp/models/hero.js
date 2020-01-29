const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
    logo: { type: String, required: true},
    date: { type: String, required: true},
    venue: { type: String, required: true},
});


module.exports = mongoose.model('Hero', heroSchema);