let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

const tweets =[
    {text:'Hai from the other side', time: new Date().getTime()-12300},
    {text:'This is cool', time: new Date().getTime()-32400},
    {text:'What s up', time: new Date().getTime()-55500}
]

app.use(express.static(__dirname + '/public'));

app.get('/ajax', function(request, response){
    response.type('json');
    response.end(JSON.stringify({tweets:tweets}));
});


app.post('/ajax', function (request, response){
    console.log(request.body);
    let newTweet = {text:request.body.tweet,time:new Date().getTime()};
    tweets.push(newTweet);
    console.log(newTweet);
    response.type('json');
    response.end(JSON.stringify(newTweet));
});
let server = app.listen(8080, function () {
    console.log('Listening in port 8080');
}); 