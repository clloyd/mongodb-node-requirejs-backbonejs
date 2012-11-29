define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var LatestReview = Backbone.Model.extend({
    idAttribute: "_id"
  });
  // Return the model for the module
  return LatestReview;
});