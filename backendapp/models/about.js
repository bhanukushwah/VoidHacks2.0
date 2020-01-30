const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    about_content: { type: String, required: true},
    video_link: { type: String, required: true},
});


module.exports = mongoose.model('About', aboutSchema);