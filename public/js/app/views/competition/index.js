define([
  'jquery',
  'underscore',
  'backbone',
  'jade!views_dir/competition/templates/index',
  
  //Other Views
  'views_dir/competition/map',

], function($, _, Backbone, IndexTemplate, MapView){
  var CompetitionIndexView = Backbone.View.extend({

    initialize: function() {
      var html = IndexTemplate({title: "Competition"})
      
      this.$el.html(html)
      
      //Check no other tab is active

      _.each($('#sidebar li'), function(item, index) {
        if ($(item).hasClass('active')) {
          $(item).removeClass('active')
        } 
      })

      this.render()
    },
  
    render: function() {

      $('#content').html(this.el)

      //Make Tab Active
      $('li#competitionmenu').addClass('active')

      new MapView(this.collection);
    }
  });
  // Our module now returns our view
  return CompetitionIndexView;
});










