const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');

//  USER
// let userSchema = new mongoose.Schema({
//   email: String,
//   name: String
// });


let postSchema = new mongoose.Schema({
  title:String,
  content: String
});


let userSchema = new mongoose.Schema({
  email:String,
  name:String,
  post:[postSchema]
});

let User = mongoose.model('User', userSchema);

let Post =  mongoose.model('Post', postSchema);


let newUser = new User({
  email:'leamsigc@hotmail.com',
  name: 'Ismael Garcia'
});

/***
newUser.save((err, newUserCreated ) => {
  if (err) {
    return console.log(err);
  }

  console.log(newUserCreated);
});
**/
let newPost = new Post({
  title: 'Your city your live',
  content: 'Whenever you find your city you would love it '
});


newPost.save((err , newPostCreated) => {
  if(err) return console.log(err);

  console.log(newPostCreated);
});
