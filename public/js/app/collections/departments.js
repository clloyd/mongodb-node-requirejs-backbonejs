define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'app_dir/models/department'
], function(_, Backbone, DepartmentModel){
  var DepartmentsCollection = Backbone.Collection.extend({
    model: DepartmentModel
  });
  // You don't usually return a collection instantiated
  return DepartmentsCollection;
});