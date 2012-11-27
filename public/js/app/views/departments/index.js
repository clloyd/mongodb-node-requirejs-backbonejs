define([
  'jquery',
  'underscore',
  'backbone',

  //Template
  'jade!views_dir/departments/templates/index',

  //Sub-Views
  'views_dir/departments/largepie',

], function($, _, Backbone, IndexTemplate, LargePieView){
  var IndexView = Backbone.View.extend({

    initialize: function() {
      var html = IndexTemplate({title: "Departments"})
      
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

      $('li#departmentmenu').addClass('active')

      new LargePieView();
    }
  });
  // Our module now returns our view
  return IndexView;
});