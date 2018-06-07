const mongoose = require('mongoose'),
    Camp = require('./models/campgrounds'),
    Comment = require('./models/comments');

const data = [{
        name: 'San juan quiahije',
        img: 'https://source.unsplash.com/gtanOtRUSlc',
        desc: 'In early May, one of Hawaii active volcanoes - which helped create the islands - erupted. Volcanic gases have been erupting from fissures ever since, producing dramatic photographs and video.'
    },
    {
        name: 'San juan Bautista',
        img: 'https://source.unsplash.com/W4qWlYbYqI4',
        desc: 'In early May, one of Hawaii active volcanoes - which helped create the islands - erupted. Volcanic gases have been erupting from fissures ever since, producing dramatic photographs and video.'
    },
    {
        name: 'San juan somewhere',
        img: 'https://source.unsplash.com/q_bMaKKpH6k',
        desc: 'In early May, one of Hawaii active volcanoes - which helped create the islands - erupted. Volcanic gases have been erupting from fissures ever since, producing dramatic photographs and video.'
    }
];

function seedDB() {
    //Remove all the campgrounds
    Camp.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Removed all campgrounds');
        //Remove all comments 
        Comment.remove({}, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Remove all Comments from the campground ...');

            //Add a few campgrounds
            data.forEach(ground => {
                Camp.create(ground, (err, createdCampground) => {
                    if (err) {
                        console.log(err);
                    }

                    console.log('Created a camp ground ....');
                    //Create a comment 
                    Comment.create({
                        text: 'This is an amazing place to stay',
                        author: 'Ismael Garcia'
                    }, (err, commentCreated) => {
                        if (err) {
                            console.log(err);
                        }
                        createdCampground.comments.push(commentCreated);
                        createdCampground.save();
                        console.log('Created a new comment ... ');
                    });
                });
            });
        });
    });

}

module.exports = seedDB;