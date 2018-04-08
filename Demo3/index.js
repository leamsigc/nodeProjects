const express = require('express');
const app = express();


// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))

//home route 
app.get('/', (req,res) => {
    res.render('home.ejs');
});

//fall in love route
app.get('/love/:name',(req,res) => {
    let name = req.params.name;
    
    res.render('love.ejs',{name:name});
})

//get posts
app.get('/posts', (req,res) => {
    const posts = [
        {
            title:'Welcome to the jungle!',
            author: 'ismael Garcia '
        },
        {
            title:'Un dia mas un dia menos siempre es lo mismo.',
            author: 'Jose Garcia '
        },
        {
            title:'New toys are always fun!',
            author: 'Rafael Garcia '
        },
        {
            title:'All i want is eat and eat and eat!',
            author: 'Elias Garcia '
        }
    ];

    res.render('articles.ejs',{ articles:posts});
})
//app listen port
app.listen(8080,() => console.log('app listen on port 8080'));