const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');

//  USER
// let userSchema = new mongoose.Schema({
//   email: String,
//   name: String
// });


let postSchema = new mongoose.Schema({
  title: String,
  content: String
});


let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  post: [postSchema]
});

let User = mongoose.model('User', userSchema);

let Post = mongoose.model('Post', postSchema);
/*
let newUser = new User({
  email: 'Ismael@email.com',
  name: 'alexis garcia'
});

newUser.post.push({
  title: 'new post for the new user',
  content: 'New post content ....'
});


newUser.save((err, newUserCreated) => {
  if (err) {
    return console.log(err);
  }

  console.log(newUserCreated);
});
*/

// let newUser = new User({
//   email:'leamsigc@hotmail.com',
//   name: 'Ismael Garcia'
// });
/* 
User.findOne({name: 'alexis garcia'},(err, userFind) => {
  if (err) {
    return  console.log(err);
  }
  userFind.post.push({
    title:'Another post title',
    content: 'Another post content here ....'
  });
  userFind.save((err,saveUser) => {
    if (err) {
      console.log(err);
    }

    console.log(saveUser);
  });
  console.log(userFind);
});
*/
/***
newUser.save((err, newUserCreated ) => {
  if (err) {
    return console.log(err);
  }

  console.log(newUserCreated);
});
**/
// let newPost = new Post({
//   title: 'Your city your live',
//   content: 'Whenever you find your city you would love it '
// });


// newPost.save((err , newPostCreated) => {
//   if(err) return console.log(err);
//   console.log(newPostCreated);
// });