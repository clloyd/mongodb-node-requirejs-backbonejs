define([
  'jquery',
  'underscore',
  'backbone',
  'jade!views_dir/actionpoints/templates/index',
  
  //Other Views
  'views_dir/actionpoints/unreadtable',
  'views_dir/actionpoints/readtable',
  //Collections
  'app_dir/collections/actionpoints'

], function($, _, Backbone, IndexTemplate, UnreadTableView, ReadTableView, ActionPointsCollection){
  var ActionPointsIndexView = Backbone.View.extend({

    initialize: function() { 
      //Check no other tab is active

      _.each($('#sidebar li'), function(item, index) {
        if ($(item).hasClass('active')) {
          $(item).removeClass('active')
        } 
      })

      this.collection = new ActionPointsCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.render()
        //Redraw tables when values change
        context.collection.on('change', context.render, context)        
      })
    },
  
    render: function() {
      var html = IndexTemplate({title: "Action Points"})
      this.$el.html(html)
      $('#content').html(this.el)

      //Make Tab Active
      $('li#actionpointsmenu').addClass('active')

      new UnreadTableView(this.collection);
      new ReadTableView(this.collection);
    },
  });
  // Our module now returns our view
  return ActionPointsIndexView;
});










