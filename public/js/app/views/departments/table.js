define([
  'jquery',
  'underscore',
  'backbone',

  //Template
  'jade!views_dir/departments/templates/widget',
  'jade!views_dir/departments/templates/table',
  'jade!views_dir/departments/templates/table-row'

], function($, _, Backbone, WidgetTemplate, TableTemplate, TableRowTemplate){
  var DepartmentsTableView = Backbone.View.extend({

    el: '#table',

    initialize: function() {
      var html = WidgetTemplate({title: "Complaints by Department", icon: "list", label: false})
      
      this.$el.html(html)
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').append(TableTemplate())
      this.render()
    },
  
    render: function() {  
      var total = 0
      _.each(this.options.models, function(department) {
        total = total + parseInt(department.get('complaints'))
      })

      _.each(this.options.models, function(department) {
        this.$('tbody').append(TableRowTemplate({
          name: department.get('name'),
          percent: Math.floor((parseInt(department.get('complaints')) / total) * 100),
          complaints: department.get('complaints')
        }))
      })
    }
  });
  // Our module now returns our view
  return DepartmentsTableView;
});