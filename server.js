const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
var port = 3004;

hbs.registerPartials(__dirname + '/Views/Partials');

app.set('view engine','hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(now);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs', {
        message: 'Maintenence'
    });
});

app.use(express.static(__dirname + '/Public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.listen(port, () =>{
    console.log('Server Listening on port: '+ port);
});
app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome! Your signup was successful'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        message: '404-Page not found!'
    });
});