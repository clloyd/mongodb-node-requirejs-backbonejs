define([
  'jquery',
  'underscore',
  'backbone',
  'libs/jquery.peity',

  //Templates
  'jade!views_dir/index/templates/summary',

], function($, _, Backbone, Peity, SummaryTemplate){
  var SummaryView = Backbone.View.extend({
  
    el: "#summary",
  
    initialize: function() {
      console.log("Summary")
      this.$el.html(SummaryTemplate())
      this.renderdata()
    },
  
    renderdata: function() {
      _.each(this.$('.pietylinegood'), function(linegraph) {
        $(linegraph).peity('bar', {
          colour: "rgb(58,173,67)"
        })
      })

      _.each(this.$('.pietylinebad'), function(linegraph) {
        $(linegraph).peity('bar', {
          colour: "rgb(201,44,44)"
        })
      })


    }


  })
  // Our module now returns our view
  return SummaryView;
});
