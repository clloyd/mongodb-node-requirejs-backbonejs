define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'app_dir/models/latestreview'
], function(_, Backbone, LatestReviewModel){
  var LatestReviewsCollection = Backbone.Collection.extend({
    model: LatestReviewModel,
    url: '/latestreviews',
  });
  // You don't usually return a collection instantiated
  return LatestReviewsCollection;
});