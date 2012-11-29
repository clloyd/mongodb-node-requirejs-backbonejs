define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var LeagueTableRowModel = Backbone.Model.extend({
    idAttribute: "_id"
  });
  // Return the model for the module
  return LeagueTableRowModel;
});