const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    pug = require('pug'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    mongo = require('mongodb'),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
const bd = mongoose.connection;

const routes = require('./routes/index'),
    users = require('./routes/users');

const app = express();

app
    .set('port', (process.env.PORT || 3000))
    .set('view engine', 'pug')
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(cookieParser())
    .use(express.static(__dirname + '/public'))
    .use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(expressValidator({
        errorFormatter: function (param, msg, value) {
            let namespace = param.split(','),
                root = namespace.shift(),
                formParam = root;
            while (namespace.length) {
                formParam += `[${namespace.shift()}]`;
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }))
    .use(flash())
    .use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg'),
            res.locals.error_msg = req.flash('error_msg'),
            res.locals.error = req.flash('error');

        next();
    })
    .use('/', routes)
    .use('/users', users);

app.listen(app.get('port'), () => {
    console.log(`Server star listening on port : ${app.get('port')}`);
});