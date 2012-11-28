define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'libs/unicorn',
  'libs/ss-standard',
  'app_dir/router', // Request router.js
], function($, _, Backbone, Bootstrap, Unicorn, ssStandard, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});

