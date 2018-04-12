const express = require('express'),
    pug = require('pug'),
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
//home
app.get('/', (req, res) => {
    res.render('home');
});
//camp ground 
app.get('/campground', (req, res) => {
    const campGroundArr = [{
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
    res.render('campground',{ campGroundArr : campGroundArr});
});
app.post('/campground',(req,res) => {
    //get form data
    //redirect to 
    res.redirect('/campground');
});
//listen port 
app.listen(8080, () => console.log('App listening in port:3000'));