define([
  'jquery',
  'underscore',
  'backbone',

  //Templates
  'jade!views_dir/competition/templates/widget',
  'jade!views_dir/competition/templates/map',

  //Google Maps
  'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBSEoXhlN7JRgnHHsL05B4OxCcRF7BTLD4&sensor=false'

], function($, _, Backbone, WidgetTemplate, MapTemplate){
  var CompetitionIndexView = Backbone.View.extend({

    el: '#map',

    initialize: function() {
      
      var html = WidgetTemplate({title: "Competitor Report", icon: "location", label: false})
      
      this.$el.html(html)
      this.$('.widget-content').addClass('nopadding')
      this.$('.widget-content').append(MapTemplate())

      
      //Check no other tab is active
      this.rendermap()
    },
  
    rendermap: function() {
      var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    }
  });
  // Our module now returns our view
  return CompetitionIndexView;
});
