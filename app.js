
/**
 * Module dependencies.
 */

var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path')
  , requirejs = require('requirejs')
  , fs = require('fs');

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

  // Use development version of static files 
  app.use(express.static(__dirname + '/public'));
});

app.configure('production', function(){
  app.use(require('less-middleware')({ src: __dirname + '/public'}));

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


//Set up the config passed to the optimizer

app.get('/', index.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
