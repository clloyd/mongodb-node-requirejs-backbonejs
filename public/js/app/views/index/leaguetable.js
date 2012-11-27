define([
  'jquery',
  'underscore',
  'backbone',

  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/leaguetable',
  'jade!views_dir/index/templates/leaguetable-row'

], function($, _, Backbone, WidgetTemplate, LeagueTableTemplate, LeagueTableRowTemplate){
  var LeagueTableView = Backbone.View.extend({
  
    el: "#leaguetable",
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "Action Points", icon: "list", label: false})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').html(LeagueTableTemplate()) 
  
      this.renderdata()  
  
    },
  
    renderdata: function() {
      var tempdata = [
        {name: "The Grand Hotel", color: "good", icon: "ascend", position: 14, score:348, active: false},
        {name: "Our Hotel", color: "neutral", icon: "minus", position: 15, score:331, active: true},
        {name: "Relaxation Hotel", color: "neutral", icon: "minus", position: 16, score:320, active: false},
        {name: "St James Hotel", color: "good", icon: "ascend", position: 17, score:308, active: false},
        {name: "Value Hotel", color: "bad", icon: "descend", position: 18, score:291, active: false},
        {name: "Finest Hotel", color: "bad", icon: "descend", position: 19, score:270, active: false}
      ]
  
      _.each(tempdata, function(value, index) {
        var html = LeagueTableRowTemplate(value)
        this.$('tbody').append(html)
      }, this)
      
    }
  })
  // Our module now returns our view
  return LeagueTableView;
});