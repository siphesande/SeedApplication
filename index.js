'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),//node-mysql module
    myConnection = require('express-myconnection'),//express-my connection module
    bodyParser = require('body-parser'),
    computerLanguages = require('./routes/computerLanguages'),
    categories = require('./routes/categories'),
    schools = require('./routes/schools'),
    enrollments =  require('./routes/enrollments')
    bcryt = require('bcryt');
var app = express();
//connection my server to the Mysql database

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '08386354',
      port: 3306,
      database: 'online_schools'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers
app.get("/",computerLanguages.home);
app.get('/',function(req,res){res.render('index');});
app.get('/computerLanguages', computerLanguages.show);
app.get('/computerLanguages/edit/:Id', computerLanguages.get);
app.post('/computerLanguages/update/:Id', computerLanguages.update);
app.get('/computerLanguages/add', computerLanguages.showAdd);
app.post('/computerLanguages/add', computerLanguages.add);
app.get('/computerLanguages/mostPopulerLang', computerLanguages.mostPopulerLang);
app.get('/computerLanguages/leastPopulerLang', computerLanguages.leastPopulerLang);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/computerLanguages/delete/:Id', computerLanguages.delete);

// to show catergories to the browser
app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/edit/:Id', categories.get);
app.post('/categories/update/:Id',categories.update);
app.get('/categories/mostPopulerCat', categories.mostPopulerCat);
app.get('/categories/leastPopulerCat', categories.leastPopulerCat);
app.get('/categories/delete/:Id', categories.delete);


//connection to enrollments
app.get('/enrollments', enrollments.show);
app.post('/enrollments/add',enrollments.add);
app.get('/enrollments/edit/:Id', enrollments.get);
app.post('/enrollments/update/:Id', enrollments.update);
//app.get('/enrollments/updete/:Id')
app.get('/enrollments/delete/:Id', enrollments.delete);


app.get('/schools', schools.show);
app.post('/schools/add',schools.add);
app.get('/schools/edit/:Id', schools.get);
app.post('/schools/update/:Id', schools.update);
app.get('/schools/delete/:Id', schools.delete);


app.use(errorHandler);
//configure the port number using and environment number
//The app starts a server and listens on port 3000 for connections
var portNumber = process.env.CRUD_PORT_NR || 3002;

//start everything up
app.listen(portNumber, function (){
console.log('Create, Read, Update, and Delete (CRUD) online_schools app server listening on:', portNumber);
});
