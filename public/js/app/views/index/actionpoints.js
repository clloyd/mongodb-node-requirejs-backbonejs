define([
  'jquery',
  'underscore',
  'backbone',

  //Templates
  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/actionpoints',
  'jade!views_dir/index/templates/actionpoint-row'

], function($, _, Backbone, WidgetTemplate, ActionPointsTemplate, ActionPointRowTemplate){
  var ActionPointsView = Backbone.View.extend({
  
    el: "#actionpoints",
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "Action Points", icon: "check", label: "3 unread"})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').html(ActionPointsTemplate()) 
  
      this.renderdata()  
  
    },
  
    renderdata: function() {
      var tempdata = [
        {icon: "alert", text: "Increased Swimming Pool Complaints"},
        {icon: "alert", text: "Increased Check In Staff Complaints"},
        {icon: "alert", text: "Visitors from Asia Satisfaction Decreasing"}
      ]
  
      _.each(tempdata, function(value, index) {
        var html = ActionPointRowTemplate(value)
        this.$('tbody').append(html)
      }, this)
      
    }
  })
  // Our module now returns our view
  return ActionPointsView;
});