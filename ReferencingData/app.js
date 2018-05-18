const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo_2');

let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

// Reference is not store the full post just the post id and the reference it

//Find User and Find all posts for that userSelect
User.findOne({
        email: 'leamsigc@hotmail.com'
    })
    .populate('post')
    .exec((err, user) => {
        if (err) {
            console.log(err);
        }
        console.log(user);
    });


/* 
Post.create({
    title: 'new post created part 2',
    content: 'cook best burger part 2'
}, (err, postCreated) => {
    if (err) {
        return console.log(err);
    }
    User.findOne({
        email: 'leamsigc@hotmail.com'
    }, (err, foundUser) => {
        if (err) {
            return console.log(err);
        }
        //push the new post to the post array
        foundUser.post.push(postCreated);
        //and save the user again 
        foundUser.save((err, saveUser) => {
            if (err) {
                console.log(err);
            }
            console.log(saveUser);
        });
    });
});
*/
/*/ 
User.create({
    email: 'leamsigc@hotmail.com',
    name: 'Ismael Garcia'
});
*/