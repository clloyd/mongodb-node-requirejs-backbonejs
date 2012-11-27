define([
  'jquery',
  'underscore',
  'backbone',

  //Template
  'jade!views_dir/departments/templates/largepie',

], function($, _, Backbone, LargePieTemplate){
  var IndexView = Backbone.View.extend({

    initialize: function() {
      var html = LargePieTemplate
      
      this.$el.html(html)
      this.render()
    },
  
    render: function() {
      $('#largepie').html(this.el)
    }
  });
  // Our module now returns our view
  return IndexView;
});