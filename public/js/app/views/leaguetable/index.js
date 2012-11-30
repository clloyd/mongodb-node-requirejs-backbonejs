define([
  'jquery',
  'underscore',
  'backbone',
  'jade!views_dir/leaguetable/templates/index',
  
  //Other Views
  'views_dir/leaguetable/table',
  'views_dir/leaguetable/trend',

  //Collections
  'app_dir/collections/leaguetable'

], function($, _, Backbone, IndexTemplate, TableView, TrendView, LeagueTableCollection){
  var LeagueTableIndexView = Backbone.View.extend({

    initialize: function() {
      var html = IndexTemplate({title: "Hotel League Table"})
      
      this.$el.html(html)
      
      //Check no other tab is active

      _.each($('#sidebar li'), function(item, index) {
        if ($(item).hasClass('active')) {
          $(item).removeClass('active')
        } 
      })

      this.collection = new LeagueTableCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.render({collection: collection})
      })
    },
  
    render: function() {

      $('#content').html(this.el)

      //Make Tab Active
      $('li#leaguetablemenu').addClass('active')

      new TableView(this.collection);
      new TrendView(this.collection);
    }
  });
  // Our module now returns our view
  return LeagueTableIndexView;
});










