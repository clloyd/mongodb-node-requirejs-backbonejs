define([
  'jquery',
  'underscore',
  'backbone',

  //Templates
  'jade!views_dir/competition/templates/widget',
  'jade!views_dir/competition/templates/map',
  'jade!views_dir/competition/templates/summary-unpopulated',
  'jade!views_dir/competition/templates/summary-loading',
  'jade!views_dir/competition/templates/summary',
  'jade!views_dir/competition/templates/infowindow',

  //Collection
  'app_dir/collections/competitors',

  //Google Maps
  'async!https://maps.googleapis.com/maps/api/js?v=3.9&key=AIzaSyBSEoXhlN7JRgnHHsL05B4OxCcRF7BTLD4&sensor=false'

], function($, _, Backbone, WidgetTemplate, MapTemplate, UnpopulatedSummaryTemplate, LoadingSummaryTemplate, SummaryTemplate, InfoWindowTemplate, CompetitionCollection){
  var CompetitionIndexView = Backbone.View.extend({

    el: '#map',

    initialize: function() {
      
      
      //This is slightly different from the others rendering two seperate widgets, with interactions
      //#map_box
      var html = WidgetTemplate({title: "Competitor Report", icon: "location", label: false})
      this.$('#map_box').html(html)
      this.$('#map_box .widget-content').addClass('nopadding')
      this.$('#map_box .widget-content').append(MapTemplate())
      //#map_summary
      var html = WidgetTemplate({title: "Competitor Information", icon: "location", label: false})
      this.$('#map_summary').html(html)
      this.$('#map_summary .widget-content').append(UnpopulatedSummaryTemplate())



      this.rendermap()
    },
  
    rendermap: function() {
      var mapOptions = {
        center: new google.maps.LatLng(1.2879992202415138, 103.90089035034178),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

      this.collection = new CompetitionCollection();
      
      var context = this
      this.collection.fetch().success(function(err){
        context.renderpoints()
      })
    },

    renderpoints: function() {
      _.each(this.collection.models, function(venue) {
        var pointerOptions = {
          zIndex: 50000,
          //animation: google.maps.Animation.DROP,
          clickable: true,
          map: this.map,
          icon: new google.maps.MarkerImage("/img/sup_pin.png"),
          position: new google.maps.LatLng(venue.get('lat'),venue.get('lon'))
        }
        var marker = new google.maps.Marker(pointerOptions)

        var infocontent = new google.maps.InfoWindow({
          content: InfoWindowTemplate({name: venue.get('name')})
        });

        google.maps.event.addListener(marker, 'mouseover', function(){
          infocontent.open(this.map, marker);
        }, this);

        google.maps.event.addListener(marker, 'mouseout', function(){
          infocontent.close();
        }, this);

        var context = this
        google.maps.event.addListener(marker, 'click', function(){
          context.showmapinfo(venue);
        }, this);
      }, this)
    },

    showmapinfo: function(venue) {
      //Loading...
      var html = WidgetTemplate({title: venue.get('name'), icon: "location", label: false})
      this.$('#map_summary').html(html)
      this.$('#map_summary .widget-content').append(LoadingSummaryTemplate())

      //Lets grab info...
      $.ajax({
        url: '/competitors/' + venue.get('_id'),
        dataType: 'json',
        context: this,
        success: function(data) {
          var terms = data.terms
          //Sort the terms
          var terms_sorted = _.sortBy(terms, function(value){
            return (0 - value.score)
          })
          console.log(terms_sorted)
          var max_value = terms_sorted[0].score

          var html = WidgetTemplate({title: venue.get('name'), icon: "location", label: false})
          this.$('#map_summary').html(html)
          this.$('#map_summary .widget-content').addClass('nopadding')
          this.$('#map_summary .widget-content').append(SummaryTemplate({
            terms: terms_sorted,
            max_value: max_value,
            name: data.name
          }))     
        }
      });
    }
  });
  // Our module now returns our view
  return CompetitionIndexView;
});
