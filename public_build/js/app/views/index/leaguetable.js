define(["jquery","underscore","backbone","jade!views_dir/index/templates/widget","jade!views_dir/index/templates/leaguetable","jade!views_dir/index/templates/leaguetable-row"],function(e,t,n,r,i,s){var o=n.View.extend({el:"#leaguetable",initialize:function(){var e=r({title:"League Table",icon:"list",label:!1});this.$el.html(e),this.$(".widget-content").addClass("nopadding"),this.$(".widget-content").html(i()),this.renderdata()},renderdata:function(){var e=[{name:"The Grand Hotel",color:"good",icon:"ascend",position:14,score:348,active:!1},{name:"Our Hotel",color:"neutral",icon:"minus",position:15,score:331,active:!0},{name:"Relaxation Hotel",color:"neutral",icon:"minus",position:16,score:320,active:!1},{name:"St James Hotel",color:"good",icon:"ascend",position:17,score:308,active:!1},{name:"Value Hotel",color:"bad",icon:"descend",position:18,score:291,active:!1},{name:"Finest Hotel",color:"bad",icon:"descend",position:19,score:270,active:!1}];t.each(e,function(e,t){var n=s(e);this.$("tbody").append(n)},this)}});return o});