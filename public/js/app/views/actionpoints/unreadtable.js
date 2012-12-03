define([
  'jquery',
  'underscore',
  'backbone',

  //Sub-View
  'views_dir/actionpoints/tablerow',

  //Template
  'jade!views_dir/actionpoints/templates/widget',
  'jade!views_dir/actionpoints/templates/table'
  
], function($, _, Backbone, TableRowView, WidgetTemplate, TableTemplate){
  var ActionPointsTableView = Backbone.View.extend({

    el: '#unreadactionpoints',

    initialize: function() {
      var html = WidgetTemplate({title: "Unread Action Points", icon: "delete", label: false})
      
      this.$el.html(html)
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').append(TableTemplate())

      this.render()
    },
  
    render: function() {
      _.each(this.options.models, function(actionpoint) {
        if (actionpoint.get('unread') == true) {
          var view = new TableRowView({model: actionpoint})
          this.$('tbody').append(view.el)
        } 
      }, this)
    }
  });
  // Our module now returns our view
  return ActionPointsTableView;
});