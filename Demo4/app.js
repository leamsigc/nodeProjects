const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//static files 
app.use(express.static('public'));
//view engine
app.set('view engine','ejs');

//home 
app.get('/',(req, res) => {
    res.render('home');
});

//friends arr
const friendsList = ['ismael', 'gabriel', 'Miguel', 'Alejandro'];
//friends
app.get('/friends', (req,res) => {
    res.render('friends',{friends: friendsList});
});

//post a friend
app.post('/add',(req,res) => {
    console.log(req.body);
    const newFriend = req.body.name;
    friendsList.push(newFriend);
    res.redirect('/friends');
});
//app port listening
app.listen(8080,() => console.log('app listening at por : 8080'));