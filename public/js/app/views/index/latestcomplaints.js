define([
  'jquery',
  'underscore',
  'backbone',

  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/latestcomplaints',
  'jade!views_dir/index/templates/latestcomplaint-row'

], function($, _, Backbone, WidgetTemplate,LatestComplaintsTemplate, LatestComplaintsRowTemplate){
  var LatestComplaintsView = Backbone.View.extend({
  
    el: "#latestcomplaints",
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "Complaints by Department", icon: "piechart", label: false})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').html(LatestComplaintsTemplate())
  
      this.renderdata()
    },
  
    renderdata: function() {
      var tempdata = [
        {img_url: "http://placehold.it/100x100", user: "Ted (Bournemouth, UK)", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae enim elit. Vestibulum justo ipsum, sagittis vitae faucibus et, interdum et massa. Mauris vitae magna mauris..."}
      ]
  
      _.each(tempdata, function(value, index) {
        var html = LatestComplaintsRowTemplate(value)
        this.$('ul').append(html)
      }, this)
    }
  })
  // Our module now returns our view
  return LatestComplaintsView;
});