const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    pug = require('pug'),
    expressSession = require('express-session'),
    path = require('path'),
    bodyParser = require('body-parser'),
    passportLocalMongoose = require('passport-local-mongoose'),
    methodOverRide = require('method-override');

const Camp = require('./models/campgrounds'),
    Comments = require('./models/comments'),
    User = require('./models/user'),
    seedDB = require('./seeds');
//routes
const indexRoutes = require('./routes/index'),
    campgrounds = require('./routes/campgrounds'),
    comments = require('./routes/comments');

//database 
mongoose.connect('mongodb://localhost/yelp_camp_v6');

//seed the Db
// seedDB();

//app set
app
    .set('view engine', 'pug')
    .set('port', (process.env.PORT || 3000));
//app use 
app
    .use(methodOverRide('_method'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(express.static(__dirname + '/public'))
    .use(expressSession({
        secret: 'sanjuanquiahije',
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
//passport Use
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use routes 
app
    .use(indexRoutes)
    .use("/campground", campgrounds)
    .use('/campground/:id/comments', comments);

app.listen(3000, () => {
    console.log(`== App listening in port ${3000}`);
});