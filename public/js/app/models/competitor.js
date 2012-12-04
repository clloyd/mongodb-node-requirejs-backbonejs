define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var CompetitorModel = Backbone.Model.extend({
    idAttribute: "_id"
  });
  // Return the model for the module
  return CompetitorModel;
});