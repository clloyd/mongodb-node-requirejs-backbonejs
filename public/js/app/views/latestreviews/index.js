define([
  'jquery',
  'underscore',
  'backbone',

  //Templates
  'jade!views_dir/latestreviews/templates/index',
  
  //Other Views
  'views_dir/latestreviews/table',

  //Collections
  'app_dir/collections/latestreviews'

], function($, _, Backbone, IndexTemplate, TableView, LatestReviewsCollection){
  var LatestReviewsIndexView = Backbone.View.extend({

    initialize: function() {
      var html = IndexTemplate({title: "Latest Reviews"})
      
      this.$el.html(html)
      
      //Check no other tab is active

      _.each($('#sidebar li'), function(item, index) {
        if ($(item).hasClass('active')) {
          $(item).removeClass('active')
        } 
      })

      this.collection = new LatestReviewsCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.render({collection: collection})
      })
    },
  
    render: function() {

      $('#content').html(this.el)

      //Make Tab Active
      $('li#latestreviewssmenu').addClass('active')

      new TableView(this.collection);
    }
  });
  // Our module now returns our view
  return LatestReviewsIndexView;
});










