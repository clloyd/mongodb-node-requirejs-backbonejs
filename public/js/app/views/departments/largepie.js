define([
  'jquery',
  'underscore',
  'backbone',
  'libs/jquery.flot.pie',

  //Template
  'jade!views_dir/departments/templates/widget',
  'jade!views_dir/departments/templates/largepie',

], function($, _, Backbone, flotpie, WidgetTemplate, LargePieTemplate){
  var DepartmentsPieView = Backbone.View.extend({

    el: '#largepie',

    initialize: function() {
      var html = WidgetTemplate({title: "Complaints by Department", icon: "piechart", label: false})
      
      this.$el.html(html)
      this.$('.widget-content').append(LargePieTemplate())
      this.render()
    },
  
    render: function() {
      var data = []
      _.each(this.options.models, function(department) {
        data.push({label: department.get('name'), data: parseInt(department.get('complaints'))})
      })

      $.plot(this.$("#graph"), data, {
        series: {
          pie: { 
            radius: 1,
            show: true,

            label: {
              show: true,
              radius: 3/4,
              threshold: 0.05,
              formatter: function(label, series){
                  return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'</div>';
              },
            }
          }
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        legend: {
          show: false
        }
      });
    }
  });
  // Our module now returns our view
  return DepartmentsPieView;
});