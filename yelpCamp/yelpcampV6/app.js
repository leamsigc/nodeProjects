const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    pug = require('pug'),
    expressSession = require('express-session'),
    path = require('path'),
    bodyParser = require('body-parser'),
    passportLocalMongoose = require('passport-local-mongoose');

const Camp = require('./models/campgrounds'),
    Comments = require('./models/comments'),
    User = require('./models/user'),
    seedDB = require('./seeds');
//routes
/*
const routes = require('./routes/index')
    users = require('./routes/users');
*/
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
//passport Use
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use routes 
app.get('/', (req, res) => {
    res.render('campgrounds/index');
});

app.get('/campground', (req, res) => {
    //get all campgrounds from db 
    Camp.find({}, (err, allCampgrounds) => {
        if (err) {
            throw err;
        }

        res.render('campgrounds/campgrounds', {
            campGroundArr: allCampgrounds
        });
    });
});

app.post('/campground', (req, res) => {
    let formData = {
        name: req.body.name,
        img: req.body.url,
        desc: req.body.desc
    };

    //create new campground
    Camp.create(formData, (err, newCampground) => {
        if (err) {
            throw err;
        }
        res.redirect('/campground');
    });
});

app.get('/campground/new', (req, res) => {
    res.render('campgrounds/form');
});

//show the details for each campground
app.get('/campground/:id', (req, res) => {
    let id = req.params.id;
    //find the campground 
    Camp.findById(id)
        .populate('comments')
        .exec((err, foundCampground) => {
            if (err) {
                console.log(err);
            }
            res.render('campgrounds/show', {
                camp: foundCampground
            });
        });
});

app.get('/campground/:id/comments/new', (req, res) => {
    let id = req.params.id;
    res.render('comments/new', {
        id: id
    });
});

app.post('/campground/:id/comments', (req, res) => {
    let commentData = {
        author: req.body.author,
        text: req.body.text
    };
    let id = req.params.id;

    Camp.findById(id, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect('/campground');
        }

        Comments.create(commentData, (err, createdComment) => {
            if (err) {
                console.log(err);
            }

            foundCampground.comments.push(createdComment);
            foundCampground.save();
            res.redirect('/campground/' + id);
        });
    });
});

app.listen(app.get('port'), () => {
    console.log(`== App listening in port ${app.get('port')}`);
});