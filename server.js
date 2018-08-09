const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

// Middleware declarations
app.use(express.static(__dirname+'/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url} \n`;
    fs.appendFile('server.log',log, (err) => {
        if(err){
            console.log('Unable to write to server.log');
        }
    })
    console.log(`${log}`);
    next();
})

// app.use((req, res, next) => {
//     res.render('maintainance.hbs',{
//         pageTitle: 'Maintainance in Progress'
//     })
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});