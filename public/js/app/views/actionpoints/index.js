define([
  'jquery',
  'underscore',
  'backbone',
  'jade!views_dir/actionpoints/templates/index',
  
  //Other Views
  'views_dir/actionpoints/table',

  //Collections
  'app_dir/collections/actionpoints'

], function($, _, Backbone, IndexTemplate, TableView, ActionPointsCollection){
  var ActionPointsIndexView = Backbone.View.extend({

    initialize: function() {
      var html = IndexTemplate({title: "Action Points"})
      
      this.$el.html(html)
      
      //Check no other tab is active

      _.each($('#sidebar li'), function(item, index) {
        if ($(item).hasClass('active')) {
          $(item).removeClass('active')
        } 
      })

      this.collection = new ActionPointsCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.render({collection: collection})
      })
    },
  
    render: function() {
      $('#content').html(this.el)

      //Make Tab Active
      $('li#actionpointsmenu').addClass('active')

      new TableView(this.collection);
    }
  });
  // Our module now returns our view
  return ActionPointsIndexView;
});










