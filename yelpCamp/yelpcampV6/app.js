const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    pug = require('pug'),
    expressSession = require('express-session'),
    path = require('path'),
    bodyParser = require('body-parser');

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
    .use(express.static(__dirname + '/public'));

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


app.listen(app.get('port'), () => {
    console.log(`== App listening in port ${app.get('port')}`);
});