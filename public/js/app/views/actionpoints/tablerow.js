define([
  'jquery',
  'underscore',
  'backbone',

  //Template
  'jade!views_dir/actionpoints/templates/table-row'

], function($, _, Backbone, TableRowTemplate){
  var ActionPointsTableView = Backbone.View.extend({

    tagName: 'tr',

    events: {
      'click #changeread': 'toggleread'
    },

    initialize: function() {
      this.render()
    },
  
    render: function() {
      var view = TableRowTemplate(this.model.attributes)
      this.$el.append(view)
    },

    toggleread: function() {
      if (this.model.get('unread') == true) {
        this.model.set('unread', false)
      } else if (this.model.get('unread') == false){
        this.model.set('unread', true)
      }
    }
  });
  // Our module now returns our view
  return ActionPointsTableView;
});