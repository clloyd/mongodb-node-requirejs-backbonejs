define([
  'jquery',
  'underscore',
  'backbone',

  //collections
  'app_dir/collections/latestreviews',

  //Templates
  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/latestcomplaints',
  'jade!views_dir/index/templates/latestcomplaint-row'



], function($, _, Backbone, LatestReviewsCollection, WidgetTemplate, LatestComplaintsTemplate, LatestComplaintsRowTemplate){
  var LatestComplaintsView = Backbone.View.extend({
  
    el: "#latestcomplaints",
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "Latest Complaints", icon: "users", label: false})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').html(LatestComplaintsTemplate())

      this.collection = new LatestReviewsCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.render({collection: collection})
      })
    },
  
    render: function() {
      for (var i = 0; i <= 1; i++) {
        var html = LatestComplaintsRowTemplate(this.collection.models[i].attributes)
        this.$('ul').append(html)
      };
    }
  })
  // Our module now returns our view
  return LatestComplaintsView;
});