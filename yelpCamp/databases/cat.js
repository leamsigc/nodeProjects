
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cat_app');

let Schema = mongoose.Schema;

let catSchema= new Schema({
    name: String,
    age:Number,
    temperament:String
});


let Cat = mongoose.model('Cat',catSchema);
/*
//add a new cat 
const rey = new Cat({
    name:"Ronaldo",
    age:6,
    temperament: "Not Awesome cat."

});

rey.save((err,cat) => {
    if(err){
        console.log('Something went wrong!');
    }
    console.log('Save successfully');
    console.log(cat);
});//save accept a call back 
*/

/////////////// NEW AND SAVE  ///////////////////
Cat.create({
    name:'Mashu',
    age:2,
    temperament:'Strange cat..'
},(err,cat) => {
    if(err) {
        console.log(err);
    }

    console.log(cat);
});
//get all cat from the DB

Cat.find({},(err,cat) => {
    if(err){
        console.log('Something went wrong');
    }
    console.log('All CAT AT THE DB :');
    console.log(cat);

});