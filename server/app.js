//Base Modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


//Route Modules
var index = require('./routes/index.js');

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//app config
app.set('port', (process.env.PORT || 4000));

//Middleware config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//Routes
app.use('/', index);

//listen
app.listen(app.get('port'), function(){
  console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
