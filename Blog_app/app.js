const Mongoose = require('mongoose');

const express = require('express'),
  pug = require('pug'),
  bodyParser = require('body-parser'),
  path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
///////MongoDB///////////
Mongoose.connect('mongodb://localhost/blog');
//set up Schema
const blogSchema = new Mongoose.Schema({
  name: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});

let blogPost = Mongoose.model('Blog', blogSchema);

/**
 *RESTful routes
 */
app.get('/', (req, res) => {
  res.redirect('/blogs');
});
app.get('/blogs', (req, res) => {
  blogPost.find({}, (err, posts) => {
    if (err) {
      return console.log(err);
    }
    res.render('home', { blogPost: posts });
  });
});
//NEW ROUTE
app.get('/blogs/new', (req, res) => {
  res.render('newPost');
});
//CREATE NEW POST
app.listen(3000, () => {
  console.log('App Listening in port : 3000');
});
