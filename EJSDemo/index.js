const express = require('express');
const app = express();


//route root
app.get('/',(req,res) => {
    res.render('home.ejs');
});

//fall in love 
app.get('/fall/:things',(req,res) => {
    let thing = req.params.things;
    res.render('love.ejs',{personName: thing});//ejs get the variables true a object 
});
const port = 3000;
app.listen(port, () => console.log(`app listening in port ${port}`));



