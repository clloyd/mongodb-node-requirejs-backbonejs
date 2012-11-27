define([
  'jquery',
  'underscore',
  'backbone',
  'views_dir/index/index',
  'views_dir/departments/index'
], function($, _, Backbone, IndexView, DepartmentsView){
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      "departments": "departments",
      //Default Route
      "*actions": "defaultAction"
    },

    defaultAction: function() {
      new IndexView();
    },

    departments: function() {
      new DepartmentsView();
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
