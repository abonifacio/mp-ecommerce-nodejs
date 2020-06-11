var payment = require('./payment');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser'); 

const notifications = [];

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/success', function (req, res) {
    console.log('success', req.query);
    res.render('success', req.query);
});

app.get('/pending', function (req, res) {
    console.log('pending', req.query);
    res.render('pending', req.query);
});

app.get('/failure', function (req, res) {
    console.log('failure', req.query);
    res.render('failure', req.query);
});

app.get('/notifications', function(req,res){
    res.send(notifications);
});

app.post('/notifications', function(req,res){
    notifications.push(req.body);
    res.send();
});

app.post('/pay', function (req, res) {
    payment.make({
        image: req.body.image,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        title: req.body.title,
        host: req.get('host'),
    }).then((response) => {
        res.redirect(response.body.init_point);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(process.env.PORT || 3000);