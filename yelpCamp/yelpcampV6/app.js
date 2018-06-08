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
const indexRoutes = require('./routes/index'),
    //users = require('./routes/users'),
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
    .use(campgrounds)
    .use(comments);
// app.get('/', (req, res) => {
//     res.render('campgrounds/index');
// });
/*
app.get('/campground', (req, res) => {
    console.log(req.use);
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
*/
/*
app.get('/campground/:id/comments/new', isLoggedIn, (req, res) => {
    let id = req.params.id;
    res.render('comments/new', {
        id: id
    });
});

app.post('/campground/:id/comments', isLoggedIn, (req, res) => {
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
*/
/*
// AUTH ROUTES
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    let newUser = new User({
        username: req.body.username
    });

    User.register(newUser, req.body.password, (err, createdUser) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }

        //console.log(createdUser);
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campground');
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campground',
    failureRedirect: '/login'
}), (req, res) => {});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

*/
// //login check authentication 
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// }

app.listen(3000, () => {
    console.log(`== App listening in port ${3000}`);
});