const mongoose = require('mongoose');

const sponsorsSchema = new mongoose.Schema({
    images: { data: Buffer, contentType: String }
});


module.exports = mongoose.model('Sponsors', sponsorsSchema);