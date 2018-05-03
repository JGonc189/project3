const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 3001;

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(process.env.MONGODB_URI || keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(process.argv.includes("delayresponse")) {
        setTimeout(function(){
            next();
        }, 2000);
    } else {
        next();
    }
});

app.get('/tickets/urgent', function (req, res) {
    res.json({
        min: 0,
        max: 24,
        value: Math.floor(Math.random() * 5)
    })
});

app.get('/tickets/progression', function (req, res) {
    let labels = ["Opened Work Orders", "Closed Work Orders"];
    let colors = ["#e74c3c", "#27ae60"];
    let values = [];

    labels.forEach((label, index) => {
        let data = [];
        for(let i = 0; i < 7; i++) {
            data.push(Math.floor(Math.random() * 10) + i);
        }

        values.push({
            label,
            data,
            color: colors[index]
        });
    });

    res.json(values);
});

app.get('/tickets/*', function (req, res) {
    res.json({
        value: Math.floor(Math.random() * 10) + 1
    })
});

app.get('/stats/top', function (req, res) {
    res.json([
        {
            label: "John Uszal",
            value: Math.floor(Math.random() * 5) + 26
        },
        {
            label: "Mike Jimenez",
            value: Math.floor(Math.random() * 5) + 13
        },
        {
            label: "Jonathan Mitchel",
            value: Math.floor(Math.random() * 5) + 18
        },
        {
            label: "Yeves Buteleu",
            value: Math.floor(Math.random() * 5) + 19
        },
        {
            label: "Norman Smith",
            value: Math.floor(Math.random() * 5) + 4
        },
        {
            label: "Ariel Santiago",
            value: Math.floor(Math.random() * 5) + 12
        },
        {
            label: "Robert Aldridge",
            value: Math.floor(Math.random() * 5) + 18
        },
        {
            label: "Romney DaSilva",
            value: Math.floor(Math.random() * 5) + 7
        }
    ]);    
});

app.get('/stats/solved', function (req, res) {
    res.json({
        min: 0,
        max: 100,
        value: Math.floor(Math.random() * 25) + 50
    });
});

app.listen(PORT, function () {
    console.log('Data being served from: ' + PORT);
});