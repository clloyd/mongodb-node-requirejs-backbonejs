define([
  'jquery',
  'underscore',
  'backbone',
  'libs/jquery.flot',

  //Template
  'jade!views_dir/leaguetable/templates/widget',
  'jade!views_dir/leaguetable/templates/trend-graph',

], function($, _, Backbone, Flot, WidgetTemplate, TrendTemplate){
  var LeagueTableTableView = Backbone.View.extend({

    el: '#trend',

    initialize: function() {
      var html = WidgetTemplate({title: "Trend", icon: "barchart", label: false})
      
      this.$el.html(html)
      this.$('.widget-content').append(TrendTemplate())

      this.render()
    },
  
    render: function() {
      $.ajax({
        url: '/leaguetable/trend',
        dataType: 'json',
        context: this,
        success: function(data) {
          this.rendertrend(data)
        }
      });
    },

    rendertrend: function(data) {
      processedata = []
      _.each(data, function(value, index){
        processedata.push([index, value])
      })

      $.plot(this.$("#graph"), [processedata], {
        yaxis: {min: 0},
      })
    }
  });
  // Our module now returns our view
  return LeagueTableTableView;
});