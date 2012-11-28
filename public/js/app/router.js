define([
  'jquery',
  'underscore',
  'backbone',

  'views_dir/index/index',
  'views_dir/departments/index',
  'views_dir/actionpoints/index'
], function($, _, Backbone, IndexView, DepartmentsView, ActionPointsView){
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      "departments": "departments",
      "actionpoints": "actionpoints",
      //Default Route
      "*actions": "defaultAction"
    },

    defaultAction: function() {
      new IndexView();
    },

    departments: function() {
      new DepartmentsView();
    },

    actionpoints: function() {
      new ActionPointsView();
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
