define([
  'jquery',
  'underscore',
  'backbone',

  //Templates
  'jade!views_dir/index/templates/widget',
  'jade!views_dir/index/templates/actionpoints',
  'jade!views_dir/index/templates/actionpoint-row',

  //Collections
  'app_dir/collections/actionpoints'

], function($, _, Backbone, WidgetTemplate, ActionPointsTemplate, ActionPointRowTemplate, ActionPointsCollection){
  var ActionPointsView = Backbone.View.extend({
  
    el: "#actionpoints",

    events: {
      'click' : 'loadPage'
    },
  
    initialize: function() {
  
      //Render Generic Widget
      var widgethtml = WidgetTemplate({title: "Action Points", icon: "check", label: "unread"})
      this.$el.html(widgethtml)
  
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').html(ActionPointsTemplate()) 

      this.collection = new ActionPointsCollection();
  
      var context = this
      this.collection.fetch().success(function(collection) {
        context.render()
      })  
  
    },

    loadPage: function() {
      Backbone.history.navigate("#/actionpoints", { trigger: true })
    },

  
    render: function() {
      _.each(this.collection.where({unread: true}), function(value, index) {
        this.$('tbody').append(ActionPointRowTemplate({
          icon: "alert",
          text: value.get('text')
        }))
      }, this)

      //Update Unread Count at top of widget
      this.$('.widget-title .label').text(this.collection.where({unread: true}).length + " unread")
      
    }
  })
  // Our module now returns our view
  return ActionPointsView;
});