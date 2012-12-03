define([
  'jquery',
  'underscore',
  'backbone',
  'jade!views_dir/index/templates/index',
  
  //Other Views
  'views_dir/index/summary',
  'views_dir/index/complaints',
  'views_dir/index/actionpoints',
  'views_dir/index/leaguetable',
  'views_dir/index/latestcomplaints'


], function($, _, Backbone, IndexTemplate, SummaryView, ComplaintsView, ActionPointsView, LeagueTableView, LatestComplaintsView){
  var IndexView = Backbone.View.extend({

    el: '#content',

    initialize: function() {
      var html = IndexTemplate({title: "Dashboard"})
      
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

      //Make Dashboard Tab Active
      $('li#dashboardmenu').addClass('active')

      new SummaryView
      new ComplaintsView
      new ActionPointsView
      new LeagueTableView
      new LatestComplaintsView
    }
  });
  // Our module now returns our view
  return IndexView;
});










