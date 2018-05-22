const express = require('express'),
    pug = require('pug'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    Camp = require('./models/campgrounds'),
    Comments = require('./models/comments'),
    seedDB = require('./seeds');

const app = express();

//seedDB();

mongoose.connect('mongodb://localhost/yelp_camp_2');

app
    .set('view engine', 'pug')
    .use(
        bodyParser.urlencoded({
            extended: true
        })
    )
    .use(bodyParser.json())
    .use(express.static(__dirname + '/public'));

let port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('campgrounds/home');
});

app.get('/campground', (req, res) => {
    //get all the campgrounds from DB
    Camp.find({}, (err, allCampgrounds) => {
        if (err) {
            return console.log(err);
        }
        res.render('campgrounds/campground', {
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

    Camp.create(formData, (err, newCampCreated) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/campground');
    });
});

app.get('/campground/new', (req, res) => {
    res.render('campgrounds/form');
});

app.get('/campground/:id', (req, res) => {
    let id = req.params.id;

    Camp.findById(id)
        .populate('comments')
        .exec((err, foundCamp) => {
            if (err) {
                console.log(err);
            }
            console.log(foundCamp);
            res.render('campgrounds/show', {
                camp: foundCamp
            });
        });
});

app.get('/campground/:id/comments/new', (req, res) => {
    let id = req.params.id;
    console.log(id);

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

app.listen(port, () => console.log(`-App listen in port: ${port}`));