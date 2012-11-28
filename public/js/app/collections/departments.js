define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'app_dir/models/department'
], function(_, Backbone, DepartmentModel){
  var DepartmentsCollection = Backbone.Collection.extend({
    model: DepartmentModel,
    url: '/departments',
    comparator: function(department) {
      var negativecomplaints = 1000000
      return (negativecomplaints - department.get('complaints'))
    }
  });
  // You don't usually return a collection instantiated
  return DepartmentsCollection;
});