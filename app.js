
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , requirejs = require('requirejs')
  , colors = require('colors')
  , mongoose = require('mongoose')
  , mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/DiveCP'
  , db = mongoose.createConnection(mongoUri)
  , schemas = require('./db/schemas');

//routes
var index = require('./routes/index')
  , departments = require('./routes/departments')
  , actionpoints = require('./routes/actionpoints')
  , latestreviews = require('./routes/latestreviews')
  , leaguetable = require('./routes/leaguetable')
  , competitors = require('./routes/competitors')

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

    pragmasOnSave: {
      excludeJade: true
    },

    waitSeconds : 15,

    paths: {
      jquery: 'libs/jquery',
      underscore: 'libs/underscore',
      backbone: 'libs/backbone',
      jade: 'libs/jade',
      async: 'libs/async',
      bootstrap: 'libs/bootstrap',
      app_dir: 'app',
      views_dir: 'app/views'
    },
    
    shim: {
      //Add a shim to get a non-AMD script to work
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      bootstrap: {
        deps: ["jquery"],
        exports: "Bootstrap"
      },
      'libs/unicorn': {
        deps: ["jquery", "bootstrap"],
        exports: "Unicorn"
      },
      'libs/jquery.flot.pie': ["jquery", "libs/excanvas", "libs/jquery.flot", "libs/jquery.flot.resize"],
      'libs/jquery.flot.resize': ["jquery", "libs/excanvas", "libs/jquery.flot"],
    }
  }, function() {
    console.log('Successfully optimized javascript');
  });

  // Use minified static files
  app.use(express.static(__dirname + '/public_build'));
});

//Set up database

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  schemas.establish(db, function(models) {
    //Lets make Models global
    Models = models
    console.log("Database connection successful and setup".green)
    //Start server only after database setup
    http.createServer(app).listen(app.get('port'), function(){
      console.log(("Express server listening on port " + app.get('port')).green);
    });  
  })
});


//Route index
app.get('/', index.index);
//Route Depar
app.get('/departments', departments.index)
app.get('/actionpoints', actionpoints.index)
app.get('/leaguetable', leaguetable.index)
app.get('/leaguetable/trend', leaguetable.trend)
app.get('/latestreviews', latestreviews.index)
app.get('/competitors', competitors.index)
app.get('/competitors/:id', competitors.show)


