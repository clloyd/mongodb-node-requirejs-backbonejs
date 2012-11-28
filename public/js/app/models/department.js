define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var DepartmentModel = Backbone.Model.extend({
    idAttribute: "_id"
  });
  // Return the model for the module
  return DepartmentModel;
});