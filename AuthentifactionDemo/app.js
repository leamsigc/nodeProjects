const express = require('express'),
    pug = require('pug'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportLocalMongoose = require('passport-local-mongoose'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser');
const User = require('./models/users');

mongoose.connect('mongodb://localhost/authenticationDemo');

app = express();

app.set('view engine', 'pug');

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(express.static(__dirname+ '/public'))
    .use(expressSession({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ===============
//ROUTES
// ===============
app.get('/', (req, res) => {
    res.render('home');
});


app.get('/secret', (req, res) => {
    res.render('secret');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    let userData = {
        userName: req.body.username,
        password: req.body.password
    };
    console.log(userData);
    User.register(new User({username:userData.userName}),userData.password,(err, createdUser)=>{
        if(err){
            console.log(err);
            return res.render('register');
        }
        console.log(createdUser);
        passport.authenticate('local')(req,res,() => {
          res.redirect('/secret');  
        });
    });
});
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});