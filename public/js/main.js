require.config({
  paths: {
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    jade: 'libs/jade',
    app_dir: 'app',
    views_dir: 'app/views'
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
});

require(['app', 'require'], function(App, Require){
  // The "app" dependency is passed in as "App"
  App.initialize();
});










