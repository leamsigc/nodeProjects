const express = require('express'),
    pug = require('pug'),
    app = express();

/**
 * Camp Ground Arr
 * todo: set data base
 */
//view engine
app.set('view engine', 'pug');

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
//listen port 
app.listen(3000, () => console.log('App listening in port:3000'));