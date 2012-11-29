define([
  'jquery',
  'underscore',
  'backbone',

  //Template
  'jade!views_dir/actionpoints/templates/widget',
  'jade!views_dir/actionpoints/templates/table',
  'jade!views_dir/actionpoints/templates/table-row'

], function($, _, Backbone, WidgetTemplate, TableTemplate, TableRowTemplate){
  var ActionPointsTableView = Backbone.View.extend({

    el: '#actionpoints',

    initialize: function() {
      var html = WidgetTemplate({title: "Action Points", icon: "check", label: '3 unread'})
      
      this.$el.html(html)
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').append(TableTemplate())

      this.render()
    },
  
    render: function() {
      _.each(this.options.models, function(actionpoint) {
        this.$('tbody').append(TableRowTemplate({text: actionpoint.get('text'), icon: 'alert'}))
      })
    }
  });
  // Our module now returns our view
  return ActionPointsTableView;
});