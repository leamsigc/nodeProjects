const mongoose = require('mongoose');
mongoose.connect('mongodb:localhost/blog_demo_2');

const Post = require('./models/post');
const User = require('./models/user');