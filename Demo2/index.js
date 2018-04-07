const express = require('express'),
      app = express();


//post 
    const post = [
        {
            title:"this is the fist post ",
            author:'ismael'
        },
        {
            title:"second post here  2",
            author:'susy'
        },
        {
            title:"im the awesome post  3",
            author:'Colt'
        }
    ];
//get root 
app.get('/',(req, res ) => {
    res.render('home.ejs',);
});
//get post 
app.get('/posts',(req,res) => {
    res.render('post.ejs',{posts:post});
});
//app listen 
app.listen(3000 ,() => console.log('port listening in port 3000'));