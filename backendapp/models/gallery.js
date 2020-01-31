const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    images: { data: Buffer, contentType: String }
});


module.exports = mongoose.model('Gallery', gallerySchema);