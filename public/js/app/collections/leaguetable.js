define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'app_dir/models/leaguetableposition'
], function(_, Backbone, LeagueTablePositionModel){
  var LeagueTableCollection = Backbone.Collection.extend({
    model: LeagueTablePositionModel,
    url: '/leaguetable',
    comparator: function(position) {
      
      return position.get('position')
    }
  });
  // You don't usually return a collection instantiated
  return LeagueTableCollection;
});