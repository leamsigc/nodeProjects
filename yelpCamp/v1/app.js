const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser');

/**
 * Camp Ground Arr
 * todo: set data base
 */
//view engine
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
//home
app.get('/', (req, res) => {
    res.render('home');
});
//camp ground 
const campGroundArr = [
    {
        name: 'salmon creak',
        image: 'https://source.unsplash.com/VowIFDxogG4'
    },
    {
        name: 'Mountain view',
        image: 'https://source.unsplash.com/lpjb_UMOyx8'
    },
    {
        name: 'San juan view',
        image: 'https://source.unsplash.com/wdX9VkE_CnM'
    },
    {
        name: 'salmon creak',
        image: 'https://source.unsplash.com/VowIFDxogG4'
    },
    {
        name: 'Mountain view',
        image: 'https://source.unsplash.com/lpjb_UMOyx8'
    },
    {
        name: 'San juan view',
        image: 'https://source.unsplash.com/wdX9VkE_CnM'
    }
];
app.get('/campground', (req, res) => {
    res.render('campground',{ campGroundArr : campGroundArr});
});
app.post('/campground',(req,res) => {
    //get form data
    let formData= {
        name: req.body.name,
        image:req.body.url
    };
    campGroundArr.push(formData);
    // console.log(formData);
    //redirect to 
    res.redirect('/campground');
});

//form for the new campground
app.get('/campground/new',(req,res)=>{
    res.render('form');
});
//listen port 
app.listen(8080, () => console.log('App listening in port:3000'));