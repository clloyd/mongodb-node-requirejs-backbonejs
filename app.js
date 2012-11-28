
/**
 * Module dependencies.
 */

var express = require('express')
  , index = require('./routes/index')
  , departments = require('./routes/departments')
  , http = require('http')
  , path = require('path')
  , requirejs = require('requirejs')
  , colors = require('colors')
  , mongoose = require('mongoose')
  , mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/DiveCP'
  , db = mongoose.createConnection(mongoUri);


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(require('less-middleware')({ src: __dirname + '/public', debug: true, force: true, once: false}));
  console.log("Detected running in development mode, skipping assets pre-compile".yellow)
  app.use(express.static(__dirname + '/public'));
});

app.configure('production', function(){
  app.use(require('less-middleware')({ src: __dirname + '/public', compress: true, once: true}));

  requirejs.optimize({
    appDir: "public/",
    baseUrl: "js",
    dir: "public_build",

    modules: [
      {
        name: "main"
      }
    ],

    paths: {
      jquery: 'libs/jquery',
      underscore: 'libs/underscore',
      backbone: 'libs/backbone',
      jade: 'libs/jade',
      app_dir: 'app',
      views_dir: 'app/views'
    }, 

    pragmasOnSave: {
      excludeJade: true
    },

    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      }
    } 
  }, function() {
    console.log('Successfully optimized javascript');
  });

  // Use minified static files
  app.use(express.static(__dirname + '/public_build'));
});

//Store my models in an object
Models = {}
Schemas = {}

//Set up database

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  //Set Up Schemas
  Schemas.department = new mongoose.Schema({
    name: String,
    numberofcomplaints: String
  })

  Models.departments = db.model('Departments', Schemas.department)

  console.log("Database connection successful and setup".green)
  //Start server only after database setup
  http.createServer(app).listen(app.get('port'), function(){
    console.log(("Express server listening on port " + app.get('port')).green);
  });
});


//Route index
app.get('/', index.index);
//Route Depar
app.get('/departments', departments.index)
app.get('/departments/:name', departments.show)


