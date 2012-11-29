define([
  'jquery',
  'underscore',
  'backbone',

  'app_dir/collections/leaguetable',

  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/leaguetable',
  'jade!views_dir/index/templates/leaguetable-row'

], function($, _, Backbone, LeagueTableCollection, WidgetTemplate, LeagueTableTemplate, LeagueTableRowTemplate){
  var LeagueTableView = Backbone.View.extend({
  
    el: "#leaguetable",
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "League Table", icon: "list", label: false})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').html(LeagueTableTemplate()) 
  
      this.collection = new LeagueTableCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.render()
      })  
  
    },
  
    render: function() {
      
      _.each(this.collection.models, function(position, index) {
        var row = position.attributes

        if (row.change < 0) { 
          row.label = "label-bad"
          row.icon = "down"
        } else if (row.change > 0) {
          row.label = "label-good"
          row.icon = "up"
        } else {
          row.label = "label-none"
          row.icon = "minus"
        } 

        var html = LeagueTableRowTemplate(row)
        this.$('tbody').append(html)
      }, this)

      //Color our Hotel
      $(this.$('.widget-content tr')[13]).addClass('active')

      //Scroll the list to the correct position
      var trposition = $(this.$('.widget-content tr')[13]).position().top
      this.$('.widget-content').scrollTop(trposition-150)
      
    }
  })
  // Our module now returns our view
  return LeagueTableView;
});