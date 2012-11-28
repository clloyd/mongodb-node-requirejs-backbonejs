define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'app_dir/models/actionpoint'
], function(_, Backbone, ActionPointModel){
  var ActionPointsCollection = Backbone.Collection.extend({
    model: ActionPointModel,
    url: '/actionpoints',
  });
  // You don't usually return a collection instantiated
  return ActionPointsCollection;
});