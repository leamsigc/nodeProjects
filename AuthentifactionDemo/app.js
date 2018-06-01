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
// app.post('/register', (req, res) => {
// let userData = req.body;
// });
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});