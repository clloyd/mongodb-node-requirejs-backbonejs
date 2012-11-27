define([
  'jquery',
  'underscore',
  'backbone',
  'libs/bootstrap',
  'libs/unicorn',
  'app_dir/router', // Request router.js
], function($, _, Backbone, Bootstrap, Unicorn, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});

