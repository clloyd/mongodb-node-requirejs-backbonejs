define([
  'jquery',
  'underscore',
  'backbone',
  'libs/jquery.peity',

  //Templates
  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/complaints',
  'jade!views_dir/index/templates/complaint-pie'

], function($, _, Backbone, Peity, WidgetTemplate, ComplaintsTemplate, ComplaintPie){
  var ComplaintsView = Backbone.View.extend({
  
    el: "#complaints",
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "Complaints by Department", icon: "piechart", label: false})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').html(ComplaintsTemplate())
  
      this.renderdata()
    },
  
    renderdata: function() {
      var tempdata = [
        {title: "Housekeeping", color: "red", value: "8/10"},
        {title: "Location", color: "orange", value: "7/10"},
        {title: "Facilities", color: "yellow", value: "11/20"},
        {title: "Quality", color: "green", value: "4/10"},
        {title: "Service", color: "green", value: "2/10"},
        {title: "Price", color: "green", value: "1/10"}
      ]
  
      _.each(tempdata, function(value, index) {
        var html = ComplaintPie(value)
        this.$('ul').append(html)
      }, this)
  
      $.each($('.smallpie'), function(index, value) {
        $(value).peity("pie", {
          colours: function() {
            return ["#dddddd", this.getAttribute("data-colour")]
          },
          diameter: function() {
            return this.getAttribute("data-diameter")
          }
        })
      })
    }
  })
  // Our module now returns our view
  return ComplaintsView;
});
