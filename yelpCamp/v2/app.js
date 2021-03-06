const express = require('express'),
    pug = require('pug'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');

const app = express();

/****************************
 * CREATE  A DB 
 ***************************/
mongoose.connect('mongodb://localhost/yelp_camp');
/****************************
 * SET UP DB SCHEMA
 ***************************/
let campGroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String
});
let Camp = mongoose.model('Campground', campGroundSchema);

// Camp.create({
//         name: 'San juan view',
//         img: 'https://source.unsplash.com/wdX9VkE_CnM',
//         desc:'Does everybody know that pig named Lorem Ipsum? Shes a disgusting pig, right? Lorem Ipsum is unattractive, both inside and out. I fully understand why it’s former users left it for something else.'
//     },
//     (err, camp) => {
//         if (err) {
//             console.log('Something really bad.');
//         }
//         console.log('Save Campground successfully ');
//         console.log(camp);
//     }
// );
/****************************
 * SET VIEW ENGINE 
 ***************************/
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
/****************************
 * SET STATIC PUBLIC FOLDER 
 ***************************/
app.use(express.static(__dirname + "/public"));

/****************************
 * Home Route
 ***************************/
app.get('/', (req, res) => {
    res.render('home');
});
/****************************
 * campground Route
 ***************************/
app.get('/campground', (req, res) => {
    //Get all the campground from the db 
    Camp.find({}, (err, campgrounds) => {
        if (err) {
            return console.log(err);
        }
        res.render('campground', {
            campGroundArr: campgrounds
        });
    });
    // res.render('campground');
});
app.post('/campground', (req, res) => {
    //get form data
    let formData = {
        name: req.body.name,
        img: req.body.url,
        desc: req.body.desc
    };

    Camp.create(formData,(err, camp)=> {
        if(err) return console.log(err);

        res.redirect('/campground');
    });
    // res.redirect('/campground');
});
/***************************
 * Add New campground 
 ****************************/
app.get('/campground/new', (req, res) => {
    res.render('form');
});
/***************************
 * SHOW route  
 ****************************/
app.get('/campground/:id',(req,res) => {
    let id = req.params.id;
    // console.log(id);
    Camp.findById(id,(err, campDetails)=>{
        if(err){
            return console.log(err);
        }
        console.log(campDetails);
        res.render('show',{camp: campDetails});
    });
    //find the campground with ID 
    // Camp.find();
});
app.listen(3000, () => {
    console.log('APP listen at PORT 3000');
});