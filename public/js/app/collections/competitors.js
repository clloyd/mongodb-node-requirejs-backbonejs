define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'app_dir/models/competitor'
], function(_, Backbone, CompetitorModel){
  var CompetitorsCollection = Backbone.Collection.extend({
    model: CompetitorModel,
    url: '/competitors'
  });
  // You don't usually return a collection instantiated
  return CompetitorsCollection;
});