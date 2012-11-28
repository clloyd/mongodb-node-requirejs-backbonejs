define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ActionPointModel = Backbone.Model.extend({
    idAttribute: "_id"
  });
  // Return the model for the module
  return ActionPointModel;
});