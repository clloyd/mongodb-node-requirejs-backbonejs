define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'app_dir/models/leqguetableposition'
], function(_, Backbone, LeagueTablePositionModel){
  var LeagueTableCollection = Backbone.Collection.extend({
    model: LeagueTablePositionModel,
    url: '/leaguetable',
  });
  // You don't usually return a collection instantiated
  return LeagueTableCollection;
});