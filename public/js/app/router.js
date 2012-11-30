define([
  'jquery',
  'underscore',
  'backbone',
  'views_dir/index/index',
  'views_dir/departments/index',
  'views_dir/actionpoints/index',
  'views_dir/leaguetable/index',
  'views_dir/latestreviews/index'

], function($, _, Backbone, IndexView, DepartmentsView, ActionPointsView, LeagueTableView, LatestReviewsView){
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      "departments": "departments",
      "actionpoints": "actionpoints",
      "leaguetable": "leaguetable",
      "latestreviews": "latestreviews",
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
    },

    leaguetable: function() {
      new LeagueTableView();
    },

    latestreviews: function() {
      new LatestReviewsView();
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
