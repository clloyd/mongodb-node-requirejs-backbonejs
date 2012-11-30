define([
  'jquery',
  'underscore',
  'backbone',

  //Template
  'jade!views_dir/latestreviews/templates/widget',
  'jade!views_dir/latestreviews/templates/table',
  'jade!views_dir/latestreviews/templates/table-row'

], function($, _, Backbone, WidgetTemplate, TableTemplate, TableRowTemplate){
  var LatestReviewsTableView = Backbone.View.extend({

    el: '#table',

    initialize: function() {
      var html = WidgetTemplate({title: "Latest Reviews", icon: "users", label: false})
      
      this.$el.html(html)
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').append(TableTemplate())

      this.render()
    },
  
    render: function() {
      _.each(this.options.models, function(review) {
        var html = TableRowTemplate(review.attributes)
        this.$('tbody').append(html)
      })
    }
  });
  // Our module now returns our view
  return LatestReviewsTableView;
})
