define([
  'jquery',
  'underscore',
  'backbone',

  //Template
  'jade!views_dir/leaguetable/templates/widget',
  'jade!views_dir/leaguetable/templates/table',
  'jade!views_dir/leaguetable/templates/table-row'

], function($, _, Backbone, WidgetTemplate, TableTemplate, TableRowTemplate){
  var LeagueTableTableView = Backbone.View.extend({

    el: '#leaguetable',

    initialize: function() {
      var html = WidgetTemplate({title: "League Table", icon: "list", label: false})
      
      this.$el.html(html)
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').append(TableTemplate())

      this.render()
    },
  
    render: function() {
      _.each(this.options.models, function(position) {
        var row = position.attributes

        if (row.change < 0) { 
          row.label = "label-bad"
          row.icon = "descend"
        } else if (row.change > 0) {
          row.label = "label-good"
          row.icon = "ascend"
        } else {
          row.label = "label-none"
          row.icon = "minus"
        } 

        var html = TableRowTemplate(row)
        this.$('tbody').append(html)
      })
    }
  });
  // Our module now returns our view
  return LeagueTableTableView;
});