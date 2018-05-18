const mongoose = require('mongoose');

//Post-title-content
let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;