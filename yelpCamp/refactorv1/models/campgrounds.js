const mongoose = require('mongoose');

let campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String
});

let Camp = mongoose.model('Campground', campgroundSchema);

module.exports = Camp;