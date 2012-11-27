define([
  'jquery',
  'underscore',
  'backbone',
  'views_dir/index/index'
], function($, _, Backbone, IndexView){
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      //Default Route
      "*actions": "defaultAction"
    },

    defaultAction: function() {
      new IndexView();
    }
  });

  var initialize = function(){
    new AppRouter;
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
