const express = require('express'),
    pug = require('pug'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    Camp = require('./models/campgrounds');

const app = express();
//////////////////////////////////////////////
mongoose.connect('mongodb://localhost/yelp_camp_2');
//////////////////////////////////////////////

app.set('view engine', 'pug')
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(express.static(__dirname + '/public'));

let port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campground', (req, res) => {
    //get all the campgrounds from DB
    Camp.find({}, (err, allCampgrounds) => {
        if (err) {
            return console.log(err);
        }
        res.render('campground', {
            campGroundArr: allCampgrounds
        });
    });
});

app.post('/campground', (req, res) => {
    let formData = {
        name: req.body.name,
        img: req.body.img,
        desc: req.body.desc
    };

    Camp.create(formData, (err, newCampCreated) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/campgrounds');
    });
});

app.get('/campground/new', (req, res) => {
    res.render('form');
});


app.listen(port, () => console.log(`-App listen in port: ${port}`));