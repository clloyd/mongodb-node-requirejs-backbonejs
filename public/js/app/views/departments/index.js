define([
  'jquery',
  'underscore',
  'backbone',

  //Collection
  'app_dir/collections/departments',

  //Template
  'jade!views_dir/departments/templates/index',

  //Sub-Views
  'views_dir/departments/largepie',
  'views_dir/departments/table',

], function($, _, Backbone, DepartmentsCollection, IndexTemplate, LargePieView, TableView){
  var DepartmentsIndexView = Backbone.View.extend({

    el: '#content',

    initialize: function() {
      var html = IndexTemplate({title: "Departments"})
      this.$el.html(html)
      
      //Check no other tab is active
      _.each($('#sidebar li'), function(item, index) {
        if ($(item).hasClass('active')) {
          $(item).removeClass('active')
        } 
      })

      this.collection = new DepartmentsCollection();

      var context = this
      this.collection.fetch().success(function(collection) {
        context.render({collection: collection})
      })

    },
  
    render: function() {
      $('li#departmentmenu').addClass('active')

      new LargePieView(this.collection);
      new TableView(this.collection)
    }
  });
  // Our module now returns our view
  return DepartmentsIndexView;
});