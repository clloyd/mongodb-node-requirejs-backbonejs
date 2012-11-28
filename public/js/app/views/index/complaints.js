define([
  'jquery',
  'underscore',
  'backbone',
  'libs/jquery.peity',

  //collections
  'app_dir/collections/departments',

  //Templates
  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/complaints',
  'jade!views_dir/index/templates/complaint-pie'

], function($, _, Backbone, Peity, DepartmentsCollection, WidgetTemplate, ComplaintsTemplate, ComplaintPieTemplate){
  var ComplaintsView = Backbone.View.extend({
  
    el: "#complaints",

    events: {
      'click' : 'loadPage'
    },
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "Complaints by Department", icon: "piechart", label: false})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').html(ComplaintsTemplate())

      //Get departments

      this.collection = new DepartmentsCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.renderdata({collection: collection})
      })
    },

    loadPage: function() {
      Backbone.history.navigate("#/departments", { trigger: true })
    },
  
    renderdata: function() {

      var total = 0
      _.each(this.collection.models, function(department, index) {
        total = total + parseInt(department.get('complaints'))
      })

      _.each(this.collection.models, function(department, index) {
        
        var percent = Math.floor((department.get('complaints')/total)*100)
          , color = ""
          , value = department.get('complaints') + "/" + total

        //Determine color
        if (percent >= 30) {color = "red"} else if (percent >= 25) {color = "yellow"} else {color = "green"}
        
        var html = ComplaintPieTemplate({color: color, name: department.get('name'), value: value})
        this.$('ul').append(html)
      }, this)

      //Render the pies
      _.each(this.$('.smallpie'), function(pie) {
        $(pie).peity("pie", {
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
