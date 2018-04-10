const express = require('express');
const axios = require('axios');

const app = express();

const keys = '3b393663';//i=tt3896198&
const OMBDbApi = 'http://www.omdbapi.com/?apikey=3b393663&s=';

app.use(express.static('public'));
app.set('view engine','pug');

app.get('/',(req, res) => {
  res.render('home');
});
//search
app.get('/search', (req,res) => {
  let newUrl = OMBDbApi+req.query.search;
  axios.get(newUrl).then(data => {{
    // console.log(data.data.Search);
    res.render('search',{ data:data.data.Search});
  }});

});
app.listen(8080, () => console.log('App listen in port 8080'));
