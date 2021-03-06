const Mongoose = require('mongoose');
const express = require('express'),
  pug = require('pug'),
  bodyParser = require('body-parser'),
  path = require('path'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.use(expressSanitizer());
app.use(methodOverride('_method'));
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
 *REST routes
 */
app.get('/', (req, res) => {
  res.redirect('/blogs');
});
app.get('/blogs', (req, res) => {
  blogPost.find({}, (err, posts) => {
    if (err) {
      return console.log(err);
    }
    res.render('home', {
      blogPost: posts
    });
  });
});
//CREATE NEW POST
app.post('/blogs', (req, res) => {
  console.log(req.body);
  req.body.blog.body = req.sanitize(req.body.blog.body);
  //create blog 
  blogPost.create(req.body.blog, (err, newPost) => {
    if (err) {
      res.render('newPost');
      return console.log(err);
    }
    res.redirect('/blogs');
  });
  // redirect to blogs 
});
//NEW ROUTE
app.get('/blogs/new', (req, res) => {
  res.render('newPost');
});

//show 
app.get('/blogs/:id', (req, res) => {
  let id = req.params.id;

  blogPost.findById(id, (err, post) => {
    if (err) {
      res.redirect('/blogs');
      return false;
    }

    res.render("show", {
      post: post
    });
  });
});
/**
 * EDIT ROUTE 
 */
app.get('/blogs/:id/edit', (req, res) => {
  let id = req.params.id;
  blogPost.findById(id, (err, post) => {
    if (err) {
      res.redirect('/blogs');
      return false;
    }

    res.render("edit", {
      post: post
    });
  });
});

/**
 * UPDATE ROUTE 
 */
app.put('/blogs/:id', (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);

  // res.send('Hello from update method');
  blogPost.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatePost) => {
    if (err) {
      res.redirect('/blogs');
      return console.log(err);
    }
    res.redirect('/blogs/' + req.params.id);
  });
});

/**
 * Delete ROUTE 
 */
app.delete('/blogs/:id', (req, res) => {
  //Destroy the blog
  blogPost.findByIdAndRemove(req.params.id, err => {
    if (err) return console.log(err);
    //redirect home 
    res.redirect('/blogs');
  });
});
app.listen(3000, () => {
  console.log('App Listening in port : 3000');
});