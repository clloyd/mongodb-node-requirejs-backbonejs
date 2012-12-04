require.config({
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

  waitSeconds : 15,

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
});

require(['app', 'require'], function(App, Require){
  // The "app" dependency is passed in as "App"
  App.initialize();
});










